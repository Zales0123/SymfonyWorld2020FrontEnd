<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
<!--      <router-link v-if="this.$session && this.$session.get('cart') != null" :to="'/cart/'+this.$session.get('cart')">Cart</router-link>-->
      <router-link :to="'/cart/'+this.$session.get('cart')">Cart</router-link>
<!--      <router-link v-if="this.$session && this.$session.get('token') != null" :to="'/wishlists/'">Wishlists</router-link>-->
      <router-link :to="'/wishlists/'">Wishlists</router-link>
    </div>
    <router-view/>
  </div>
</template>

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

#nav a {
  color: #42b983;
  margin: 0 0.5em;
}
</style>
