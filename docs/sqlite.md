## SQLite

### Usage
###### src/App.vue
```typescript
const db = await Database.init("test.db");

//insert
await db.execute(
    "INSERT into users (name) VALUES ($1)",
    [name.value],
);

//select
const users = await db.select("SELECT * FROM users");
console.log(users);
```


### Migration
You can open file `src-tauri/src/migrations.rs` and add the following code:
```rust
    let migrations = vec![
        Migration {
            version: 1,
            description: "create_initial_tables",
            sql: "CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);",
            kind: MigrationKind::Up,
        }
    ];
```
and add config in `src-tauri/src/lib.rs`:
```rust
mod migrations;

...
.plugin(tauri_plugin_sql::Builder::new()
    .add_migrations("sqlite:test.db", migrations::get_migrations())
    .build())
```

### Apply migration

```json
{
  "plugins": {
    "sql": {
      "preload": ["sqlite:test.db"]
    }
  }
}
```

### Permission
By default all potentially dangerous plugin commands and scopes are blocked and cannot be accessed. You must modify the permissions in your capabilities configuration to enable these.


###### src-tauri/capabilities/default.json
```json
{
  "permissions": [
    ...
    "sql:default",
    "sql:allow-execute",
  ]
}
```
### Reference
[SQL](https://v2.tauri.app/plugin/sql/)

