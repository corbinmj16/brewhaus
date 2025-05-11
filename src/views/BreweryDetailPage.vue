<script setup lang="ts">
import { LoaderCircle } from 'lucide-vue-next'
import HeaderNavigation from '@/components/HeaderNavigation.vue'
import { useBreweriesStore } from '@/stores/breweries'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'

const breweriesStore = useBreweriesStore()
const { selectedBrewery } = storeToRefs(breweriesStore)
const route = useRoute()
const { id } = route.params
const isLoading = ref(true)

onMounted(async () => {
  // Check if the selected brewery is already set - if not, fetch it
  if (!selectedBrewery.value) {
    try {
      const response = await fetch(`https://localhost:9000/api/breweries/${id}`)
      const data = await response.json()
      breweriesStore.setSelectedBrewery(data)
    } catch (error) {
      console.error('Error fetching brewery:', error)
    } finally {
      isLoading.value = false
    }
  } else {
    isLoading.value = false
  }
})
</script>

<template>
  <HeaderNavigation />

  <section v-if="!selectedBrewery && !isLoading">
    <p class="text-zinc-500">No brewery selected.</p>

    <RouterLink to="/" class="text-amber-500 hover:text-amber-700"> Find a brewery </RouterLink>
  </section>

  <section v-if="!selectedBrewery && isLoading">
    <LoaderCircle class="animate-spin text-amber-500" />
  </section>

  <section v-if="selectedBrewery">
    <h1 class="text-3xl font-bold">{{ selectedBrewery.name }}</h1>
    <p>{{ selectedBrewery.city }}, {{ selectedBrewery.state }}</p>
    <p>{{ selectedBrewery.street }}</p>
    <p>{{ selectedBrewery.phone }}</p>
    <a
      :href="selectedBrewery.website_url"
      target="_blank"
      class="text-amber-500 hover:text-amber-700"
    >
      {{ selectedBrewery.website_url }}
    </a>
  </section>
</template>
