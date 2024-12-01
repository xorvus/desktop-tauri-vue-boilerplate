import {appDataDir} from "@tauri-apps/api/path";
import {Client, Store, Stronghold} from '@tauri-apps/plugin-stronghold';
import {LazyStore} from "@tauri-apps/plugin-store";

class SecretStore {
    private env!: string;
    private client!: Client;
    private store!: Store;
    private lazyStore!: LazyStore;

    private stronghold!: Stronghold;

    public static async init() {
        const instance = new SecretStore()
        instance.env = import.meta.env.VITE_ENVIRONMENT;

        if(instance.env === "development"){
            instance.lazyStore = new LazyStore("config-dev.json");
            return instance;
        }

        const clientName = 'config';
        const vaultPath = `${await appDataDir()}/vault.hold`;
        const stronghold = await Stronghold.load(vaultPath, import.meta.env.VITE_STRONGHOLD_PASSWORD);
        try {
            instance.client = await stronghold.loadClient(clientName);
        } catch {
            instance.client = await stronghold.createClient(clientName);
        }

        instance.store = instance.client.getStore();
        instance.stronghold = stronghold;

        return instance;
    }


    public async setKey(key: string, value: string) {
        if(this.env === "development"){
            await this.lazyStore.set(key, value);
            return;
        }

        const data = Array.from(new TextEncoder().encode(value));
        await this.store.insert(key, data);
    }

    public async getKey<T>(key: string): Promise<T> {
        if(this.env === "development"){
            return await this.lazyStore.get<T>(key) as T;
        }
        const data: any = await this.store.get(key);
        return new TextDecoder().decode(new Uint8Array(data)) as T;
    }

    public async deleteKey(key: string) {
        if(this.env === "development"){
            await this.lazyStore.delete(key);
            return;
        }
        await this.store.remove(key);
    }

    public async save() {
        if(this.env === "development"){
            await this.lazyStore.save();
            return;
        }

        await this.stronghold.save();
    }

}

export default SecretStore;