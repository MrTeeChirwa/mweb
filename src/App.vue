<template>
  <div id="app">
    <section>
      
    <providers @change="filterProductsByProvider"/>

    <div class="main">
      <i v-for="(campaign, index) in getCampaigns" :key='index'>
        <input type="radio" v-on:change="getCampaignProducts(campaign)" 
          name="campaign" :checked="index === 0" class="campaign">
        <label for="one">{{campaign.name}}</label>
      </i>

      <div style="font: 700 0.9rem sans-serif; margin-bottom: 3px;">Price Ranges</div>
        <label style="display: inline-block; margin: 5px 10px 3px 0; font-size: 0.85em;" for="699">
            <input type="checkbox" name="input1" style="vertical-align: top; margin-left: 1px;" 
              v-on:change="filterByPriceRanges" v-model="selectedPriceRangeLabels" value="R0 - R699">
            R0 - R699
          </label>
          <label style="display: inline-block; margin: 5px 10px 3px 0; font-size: 0.85em;" for="999">
            <input type="checkbox" name="input2" style="vertical-align: top;" 
              v-on:change="filterByPriceRanges" v-model="selectedPriceRangeLabels" value="R700 - R999">
            R700 - R999
          </label>
          <label style="display: inline-block; margin: 5px 10px 3px 0; font-size: 0.85em;" for="1000">
            <input type="checkbox" name="input3" style="vertical-align: top;" 
              v-on:change="filterByPriceRanges" v-model="selectedPriceRangeLabels" value="R1000+">
            R1000+
          </label>
      <div style="font-size: 0.85rem; font-style: italic; margin-top: 3px;">Select the price ranges to filter the products by. No selection includes all products</div>

      <div class="products">
        <i v-for="(product, index) in products" :key="'B'+ index">
            <p>{{product.productName}} <b>R {{product.productRate}}</b></p>
        </i>
      </div>

  </div>
  </section>

  </div>
</template>

<script>
import providers from './components/Providers'
import { priceRanges } from "./priceRanges";
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
    if(this.filteredProducts.length > 0)
      return this.filteredProducts

    if(this.selectedPriceRangeLabels.length > 0)
      return this.$store.getters.getProducts.filter(this.filterProductsByPrice)

    return this.$store.getters.getProducts;
  }
  },
  data(){
    return {
      selectedPriceRangeLabels: [],
      filteredProducts: [],
      selectedPriceRanges: [],
    }
  },
  methods: {
    getCampaignProducts(campaign){
      this.filteredProducts = [];
      this.$store.dispatch('loadProducts', campaign.promocodes);
    },
    filterProductsByProvider(value){
      this.filteredProducts = value;
    },
    filterByPriceRanges(){
      this.selectedPriceRanges = priceRanges.filter(range => this.selectedPriceRangeLabels.includes(range.label));
    },
    filterProductsByPrice(product){      
      for (const range of this.selectedPriceRanges) {
        const price = product.productRate
        if (price >= range.min && price <= range.max) {
          return true
        }
      }
      
      return false
    }
  },
  mounted(){
      this.$store.dispatch('loadCompaigns');
  }
}
</script>

<style scoped>
  .main{
    margin-left: 60px;
  }

  .main .campaign{
    margin-bottom: 30px;
  }

  .main .products{
    margin-top: 50px;
  }
</style>