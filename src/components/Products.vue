<template>
  <div>
    <i v-for="(product, index) in products" :key="'B'+ index">
        <p>{{product.productName}} <b>R {{product.productRate}}</b></p>
    </i>
  </div>
</template>

<script>
export default {
  props: ['products'],
  created(){
    this.$store.dispatch('loadCompaigns')
  }
}
</script>