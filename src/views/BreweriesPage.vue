<script setup lang="ts">
import BreweryList from '@/components/BreweryList.vue'
import BrewerySearchBar from '@/components/BrewerySearchBar.vue'
import { useBreweriesStore } from '@/stores/breweries'
import { storeToRefs } from 'pinia'

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
      <template v-if="!allBreweries">
        <p class="text-zinc-500">No breweries found.</p>
      </template>
      <template v-else>
        <BreweryList />
      </template>
    </div>
  </section>
</template>
