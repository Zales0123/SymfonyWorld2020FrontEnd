<template>
  <div id="main">
    <div id="withlists" v-if="wishlists != null">
      <div class="wishlist" v-for="wishlist in wishlists" :key="wishlist.id">
        <h3>{{ wishlist.title }}</h3>
        <ol>
          <li v-for="product in wishlist.products" :key="product">
            <router-link :to="'/products/'+product.code">{{ product.translations[locale].name }}</router-link>
          </li>
        </ol>
        <button @click.stop.prevent="addToCart(wishlist.id)">Add to cart</button>
        <br/>
      </div>
    </div>
    <hr/>
    <div id="create-wishlist">
      <h3>New Wishlist</h3>
      <form method="post">
        <input type="name" ref="newWishlistName"/><br/>
        <button type="submit" @click.stop.prevent="createWishlist">Create</button>
      </form>
    </div>
  </div>
</template>

<script>
import router from "@/router";

const axios = require('axios');

export default {
  name: 'Wishlists',
  props: {
    locale: String
  },
  data() {
    return {
      wishlists: [
        {
          id: 1,
          title: "My Wishlists",
          products: [
            {
              code: "TEST_1",
              translations: {
                en_US: { name: "Test 1" }
              }
            },
            {
              code: "TEST_2",
              translations: {
                en_US: { name: "Test 2" }
              }
            }
          ]
        }
      ],
    }
  },
  methods: {
    addToCart(id) {
      var self = this;
      axios
        .post('PICKUP_CART_URL', {}, { headers: { accept: 'application/json', 'Content-Type': 'application/json' } })
        .then(function() {
          axios
            .patch(
              'UPDATE_CART_URL',
              { 'wishlist': id },
              { headers: { accept: 'application/json', 'Content-Type': 'application/merge-patch+json' } }
            )
            .then(function(response) {
              if (!self.$session.exists()) {
                self.$session.start();
              }
              self.$session.set('cart', response.data.tokenValue);

              router.push({ name: 'CartDetails', params: { id: response.data.tokenValue } })
            })
          ;
        })
    },
    createWishlist() {
      let headers = { Authorization: 'Bearer '+this.$session.get('token'), accept: 'application/json' };
      let name = this.$refs.newWishlistName.value;

      axios.post('CREATE_WISHLISTS_URL', {"title": name}, { headers: headers });
    }
  },
  mounted () {
    let headers = { Authorization: 'Bearer '+this.$session.get('token'), accept: 'application/json' };
    axios
      .get('WISHLISTS_URL', { headers: headers })
      .then((response) => {
        this.wishlists = response.data;
        this.wishlists.forEach(function (wishlist) {
          let products = [];
          wishlist.products.forEach(function () {
            axios
              .get('PRODUCT_DETAILS_URL', { headers: headers })
              .then((response) => products.push(response.data));
          });

          wishlist.products = products;
        })
      })
    ;
  }
}
</script>

<style scoped>
#main {
  margin: 0 auto;
  width: 80%;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#cart { width: 800px; margin: 0 auto; text-align: left; }
th, td { padding: 0.5rem; }
</style>
