## Logging
This logging is using the `tauri` framework and `log` crate. The log will be saved in the `log` folder in the root project.

### Configuration

###### src-tauri/src/lib.rs

```rust
....
 .plugin(tauri_plugin_log::Builder::new()
            .format(|out, message, record| {
                let format = time::format_description::parse(
                    "[[[year]-[month]-[day]][[[hour]:[minute]:[second]]",
                ).unwrap();
                
                let now = tauri_plugin_log::TimezoneStrategy::UseLocal
                    .get_now()
                    .format(&format)
                    .unwrap();
                out.finish(format_args!("{}[{}] {}", now, record.level(), message))
            })
            .max_file_size(20 * 1_000_000 /* 20MB */)
            .rotation_strategy(tauri_plugin_log::RotationStrategy::KeepOne)
            .build())
....
```


### Usage

To use the log you can see code in the `src/utils/Logger.ts` file.

```typescript
// example
import Logger from "../../utils/Logger.ts";

Logger.info("This is info log");
Logger.error("This is error log");
Logger.warn("This is warn log");
Logger.debug("This is debug log");

```

### Permissions
by default, all plugin commands are blocked and cannot be accessed. You must define a list of permissions in your capabilities configuration.

###### src-tauri/capabilities/default.json
``` json

{
  "permissions": [
    ...
    "log:default"
  ]
}
```

### Location Log File

Linux: `~/.local/share/<IDENTIFIER_APP>/logs`



### Reference
[Logging](https://v2.tauri.app/plugin/logging/)
