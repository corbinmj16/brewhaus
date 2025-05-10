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
      name: 'brewery-details',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/BreweryDetailPage.vue'),
    },
  ],
})

export default router
