<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import { storeToRefs } from 'pinia'
import { LoaderCircle } from 'lucide-vue-next'
import { useIntersectionObserver } from '@vueuse/core'
import { useBreweriesStore } from '@/stores/breweries'
import { useBreweriesApi } from '@/composables/useBreweriesApi'
import BreweryListResult from '@/components/BreweryListResult.vue'

const { isLoading, stopFetching, getBreweries, handleNextPage } = useBreweriesApi()
const breweriesStore = useBreweriesStore()
const { allBreweries } = storeToRefs(breweriesStore)
const infiniteScrollIndicator = useTemplateRef<HTMLElement>('infiniteScrollIndicator')

const { stop } = useIntersectionObserver(infiniteScrollIndicator, ([entry]) => {
  // Check to see if we've reached the end of the data
  if (stopFetching.value) {
    stop()
    return
  }

  // Check if our `infiniteScrollIndicator` is in view
  if (entry.isIntersecting) {
    handleNextPage()
  }
})

onMounted(() => {
  getBreweries()
})
</script>

<template>
  <template v-if="isLoading && allBreweries.length <= 0">
    <LoaderCircle class="animate-spin text-amber-500 mx-auto" />
  </template>
  <ul class="flex flex-col gap-4 min-h-svh">
    <li v-for="brewery in allBreweries" :key="brewery.id">
      <BreweryListResult :brewery="brewery" />
    </li>
  </ul>
  <LoaderCircle
    v-if="isLoading && allBreweries.length > 0"
    class="animate-spin text-amber-500 mx-auto"
  />
  <span ref="infiniteScrollIndicator"></span>
</template>
