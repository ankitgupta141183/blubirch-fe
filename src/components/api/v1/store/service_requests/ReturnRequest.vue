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
            <li><a href="#">Service Executive</a></li>
        </ul>
        <h3 class="main_header display_non">Service Executive</h3>
      </div>
      <div class="invoc_table no_margin">
        <div class="table_hed_1"><h4 class="table_head1">Invoice Number : <span>{{this.invoice_data.invoice_number}} <a :href="file_url" download> <img v-on:click="showReturnReqDetails(file_url)" src="@/assets/images/icons/info.svg" width="14px" height="14px" class="img-responsive"></a></span></h4>   
        </div>
        <div class="table_hed_1"><h4 class="table_head1">Customer Name : <span>{{this.invoice_data.details.customer_name}}</span></h4></div>
        <div class="table_hed_1"><h4 class="table_head1">Total Amount : <span><i class="fa fa-inr"></i> {{this.invoice_data.details.net_value}}</span></h4></div>
        <div class="table_hed_1"><h4 class="table_head1">Customer Ph. no : <span>{{this.invoice_data.details.customer_contact}}</span></h4></div>
        <div class="table_hed_1"><h4 class="table_head1">Order Status : <span>{{this.invoice_data.details.order_status}}</span></h4></div>
         <div class="table_hed_1"><h4 class="table_head1">Invoice Created At : <span>{{this.invoice_data.details.created_date}}</span></h4></div>
        </div>
        <div class="invoic_srch">
            <div class="invoic_srcw pdong_btm">
                <h3 class="sub_header1">Select a Return Reason</h3>
                <form @submit.prevent="ReturnReasonSelect" >
                  <div class="form_group1">

              <multiselect id="return_reason_id" placeholder="Select Return Reason" v-model= "return_req.customer_return_reasons" :options="customer_return_reassons" label="name" track-by="id" @input="assignReturnReason"></multiselect>              
                  </div>
                  <button class="main_button">Proceed</button>
                </form>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'ReturnRequest',
    data () {   
      return {
        file_url:'https://cybers3app-dev.s3-us-west-2.amazonaws.com/sbd+invoice.xlsx',
        return_reasons: this.$store.state.customer_return_reasons,
        invoices: {},
        invoice: this.$store.state.invoice,
        customer_return_reassons:[],
        customer_return_reason:'',
        customer_return_reasson_id:'',
        return_req:{},
        invoice_data:this.$store.state.invoice
      }
    },
  created() {
    this.getCustomerReturnReasons()
  },    
    methods: {
    getCustomerReturnReasons () {
        this.$http.secured.get('/api/v1/store/invoices/get_return_reasons?invoice_number='+this.$store.state.invoice.invoice_number)
          .then(response => { this.customer_return_reassons = response.data.customer_return_reasons })
          .catch(error => this.$toast.error('Error in fetching customer return reasons'))
    }, 
    assignReturnReason () {
      this.customer_return_reasson_id = this.return_req.customer_return_reasons.id;
      this.customer_return_reason_name = this.return_req.customer_return_reasons.name;
      this.grading_required = this.return_req.customer_return_reasons.grading_required;
      this.customer_return_reason_data = this.return_req.customer_return_reasons;
    },         
      ReturnReasonSelect (){
        var test = this.$store.state.invoice;
       // this.$store.commit('setInvoice', {invoice: this.$store.state.invoice, return_reason: this.invoices['reason_return']["reason"], grading_required: this.invoices["reason_return"]["grading_required"]})
        this.$store.commit('setInvoice', {invoice: this.$store.state.invoice, return_reason: this.customer_return_reason_data, grading_required: this.grading_required})
        this.$router.push({name: "ReturnRequestList"})
      },
      showReturnReqDetails(file_url){
      }
    }
  }
</script>
