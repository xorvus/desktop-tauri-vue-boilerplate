import {disable, enable} from "@tauri-apps/plugin-autostart";
import {getCurrentWindow} from "@tauri-apps/api/window";
import {invoke} from "@tauri-apps/api/core";
import SystemTray from "../../utils/SystemTray.ts";
import Store from "../../utils/Store.ts";

class Settings {
    private version: string = '';
    private store!: Store;
    private static instance: Settings;
    private settings: any = {
        autoStart: false,
        fullScreenMode: false,
        systray: false,
        idSystemTray: ''
    }

    public static async init(){
        if(!this.instance){
            this.instance = new Settings();
            this.instance.store = new Store("settings.json");
            this.instance.version = await invoke("get_version");
            this.instance.settings = {
                autoStart: await this.instance.store.get("autoStart") || false,
                fullScreenMode: await this.instance.store.get("fullScreenMode") || false,
                systray: await this.instance.store.get("systray") || false,
                idSystemTray: ""
            }

            await this.instance.save();
        }


        return Settings.instance;
    }

    public getVersion() {
        return this.version;
    }

    public setAutoStart(value: boolean){
        this.settings.autoStart = value;
        this.store.set<boolean>("autoStart", value).then();
    }

    public getAutoStart(): boolean {
        return this.settings.autoStart;
    }

    public setFullScreen(value: boolean){
        this.settings.fullScreenMode = value;
        this.store.set<boolean>("fullScreenMode", value).then();
    }

    public getFullScreen(): boolean {
        return this.settings.fullScreenMode;
    }

    public setTray(value: boolean){
        this.settings.systray = value;
        this.store.set<boolean>("systray", value).then();
    }

    public getTray(): boolean {
        return this.settings.systray;
    }

    public async save(){
        if(this.getAutoStart()){
            await enable();
        }else {
            await disable();
        }

        //fullscreen mode
        await getCurrentWindow().setFullscreen(this.getFullScreen());

        //system tray
        if(this.getTray()){
            const systray = await new SystemTray(this.settings.idSystemTray)
                .addMenu({
                    id: "quit",
                    text: "Quit",
                    action: () => {
                        getCurrentWindow().close()
                    }
                })
                .build()
            if(this.settings.idSystemTray == ""){
                this.store.set<string>("idSystemTray", systray?.id || "").then();
                this.settings.idSystemTray = systray?.id || "";
            }
        }else {
            if(this.settings.idSystemTray != undefined && this.settings.idSystemTray !== ""){
                await SystemTray.remove(this.settings.idSystemTray);
            }

        }
    }
}


export default Settings;