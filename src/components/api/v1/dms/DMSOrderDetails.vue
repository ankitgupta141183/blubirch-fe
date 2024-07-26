<template>

  <div>
  <v-card>
  <div>
      <v-alert dense border="bottom" :value="alert" text type="success" >
      {{alert_message}}</v-alert>
    </div>

    <v-card-title>
      <div style="color:#1B3A57;font-size: 32px;">Order Details</div>
    </v-card-title>
    <v-container>
      <v-layout>
        <v-flex>
          <v-card class="smart_font">
            <v-row>
              <v-col cols="4" sm="4" >
              <span class="ma-2 header-color detail_header" justify="center">Order Number:</span>
                <span class="text-no-wrap text-example">{{order.order_number}}</span>
              </v-col>
              <v-col cols="4" sm="4">
                <span class="ma-2 header-color detail_header" justify="center">Sale Manager:</span>
                <span>{{order.dealer_name}}</span>
              </v-col>
              <v-col cols="4" sm="4">
                <span class="ma-2 header-color detail_header" justify="center">Vendor Code:</span>
                <span>{{order.dealer_code}}</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4" sm="4">
                <span class="ma-2 header-color detail_header" justify="center">Order Date:</span>
                <span>{{ order.created_at }}</span>
              </v-col>
              <v-col cols="4" sm="4">
                <span class="ma-2 header-color detail_header" justify="center">Quantity:</span>
                <span>{{ order.quantity }}</span>
              </v-col>
              <v-col cols="4" sm="4">
                <span class="ma-2 header-color detail_header" justify="center">Order Amount:</span>
                <span>{{ order.order_amount}}</span>
              </v-col>
            </v-row>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-card-title>
      <v-text-field prepend-inner-icon="mdi-magnify" v-model="search" label="Search item" single-line></v-text-field>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-card-actions>
        <v-btn 
          @click="saveClose"
          class="ma-2"
          color="normal"
          >Save & Close</v-btn>
        <v-btn @click="rejectConfirmation"
          class="ma-2"
          color="normal"
          >Reject</v-btn>
        <v-btn @click="approveConfirmation"
          class="ma-2"
          color="primary"
          >Approve</v-btn>
      </v-card-actions>
    </v-card-title>

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="headline" center>Are you sure you want to reject ?</span>
          </v-card-title>
          <v-card-title>
            <span class="headline" center>Order Number : {{ order.order_number}}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
            </v-container>
          </v-card-text>
          <v-card-text>
            <v-textarea solo name="input-7-4" v-model="order.remarks" label="Reject Reason"></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="primary" @click="confirmation('Reject')">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="confirm_dialog" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="headline">Are you sure you want to approve ?</span>
          </v-card-title>
            <v-card-title>
            <div center>Order Number : {{ order.order_number}}</div>
            </v-card-title>

           <v-card-title>
            <div  center> Approve Quantity : {{order.approved_quantity}} </div>
          </v-card-title>
         <v-card-title>
            <div class="headline" center>Rejected Quantity: {{order.rejected_quantity}}</div>
          </v-card-title>
          <v-card-text>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="confirm_dialog = false">Close</v-btn>
            <v-btn color="primary" @click="confirmation('Accept')">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <div>
      <v-data-table
        :dense="true"
        :headers="headers"
        :items="order_details"
        :item-key="id"  
        :search="search"
        :fixed-header="true"
        class="elevation-1 smart_font"
        >

        <template v-slot:item.processed_discount_percentage = "{item}">
          <v-text-field outlined dense  label="Discount %" v-model="item.processed_discount_percentage"  :disabled ="item.save_status"  style="margin-top:10px;width:120px;"/>
        </template>
        <template v-slot:item.processed_quantity = "{item}">

          <v-text-field outlined dense clearable   v-model="item.processed_quantity"  :disabled ="item.save_status" v-on:change="qtyCheck(item)" style="margin-top:10px;width:125px;"/>
        </template>
        <template v-slot:item.actions="{ item }">
          <button><img style="width: 25px; height: 25px;" src="@/assets/images/Edit_pencil.png" @click="item.save_status = false" v-if="item.save_status == true"></button> 
          <button><img style="width: 25px; height: 25px;" src="@/assets/images/edit.png" v-if="item.save_status == false"></button> 
          <button><img src="@/assets/images/pdf.png" v-if="item.save_status == true"></button> 
          <button><img src="@/assets/images/save.png"  @click="editOrder(item)" v-if="item.save_status == false"></button>             
            
        </template>
      </v-data-table>
    </div>
  </v-card>
</div>
</template>

<style scoped>
.theme--light.v-icon {
  color: #1867c0;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  font-size: 14px !important;
}
.v-card {
  max-width: 97% !important;
  margin-top: 20px;
}
.v-card-100 {
  max-width: 100% !important;
}
.v-text-field >>> input {
    font-size: 14px;
    font-weight: 100;
    text-transform: capitalize;
}
.v-text-field >>> label {
    font-size: 14px;
}
.v-text-field >>> button {
    font-size: 14px;
}
.detail_header {
  font-size: 14px;
  font-weight: 600;
  color: #25282B;
}
.smart_font {
  font-size: 14px;
  font-weight: normal;
}

