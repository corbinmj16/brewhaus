<script setup lang="ts">
import type { Brewery } from '@/types/Brewery'
import { useRouter } from 'vue-router'
import { useBreweriesStore } from '@/stores/breweries'

defineProps<{ brewery: Brewery }>()

const router = useRouter()
const breweriesStore = useBreweriesStore()

function handleSelectedBrewery(brewery: Brewery) {
  breweriesStore.setSelectedBrewery(brewery)
  router.push({
    name: 'brewery-detail',
    params: {
      id: brewery.id,
    },
  })
}
</script>

<template>
  <button
    @click="handleSelectedBrewery(brewery)"
    class="flex flex-col text-left group hover:text-amber-500 hover:cursor-pointer"
  >
    <p class="text-lg font-medium">{{ brewery.name }}</p>
    <span class="text-zinc-400 text-sm group-hover:text-amber-500">
      {{ brewery.city }}, {{ brewery.state }}
    </span>
  </button>
</template>
