<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Edit Invoice Inventory Detail</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminInvoiceInventoryDetails'}">List Invoice Inventory Details</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
      <form @submit.prevent="updateInvoiceInventoryDetail">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="distribution_center_id" class="d-flex">Invoice</label>
            <multiselect v-model="editInvoiceInventoryDetail.invoice_id" :options="select_invoice" label="invoice_number" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select invoice">
            </multiselect>
          </div>
          <div class="form-group col-md-6">
            <label for="client_category_id" class="d-flex">Client Category</label>
            <multiselect v-model="editInvoiceInventoryDetail.client_category_id" :options="select_client_category" label="name" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select client category">
            </multiselect>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="distribution_center_id" class="d-flex">Client Sku Master</label>
            <multiselect v-model="editInvoiceInventoryDetail.client_sku_master_id" :options="select_client_sku_master" label="code" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select client sku masters">
            </multiselect>
          </div>
        </div>
        <button type="submit" class="btn btn-primary my-2">Update</button>
      </form>
      
    </div>
  </div>

</template>

<script>
import Multiselect from 'vue-multiselect'
export default {

  data () {
    return {
      editInvoiceInventoryDetail: {
        'id': '',
        'invoice_id': '',
        'client_category_id': '',
        'client_sku_master_id': '',
        'details': {}
      },
      select_invoice: [],
      select_client_category: [],
      select_client_sku_master: [],
      all_invoices: this.$http.secured.get('/admin/invoices')
        .then(response => { this.select_invoice = response.data.invoices }),
      all_client_category: this.$http.secured.get('/admin/client_categories')
        .then(response => { this.select_client_category = response.data.client_categories }),
      all_client_sku_masters: this.$http.secured.get('/admin/client_sku_masters')
        .then(response => { this.select_client_sku_master = response.data.client_sku_masters })
    }
  },
  components: {
    Multiselect
  },
  created () {
    this.$http.secured.get('/admin/invoice_inventory_details/'+this.$route.params.id)
        .then(response => { this.editInvoiceInventoryDetail = response.data.invoice_inventory_detail })
        .catch(error => this.$toast.error('Error in getting invoice inventory details'))
  },

  methods:{
    updateInvoiceInventoryDetail () {
      this.$http.secured.put('/admin/invoice_inventory_details/'+this.$route.params.id, {invoice_inventory_detail: { invoice_id: this.editInvoiceInventoryDetail.invoice_id.id, client_category_id: this.editInvoiceInventoryDetail.client_category_id.id, client_sku_master_id: this.editInvoiceInventoryDetail.client_sku_master_id.id } })
        .then(response => {
          this.$router.push('/admin/invoice_inventory_details');
          this.$toast.success('Invoice Inventory Details successfully updated');
        })
        .catch(error => this.$toast.error('Error in updating Invoice Inventory Details'))
    }
  }

}

</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>