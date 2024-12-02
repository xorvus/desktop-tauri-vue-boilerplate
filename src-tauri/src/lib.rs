mod commands;
mod migrations;

use tauri::Manager;
use tauri_plugin_autostart::MacosLauncher;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::new()
            .add_migrations("sqlite:test.db", migrations::get_migrations())
            .build())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .setup(|app| {
            let salt_path = app
                .path()
                .app_local_data_dir()
                .expect("could not resolve app local data path")
                .join("salt.txt");

            println!("salt path: {:?}", salt_path);
            app.handle()
                .plugin(tauri_plugin_stronghold::Builder::with_argon2(&salt_path).build())?;
            Ok(())
        })
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_power_manager::init())
        .plugin(
            tauri_plugin_log::Builder::new()
                .format(|out, message, record| {
                    let format = time::format_description::parse(
                        "[[[year]-[month]-[day]][[[hour]:[minute]:[second]]",
                    )
                    .unwrap();

                    let now = tauri_plugin_log::TimezoneStrategy::UseLocal
                        .get_now()
                        .format(&format)
                        .unwrap();
                    out.finish(format_args!("{}[{}] {}", now, record.level(), message))
                })
                .max_file_size(20 * 1_000_000 /* 20MB */)
                .rotation_strategy(tauri_plugin_log::RotationStrategy::KeepOne)
                .build(),
        )
        .plugin(tauri_plugin_autostart::init(
            MacosLauncher::LaunchAgent,
            Some(vec!["--flag1", "--flag2"]),
        ))
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            commands::get_version,
            commands::check_connection,
            commands::devtools,
            commands::is_dev
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
