<template>

	<div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">List Invoices</div>
        <div class="p-2">
          <router-link :to="{ name: 'NewAdminInvoiceInventoryDetail' }">Add New InvoiceInventoryDetail</router-link>
        </div>
      </div>
    </div>
    
    <div class="card-body">
      <div class="table-responsive-md">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th>Invoice</th>
              <th>Client Category</th>
              <th>Client Sku Master</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <multiselect v-model="invoice_id" :options="select_invoice" label="invoice_number" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select invoice">
                </multiselect>
              </td>
              <td>
                <multiselect v-model="client_category_id" :options="select_client_category" label="name" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select Client Category">
                </multiselect>
              </td>
              <td>
                <multiselect v-model="client_sku_master_id" :options="select_client_sku_master" label="code" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select client sku master">
                </multiselect>
              </td>
              <td>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-on:click="getInvoiceInventoryDetails">Search</button>
                <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" v-on:click="reset_search">Reset</button>
              </td>
            </tr>
            <tr v-for="invoice_inventory_detail in invoice_inventory_details" :key="invoice_inventory_detail.id" :role="invoice_inventory_detail">                
              <td scope="row">
                {{invoice_inventory_detail.id}}
              </td>
              <td>
                {{invoice_inventory_detail.invoice ? invoice_inventory_detail.invoice.invoice_number : ''}}
              </td>
              <td>
                {{invoice_inventory_detail.client_category.name}}
              </td>
              <td>
                {{invoice_inventory_detail.client_sku_master.code}}
              </td>
              <td>
              	<router-link :to="{ name: 'ShowAdminInvoiceInventoryDetail', params: { id: invoice_inventory_detail.id }}">
                	<i class="fa fa-eye"></i>
                </router-link>                  
                <router-link :to="{ name: 'EditAdminInvoiceInventoryDetail', params: { id: invoice_inventory_detail.id }}">
                	<i class="fa fa-edit"></i>
                </router-link>
                <a href="javascript:void(0)" class="icon">
                  <i  v-on:click="onDelete(invoice_inventory_detail)" class="fas fa-trash-restore-alt"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="card-footer pb-0 pt-3">
          <paginate
            :page-count=total_pages
            :click-handler="getInvoiceInventoryDetails"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination_custom'"
            :prev-class="'page-item'"
            :first-last-button=true
            :next-class="'page-item'"
            :page-class="'page-item'">
          </paginate>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  
  data () {
    return {
      invoice_inventory_details: [],
      pageOfItems: [],
      page: 1,
      total_pages: 1,
      invoice_id: '',
      client_category_id: '',
      client_sku_master_id: '',

      select_invoice: [],
      select_client_category: [],
      select_client_sku_master: [],
      all_invoices: this.$http.secured.get('/admin/invoices')
        .then(response => { this.select_invoice = response.data.invoices }),
      all_client_category: this.$http.secured.get('/admin/client_categories/get_all_client_category')
        .then(response => { 
        this.select_client_category = response.data.client_categories }),
      all_client_sku_masters: this.$http.secured.get('/admin/client_sku_masters')
        .then(response => { this.select_client_sku_master = response.data.client_sku_masters })
    }
  },
  created() {
    this.getInvoiceInventoryDetails()
  },
  computed:{
    // sortedClients(){
    //   return this.invoice_inventory_details.slice().sort((a,b)=>{
    //     return a.id - b.id
    //   });
    // }
  },
  methods: {
    getInvoiceInventoryDetails (page) {
      this.$http.secured.get('/admin/invoice_inventory_details',  {params: {page: page, invoice_id: this.invoice_id.id, client_category_id: this.client_category_id.id, client_sku_master_id: this.client_sku_master_id.id }} )
        .then(response => {
                            this.invoice_inventory_details = response.data.invoice_inventory_details, 
                            this.total_pages = response.data.meta.total_pages
                          })
        .catch(error => this.$toast.error('Error in fetching invoice inventory details'))
    },
    onDelete(invoice_inventory_detail){
      this.$http.secured.delete(`/admin/invoice_inventory_details/${invoice_inventory_detail.id}`)
        .then(response => {
          this.invoice_inventory_details.splice(this.invoice_inventory_details.indexOf(invoice_inventory_detail), 1);
          this.$toast.error('Invoice inventory detail deleted successfully');
        })
        .catch(error => this.$toast.error('Error in deleting invoice inventory detail'))
    },
    reset_search () {
      this.invoice_id = ''
      this.client_category_id = ''
      this.client_sku_master_id = ''
      this.getInvoiceInventoryDetails()
    }
  }
  
}

</script>
