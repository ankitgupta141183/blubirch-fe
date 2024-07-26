<template>
  <div>
    <div class="mobile_head">
      <button class="menu_toggle sidebarCollapse"><i class="fa fa-bars"></i></button>
      <h3 class="main_header">Customer Exchange</h3>
    </div>
    <div class="rigt_navbar" id="content">
      <ul class="breadcrambs display_non" style="text-align: left;">
        <li>Grading</li>
        <li><i class="fa fa-chevron-right"></i></li>
        <li><a href="#">Grading Inventory</a></li>
      </ul>
      <h3 class="main_header display_non" style="text-align: left;">Grading Inventory</h3>
      <div class="row">
        <div class="packing_st1 newwith55">
          <div class="packing_sw1 minhgt_450px">
            <ul class="dispost_uli">
              <li>Dispositon</li>
              <li><button class="dispose_btn1">Send to Factory</button></li>
              <li>RR Number</li>
              <li><button class="dispose_btn2">{{ this.no_grading.return_request_number}}</button></li>
              <li>Invoice Number</li>
              <li><button class="dispose_btn2">{{ this.no_grading.invoice_number }}</button></li>
              <li>No. of Items</li>
              <li><button class="dispose_btn2">{{ this.no_grading.inventories_count}}</button></li>
            </ul>
            <div class="button_grpw1">
              <button class="button_grop2" v-on:click="ApprovalRequest">Save & Continue</button>
            </div>
          </div>
        </div>
        <div class="packing_st2 newwith45">
          <div class="packing_sw2 minhgt_450px">
            <h4 class="sub_header6">Selected Item(s)</h4>
            <ul class="summury_uli">
              <div v-for="inventory in $store.state.no_grading.inventories">
                <li><i class="fa fa-circle"></i> {{ inventory.sku }} | {{ inventory.item_description }} | {{ inventory.return_quantity }}</li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import { mapState } from 'vuex'

export default {
  name: 'NoGradingInventory',
    computed: {
      ...mapState([
        'no_grading'
      ])
    },
  methods: {
    ApprovalRequest () {
      this.$store.commit('clearReturnRequestInfo')
      this.$router.push({name: "SearchInvoiceNumber"})
    }
  }
}

</script>