@media (min-width: 1264px) {
  .container {
  max-width: 224%;
  padding: 0px;
  margin-left:10px;
}
}
</style>

<script>

import Editor from "@tinymce/tinymce-vue";

export default {
  data() {
    return {
      page: 1,
      order_details: [],
      pageCount: 0,
      itemsPerPage: 10,
      search: '',
      processed_discount_percentage: '',
      processed_quantity: '',
      order: {
          'approved_quantity': 0,
          'rejected_quantity': 0,
          'approved_amount': 0,
          'approved_amount': 0,
          'remarks': ''
          },
      status: '',
      headers: [
        {
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'SKU', value: 'sku_master_code' },
        { text: 'item Description', value: 'item_description' },
        { text: 'Available Quantity', value: 'available_quantity' },
        { text: 'Ordered Quantity', value: 'quantity' },
        { text: 'Processed Quantity', value: 'processed_quantity' },
        { text: 'Amount', value: 'unit_price' },
        { text: 'Discount(%)', value: 'processed_discount_percentage' },
        { text: 'Final Amount', value: 'total_amount' },
        { text: "Action", value: "actions" }

      ],
      dialog: false,
      confirm_dialog: false,
      alert_message: '',
      alert: false,

    };
  },
  created(){
    this.order = this.$store.state.order;
    this.getOrderDetails()
  },
  components: {
    editor: Editor
  },
  methods: {
    editOrder(item){
      item.total_amount = (item.processed_quantity*item.unit_price)*(1 - item.processed_discount_percentage/100)
      this.$http.secured.post('/api/v1/dms/dealer_order_approvals/update_dealer_order_item', { id: item.id,
        processed_quantity: item.processed_quantity,  discount: item.processed_discount_percentage, final_amount: item.total_amount })
        .then(response => { 
          this.$toast.success('Order Item Updated Sucessfully')
        })
         .catch(error => this.$toast.error('Error in fetching order item'))
         item.save_status = true
    },
    qtyCheck(item){
      if(item.quantity < item.processed_quantity){
        this.$toast.error('Please check Quantity')
        return;
      }
    },
    rejectConfirmation(){
      this.dialog = true;
  },

    approveConfirmation(){
      this.order.approved_quantity = 0
      this.order.rejected_quantity = 0
      this.order.approved_amount = 0
      this.order.rejected_amount = 0
      for(var i =0; i < this.order_details.length; i ++){
        this.order.approved_quantity = (this.order.approved_quantity + parseFloat(this.order_details[i].processed_quantity))
        this.order.rejected_quantity = (this.order.rejected_quantity + (parseFloat(this.order_details[i].quantity) - parseFloat(this.order_details[i].processed_quantity)))
        this.order.approved_amount = (this.order.approved_amount + (parseFloat(this.order_details[i].processed_quantity)*(this.order_details[i].unit_price)))
        this.order.rejected_amount = (this.order.rejected_amount + ((parseFloat(this.order_details[i].quantity) - parseFloat(this.order_details[i].processed_quantity))*(this.order_details[i].unit_price)))
     }
      this.confirm_dialog = true;
    },
    getOrderDetails(){

      this.$http.secured.post('/api/v1/dms/dealer_order_approvals/dealer_order_item_list', { order_id: this.order.id } )
        .then(response => {
          for(var i =0; i < response.data.length; i ++){
            if (response.data[i].processed_quantity == null){
              response.data[i].processed_quantity =  response.data[i].quantity
            }
            response.data[i].save_status = true
            }
            this.order_details = response.data
        })
        .catch(error => this.$toast.error('Error in fetching orders'))
    },
    confirmation(value){
      if (value == "Reject"){
        this.alert_message = "Order Rejected Sucessfully"
        this.dialog = false
        this.alert = true
        this.status = 'Rejected'
        this.saveOrder()

      } 
      else {
        this.alert_message = "Order Accepted Sucessfully"
        this.confirm_dialog = false
        this.alert = true
        this.status = 'Approved'
        this.saveOrder()
      }
    },
    saveOrder(){
      
      this.$http.secured.post('/api/v1/dms/dealer_order_approvals/approve_reject_order', { id: this.order.id,
        remarks: this.order.remarks, approved_amount: this.order.approved_amount, rejected_amount: this.order.rejected_amount, approved_quantity: this.order.approved_quantity, rejected_quantity: this.order.rejected_quantity, status: this.status})
        .then(response => { 
          this.$toast.success('Order Updated Sucessfully')
          this.$router.push({name: "DMSOrders"})

        })
        .catch(error => this.$toast.error('Error in updating order'))
      
    },
    saveClose(){
      this.$http.secured.post('/api/v1/dms/dealer_order_approvals/approve_reject_order', { id: this.order.id,
        status: 'Edited' })
        .then(response => { 
          this.$toast.success('Order Updated Sucessfully')
          this.$router.push({name: "DMSOrders"})
        })
        .catch(error => this.$toast.error('Error in updating order'))
      
      
    }
  },

};
</script>
