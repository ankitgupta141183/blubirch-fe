<template>
  <div>
    <div class="mobile_head">
      <button class="menu_toggle sidebarCollapse"><i class="fa fa-bars"></i></button>
      <h3 class="main_header">INV35643</h3>
    </div>
    <div class="rigt_navbar" id="content">
      <div style="text-align: left;">
        <h3 class="main_header display_non">Return Request Info</h3>
      </div>
      <div class="row">
        <div class="col-lg-3">
          <div class="row" style="padding-bottom: inherit;">
            <div class="form_groupw">
              <div class="form_group1">
                <form @submit.prevent="searchSku">
                  <i class="fa fa-search" aria-hidden="true"></i>
                  <input class="search_form" type="text" v-model="sku_code" placeholder="Search sku code">
                  <div v-if="error">
                <div class="warning_img" style="text-align: center;">
                  <div class="warnig_imgw">
                    Unfortunetly coudn’t find the Sku Code
                  </div>
                </div>
              </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-9">
          <div class="pk_test_se2" style="margin-top: -35px;padding-bottom: 15px;">
            <ul class="qc_test_uli">
              <li>Total Items : <span>{{ total_item }}</span></li>
              <li>RR No : <span>{{return_request.request_number ? return_request.request_number : "Nil"}}</span></li>
              <li>Invoice : <span>{{return_request.invoice_number}}</span></li>
              <li>Claim date : <span>{{return_request.details.approval_sent_date | moment("DD-MM-YYYY")}}</span></li>
              <li>Vendor Code : <span>{{return_request.distribution_center.details.vendor_code}}</span></li>
              <li>Ship To : <span>{{return_request.client.name}}</span></li>
              <li>Return Amount : <span>{{return_request.inventories.reduce((acc, item) => acc + item.details.item_price, 0)}}</span></li>
              <li style="width: 66.67% !important;">Reason : <span>{{return_request.customer_return_reason.name}}</span></li>
            </ul>
            <ul class="qc_test_uli">
            </ul>
            <ul class="qc_test_uli" style="margin-top: 40px; margin-left: 19px;">
            </ul>
          </div>
        </div>
      </div>
      <div class="check_table" style="text-align: center;">
        <div class="check_tablw stow_scroll">
          <div class="table_colmw table_bordr">
            <div class="table_csnd1" style="width:5%;">
               <h4 class="table_head1">SI.No</h4>
            </div>
            <div class="table_csnd4" style="width:37%;">
               <h4 class="table_head1" style="margin-left:12px">Item Description</h4>
            </div>
            <div class="table_csnd4" style="width:15%">
               <h4 class="table_head1">SKU Code</h4>
            </div>
            <div class="table_csnd2">
               <h4 class="table_head1">Quantity</h4>
            </div>
            <div class="table_csnd3" style="width:10%">
              <h4 class="table_head1" style="margin-right:35px">Tag Number</h4>
            </div>
            <div class="table_csnd4" style="width:15%">
               <h4 class="table_head1" style="margin-left:50px">Grade</h4>
            </div>
            <div class="table_csnd7">
               <h4 class="table_head1"><br></h4>
            </div>
          </div>
          <div class="table_colmw table_bordr table_poup" >
            <div v-for="(inventory,key) in return_inventories" v-bind:id="inventory.id" class="table_colmw table_bordr">
              <div class="table_csnd1">
                <h4 class="table_head1" style="width:4%;">
                  <span>{{key+1}}</span>
                </h4>
              </div>
              <div class="table_csnd4" style="width:37%">
                <h4 class="table_head1"><span>{{ inventory.details.item_description ? inventory.details.item_description : inventory.details.sku  }}</span></h4>
              </div>
              <div class="table_csnd4" style="width:16%">
                <h4 class="table_head1"><span>{{ inventory.details.sku ? inventory.details.sku : "Nil" }}</span></h4>
              </div>
              <div class="table_csnd2" style="width:13%">
                <h4 class="table_head1"><span>{{ inventory.details.quantity }}</span></h4>
              </div>
              <div class="table_csnd3" style="width:15%">
                <h4 class="table_head1"><span>{{ inventory.tag_number? inventory.tag_number : "N/A"  }}</span></h4>
              </div>

              <div class="table_csnd6">
                <h4 class="table_head1" style="margin-right: 50px"><span>{{ inventory.details.grade? inventory.details.grade : "N/A" }}</span></h4>
              </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="check_pagnt">
          <paginate
            :page-count=total_pages
            :click-handler="getInventories"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination_custom'"
            :prev-class="'page-item'"
            :first-last-button=true
            :next-class="'page-item'"
            :page-class="'page-item'">
          </paginate>
        </div> -->
        
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    name: 'ReturnRequestInfo',
    computed: {
      ...mapState([
        'approval_return_requests', 'approved_return_request', 'return_requests'
      ])
    },
    data () {
      return {
        error: false,
        return_request: [],
        return_inventories: [],
        page: 1,
        total_pages: 1,
        sku_code: '',
        quant: '',
        total_item: ''
      }
    },
    created(){
      if (this.$store.state.return_requests.length > 0){
        this.return_request = this.$store.state.return_requests.find(return_request => return_request.id === parseInt(this.$route.params.id))
       this.return_inventories = this.$store.state.return_requests.find(return_request => return_request.id === parseInt(this.$route.params.id)).inventories ? this.$store.state.return_requests.find(return_request => return_request.id === parseInt(this.$route.params.id)).inventories : []
      }

      if (this.$store.state.approval_return_requests.length > 0){
        for (var i = 0; i < this.$store.state.approval_return_requests.length; i++) {
          if (this.$store.state.approval_return_requests[i].id === parseInt(this.$route.params.id))
           {
            this.return_request = this.$store.state.approval_return_requests[i]
            this.return_inventories = this.$store.state.approval_return_requests[i].inventories
            }
        }
      }
      if (this.$store.state.approved_return_requests.length > 0){
        for (var i = 0; i < this.$store.state.approved_return_requests.length; i++) {
          if (this.$store.state.approved_return_requests[i].id === parseInt(this.$route.params.id))
           {
            this.return_request = this.$store.state.approved_return_requests[i]
            this.return_inventories = this.$store.state.approved_return_requests[i].inventories
            }
        }
      }

      this.getTotalInventory();
     
    },
    methods:{  
      getTotalInventory(){
        var total = 0
        for (var i = 0; i < this.return_inventories.length; i++) {  
          total += this.return_inventories[i].details.quantity; 
        }
        this.total_item = total
      },

      searchSku(){
        var get_filter = []
        if (this.$store.state.return_requests.length > 0){
          this.return_inventories = this.$store.state.return_requests.find(return_request => return_request.id === parseInt(this.$route.params.id)).inventories 
        }

        if ((this.$store.state.approval_return_requests.length) > 0 && (this.$route.params.status == "pending")){
          this.return_inventories = this.$store.state.approval_return_requests.find(return_request => return_request.id === parseInt(this.$route.params.id)).inventories
        }

        if ((this.$store.state.approved_return_requests.length) > 0 && (this.$route.params.status == "approved")){
          this.return_inventories = this.$store.state.approved_return_requests.find(return_request => return_request.id === parseInt(this.$route.params.id)).inventories
        }

        if (this.sku_code != "")
          {
            get_filter = this.return_inventories.filter(d => d.details.sku.toLowerCase().match(this.sku_code.toLowerCase()));
            if (get_filter.length === 0){
              this.error  = true
          }
        else
        {
          this.return_inventories = get_filter
        }
        return 
      }

      }
    }
  }

</script>   

<style type="text/css" scoped>
  .qc_test_uli li{
    float:center;
    width:33.33%;
    text-align:left;
    font-style:normal;
    font-weight:500;
    font-size:15px;
    line-height:21px;
    color:#777
  }

  .pk_test_se2{
    float:left;
    width:100%;
    background:#fff;
    -webkit-box-shadow:0 2px 16px rgba(0,0,0,.1);
    box-shadow:0 2px 16px rgba(0,0,0,.1);
    padding:14px 25px
  }

</style>