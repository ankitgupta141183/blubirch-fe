<template>
    <div>
    <div class="mobile_head">
        <button class="menu_toggle sidebarCollapse"><i class="fa fa-bars"></i></button><h3 class="main_header">Customer Returns</h3>
    </div>
    <div class="rigt_navbar" style="text-align: left;" id="content">
        <ul class="breadcrambs display_non">
            <li>Grading</li>
            <li><i class="fa fa-chevron-right"></i></li>
            <li><a href="#">Grading Inventory</a></li>
        </ul>
        
        <h3 class="main_header display_non">Stowing</h3>
        <div class="invoic_srch">
            <div class="invoic_srcw pdong_btm">
                <h3 class="sub_header1">Toat Number</h3>
              <form @submit.prevent="searchInventoryByToat(toat_number)">
                    <div class="form_group1">
                        <i class="fa fa-search" aria-hidden="true"></i>
                        <input class="search_form" v-model="toat_number" type="text" placeholder="Scan or Enter the Toat Number">
                        <div v-if="errors1.includes('invalid_toat')">
                        <div class="warning_img">
                          <div class="warnig_imgw">
                            <img src="@/assets/images/icons/warning.svg">Please check the Toat Number
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
</template>

<script>
export default {
    name:"Stowing",
    data () {
    return {
      toat_number: '',
      errors1: []
    }
  },
  methods: {
    searchInventoryByToat(toat_number) {
      if (toat_number != ""){
        let search_param = {
          params:{
          toat_number:toat_number
          }
        }
        this.$http.secured.get('/api/v1/warehouse/stowing/fetch_inventories', search_param)
        .then(response => { if(response.data.inventories.length) { 
          this.$store.commit('setQc', {toat_number: this.toat_number, inventories: response.data.inventories}),
          this.$router.push({name:'StowingList'})} else {
            this.errors1.push('invalid_toat'), 
            this.toat_number = ''}
        })
        .catch(error => {this.$toast.error('Error in fetching inventories'), 
          this.errors1.push('invalid_toat'),
          this.toat_number = ''
        })
      } else {
        this.errors1.push('invalid_toat'),
        this.toat_number = '' }
    }
  }
}
</script>