<template>

	<div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">List Invoices</div>
        <div class="p-2">
          <router-link :to="{ name: 'NewAdminInvoice' }">Add New Invoice</router-link>
        </div>
      </div>
    </div>
    
    <div class="card-body">
      <div class="table-responsive-md">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th>Distribution Center</th>
              <th>Invoice Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <multiselect v-model="distribution_center_id" :options="select_distribution_center" label="name" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select distribution center">
                </multiselect>
              </td>
              <td>
                <input class="form-control" type="text" placeholder="Search Invoice Number" aria-label="Search" v-model="invoice_number" v-on:keyup.enter="getInvoices">
              </td>
              <td>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-on:click="getInvoices">Search</button>
                <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" v-on:click="reset_search">Reset</button>
              </td>
            </tr>
            <tr v-for="invoice in invoices" :key="invoice.id" :role="invoice">                
              <td scope="row">
                {{invoice.id}}
              </td>
              <td>
                {{invoice.distribution_center.name}}
              </td>
              <td>
                {{invoice.invoice_number}}
              </td>
              <td>
              	<router-link :to="{ name: 'ShowAdminInvoice', params: { id: invoice.id }}">
                	<i class="fa fa-eye"></i>
                </router-link>                  
                <router-link :to="{ name: 'EditAdminInvoice', params: { id: invoice.id }}">
                	<i class="fa fa-edit"></i>
                </router-link>
                <a href="javascript:void(0)" class="icon">
                  <i  v-on:click="onDelete(invoice)" class="fas fa-trash-restore-alt"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="card-footer pb-0 pt-3">
          <paginate
            :page-count=total_pages
            :click-handler="getInvoices"
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
      invoices: [],
      pageOfItems: [],
      page: 1,
      total_pages: 1,
      invoice_number:'',
      distribution_center_id: '',
      select_distribution_center: [],
      all_distribution_centers: this.$http.secured.get('/admin/distribution_centers')
        .then(response => { this.select_distribution_center = response.data.distribution_centers })
    }
  },
  created() {
    this.getInvoices()
  },
  computed:{
    sortedClients(){
      return this.clients.slice().sort((a,b)=>{
        return a.id - b.id
      });
    }
  },
  methods: {
    getInvoices (page) {
      this.$http.secured.get('/admin/invoices',  {params: {page: page, distribution_center_id: this.distribution_center_id.id, invoice_number: this.invoice_number}} )
        .then(response => {
                            this.invoices = response.data.invoices, 
                            this.total_pages = response.data.meta.total_pages
                          })
        .catch(error => this.$toast.error('Error in fetching invoices'))
    },
    onDelete(invoice){
      this.$http.secured.delete(`/admin/invoices/${invoice.id}`)
        .then(response => {
          this.invoices.splice(this.invoices.indexOf(invoice), 1);
          this.$toast.error('Invoice deleted successfully');
        })
        .catch(error => this.$toast.error('Error in deleting invoice'))
    },
    reset_search () {
      this.distribution_center_id = ''
      this.invoice_number = ''
      this.getInvoices()
    }
  }
  
}

</script>
