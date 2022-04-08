import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) return savedPosition
    return { top: 0, left: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/storyteller',
      name: 'storyteller',
      component: () => import('../views/StorytellerView.vue'),
    },
    {
      path: '/new-game',
      name: 'newGame',
      component: () => import('../views/NewGameView.vue'),
    },
    {
      path: '/distribute-roles',
      name: 'distributeRoles',
      component: () => import('../views/DistributeRolesView.vue'),
    },
    {
      path: '/player',
      name: 'player',
      component: () => import('../views/PlayerView.vue'),
    },
  ],
})

export default router
