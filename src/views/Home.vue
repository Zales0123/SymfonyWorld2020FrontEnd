<template>
  <div id="app">
    <LoginForm />
    <img alt="Sylius logo" src="../assets/logo.png">
    <Products :count="20" locale="en_US" />
  </div>
</template>

<script>
import Products from '../components/Products.vue'
import LoginForm from '../components/LoginForm.vue'

export default {
  name: 'Home',
  components: {
    Products,
    LoginForm
  },
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
