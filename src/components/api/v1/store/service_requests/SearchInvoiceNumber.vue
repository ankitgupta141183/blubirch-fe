<template>
  <div>
    <div class="rigt_navbar" id="content">
      <div style="text-align: left;">
        <ul class="breadcrambs display_non">
          <li>Return Management</li>
          <li><i class="fa fa-chevron-right"></i></li>
          <li><a href="#">New Claim</a></li>
        </ul>
        <h3 class="main_header display_non">New Claim</h3>
      </div>
      <div class="invoic_srch" style="">
        <div class="invoic_srcw pdong_btm">
          <h3 class="sub_header1">Invoice Number</h3>
          <form @submit.prevent="searchInvoice">
            <div class="form_group1">
              <i class="fa fa-search" aria-hidden="true"></i>
              <input class="search_form" type="text" v-model="invoice_number" placeholder="Scan or Enter the Invoice Number">
              <div v-if="invoice_not_found_error">
                <div class="warning_img" style="text-align: center;">
                  <div class="warnig_imgw">
                    Unfortunetly coudn’t find the invoice number
                  </div>
                </div>
              </div>
            </div>
            <button class="main_button" type="submit">Search</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'SearchInvoiceNumber',
    data () {
      return {
        invoice_number: '',
        invoice_not_found_error: false,
      }
    },
    methods: {
      searchInvoice() {        
        this.$http.secured.get('/api/v1/store/invoices/fetch_inventories?invoice_number='+this.invoice_number)
        .then(response => {
          if (((response.data !== null) && (response.data.invoice !== null)))
          {
            this.$store.commit('setInvoice', {invoice: response.data.invoice})
            this.$router.push({name:"SelectCustomerReturnReason"})          
          }        
          else
          {
            this.invoice_not_found_error = true
          }
        })
        .catch(error => {
          this.$toast.error('Error in fetching invoice')
        })     
      }
    }
  }
</script>