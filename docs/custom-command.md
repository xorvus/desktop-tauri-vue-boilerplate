## Custom Command
To custom command you can add new command in `src-tauri/src/command.rs` file.

```rust
#[command]
pub fn <FUCNTION_NAME>(app: AppHandle, params: string) {
    //logic
}
```

and register command in `src-tauri/src/lib.rs` file.

```rust
tauri::Builder::default()
    ...
    .invoke_handler(tauri::generate_handler![<FUCNTION_NAME>])
    ...
```

### Usage

```typescript
import {invoke} from "@tauri-apps/api/core";
invoke("<FUCNTION_NAME>", {params: "value"})
```

