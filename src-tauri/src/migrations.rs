use tauri_plugin_sql::{Migration, MigrationKind};


pub fn get_migrations() -> Vec<Migration> {
    let migrations = vec![
        Migration {
            version: 1,
            description: "create_initial_tables",
            sql: "CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);",
            kind: MigrationKind::Up,
        }
    ];
    migrations
}