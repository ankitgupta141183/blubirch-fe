<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">New InvoiceInventoryDetail</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminInvoiceInventoryDetails'}">List Invoice Inventory Detail</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <!-- <form @submit.prevent="addInvoiceInventoryDetail">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="lookup_key" class="d-flex">Invoice</label>
              <multiselect v-model="newInvoiceInventoryDetail.invoice_id" :options="select_invoice" label="invoice_number" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select Invoice Inventory Detail">
              </multiselect>
            </div>
          <button type="submit" class="btn btn-primary my-2">Create</button>
        </form> -->
        <hr/>
        <form @submit.prevent="importFile" enctype="multipart/form-data">
          <div class="form-group">
            <label for="file" class="label">Import Invoice Inventory Detail File </label>
            <input type="file" class="form-control-file" ref="file" @change="selectFile" />
            <button class="btn btn-primary my-2">Import File</button>
          </div>
        </form>
      
    </div>
  </div>	

</template>



<script>
import Multiselect from 'vue-multiselect'
export default {
  data () {
    return {
      select_invoice: [],
      select_client_category: [],
      select_client_sku_master: [],

      newInvoice: {
        'invoice_id': '',
        'client_category_id': '',
        'client_sku_master_id':'',
        'details': {}
      },

      all_invoices: this.$http.secured.get('/admin/invoice_inventory_details')
        .then(response => { this.select_invoice = response.data.invoices })
      }
  },

  methods:{
  	// addInvoice () {      
   //    this.$http.secured.post('/admin/invoice_inventory_details', {invoice_inventory_detail: { invoice_id: this.newInvoiceInventoryDetail.invoice_id.id, client_category_id: this.newInvoice.client_category_id.id, client_sku_master_id: this.newInvoice.client_sku_master_id.id}})
   //      .then(response => {
   //        this.$router.push('/admin/invoice_inventory_details');
   //        this.$toast.success('Invoice Inventory Detail successfully created');
   //      })
   //      .catch(error => this.$toast.error('Error in creating Invoice Inventory Detail'))
   //  },
    selectFile(){
      this.file = this.$refs.file.files[0];
    },
    importFile () {  
      const formData = new FormData()
      formData.append('file', this.file)
      this.$http.secured.post('/admin/invoice_inventory_details/import',formData)
        .then(response => {
          this.$router.push('/admin/invoice_inventory_details');
          this.$toast.success('File Imported Successfully');
        })
        .catch(error => this.$toast.error('Error in importing invoice inventory details'))
    } 
  }

}

</script>