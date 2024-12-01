## Shutdown, Refresh, Restart

### Usage
###### src/App.vue
```typescript
import {shutdown, reboot} from "tauri-plugin-power-manager-api";

await shutdown() //shutdown pc
await reboot() //reboot pc
window.location.reload(); //refresh

```

### Permissions
To use shutdown and reboot you need to add the following permission to the capabilities configuration.

###### src-tauri/capabilities/default.json
``` json
{
  "permissions": [
    ...
    "power-manager:allow-shutdown",
    "power-manager:allow-reboot"
  ]
}
```

### Reference
[Power manager](https://crates.io/crates/tauri-plugin-power-manager)