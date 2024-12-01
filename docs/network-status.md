## Network Status Check

### Configuration
This use library `tokio` for asynchronous runtime. 

To add tokio:

```bash 
cargo add tokio
```

###### src-tauri/Cargo.toml
```toml
...
tokio = { version = "1.41.1", features = ["process", "time"] }
...
```

Update dependency rust:
```bash 
cargo build
```

### Usage

###### src/App.vue
```typescript
import {invoke} from "@tauri-apps/api/core";
import {listen} from "@tauri-apps/api/event";

invoke("check_connection", { domain: "8.8.8.8" }).then() //trigger to activate check connection

// get status network if change
listen('listen_network', (event) => { 
    console.log('Received event:', event.payload);
});
```

### Advanced
You can change logic check connection internet in `src-tauri/src/command.rs` file.

