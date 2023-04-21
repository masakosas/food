import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/HomePage.vue'
import RestsPage from '../pages/RestsPage.vue' 


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
    }, 
    {
      path: '/home/:id',
      name: 'rests',
      component: RestsPage,
      props: true
    }


    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
