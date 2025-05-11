<script setup lang="ts">
import BrewerySearchBar from '@/components/BrewerySearchBar.vue'
import { LoaderCircle, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { useBreweries } from '@/composables/useBreweries'
import { useBreweriesStore } from '@/stores/breweries'
import { storeToRefs } from 'pinia'
import BreweryListResult from '@/components/BreweryListResult.vue'

const { isLoading, handleNextPage, handlePreviousPage } = useBreweries()
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
        <div class="flex justify-center gap-4">
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
        </div>

        <ul class="flex flex-col gap-2">
          <li v-for="brewery in allBreweries" :key="brewery.id">
            <BreweryListResult :brewery="brewery" />
          </li>
        </ul>
      </template>
    </div>
  </section>
</template>
