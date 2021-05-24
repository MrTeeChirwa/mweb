<template>
    <ul v-if="getProviders">
      <li  v-for="(provider, index) in getProviders" :key="index">
          <input type="checkbox" :value="provider" v-on:change="filterProductsByProvider" 
            v-model="selectedProviderSet" :id="'provider'+index"/>
          <label :for="'provider'+index">
          <img :src="provider.url" alt="">
        </label>
      </li>
    </ul>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'getProviders',
    ]),
  },
  data(){
        return {
          selectedProviderSet: [],
        }
    },
  methods: {
    filterProductsByProvider(){
      let providerSet = this.selectedProviderSet.map((provider) => provider.name);
      let providerProducts = this.$store.getters.getProducts.filter((prod) => {
        return providerSet.includes(prod.provider) ;
      });

      this.$emit('change', providerProducts);
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
}

li {
  display: inline-block;
}

input[type="checkbox"][id^="provider"] {
  display: none;
}

label {
  border: 1px solid #fff;
  padding: 10px;
  display: block;
  position: relative;
  margin: 10px;
  cursor: pointer;
}

label:before {
  background-color: white;
  color: white;
  content: " ";
  display: block;
  border-radius: 50%;
  border: 1px solid grey;
  position: absolute;
  top: -5px;
  left: -5px;
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 28px;
  transition-duration: 0.4s;
  transform: scale(0);
}

label img {
  height: 60%;
  width: auto;
  transition-duration: 0.2s;
  transform-origin: 50% 50%;
}

:checked + label {
  border-color: #ddd;
}

:checked + label:before {
  content: "✓";
  background-color: grey;
  transform: scale(1);
}

:checked + label img {
  transform: scale(0.9);
  /* box-shadow: 0 0 5px #333; */
  z-index: -1;
}
</style>