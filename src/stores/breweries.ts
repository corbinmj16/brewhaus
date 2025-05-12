import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Brewery } from '@/types/Brewery'

export const useBreweriesStore = defineStore('breweries', () => {
  const allBreweries = ref<Brewery[]>([])
  const selectedBrewery = ref<Brewery | null>(null)

  function setAllBreweries(breweries: Brewery[]) {
    allBreweries.value.push(...breweries)
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
