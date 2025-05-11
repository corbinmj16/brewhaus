<script setup lang="ts">
import BreweryList from '@/components/BreweryList.vue'
import BrewerySearchBar from '@/components/BrewerySearchBar.vue'
import { LoaderCircle } from 'lucide-vue-next'
import { useBreweriesStore } from '@/stores/breweries'
import { storeToRefs } from 'pinia'
import { useBreweries } from '@/composables/useBreweries'

const { isLoading } = useBreweries()
const breweriesStore = useBreweriesStore()
const { allBreweries } = storeToRefs(breweriesStore)
</script>

<template>
  <section class="mt-10">
    <div class="flex flex-col justify-center text-center">
      <img alt="Brewhaus Logo" src="@/assets/logo.svg" class="size-18 mx-auto" />
      <p class="text-amber-500 font-bold text-4xl">Brewhaus</p>
    </div>

    <BrewerySearchBar />

    <div class="mt-4">
      <template v-if="isLoading">
        <LoaderCircle class="animate-spin text-amber-500" />
      </template>
      <template v-else-if="!allBreweries">
        <p class="text-zinc-500">No breweries found.</p>
      </template>
      <template v-else>
        <BreweryList />
      </template>
    </div>
  </section>
</template>

<!-- <div class="flex justify-center gap-4">
  <button
    type="button"
    @click="handlePreviousPage"
    class="bg-amber-500 hover:bg-amber-700 hover:cursor-pointer text-white rounded-full p-1.5"
  >
    <span class="sr-only">Previous Page</span>
    <ChevronLeft />
  </button>
  <button
    type="button"
    @click="handleNextPage"
    class="bg-amber-500 hover:bg-amber-700 hover:cursor-pointer text-white rounded-full p-1.5"
  >
    <span class="sr-only">Next Page</span>
    <ChevronRight />
  </button>
</div> -->
