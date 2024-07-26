<template>
  <div>
    <div class="mobile_head">
      <button class="menu_toggle sidebarCollapse"><i class="fa fa-bars"></i></button><h3 class="main_header">Customer Returns</h3>
    </div>
    <div class="rigt_navbar" id="content">
      <div style="text-align: left;">
        <ul class="breadcrambs display_non">
            <li>Return Management</li>
            <li><i class="fa fa-chevron-right"></i></li>
            <li><a href="#">Return Request</a></li>
        </ul>
        <h3 class="main_header display_non">Return Request</h3>
         <div class="invoc_table no_margin">
            <div class="table_hed_1"><h4 class="table_head1">Invoice Number : <span>{{this.invoice.invoice_number}} <a :href="file_url" download> <img v-on:click="showReturnReqDetails(file_url)" src="@/assets/images/icons/info.svg" width="14px" height="14px" class="img-responsive"></a></span></h4> </div>
            <div class="table_hed_1"><h4 class="table_head1">Customer Name : <span>{{this.invoice.details.customer_name}}</span></h4></div>
            <div class="table_hed_1"><h4 class="table_head1">Total Amount : <span><i class="fa fa-inr"></i> {{this.invoice.details.net_value}}</span></h4></div>
            <div class="table_hed_1"><h4 class="table_head1">Customer Ph. no : <span>{{this.invoice.details.contact_no ?  this.invoice.details.contact_no: '9876245679'}}</span></h4></div>
            <div class="table_hed_1"><h4 class="table_head1">Customer Email : <span>{{this.invoice.details.email ?  this.invoice.details.email: 'sne@gmail.com'}}</span></h4></div>
            <div class="table_hed_1"><h4 class="table_head1">Customer Address : <span>{{this.invoice.details.address ?  this.invoice.details.address: 'Bangalore'}}</span></h4></div>
            <div class="table_hed_1"><h4 class="table_head1">Customer Id : <span>{{this.invoice.details.customer_id ?  this.invoice.details.customer_id: 'CT117'}}</span></h4></div>
            <div class="table_hed_1"><h4 class="table_head1">Customer Type : <span>{{this.invoice.details.customer_type ?  this.invoice.details.customer_type: 'Gold'}}</span></h4></div>
            <div class="table_hed_1"><h4 class="table_head1">Order Status : <span>{{this.invoice.details.order_status}}</span></h4></div>
             <div class="table_hed_1"><h4 class="table_head1">Invoice Created At : <span>{{this.invoice.details.created_date}}</span></h4></div>
        </div>
        </div>
        <div class="invoic_srch">
            <div class="invoic_srcw pdong_btm">
                <h3 class="sub_header1">Select a Return Reason</h3>
                <form @submit.prevent="ReturnReasonSelect" >
                  <div class="form_group1">
                    <multiselect id="return_reason_id" placeholder="Select Return Reason" v-model= "return_reason" :options="invoice.return_reasons" label="name" track-by="id"></multiselect>              
                    <div v-if="return_request_error">
                      <div class="warning_img" style="text-align: center;">
                        <div class="warnig_imgw">
                          Please Select Return Reason
                        </div>
                      </div>
                    </div>
                  <button class="main_button" style="margin-top: 15px;">Proceed</button>
                   </div> 

                </form>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

  import { mapState } from 'vuex';

  export default {
    name: 'SelectCustomerReturnReason',
    data () {   
      return {
        return_request_error: false,
        file_url:'https://cybers3app-dev.s3-us-west-2.amazonaws.com/sbd+invoice.xlsx',
        return_reason: ''
      }
    },
    computed: {
      ...mapState([
        'invoice'
      ])
    },
    methods: {
      ReturnReasonSelect (){
        if (this.return_reason === ""){
          this.return_request_error = true
            return;
        }
        if (this.$store.state.invoice.available_return_reasons.find(return_reason => return_reason.id === parseInt(this.return_reason.id)))
        {
          this.$store.commit('setInvoice', {invoice: this.$store.state.invoice, customer_return_reason: this.return_reason })
          this.$router.push({name: "SelectInventoryList"})
        }
        else{
          this.$toast.error('This Return Request has already been sent for approval')
          return
        }
      },
      showReturnReqDetails(file_url){
      }
    }
  }
</script>
<style>

.toast{max-width:600px;}

</style>
