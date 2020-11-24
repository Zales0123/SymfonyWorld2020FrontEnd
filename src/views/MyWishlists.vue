<template>
  <div id="app">
    <img alt="Sylius logo" src="../assets/logo.png">
    <Wishlists locale="en_US" />
  </div>
</template>

<script>
import Wishlists from '../components/Wishlists.vue'

export default {
  name: 'MyWishlists',
  components: {
    Wishlists
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
