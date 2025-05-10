<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header class="max-w-6xl mx-auto px-4 mt-4 mb-10">
    <div class="flex justify-between bg-white p-4 shadow-sm rounded-full">
      <div class="flex items-center gap-2">
        <img alt="Brewhaus Logo" src="@/assets/logo.svg" class="size-8" />
        <p class="text-amber-500 font-bold text-lg">Brewhaus</p>
      </div>
    </div>
  </header>

  <main class="max-w-6xl mx-auto px-4">
    <RouterView />
  </main>
</template>
