<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import Settings from "./Settings.ts";
const setting = ref(new Settings());

onMounted(async () => {
  setting.value = await Settings.init()
});

//Auto start
const autoStart = computed({
  get: () => setting.value.getAutoStart(),
  set: (value: boolean) => setting.value.setAutoStart(value)
});

//Full screen mode
const fullscreen = computed({
  get: () => setting.value.getFullScreen(),
  set: (value: boolean) => setting.value.setFullScreen(value)
});

//system tray
const systray = computed({
  get: () => setting.value.getTray(),
  set: (value: boolean) => setting.value.setTray(value)
});

</script>

<template>
  <div class="relative p-5">
    <div class="flex mb-10 flex-col gap-2 justify-center items-center">
      <h2 class="text-2xl font-bold">Settings</h2>
      <div class="flex flex-col">
        <label for="autostart" class="cursor-pointer">
          <input class="me-2 cursor-pointer" id="autostart" type="checkbox" v-model="autoStart" name="auto-start" />
          <span>Auto start</span>
        </label>

        <label for="fullscreen" class="cursor-pointer">
          <input class="me-2 cursor-pointer" id="fullscreen" type="checkbox" v-model="fullscreen" name="auto-start" />
          <span>Fullscreen</span>
        </label>

        <label for="systray" class="cursor-pointer">
          <input class="me-2 cursor-pointer" id="systray" type="checkbox" v-model="systray" name="auto-start" />
          <span>System Tray</span>
        </label>
      </div>


      <button class="w-auto bg-black text-white px-12 py-2 rounded-md" @click="setting.save()">Save</button>
    </div>

    <span class="absolute bottom-0 left-1/2 -translate-x-1/2 text-black">Version: {{setting.getVersion()}}</span>
  </div>
</template>