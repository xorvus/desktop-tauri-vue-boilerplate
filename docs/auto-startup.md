## Auto Startup

Automatically launch application when the system startup.

### Usage

###### src/layouts/settings/Settings.ts
```typescript
import {disable, enable, isEnabled} from "@tauri-apps/plugin-autostart";

await isEnabled();
await enable();
await disable();

```

### Configuration

###### src-tauri/src/lib.rs
```rust 
use tauri_plugin_autostart::MacosLauncher;

tauri::Builder::default()
    .plugin(tauri_plugin_autostart::init(
        MacosLauncher::LaunchAgent,
        Some(vec!["--flag1", "--flag2"]),
    ))
.....
```

### Permissions
By default all potentially dangerous plugin commands and scopes are blocked and cannot be accessed. You must modify the permissions in your capabilities configuration to enable these.

###### src-tauri/capabilities/default.json
``` json

{
  "permissions": [
    ...,
    "autostart:allow-enable",
    "autostart:allow-disable",
    "autostart:allow-is-enabled"
  ]
}
```

### Reference
[Autostart Tauri](https://tauri.app/plugin/autostart/)