<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const breweryId = route.params.id
</script>

<template>
  <h1>{{ breweryId }}</h1>
</template>
