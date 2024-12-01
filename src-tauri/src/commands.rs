use once_cell::sync::Lazy;
use std::sync::Mutex;
use std::time::Duration;
use tauri::{command, AppHandle, Emitter};
use tokio::{process::Command, time::sleep};

#[command]
pub fn get_version(app: AppHandle) -> String {
    app.package_info().version.to_string()
}

#[command]
pub async fn devtools(app: AppHandle, open: bool) {
    use tauri::Manager;
    let window = app.get_webview_window("main").unwrap();
    if open {
        window.open_devtools();
    } else {
        window.close_devtools();
    }
}

static IS_RUNNING: Lazy<Mutex<bool>> = Lazy::new(|| Mutex::new(false));

#[command]
pub async fn check_connection(app: AppHandle, domain: String) {
    let is_running = *IS_RUNNING.lock().unwrap();
    if !is_running {
        *IS_RUNNING.lock().unwrap() = true;
        let mut status = false;
        ping(app, domain, &mut status).await;
    }
}

async fn ping(app: AppHandle, domain: String, status: &mut bool) {
    match Command::new("ping")
        .args(["-c", "1", &domain])
        .output()
        .await
    {
        Ok(output) => {
            let success = output.status.success();
            if output.status.code() != Some(1) && *status != success {
                *status = success;
                app.emit("listen_network", success).unwrap();
            }
        }
        Err(e) => {
            eprintln!("Error: {}", e);
            if *status != false {
                *status = false;
                app.emit("listen-network", false).unwrap();
            }
        }
    }

    sleep(Duration::from_secs(1)).await;
    Box::pin(ping(app, domain, status)).await;
}

#[command]
pub fn get_environment_variable(key: &str) -> String {
    std::env::var(key).unwrap_or_else(|_| "".to_string())
}
