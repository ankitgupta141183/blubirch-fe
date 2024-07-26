<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Show Invoice Inventory Details</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminInvoiceInventoryDetails'}">List Invoice Inventory Details</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group row">
            <label for="code" class="col-4 col-form-label">Id:</label> 
            <div class="col-8">
              {{invoice_inventory_detail.id}}
            </div>
          </div>
          <div class="form-group row">
            <label for="name" class="col-4 col-form-label">Invoice:</label> 
            <div class="col-8">
              {{invoice_inventory_detail.invoice}}
            </div>
          </div>
          <div class="form-group row">
            <label for="code" class="col-4 col-form-label">Client Category Id:</label> 
            <div class="col-8">
              {{invoice_inventory_detail.client_category}}
            </div>
          </div>
          <div class="form-group row">
            <label for="code" class="col-4 col-form-label">Client Sku Master:</label> 
            <div class="col-8">
              {{invoice_inventory_detail.client_sku_master}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>



<script>

export default {

  data () {
    return {
      invoice_inventory_detail: {
        id: '',
        invoice_id: '',
        client_category_id: '',
        client_sku_master_id: '',
        details: '',
        created_at: '',
        updated_at: ''
      }
    }
  },
  created() {
    this.getInvoiceInventoryDetail()
  },
  methods: {
    getInvoiceInventoryDetail () {
      this.$http.secured.get('/admin/invoice_inventory_details/'+this.$route.params.id)
        .then(response => {
          this.invoice_inventory_detail = response.data.invoice_inventory_detail;          
        })
        .catch(error => {
          this.$toast.success('Error in fetching value')
        })
    }
  }

}

</script>