<script setup lang="ts">
import SettingLayout from "./layouts/settings/SettingLayout.vue";
import {getCurrentWindow, LogicalPosition} from "@tauri-apps/api/window";
import {reboot, shutdown} from "tauri-plugin-power-manager-api";
import {invoke} from "@tauri-apps/api/core";
import {computed, onMounted, ref} from "vue";
import {listen} from "@tauri-apps/api/event";
import {Menu} from "@tauri-apps/api/menu/menu";
import SecretStore from "./utils/SecretStore.ts";
import Logger from "./utils/Logger.ts";
import {check} from "@tauri-apps/plugin-updater";
import {relaunch} from "@tauri-apps/plugin-process";
import Database from "./utils/Database.ts";
let status = ref(true)
let openDevtools = ref(false)
let name = ref("")
const users = ref([]);

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

const savetoDB = async () => {
  if(!name.value) return
  const db = await Database.init("test.db");
  await db.execute(
      "INSERT into users (name) VALUES ($1)",
      [name.value],
  );

  name.value = ''
  await fetchUser()
}

const fetchUser = async () => {
  const db = await Database.init("test.db");
  users.value = await db.select("SELECT * FROM users");
}

const deleteUser = async (id: number) => {
  const db = await Database.init("test.db");
  await db.execute(
      "DELETE FROM users WHERE id = $1",
      [id],
  );
  await fetchUser()
}

document.addEventListener('contextmenu', async (event) => {
  if(window.__TAURI_INTERNALS__){
    event.preventDefault(); // Prevent the default browser context menu
    const w = getCurrentWindow();
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

    const position = await invoke("is_dev")
        ? new LogicalPosition(event.screenX, event.screenY)
        : new LogicalPosition(event.x, event.y);

    await menu.popup(position, w);

  }
});

const checkUpdate = async () => {
  const update = await check({
    headers: {
      Authorization: "Bearer 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",
      Accept: "application/octet-stream"
    }
  });

  if (update) {
    console.log(
        `found update ${update.version} from ${update.date} with notes ${update.body}`
    );
    let downloaded = 0;
    let contentLength = 0;
    // alternatively we could also call update.download() and update.install() separately
    await update.downloadAndInstall((event) => {
      switch (event.event) {
        case 'Started':
          contentLength = event.data.contentLength;
          console.log(`started downloading ${event.data.contentLength} bytes`);
          break;
        case 'Progress':
          downloaded += event.data.chunkLength;
          console.log(`downloaded ${downloaded} from ${contentLength}`);
          break;
        case 'Finished':
          console.log('download finished');
          break;
      }
    });

    console.log('update installed');
    await relaunch();
  }
}


onMounted(async () => {
  invoke("check_connection", { domain: "8.8.8.8" }).then()

  const ss = await SecretStore.init()
  await ss.setKey("test", "test")
  const data = await ss.getKey<string>("test")
  Logger.info(data)
  await ss.save()

  await fetchUser()
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
    <div class="flex justify-center gap-2">
      <button @click="toggleDevtools" class="bg-blue-500 text-white px-5 py-2 rounded">Toggle Devtools</button>

      <button @click="checkUpdate" class="bg-black text-white px-5 py-2 rounded">Check Update</button>
    </div>

    <div class="flex flex-col items-center mt-6">
      <h1 class="font-black">SQLite</h1>
      <input type="text" v-model="name" placeholder="name" class="border rounded p-2 my-2 border-black"/>
      <button  @click="savetoDB" class="bg-green-500 text-white px-5 py-2 rounded">Save</button>

      <table>
        <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <tr class="border" v-for="user in users">
          <td class="border p-2">{{user.id}}</td>
          <td class="border p-2">{{user.name}}</td>
          <td class="border p-2"><button @click="deleteUser(user.id)" class="bg-red-500 text-white px-3 py-1 m-2 rounded">Delete</button></td>
        </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>
