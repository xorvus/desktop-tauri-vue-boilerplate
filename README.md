<h1 style="text-align: center">
Vue Desktop App Boilerplate 

<div style="display: flex; justify-content: center; gap: 20px; margin-top: 20px">
    <a href="https://tauri.app" alt="Tauri" target="_blank"> 
        <img src="/docs/assets/tauri.svg" style="width: 24px">
    </a>
    <a href="https://vite.dev" alt="Vite" target="_blank">
        <img src="/docs/assets/vite.svg" style="width: 24px">
    </a>
    <a href="https://vuejs.org" alt="Vue" target="_blank">
        <img src="/docs/assets/vue.svg" style="width: 24px">
    </a>
    <a href="https://www.typescriptlang.org" alt="Typescript" target="_blank">
        <img src="/docs/assets/ts.svg" style="width: 24px">
    </a>
</div>
</h1>

This desktop boilerplate is using tauri framework and vue 3 frontend view.
## Feature
* Auto Update
* Auto Startup
* Auto Fullscreen
* Status Network
* Logging
* File System
* ....more

## Getting Started
### Prerequisites
In order to get started building project first need to install a few dependencies:

* [System Dependencies](https://v2.tauri.app/start/prerequisites/#system-dependencies)
* [Rust](https://v2.tauri.app/start/prerequisites/#rust)
* [Node.js](https://nodejs.org/) (version >= 18.17.0)
* [Bun](https://bun.sh)
* Docker (Optional)

### 1. Clone the repository
```sh

```

### 2. Install dependencies
```sh
bun install
```
### 3. Copy the environment variables to .env and change the values
```sh
cp .env.example .env
```
### 4. Run the dev server
Run only server
```sh
bun dev
```
Run with desktop
```sh
bun tauri dev
```
### 5. Build desktop
```sh
bun tauri build
```

## Documentation

If you want more information about this project you should open [Documentation](docs/index.md)

