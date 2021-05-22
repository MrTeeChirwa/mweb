<template>
  <div id="app">
    <providers/>

    <section>

    <i v-for="(campaign, index) in getCampaigns" :key='index'>
      <input type="radio" v-on:change="getCampaignProducts(campaign)" 
        name="campaign" :value="campaign.name" v-bind:checked="index === 0" >
      <label for="one">{{campaign.name}}</label>
    </i>

      <div>
      <div style="font: 700 0.9rem sans-serif; margin-bottom: 3px;">Price Ranges</div>
        <label style="display: inline-block; margin: 5px 10px 3px 0; font-size: 0.85em;" for="699">
           <input type="checkbox" name="input1" style="vertical-align: top; margin-left: 1px;" v-model="selectedPrice" value="699">
           R0 - R699
          </label>
          <label style="display: inline-block; margin: 5px 10px 3px 0; font-size: 0.85em;" for="999">
           <input type="checkbox" name="input2" style="vertical-align: top; " v-model="selectedPrice" value="999">
           R700 - R999
          </label>
          <label style="display: inline-block; margin: 5px 10px 3px 0; font-size: 0.85em;" for="1000">
           <input type="checkbox" name="input3" style="vertical-align: top; " v-model="selectedPrice" value="1000">
           R1000+
          </label>
      <div style="font-size: 0.85rem; font-style: italic; margin-top: 3px;">Select the price ranges to filter the products by. No selection includes all products</div>
      </div>

<!-- {{defaultCampaignProducts}} -->
    <i v-for="(product, index) in products" :key="'B'+ index">
        <p>{{product.productName}} <b>R {{product.productRate}}</b></p>
    </i>

  </section>

  </div>
</template>

<script>
import providers from './components/Providers'
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    providers
  },
  computed: {
    ...mapGetters([
      'getCampaigns',
    ]),

  products(){
    if (!this.selectedPrice.length)
      return this.$store.getters.getProducts
    
    let spMax = Math.max(...this.selectedPrice);
    // let spMin = Math.min(...this.selectedPrice);

    if (this.selectedPrice.length == 1) {
      if (spMax === 699)
        return this.$store.getters.getProducts.filter(pr => {
          return pr.productRate <= spMax;
      });

      if (spMax == 999)
        return this.$store.getters.getProducts.filter(pr => {
          return pr.productRate >= 700 && pr.productRate <= spMax;
      });

      if (spMax == 1000)
        return this.$store.getters.getProducts.filter(pr => {
          return pr.productRate >= spMax;
      });

    } 

    return this.$store.getters.getProducts;
  },

  // getProviders() {
  //   return [...new Set(this.$store.getters.getProducts.map(p => p.provider))]
  // }

  },
  data(){
    return {
      selectedPrice: []
    }
  },
  methods: {
    getCampaignProducts(campaign){
      this.$store.dispatch('loadProducts', campaign.promocodes);
    }
  },
  updated(){
      // this.getSummarizedProducts;
  },
  async mounted(){
      this.$store.dispatch('loadCompaigns')
  }
}
</script>