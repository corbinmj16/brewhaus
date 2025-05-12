import { ref } from 'vue'
import type { Brewery } from '@/types/Brewery'
import { useBreweriesStore } from '@/stores/breweries'

export function useBreweriesApi() {
  const isLoading = ref(false)
  const currentPage = ref(1)
  const stopFetching = ref(false)
  const breweriesStore = useBreweriesStore()
  const perPage = ref(25)

  async function getBreweries() {
    try {
      if (stopFetching.value) return

      isLoading.value = true

      const response = await fetch(
        `http://localhost:9000/api/breweries?page=${currentPage.value}&per_page=${perPage.value}`,
      )
      const data: Brewery[] = await response.json()

      // If the length of the data is less than perPage, we know we're done
      if (data.length < perPage.value) {
        stopFetching.value = true
      }

      breweriesStore.setAllBreweries(data)
    } catch (error) {
      console.error('Error fetching breweries:', error)
    } finally {
      isLoading.value = false
    }
  }

  function handleNextPage() {
    currentPage.value += 1
    getBreweries()
  }

  async function getBreweryById(id: string) {
    try {
      isLoading.value = true
      const response = await fetch(`http://localhost:9000/api/breweries/${id}`)
      const data = await response.json()

      breweriesStore.setSelectedBrewery(data)
    } catch (error) {
      console.error('Error fetching brewery:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    currentPage,
    stopFetching,
    getBreweries,
    getBreweryById,
    handleNextPage,
  }
}
