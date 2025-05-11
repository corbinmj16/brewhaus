import { createRouter, createWebHistory } from 'vue-router'
import BreweriesPage from '../views/BreweriesPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BreweriesPage,
    },
    {
      path: '/brewery/:id',
      name: 'brewery-detail',
      component: () => import('../views/BreweryDetailPage.vue'),
    },
  ],
})

export default router
