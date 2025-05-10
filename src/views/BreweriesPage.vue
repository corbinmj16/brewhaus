<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Brewery } from '@/types/brewery'
import { LoaderCircle, ChevronLeft, ChevronRight } from 'lucide-vue-next'

const isLoading = ref(false)
const breweries = ref<Brewery[] | null>(null)
const currentPage = ref(1)

async function getBreweries() {
  try {
    isLoading.value = true

    const response = await fetch(
      `https://api.openbrewerydb.org/v1/breweries?page=${currentPage.value}&per_page=5`,
    )
    const data: Brewery[] = await response.json()
    breweries.value = data
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
</script>

<template>
  <section>
    <h1 class="text-3xl font-bold">Find a brewery near you</h1>
    <p class="text-zinc-500">Search by: name, city, or type.</p>

    <div class="flex justify-between mt-4">
      <input
        type="text"
        placeholder="Search..."
        class="border border-zinc-200 rounded-full p-2 w-full"
      />
      <button class="bg-amber-500 text-white rounded-full px-4 py-2 ml-4">Search</button>
    </div>

    <div class="mt-4">
      <template v-if="isLoading">
        <LoaderCircle class="animate-spin text-amber-500" />
      </template>
      <template v-else-if="!breweries">
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
        <ul class="min-h-[400px]">
          <li v-for="brewery in breweries" :key="brewery.id">
            <RouterLink :to="{ name: 'brewery-details', params: { id: brewery.id } }">
              {{ brewery.name }} - {{ brewery.city }}, {{ brewery.state }}
            </RouterLink>
          </li>
        </ul>
      </template>
    </div>
  </section>
</template>
