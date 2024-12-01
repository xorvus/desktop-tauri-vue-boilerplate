<script setup lang="ts">
import SettingLayout from "./layouts/settings/SettingLayout.vue";
import {getCurrentWindow, LogicalPosition} from "@tauri-apps/api/window";
import {shutdown, reboot} from "tauri-plugin-power-manager-api";
import {invoke} from "@tauri-apps/api/core";
import {onMounted, ref} from "vue";
import {listen} from "@tauri-apps/api/event";
import {Menu} from "@tauri-apps/api/menu/menu";
import {PhysicalPosition} from "@tauri-apps/api/dpi";
import SecretStore from "./utils/SecretStore.ts";
import Logger from "./utils/Logger.ts";

let status = ref(true)
let openDevtools = ref(false)

window.addEventListener("keydown", async (e) => {
  if(e.key == "F11"){
    const window = getCurrentWindow();
    await window.setFullscreen(!await window.isFullscreen());
  }
})

const shutdownPC = async () => {
  await shutdown();
}

const restartPC = async () => {
  await reboot();
}

const refresh = () => {
  window.location.reload();
}

listen('listen_network', (event) => {
  status.value = Boolean(event.payload);
});


const toggleDevtools = () => {
  if(openDevtools.value){
    openDevtools.value = false
    invoke("devtools", { open: false })
  }else {
    openDevtools.value = true
    invoke("devtools", { open: true })
  }
}


document.addEventListener('contextmenu', async (event) => {
  if(window.__TAURI_INTERNALS__){
    event.preventDefault(); // Prevent the default browser context menu
    const window = getCurrentWindow();
    const items: any = [
      { id: "reload", text: "Reload", action: () => refresh() },
      { item: "Separator" },
      { id: "version", enabled: false, text: `Version: ${await invoke("get_version")}` },
    ];

    if(import.meta.env.VITE_ENVIRONMENT == "development"){
      items.push({ id: "devtools", text: "Toggle Devtools", action: () => toggleDevtools() })
    }

    const menu = await Menu.new({
      items: items
    });
    menu.popup(new LogicalPosition(event.screenX,event.screenY), window).then()
  }

});

onMounted(async () => {
  invoke("check_connection", { domain: "8.8.8.8" }).then()

  const ss = await SecretStore.init()
  await ss.setKey("test", "test")
  const data = await ss.getKey<string>("test")
  Logger.info(data)
  await ss.save()
})

</script>

<template>
  <main>
    <SettingLayout />
    <div class="flex gap-5 items-center justify-center mt-5">
      <button @click="shutdownPC" class="bg-red-500 text-white px-5 py-2 rounded">Shutdown</button>
      <button @click="refresh" class="bg-blue-500 text-white px-5 py-2 rounded">Refresh</button>
      <button @click="restartPC" class="bg-orange-500 text-white px-5 py-2 rounded">Restart</button>
    </div>
    <div class="text-center mt-6">Status: <span>{{status ? "Online": "Offline"}}</span></div>
    <div class="flex justify-center">
      <button @click="toggleDevtools" class="bg-blue-500 text-white px-5 py-2 rounded">Toggle Devtools</button>
    </div>
  </main>
</template>
