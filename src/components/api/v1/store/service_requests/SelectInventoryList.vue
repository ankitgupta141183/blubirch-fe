<template>
  <div>
  <div class="rigt_navbar" id="content">
    <ul class="breadcrambs display_non" style="text-align: left;">
      <li>Return Management</li>
      <li><i class="fa fa-chevron-right"></i></li>
      <li>Service Request</li>
      <li><i class="fa fa-chevron-right"></i></li>
      <li><a href="javascript:void(0)">Return Request</a></li>
    </ul>
    <h3 class="main_header display_non" style="text-align: left;">Return Request</h3>
    <div class="row">
      <div class="col-lg-6">
        <div class="row">
          <div class="form_groupw">
            <div class="form_group1">
              <i class="fa fa-search" aria-hidden="true"></i>
              <input class="search_form requst_list" type="text" v-model="search" placeholder="Search Sku Code" v-on:change="filterSku">
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="pk_test_se2">
          <ul class="qc_test_ul3">
            <li><span>Return Reason: </span> {{ $store.state.customer_return_reason.name }} </li>
          </ul>
        </div>
      </div>
    </div>
    <form @submit.prevent="returnItems">
      <div class="check_table">
        <div class="check_tablw stow_scroll table_font14px">
          <div class="table_colmw table_bordr">
            <div class="table_clpp11"><br></div>
            <div class="table_colR1">
              <h4 class="table_head1"><br></h4>
            </div>
            <div class="table_colR3" style="">
              <h4 class="table_head1">Item Description</h4>
            </div>
            <div class="table_colR4">
              <h4 class="table_head1">Sku Code</h4>
            </div>
            <div class="table_colR5">
              <h4 class="table_head1">Qty</h4>
            </div>
            <div class="table_colR6">
              <h4 class="table_head1">Return Qty</h4>
            </div>
            <div class="table_colR7">
              <h4 class="table_head1" style="">Rate</h4>
            </div>
            <div class="table_colR8">
              <h4 class="table_head1" style="">Amount</h4>
            </div>
          </div>
          <div v-for="(inventory,key,index) in  inventory_list" v-bind:id="inventory.id" class="table_colmw table_bordr table_poup">
            <div class="table_clpp11"><br></div>
            <div class="table_colR1">
              <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" @click="selectItem(key, $event)" :id="inventory.id" v-model="invoice_inventory[key]" :value="inventory.id">
              </div>
            </div>
            <div class="table_colR3">
              <h4 class="table_head1"><span>{{ inventory.details.item_description }}</span></h4>
            </div>
            <div class="table_colR4">
              <h4 class="table_head1"><span>{{ inventory.details.product_code_sku }}</span></h4>
            </div>
            <div class="table_colR5">
              <h4 class="table_head1"><span>{{ inventory.quantity }}</span></h4>
            </div>
            <div class="table_colR6">
              <h4 class="table_head1">
                <span>
                <input :disabled="$store.state.customer_return_reason.grading_required === true" class="search_form" type="number" min="1" onKeyPress="if(this.value>inventory.quantity) return false;" :max='inventory.quantity' v-model="return_quantity[key]"  
                  v-on:change="checkqty(return_quantity[key], inventory.quantity - ((parseInt($store.state.invoice.invoice_inventory_details[key].return_quantity)+(return_quantity[key]===undefined||return_quantity[key]===''?0:parseInt(return_quantity[key])))))"> 
                {{ inventory.quantity - ((parseInt($store.state.invoice.invoice_inventory_details[key].return_quantity)+(return_quantity[key]===undefined||return_quantity[key]===''?0:parseInt(return_quantity[key])) > inventory.quantity ?inventory.quantity:((parseInt($store.state.invoice.invoice_inventory_details[key].return_quantity)+(return_quantity[key]===undefined||return_quantity[key]===''?0:parseInt(return_quantity[key])))))) }} left</span>
              </h4>
            </div>
            <div class="table_colR7">
              <h4 class="table_head1"><span><i class="fa fa-inr"></i>{{ inventory.item_price }}</span></h4>
            </div>
            <div class="table_colR8">
              <h4 class="table_head1"><span><i class="fa fa-inr"></i>{{ inventory.total_price }}</span></h4>
            </div>
          </div>
        </div>
      </div>
      <button class="table_buton display_non">Proceed</button>
    </form>
    <div class="row">
      <button class="table_mobtn">Save and Continue</button>
    </div>
    <div v-if="$store.state.customer_return_reason.grading_required === true" class="qutity_info"><img src="@/assets/images/icons/info-2.svg"><span>Quantity and Item cannot be more than 1 for the selected reason</span></div>
    <div v-if="$store.state.customer_return_reason.grading_required === false" class="qutity_info"><img src="@/assets/images/icons/info-2.svg"><span>You can select multiple items and quantities for the selected reason</span></div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'SelectInventoryList',
    computed: {
      ...mapState([
        'invoice', 'customer_return_reason', 'selected_inventory'
      ])
    },
    data () {
      return {
        search: '',
        invoice_inventory: [],
        return_quantity: [],
        selected_inventories: [],
        inventory_list:[],
        is_left_qty : false
      }
    },
    created () {
      this.inventory_list = this.$store.state.invoice.invoice_inventory_details
    },
    methods: {
      filterSku(){
        this.inventory_list = this.$store.state.invoice.invoice_inventory_details
        if (this.search != ""){
        this.inventory_list = this.inventory_list.filter(d => d.details.product_code_sku.toLowerCase().match(this.search.toLowerCase()));
        return 
        }
      },
      checkqty(qty,left_qty){
        if(left_qty != 0 && left_qty < 0){
          this.is_left_qty = true
          this.$toast.error("Please check return quantity")
          return
        }
      },
      selectItem(index, event){
        if (this.$store.state.customer_return_reason.grading_required === true) {
          this.invoice_inventory = []
          this.return_quantity = []
          this.return_quantity[index] = 1
          if (event.target.checked === true){
            this.invoice_inventory[index] = 1
            if((this.inventory_list[index].quantity)-(this.inventory_list[index].return_quantity+this.return_quantity[index])<0){
              this.$toast.error("Please check return quantity")
              this.is_left_qty=true;
              this.invoice_inventory[index] = []
              this.return_quantity[index] = ''              
              return 
            }
          }
          else {     
            this.invoice_inventory[index] = []
            this.return_quantity[index] = ''
            this.is_left_qty=false;
          }
        }
        else {
          if (event.target.checked === true){
            this.return_quantity[index] = 1
              if((this.inventory_list[index].quantity)-(this.inventory_list[index].return_quantity+this.return_quantity[index])<0){
              this.$toast.error("Please check return quantity")
              this.is_left_qty=true;             
              return 
            }
          }
          else {  
            this.is_left_qty=false;       
          }
        }
      },
      returnItems(){

        if(this.is_left_qty)
        {
          this.$toast.error("Please check return quantity")
          return          
        }
        this.selected_inventories = []
        var quant_flag = true
        this.invoice_inventory.forEach((value, index) => {
        this.$store.state.invoice.invoice_inventory_details[index].return_quantity = (parseInt(this.$store.state.invoice.invoice_inventory_details[index].return_quantity) + parseInt(this.return_quantity[index]))
          if ((this.return_quantity[index] != "") && (parseInt(this.return_quantity[index]) !== 0) && (parseInt(this.$store.state.invoice.invoice_inventory_details[index].quantity) - parseInt(this.return_quantity[index])) < 0) {   
              this.$toast.error("Please check entered quantity")
            quant_flag = false;
            return;              
          }
          else if((this.return_quantity[index] === "") || (parseInt(this.return_quantity[index]) === 0)) {
            this.$toast.error("Enter return quantity for selected inventories")
            return;
          }
          else if ((this.return_quantity[index] != "") && (parseInt(this.return_quantity[index]) !== 0)) {
            this.selected_inventories.push({id: this.$store.state.invoice.invoice_inventory_details[index].id, return_quantity: parseInt(this.return_quantity[index]), sku: this.$store.state.invoice.invoice_inventory_details[index].details['product_code_sku'] , item_description: this.$store.state.invoice.invoice_inventory_details[index].details['item_description'],  client_category_id: this.$store.state.invoice.invoice_inventory_details[index].client_category.id});              
          }
          this.return_quantity[index] = ''
        })
        if (quant_flag){
          if ((this.$store.state.customer_return_reason.grading_required === true) && (this.selected_inventories[0] !== undefined)) {
            // Grade Inventory
            if (this.selected_inventories.length === 1){
              this.$store.commit('setInvoice', {invoice: this.$store.state.invoice, customer_return_reason: this.$store.state.customer_return_reason, selected_inventory: this.selected_inventories[0] })
              this.$router.push({ name: 'Package'})
            }
            else {
              this.$toast.error("Please select inventory to return")
            }
          }
          else {
            // Save Inventory         

            if (this.selected_inventories.length > 0) {

              let no_grade_inventory_data = { 
                                              no_grade_inventory: { 
                                                invoice_id: this.$store.state.invoice.id, 
                                                customer_return_reason_id: this.$store.state.customer_return_reason.id, 
                                                selected_inventories: this.selected_inventories, 
                                              } 
                                            }
              this.$http.secured.post('/api/v1/store/invoices/save_inventories', no_grade_inventory_data)
                .then(response => { 
                  if ((response.data !== null))
                   {
                    this.selected_inventories = []
                    this.$store.commit('setNoGrading', {no_grading: response.data })
                    this.$router.push({ name: 'NoGradingInventory'})
                   }
                })
                .catch(error => this.$toast.error('Error in saving inventory data'))

            }
            else {
              this.$toast.error("Please select inventory to return")
            }
          }
        }
        else {
          this.$toast.error("Please check entered quantity")
        }
      }

  }    
}
</script>

<style type="text/css" scoped>

.qc_test_ul3 li {
  float: left;
  width: 70%;
  text-align: center;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #777;
}

.table_clpp11 {
    float: left;
    width: 2%;
  }


</style>




