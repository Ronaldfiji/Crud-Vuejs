import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactManager from '../views/ContactManager.vue'
import AddContact from '../views/AddContact.vue'
import EditContact from '../views/EditContact.vue'
import ViewContact from '../views/ViewContact.vue'
import PageNotFound from '../views/PageNotFound.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/contact',
    component: HomeView,
    
  },
  {
    path: '/contact',
    name: 'ContactManager',    
    component: ContactManager,
  },
  {
    path: '/contact/add',
    name: 'AddContact',    
    component: AddContact,
  },
  {
    path: '/contact/edit/:contactid',
    name: 'EditContact',    
    component: EditContact,
  },
  {
    path: '/contact/view/:contactid',
    name: 'ViewContact',    
    component: ViewContact,
  },{
   path: '/:pathMatch(.*)*',
   name: 'PageNotFound',    
   component: PageNotFound,
 },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
