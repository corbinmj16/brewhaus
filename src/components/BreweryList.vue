<script setup lang="ts">
import BreweryListResult from '@/components/BreweryListResult.vue'
import { useBreweriesStore } from '@/stores/breweries'
import { storeToRefs } from 'pinia'

const breweriesStore = useBreweriesStore()
const { allBreweries } = storeToRefs(breweriesStore)
</script>

<template>
  <ul class="flex flex-col gap-2">
    <li v-for="brewery in allBreweries" :key="brewery.id">
      <BreweryListResult :brewery="brewery" />
    </li>
    <li ref=""></li>
  </ul>
</template>
