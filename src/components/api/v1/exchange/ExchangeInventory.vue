<template>
  <div>
    <div v-if='setAttributes'>
      <h3 class="main_header exchnge_b display_non">Exchange</h3>
      <div class="invoic_srch">
        <div class="exchng_srcw pdong_btm">
          <h3 class="sub_header1 display_non">Exchange your Old Device</h3>
          <form @submit.prevent="submitCategory">
            <div class="form_group1">
              <i class="fa fa-search" aria-hidden="true"></i>
                <multiselect v-model="category" :options="categories" :searchable="true" :close-on-select="false" :show-labels="false" label="name" track-by="id" placeholder="Pick a value"></multiselect>
              
            </div>
            <button type="submit" class="main_button">Search</button>
          </form>
        </div>
        <div class="excg_featu2">
          <div class="excg_colmn1">
            <div class="excg_colm_w">
              <img src="@/assets/images/icons/exchange-icon-1.png" class="img-fluid">
              <span>1</span>
              <h4>Search Item</h4>
              <p>Select the device which you wish to exchange.</p>
            </div>
          </div>
          <div class="excg_colmn1">
            <div class="excg_colm_w">
              <img src="@/assets/images/icons/exchange-icon-2.png" class="img-fluid">
              <span>1</span>
              <h4>Search Item</h4>
              <p>Select the device which you wish to exchange.</p>
            </div>
          </div>
          <div class="excg_colmn1">
            <div class="excg_colm_w">
              <img src="@/assets/images/icons/exchange-icon-3.png" class="img-fluid">
              <span>1</span>
              <h4>Search Item</h4>
              <p>Select the device which you wish to exchange.</p>
            </div>
          </div>
        </div>
      </div>
    </div>


    <ExchangeInventoryDetails v-if = '!setAttributes' :selectedCategory1 = 'misc.selectedCategory'/>
  </div>
 
</template>

<script>
import Multiselect from 'vue-multiselect'
import ExchangeInventoryDetails from './ExchangeInventoryDetails'
export default {
  name: 'SearchInvoiceExchange',

  data () {
    return {
      category: '',
      categories: '',
      setAttributes: true,
      misc: {
        selectedCategory: ''
      }
    }
  },
  components: {
    Multiselect,
    ExchangeInventoryDetails
  },
  created () {
    this.$http.secured.get('/api/v1/categories/leaf_category')
      .then(response => { this.categories = response.data.client_categories })
      .catch(error => this.$toast.error('Error in fetching Category'))
  },
  
  methods: {
    submitCategory () {
      //this.$router.replace("/exchange_inventory_details/"+this.category.id)
      this.$http.secured.get(`/api/v1/categories/get_details?id=${this.category.id}`)
        .then(response => {
          this.misc.selectedCategory = response.data.client_category
          console.log(response.data)
          this.setAttributes = false 
        })
        .catch(error => this.$toast.error('Error in fetching details'))
    }
  }
}
</script>
