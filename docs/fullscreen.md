## Fullscreen

Automatically launch application when the system startup.

### Usage

###### src/layouts/settings/Settings.ts
```typescript
import { getCurrentWindow } from "@tauri-apps/api/window";

await getCurrentWindow().setFullscreen(true);
await getCurrentWindow().isFullscreen();

```

### Permissions
To use fullscreen mode, you need to add the following permission to the capabilities configuration.

###### src-tauri/capabilities/default.json
``` json
{
  "permissions": [
    ...,
    "core:window:allow-set-fullscreen",
    "core:window:allow-is-fullscreen"
  ]
}
```

### Reference
[Fullscreen](https://tauri.app/reference/javascript/api/namespacewindow/#setfullscreen)