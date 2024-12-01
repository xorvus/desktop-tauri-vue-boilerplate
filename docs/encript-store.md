## Encript Store

### Configuration
The Stronghold plugin offers a default hash function using the argon2 algorithm.
```bash
cd src-tauri
cargo add rust-argon2
```

Initilize stronghold in `src-tauri/src/lib.rs` file.
```rust
use tauri::Manager;

tauri::Builder::default()
    .setup(|app| {
        let salt_path = app
            .path()
            .app_local_data_dir()
            .expect("could not resolve app local data path")
            .join("salt.txt");
        app.handle().plugin(tauri_plugin_stronghold::Builder::with_argon2(&salt_path).build())?;
        Ok(())
    })

    .plugin(tauri_plugin_stronghold::Builder::new(|pass| todo!()).build()) // delete it
...

```
### Usage

###### src/App.vue
``` typescript

import SecretStore from "./utils/SecretStore.ts";

...
const ss = await SecretStore.init() // init store

await ss.setKey("key", "value") // set key
const data = await ss.getKey<string>("key") // get key   
await ss.save() // save store

```

Notes: For development, a regular store will be used because using stronghold will be slow. For more detail you can see the `/src/utils/SecretStore.ts` file.


### Permission
By default all potentially dangerous plugin commands and scopes are blocked and cannot be accessed. You must modify the permissions in your capabilities configuration to enable these.

###### src-tauri/capabilities/default.json
``` json
{
  "permissions": [
    ...
    "stronghold:default",
  ]
}
```

### Reference
[Stronghold](https://v2.tauri.app/plugin/stronghold/)