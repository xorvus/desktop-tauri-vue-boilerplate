import {Menu} from "@tauri-apps/api/menu/menu";
import {TrayIcon} from "@tauri-apps/api/tray";
import {defaultWindowIcon} from "@tauri-apps/api/app";
import {Image} from "@tauri-apps/api/image";

interface MenuItem {
    id: string,
    text: string,
    action: () => void,
}

class SystemTray {
    private menu: any = {items: []};
    private id: string = "";

    constructor(id: string) {
        this.id = id;
    }

    public addMenu(menu: MenuItem) {
        this.menu.items.push(menu);
        return this;
    }

    public async build() {
        if(this.id !== undefined && this.id !== "" ){
            console.log(this.id)
            const tray = await TrayIcon.getById(this.id);
            await tray?.setVisible(true);
            return tray;
        }else {
            return await TrayIcon.new({
                menu: await Menu.new(this.menu),
                menuOnLeftClick: true,
                icon: await defaultWindowIcon() as Image,
            });
        }
    }

    public static async remove(id: string){
        const tray = await TrayIcon.getById(id);
        if(tray){
            await tray?.setVisible(false);
        }

    }

}


export default SystemTray;