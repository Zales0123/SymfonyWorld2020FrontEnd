<template>
  <div>
    <h1>Products</h1>
    <div id="products">
      <div v-for="product in products" :key="product.code">
        <router-link :to="'/products/'+product.code">{{ product.translations[locale].name }}</router-link>
        <br/>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  name: 'Products',
  data() {
    return {
      products: [
        {
          code: "TEST1",
          translations: {
            en_US: { name: "Test 1" }
          }
        },
        {
          code: "TEST2",
          translations: {
            en_US: { name: "Test 2" }
          }
        }
      ]
    }
  },
  props: {
    count: Number,
    locale: String
  },
  mounted () {
    axios
      .get(
          'GET_PRODUCT_ENDPOINT',
          { headers: { accept: 'application/json' } }
        )
      .then(response => ( console.log(response.data) ))
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#products { width: 800px; margin: 0 auto; text-align: left; }
</style>
