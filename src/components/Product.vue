<template>
  <div id="product">
    <h1>{{ product.translations[locale].name }}</h1>
    <img :src="product.images[0].path" alt=""/>
    <form ref="addToCartForm">
      <select id="variants" ref="variant" v-if="this.variants.length > 1">
        <option v-for="variant in this.variants" :key="variant.code" :value="variant.code">
          {{ variant.translations[locale].name }} <Price :amount="variant.channelPricings['FASHION_WEB'].price" />
        </option>
      </select>
      <br/>
      <label for="quantity">Quantity:</label>
      <input id="quantity" type="number" ref="quantity" value="1"/>
      <br/><button type="submit" @click.stop.prevent="addToCart">Add to cart</button>
    </form>
    <button @click.stop.prevent="oneClickCheckout">Quick checkout</button>
    <form ref="addToWishlistForm">
      <select id="wishlists" ref="wishlist">
        <option v-for="wishlist in this.wishlists" :key="wishlist.id" :value="wishlist.id">
          {{ wishlist.title }}
        </option>
      </select>
      <br/><button type="submit" @click.stop.prevent="addToWishlist()">Add to wishlist</button>
    </form>
  </div>
</template>


<script>
import router from "@/router";
import Price from "@/components/Price";

const axios = require('axios');

export default {
  name: 'Product',
  components: {Price},
  data() {
    return {
      product: {
        code: "TEST1",
        translations: {
          en_US: { name: "Test 1" }
        },
        variants: [
          'VARIANT_TEST_1_DETAILS_URL',
          'VARIANT_TEST_2_DETAILS_URL'
        ],
        images: [
          {path: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'}
        ]
      },
      variants: [
        {
          code: "VARIANT_TEST_1",
          translations: {
            en_US: { name: "Variant test 1" }
          },
          channelPricings: {
            FASHION_WEB: { price: 1230 }
          }
        },
        {
          code: "VARIANT_TEST_2",
          translations: {
            en_US: { name: "Variant test 2" }
          },
          channelPricings: {
            FASHION_WEB: { price: 3040 }
          }
        },
      ],
      wishlists: [
        {
          id: 1,
          title: "My Wishlist"
        }
      ]
    }
  },
  props: {
    id: String,
    locale: String
  },
  methods: {
    addToCart() {
      router.push({ name: 'CartDetails', params: { id: 'CART_TOKEN' } })
      // let productVariantCode = (this.$refs.variant != null) ? this.$refs.variant.value : this.variants[0].code;
      // let quantity = parseInt(this.$refs.quantity.value);
      //
      // if (this.$session.get('cart') != null) {
      //   axios
      //     .patch(
      //         'ADD_TO_CART_URL',
      //         {'productCode': this.product.code, 'productVariantCode': productVariantCode, 'quantity': quantity},
      //         { headers: { accept: 'application/json', 'Content-Type': 'application/merge-patch+json' } }
      //     )
      //     .then((response) => {
      //       if (!this.$session.exists()) {
      //         this.$session.start();
      //       }
      //       this.$session.set('cart', response.data.tokenValue);
      //
      //       router.push({ name: 'CartDetails', params: { id: response.data.tokenValue } })
      //     })
      //   ;
      //
      //   return;
      // }
      //
      // axios
      //   .post('PICKUP_CART_URL', {}, { headers: { accept: 'application/json', 'Content-Type': 'application/json' } })
      //   .then(() => {
      //     axios
      //       .patch(
      //         'ADD_TO_CART_URL',
      //         {'productCode': this.product.code, 'productVariantCode': productVariantCode, 'quantity': quantity},
      //         { headers: { accept: 'application/json', 'Content-Type': 'application/merge-patch+json' } }
      //       )
      //       .then((response) => {
      //         if (!this.$session.exists()) {
      //           this.$session.start();
      //         }
      //         this.$session.set('cart', response.data.tokenValue);
      //
      //         router.push({ name: 'CartDetails', params: { id: response.data.tokenValue } })
      //       });
      //   })
    },
    addToWishlist() {
      axios
        .patch(
          'UPDATE_WISHLIST_URL',
          {'products': [this.product['@id']]},
          { headers: { accept: 'application/ld+json', 'Content-Type': 'application/merge-patch+json', Authorization: 'Bearer '+this.$session.get('token') } }
        ).then(() => {
          router.push({ name: 'MyWishlists' });
        })
      ;
    },
    oneClickCheckout() {
      let headers = { Authorization: 'Bearer '+this.$session.get('token'), accept: 'application/json', 'Content-Type': 'application/json' };
      let productCode = this.product.code;
      let productVariantCode = (this.$refs.variant != null) ? this.$refs.variant.value : this.variants[0].code;
      let quantity = parseInt(this.$refs.quantity.value);
      axios
        .post(
            'ONE_CLICK_CHECKOUT_URL',
            {
              productCode: productCode,
              productVariantCode: productVariantCode,
              quantity: quantity,
              channelCode: "FASHION_WEB",
              customerEmail: "shop@example.com"
            },
            { headers: headers }
        )
        .then(() => {
          router.push({ name: 'Home' });
        })
      ;
    }
  },
  mounted () {
    // let headers = { Authorization: 'Bearer TOKEN', accept: 'application/ld+json' };
    //
    // axios
    //   .get('GET_PRODUCT_DETAILS_URL', { headers: headers })
    //   .then((response) => {
    //     this.product = response.data
    //
    //     let variants = [];
    //     response.data.variants.forEach(function (item) {
    //       axios.get(
    //           'https://127.0.0.1:8000'+item,
    //           { headers: { accept: 'application/json' } }
    //       ).then(response => ( variants.push(response.data) ))
    //     });
    //
    //     this.variants = variants;
    //   })
    // ;
    // axios
    //   .get('UPDATE_WISHLIST_URL', { headers: headers })
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    // ;
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

#product { width: 800px; margin: 0 auto; text-align: left; }
select { width: 200px; }
img { width: 100px; }
</style>
