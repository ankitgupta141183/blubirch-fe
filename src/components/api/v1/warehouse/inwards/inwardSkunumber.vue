<template>
<body>


<div>

    <div class="rigt_navbar" id="content">
        
        <h3 class="main_header display_non">Inward Inventory</h3>
        <router-link :to="{name: 'CompanyStock'}" style="float:right">Import Company Stock</router-link>
         <div class="invoic_srch">
            <div class="invoic_srcw pdong_btm">
                <h3 class="sub_header1">SKU Number</h3>
              <form @submit.prevent="searchInventoryBySku(sku_number)">
                    <div class="form_group1">
                        <i class="fa fa-search" aria-hidden="true"></i>
                        <input class="search_form" v-model="sku_number" type="text" placeholder="Scan or Enter the SKU">
                        <div v-if="errors1.includes('invalid_sku')">
                        <div class="warning_img">
                          <div class="warnig_imgw">
                            <img src="@/assets/images/icons/warning.svg">Please check the SKU Number
                          </div>
                        </div>
                      </div>
                    </div>
                    <button class="main_button">Search</button>
                </form>
            </div>
        </div>
    </div>
</div>    
</body>
</template>

<script>
export default {
    name:"Stowing",
    data () {
    return {
      sku_number: '',
      errors1: []
    }
  },
  methods: {
    searchInventoryBySku(sku_number) {
      if (sku_number != ""){
        let search_param = {
          params:{
          sku_code:sku_number
          }
        }
        this.$http.secured.get('/api/v1/warehouse/inward/get_sku_details', search_param)
        .then(response => {if(response.data.client_sku_master) { 
          this.$store.commit('setInwardSKU', {sku_code: this.sku_number, client_sku_master: response.data.client_sku_master}),
          this.$router.push({name:'InwardForm'})} else {
            this.errors1.push('invalid_sku'), 
            this.sku_number = ''}
        })
        .catch(error => {this.$toast.error('Error in fetching inventories'), 
          this.errors1.push('invalid_sku'),
          this.sku_number = ''
        })
      } else {
        this.errors1.push('invalid_sku'),
        this.sku_number = '' }
    }
  }
}
</script>