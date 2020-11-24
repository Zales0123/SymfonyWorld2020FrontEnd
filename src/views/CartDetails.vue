<template>
  <div id="app">
    <img alt="Sylius logo" src="../assets/logo.png">
    <Cart :id="$route.params.id" locale="en_US" />
  </div>
</template>

<script>
import Cart from '../components/Cart.vue'

export default {
  name: 'CartDetails',
  components: {
    Cart
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
