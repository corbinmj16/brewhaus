import { ref, onMounted } from 'vue'
import type { Brewery } from '@/types/Brewery'
import { useBreweriesStore } from '@/stores/breweries'

export function useBreweries() {
  const isLoading = ref(false)
  const currentPage = ref(1)
  const breweriesStore = useBreweriesStore()

  async function getBreweries() {
    try {
      isLoading.value = true

      const response = await fetch(
        `https://api.openbrewerydb.org/v1/breweries?page=${currentPage.value}&per_page=25`,
      )
      const data: Brewery[] = await response.json()

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

  function handlePreviousPage() {
    if (currentPage.value <= 1) return
    currentPage.value -= 1
    getBreweries()
  }

  onMounted(() => {
    getBreweries()
  })

  return {
    isLoading,
    currentPage,
    handlePreviousPage,
    handleNextPage,
  }
}
