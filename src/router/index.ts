import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },

  {
    path: '/usuario-list',
    name: 'usuario-list',
    component: () => import('../views/usuario/usuario-list.vue')

  },

  {
    path: '/cadastrousuario',
    name: 'cadastrousuario',
    component: () => import('../views/usuario/cadastrar-usuario.vue')

  },

  {
    path: '/usuario-cadastrar/:model/:id',
    name: 'usuario-detalhar',
    props: (router) => ({ id: router.params.id, model: router.params.model }),
    component: () => import('../views/usuario/cadastrar-usuario.vue')
  }

  /*{
    path: '/usuario-cadastrar/:model/:id',
    name: 'usuario-editar',
    props: (router) => ({ id: router.params.id, model: router.params.model }),
    component: () => import('../views/usuario/cadastrar-usuario.vue')
  }*/

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router