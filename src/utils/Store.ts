import {LazyStore} from "@tauri-apps/plugin-store";

class Store {

    private store!: LazyStore;

    constructor(file: string) {
        this.store = new LazyStore(file);
    }

    public async get<T>(key: string): Promise<T | undefined> {
        console.log(key, await this.store.get<T>(key))
        return await this.store.get<T>(key);
    }

    public async set<T>(key: string, value: T) {
        await this.store.set(key, value);
        await this.store.save();
    }
}


export default Store;