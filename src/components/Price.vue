<template>
  <span>{{ price }}</span>
</template>

<script>
export default {
  name: 'Price',
  props: {
    amount: Number,
    currency: String
  },
  data() {
    return {
      price: null,
    }
  },
  mounted () {
    this.price = '$'+(this.amount/100);
  }
}
</script>
