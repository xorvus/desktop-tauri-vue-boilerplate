## Devtools

### Configuration

To enable the devtools in production builds, you must enable the devtools Cargo feature in the `src-tauri/Cargo.toml` file:

```toml
tauri = { version = "...", features = ["...", "devtools"] }
```

### Usage
###### src/App.vue
```typescript
import {invoke} from "@tauri-apps/api/core";

invoke("devtools", { open: true }) //open devtools
invoke("devtools", { open: false }) //close devtools
```

### Advanced
You can change logic show devtools in `src-tauri/src/command.rs` file.

### Reference

[Devtools](https://tauri.app/develop/debug/#webview-console)