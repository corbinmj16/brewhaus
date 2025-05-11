<script setup lang="ts">
import type { Brewery } from '@/types/Brewery'
import { ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { Search, X } from 'lucide-vue-next'
import BreweryListResult from '@/components/BreweryListResult.vue'

const query = ref<string>('')
const results = ref<Brewery[]>([])

async function search() {
  try {
    // const response = await fetch(`http://localhost:9000/api/breweries/search?q=${query.value}`)
    const response = await fetch(
      `https://api.openbrewerydb.org/v1/breweries/search?query=${query.value}`,
    )
    const data: Brewery[] | null = await response.json()
    results.value = data || []
  } catch (error) {
    console.error('Error fetching breweries:', error)
  }
}

const throttledSearch = useDebounceFn(() => {
  search()
}, 275)
</script>

<template>
  <div class="max-w-lg mx-auto mt-4">
    <h1 class="text-lg font-medium mb-1">Find your next brewery</h1>

    <section class="flex justify-between relative mx-auto">
      <label for="search" class="border border-zinc-200 rounded-full p-2 pl-10 w-full relative">
        <div class="absolute left-2 top-1/2 transform -translate-y-1/2 text-zinc-400">
          <Search />
          <span class="sr-only">Search</span>
        </div>
        <input
          id="search"
          type="text"
          placeholder="Search..."
          class="w-full outline-none border-none"
          v-model="query"
          @keyup="throttledSearch"
        />
        <div class="absolute right-2 top-1/2 transform -translate-y-1/2 text-zinc-400">
          <button
            v-if="query"
            class="flex items-center justify-center hover:cursor-pointer text-amber-500 hover:text-amber-700"
            type="button"
            @click="query = ''"
          >
            <span class="sr-only">Clear Search</span>
            <X />
          </button>
        </div>
      </label>

      <div
        v-if="query && results.length > 0"
        class="absolute top-11 left-0 bg-white border border-zinc-200 rounded-2xl shadow-lg w-full max-h-56 overflow-y-scroll"
      >
        <ul>
          <li v-for="result in results" :key="result.id" class="p-2">
            <BreweryListResult :brewery="result" />
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
