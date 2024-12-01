## System Tray
To create and customize a system tray for your application.

### Configuration

Add feature `tray-icon`  in tauri in `Cargo.toml` file.
###### src-tauri/Cargo.toml
```toml
[dependencies]
tauri = { .... features = [ "tray-icon" ] }
```

### Usage
###### src/App.vue
```vue
  await new SystemTray()
    .addMenu({
        id: "quit",
        text: "Quit",
        action: () => {
            getCurrentWindow().close()
        }
    })
    .build()
```

To see utility code for system tray, see `src/utils/SystemTray.ts` file.

### Permissions
To use await defaultWindowIcon() to display an icon, ensure the necessary permissions are granted.

###### src-tauri/capabilities/default.json
``` json
{
  "permissions": [
    ...,
    "core:app:allow-default-window-icon",
  ]
}
```
### Reference
[Systray Tauri](https://v2.tauri.app/learn/system-tray/)
