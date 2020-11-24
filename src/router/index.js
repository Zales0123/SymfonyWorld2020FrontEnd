import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ProductDetails from '../views/ProductDetails.vue'
import CartDetails from '../views/CartDetails.vue'
import MyWishlists from '../views/MyWishlists.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products/:id',
    name: 'ProductDetails',
    component: ProductDetails
  },
  {
    path: '/cart/:id',
    name: 'CartDetails',
    component: CartDetails
  },
  {
    path: '/wishlists/',
    name: 'MyWishlists',
    component: MyWishlists
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
