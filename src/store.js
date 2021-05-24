import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { providerInfo } from "./providers";

Vue.use(Vuex);

function getSummarizedProduct({
  productCode,
  productName,
  productRate,
  subcategory,
}) {
  const provider = subcategory
    .replace("Uncapped", "")
    .replace("Capped", "")
    .trim();
  return { productCode, productName, productRate, provider };
}

function getProductsFromPromo(pc) {
  return pc.products.reduce(
    (prods, p) => [...prods, getSummarizedProduct(p)],
    []
  );
}

export default new Vuex.Store({
  state: {
    campaigns: Array,
    products: Array,
    providers: Array,
  },

  getters: {
    getCampaigns: (state) => state.campaigns,
    getProducts: (state) => state.products,
    getProviders: (state) => state.providers,
  },
  mutations: {
    SET_CAMPAIGNS: (state, campaigns) => {
      state.campaigns = campaigns;
    },
    SET_PRODUCTS: (state, products) => {
      state.products = products;
    },
    SET_PROVIDERS: (state, providers) => {
      state.providers = providers;
    },
  },
  actions: {
    loadCompaigns: async (context) => {
      await axios
        .get(
          `${process.env.VUE_APP_PRODUCTS_BASE_URL}/campaigns/fibre?channels=120&visibility=public`
        )
        .then((response) => response.data)
        .then((data) => {
          context.commit("SET_CAMPAIGNS", data.campaigns);
        })
        .then(() => {
          return context.getters.getCampaigns.map((c) => c.promocodes);
        })
        .then((promocodes) => {
          context.dispatch("loadProducts", promocodes[0]);
        });
    },

    loadProducts: (context, promocodes) => {
      axios
        .get(
          `${
            process.env.VUE_APP_PRODUCTS_BASE_URL
          }/products/promos/${promocodes.join(",")}`
        )
        .then((response) => response.data)
        .then((data) => {
          let summarizedProducts = data.reduce(
            (prods, pc) => [...prods, ...getProductsFromPromo(pc)],
            []
          );
          // console.log(summarizedProducts);
          context.commit("SET_PRODUCTS", summarizedProducts);
        })
        .then(() => {
          return context.getters.getProducts;
        })
        .then((prod) => {
          let providers = [...new Set(prod.map((p) => p.provider))];
          let filteredProviders = providerInfo.filter((p) => {
            return providers.includes(p.name);
          });

          context.dispatch("loadProviders", filteredProviders);
        });
    },
    loadProviders: (context, providers) => {
      // console.log(providers);
      context.commit("SET_PROVIDERS", providers);
    },
  },
});
