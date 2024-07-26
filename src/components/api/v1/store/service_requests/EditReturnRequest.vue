<template>
<div>
  <div class="mobile_head">
    <button class="menu_toggle sidebarCollapse"><i class="fa fa-bars"></i></button>
    <h3 class="main_header">INV35643</h3>
  </div>
  <!-- Inventory Count reduction Confirmation modal -->
  <div class="modal fade cutomr_modal" id="myModal" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <button type="button" class="close qc_result" data-dismiss="modal">&times;</button>
        <div class="modal-body">
          <h3 class="barc_mod_hed">Are you sure you want to<br> Decrease the quantity? <span></span></h3>
          <div class="pick_buttn2">
            <button class="barcode_bt2 no_bg_butn" v-on:click="reset_data()">Cancel</button>
            <button class="barcode_bt2" v-on:click="reduce_inventory_count()">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Inventory Deletion Confirmation Modal --> 
  <div class="modal fade cutomr_modal" id="removeModal" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <button type="button" class="close qc_result" data-dismiss="modal">&times;</button>
        <div class="modal-body">
          <h3 class="barc_mod_hed">Are you sure you want to<br> delete the inventory? <span></span></h3>
          <div class="pick_buttn2">
            <button class="barcode_bt2 no_bg_butn" v-on:click="reset_removal_data()">Cancel</button>
            <button class="barcode_bt2" v-on:click="removeInventory()">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="rigt_navbar" id="content">
    <div style="text-align: left;">
      <h3 class="main_header display_non">Edit Return Request</h3>
    </div>
    <div class="row" style="padding-bottom: inherit;">
      <div class="col-lg-3">
        <div class="row">
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
        <div class="pk_test_se2" style="margin-top: -15px;padding-bottom: 13px;">
          <ul class="qc_test_uli">
            <li>Return Amount : <span>{{return_request.inventories.reduce((acc, item) => acc + item.details.item_price, 0)}}</span></li>
            <li>RR No : <span>{{return_request.request_number}}</span></li>
            <li>Total Items : <span>{{ total_item }}</span></li>
            <li>Invoice : <span>{{return_request.invoice_number}}</span></li>
            <li>Vendor Code : <span>{{return_request.distribution_center.details.vendor_code}}</span></li>
            <li>Ship To : <span>{{return_request.client.name}}</span></li>
            <li style="width: 100% !important;">Reason : <span>{{return_request.customer_return_reason.name}}</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="check_table" style="">
      <div class="check_tablw stow_scroll">
        <div class="table_colmw table_bordr">
          <div class="table_edit1">
            <h4 class="table_head1">Sl. No</h4>
          </div>
          <div class="table_edit5">
            <h4 class="table_head1">Item Description</h4>
          </div>
          <div class="table_edit2">
            <h4 class="table_head1">SKU Code</h4>
          </div>
          <div class="table_edit3">
            <h4 class="table_head1">Qty</h4>
          </div>
          <div class="table_edit4">
            <h4 class="table_head1">Delete Qty</h4>
          </div>
          <div class="table_edit6">
            <h4 class="table_head1">Action</h4>
          </div>
        </div>
        <div class="table_colmw table_bordr table_poup" >
          <div v-for="(inventory,key) in return_inventories" v-bind:id="inventory.id" class="table_colmw table_bordr">
            <div class="table_edit1 table_edits" style="float: left !;">
              <h4 class="table_head1"><span>{{key+1}}</span></h4>
            </div>
            <div class="table_edit5">
              <h4 class="table_head1"><span>{{inventory.details.item_description}}</span></h4>
            </div>
            <div class="table_edit2">
              <h4 class="table_head1"><span>{{inventory.details.sku}}</span></h4>
            </div>
            <div class="table_edit3">
              <h4 class="table_head1"><span>{{inventory.details.quantity}}</span></h4>
            </div>
            <div class="table_edit4">
              <h4 class="table_head1"><span><button class="reduce_btn1" v-on:click="checkConfirmation(inventory,key)">{{inventory.details.quantity}}<span>-</span></button></span></h4>
            </div>
            <div class="table_edit6">
              <h4 class="table_head1"><span><a><img src="@/assets/images/icons/can.svg" v-on:click="removalConfirmation(inventory)" class="img-responsive"></a></span></h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import $ from 'jquery'
import { mapState } from 'vuex'
  export default {
    name: 'EditReturnRequest',
    computed: {
      ...mapState([
        'return_requests'
      ])
    },
    data () {
      return {
        error: false,
        return_request: this.$store.state.return_requests.find(return_request => return_request.id === parseInt(this.$route.params.id)),
        return_inventories: this.$store.state.return_requests.find(return_request => return_request.id === parseInt(this.$route.params.id)).inventories,
        page: 1,
        total_pages: 1,
        sku_code: '',
        quant: '',
        total_item: '',
        inventory_select: '',
        remove_inventory: '',
        index: '',
      }
    },
    created(){
      this.getTotalInventory();
    },
    methods:{      
      reduce_inventory_count (){
        $('#myModal').modal('hide');
        if (this.inventory_select.details.quantity > 1){
          this.$http.secured.post('/api/v1/store/pending_approvals/reduce_inventory_count',{"inventory_id":this.inventory_select.id})
            .then(response => {
              this.quant = this.inventory_select.details.quantity - 1;
              this.return_inventories[this.index].details.quantity = this.quant
              this.getTotalInventory();
              this.$toast.success('Inventory quantity have been successfully reduced');  
              })
            .catch(error => this.$toast.error('Error in deleting inventories'))
        }
      },
      removeInventory(){
        $('#removeModal').modal('hide');
          this.$http.secured.post('/api/v1/store/pending_approvals/destroy_inventory',{"inventory_id":this.remove_inventory.id})
          .then(response => { 
            this.return_inventories.splice(this.return_inventories.indexOf(this.remove_inventory), 1);
            this.getTotalInventory();
            this.$toast.success('Inventory has been successfully deleted');
          })
          .catch(error => this.$toast.error('Error in removing inventories'))
      },
      getTotalInventory(){
        var total = 0
        for (var i = 0; i < this.return_inventories.length; i++) {  
          total += this.return_inventories[i].details.quantity; 
        }
        this.total_item = total
      },
      searchSku(){
        var get_filter = []
        this.return_inventories = this.$store.state.return_requests.find(return_request => return_request.id === this.$route.params.id).inventories 
        if (this.sku_code != ""){
          get_filter = this.return_inventories.filter(d => d.details.sku.toLowerCase().match(this.sku_code.toLowerCase()));
          if (get_filter.length === 0){
            this.error  = true
          }
          else{
            this.return_inventories = get_filter
          }
          return 
        }
      },
      checkConfirmation (selected_inventory,key){
        this.inventory_select = selected_inventory
        this.index = key
        $('#myModal').modal('show');
      },
      reset_data (){
        $('#myModal').modal('hide');
        this.inventory_select = ''
        this.index = ''
      },
      removalConfirmation (selected_inventory){
        this.remove_inventory = selected_inventory
        $('#removeModal').modal('show');
      },
      reset_removal_data (){
        $('#removeModal').modal('hide');
        this.remove_inventory = ''
      },
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