<template>
  <div id="cart">
    <h1>Your cart</h1><br/>
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart.items" :key="item.id">
          <td>{{ item.productName }}</td>
          <td>{{ item.quantity }}</td>
          <td><Price :amount="item.subtotal" /></td>
        </tr>
      </tbody>
    </table>
    <br/><br/><strong>Total:</strong> <Price currency="USD" :amount="cart.total" />
    <br/><br/><button v-on:click="clearCart">Clear cart</button>
  </div>
</template>

<script>
import Price from "@/components/Price";
import router from "@/router";

// const axios = require('axios');

export default {
  name: 'Cart',
  components: {
    Price
  },
  data() {
    return {
      cart: {
        total: 4000,
        items: [
          {
            id: 1,
            productName: "Test 1",
            quantity: 2,
            subtotal: 1050
          },
          {
            id: 2,
            productName: "Test 2",
            quantity: 1,
            subtotal: 2950
          }
        ]
      },
    }
  },
  props: {
    id: String,
    locale: String
  },
  mounted () {
    // axios
    //   .get('GET_CART_DETAILS_URL', { headers: { accept: 'application/json' } })
    //   .then((response) => { this.cart = response.data; })
    // ;
  },
  methods: {
    clearCart() {
      this.$session.remove('cart');
      router.push({ name: 'Home' })
    }
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

#cart { width: 800px; margin: 0 auto; text-align: left; }
th, td { padding: 0.5rem; }
</style>
