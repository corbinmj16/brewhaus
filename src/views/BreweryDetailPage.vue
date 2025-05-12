<script setup lang="ts">
import { LoaderCircle } from 'lucide-vue-next'
import HeaderNavigation from '@/components/HeaderNavigation.vue'
import { useBreweriesStore } from '@/stores/breweries'
import { useBreweriesApi } from '@/composables/useBreweriesApi'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'

const { isLoading, getBreweryById } = useBreweriesApi()
const breweriesStore = useBreweriesStore()
const { selectedBrewery } = storeToRefs(breweriesStore)
const route = useRoute()
const { id } = route.params

onMounted(async () => {
  // Check if the selected brewery is already set - if not, fetch it
  if (!selectedBrewery.value) {
    await getBreweryById(id as string)
  }
})
</script>

<template>
  <HeaderNavigation />

  <template v-if="!selectedBrewery && !isLoading">
    <p class="text-zinc-500">No brewery selected.</p>

    <RouterLink to="/" class="text-amber-500 hover:text-amber-700"> Find a brewery </RouterLink>
  </template>

  <template v-if="!selectedBrewery && isLoading">
    <LoaderCircle class="animate-spin text-amber-500" />
  </template>

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
