<template>
  <div class="main_wraper">
    <div style="text-align: left;">
    <ul class="breadcrambs display_non">
      <li>Grading</li>
      <li><i class="fa fa-chevron-right"></i></li>
      <li><a href="#">Grading Inventory</a></li>
    </ul>
    <h3 class="main_header display_non">Grading Inventory</h3>
    </div>
    <div class="invoic_srch" style="">
      <div class="invoic_srcw pdong_btm">
        <h3 class="sub_header1">Invoice Number</h3>
        <form>
          <div class="form_group1">
            <i class="fa fa-search" aria-hidden="true"></i>
            <input class="search_form" v-model="enter_inv_numb" type="text" placeholder="Scan or Enter Invoice Number">
            <div v-if="errors1.includes('invalid_invoice')">
              <div class="warning_img">
                <div class="warnig_imgw">
                  <img src="@/assets/images/icons/warning.svg">Unfortunetly coudn’t find the invoice number, Please enter the SKU of the product
                </div>
              </div>

              <div class="form_group2">
                <input class="search_frm1" type="text" v-model="enter_sku" placeholder="Enter the SKU">
                <div v-if="errors2.includes('invalid_sku')">
                  <div class="warning_img">
                    <div class="warnig_imgw">
                      <img src="@/assets/images/icons/warning.svg">Please Enter the Correct SKU Code
                    </div>
                  </div>
                </div>
              </div>

              <div class="form_group2">
                <select class="search_frm1" v-model="selected_reason">
                  <option value="">Customer Return reason</option>
                  <option value="Technical Defect">Technical Defect</option>
                  <option value="Physical Defect"> Physical Defect</option>
                  <option value="Change of Mind">Change of Mind</option>
                  <option value="Delay in Delivery/Installation">Delay in Delivery/Installation</option>
                  <option value="Units with missing Accessories">Units with missing Accessories</option>
                  <option value="Don't like it">Don't like it</option>
                </select>
                <div v-if="errors2.includes('invalid_reason')">
                  <div class="warning_img">
                    <div class="warnig_imgw">
                      <img src="@/assets/images/icons/warning.svg">Please choose the return reason
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
           <button v-if="!hideSearch" v-on:click="check_invoice(invoice_numbers)" class="main_button" type="submit">Search</button>          
        </form>         
        <button v-if="!hideGrading" v-on:click="check_sku(sku_codes, invoice_numbers)" class="main_button" type="submit">Proceed to Grading</button>
      </div>
      <div class="invoic_srw2 display_non">
        <h3 class="sub_header3">Workdone</h3>
        <h3 class="sub_header2">{{invoice_numbers.length}}</h3>
        <h3 class="sub_header4">Total Inventories</h3>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CustomerReturns',
    data () {
      return {
        enter_inv_numb: '',
        invoice_numbers: ["a123", "b123", "c123"],
        sku_codes: '',
        errors1: [],
        enter_sku: '',
        errors2: [],
        hideSearch: false,
        hideGrading: true,
        selected_reason: ''
      }
    },
    methods: {
      check_invoice(invoice_numbers) {
        if (invoice_numbers.includes(this.enter_inv_numb))
        {
          // this.$router.push('/invoice_table')
          this.$router.push({name: 'InvoiceTable', params: { id: this.enter_inv_numb }})
        }
        else
        {
          this.errors1.push('invalid_invoice')
          this.hideSearch = true
          this.hideGrading = false
        }
      },
      check_sku(sku_codes, invoice_numbers) {
        if (invoice_numbers.includes(this.enter_inv_numb))
        {
          this.$router.push({name: 'InvoiceTable', params: { id: this.enter_inv_numb }})
        }
        else
        {
          this.$http.secured.get('/api/v1/store/returns/customer_returns/check_sku', {params: {sku_code: this.enter_sku}})
          .then(response => { this.sku_codes = response.data
            if (this.sku_codes !== null) {
             if (this.selected_reason)
             {
              this.$router.replace("/")
            }
            else 
            {
              this.errors2.splice('invalid_sku')
              this.errors2.push('invalid_reason')
            }
          }
          else
          {
            this.hideGrading= false
            this.errors2.push('invalid_sku')
          }
        })
          .catch(error => this.$toast.error('Error in getting client sku master'))
        }
      }
    }
  }
</script>