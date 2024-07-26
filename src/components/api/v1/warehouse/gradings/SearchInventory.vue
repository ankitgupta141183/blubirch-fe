<template>
<body>
    <div class="mobile_head">
      <button class="menu_toggle sidebarCollapse"><i class="fa fa-bars"></i></button>
      <h3 class="main_header">Grading Inventory</h3>
    </div>
    <div class="rigt_navbar" id="content">
        <ul class="breadcrambs display_non">
            <li>Grading</li>
            <li><i class="fa fa-chevron-right"></i></li>
            <li><a href="#">Grading Inventory</a></li>
        </ul>
      <h3 class="main_header display_non">Grading Inventory</h3>
      <div class="invoic_srch">
        <div class="invoic_srcw pdong_btm">
          <h3 class="sub_header1">Scan Tag Number</h3>
          <form @submit.prevent="check_sku">
            <div class="form_group1">
                <div class="form_group2">
                  <i class="fa fa-search" aria-hidden="true"></i>
                  <input class="search_form" type="text" v-model="enter_sku" placeholder="Enter the SKU/Tag Number">
                  <div v-if="errorCheck">
                    <div class="warning_img">
                      <div class="warnig_imgw">
                        <img src="@/assets/images/icons/warning.svg">Please Enter the Correct SKU Code
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <button  class="main_button" >Proceed</button>
          </form>         
        </div>
      </div>
    </div>
</body>
</template>

<script>
import EventBus from '../../store/service_requests/event-bus.js'
import json from  "@/assets/invoices.json"

  export default {
    name: 'CustomerReturns',
    data () {
      return {
        enter_box_number: '',
        box_numbers: ["a123", "b123", "c123"],
        sku_codes: '',
        errors1: [],
        enter_sku: '',
        errors2: [],
        hideSearch: false,
        hideGrading: true,
        selected_reason: '',
        inventory:'',
        errorCheck: false

      }
    },
    methods: {

      check_box(box_numbers) {
        if (box_numbers.includes(this.enter_box_number))
        {
          // this.$router.push({name: 'ReInwardInventry', params: { id: this.enter_box_number }})
          EventBus.$emit("clicked-event", { id: this.enter_box_number })
        }
        else
        {
          this.errors1.push('invalid_box')
          this.hideSearch = true
          this.hideGrading = false
        }
      },

      check_sku(sku_codes, box_numbers) {

        if (this.enter_sku === ""){
        this.errorCheck = true
          return;

      }



        this.$http.secured.get('/api/v1/warehouse/warehouse_grading/warehouse_rules', { params: {tag_number: this.enter_sku}})
            .then(response => {//this.category = response.data['rules']


                                this.inventory = response.data["inventory"]
                                let selected_inventory = {"id":this.inventory.id,"return_quantity":1,"client_category_id":this.inventory.details["client_category_id"]}
                                this.$store.commit('setWarehouseGrading', {selected_inventory: selected_inventory,warehouse_grading:true ,grading_type: "Warehouse"})
                                 this.$router.push({ name: 'Package'})
                                  })
            .catch(error => this.$toast.error('Error in fetching category'))
      

      }
    }
  }
</script>