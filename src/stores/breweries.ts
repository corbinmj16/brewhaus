import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Brewery } from '@/types/Brewery'

export const useBreweriesStore = defineStore('breweries', () => {
  const allBreweries = ref<Brewery[] | null>(null)
  const selectedBrewery = ref<Brewery | null>(null)

  function setAllBreweries(breweries: Brewery[]) {
    allBreweries.value = breweries
  }

  function setSelectedBrewery(brewery: Brewery) {
    selectedBrewery.value = brewery
  }

  return {
    allBreweries,
    selectedBrewery,
    setAllBreweries,
    setSelectedBrewery,
  }
})
