<template>
  <div class="card mt-4">
    <div class="card-header">
        <div class="d-flex">
           <div class="mr-auto p-2">List Remainders</div>
           <div class="p-2">
             <router-link :to="{name:'NewAdminReminder'}"> Add New Remainders </router-link>
           </div>
        </div>    
    </div>

    <div class="card-body">
      <div class="table-responsive-md">
          <table class="table">
              <thead class="thead-dark">
                  <tr>
                    <th scope="col">SKU</th>
                    <th>category</th>
                    <th>status</th>
                    <th>Return reason</th>
                    <th>Action</th>
                  </tr>
              </thead>
              <tbody>
            <tr>
              <td>
                <multiselect id="sku_id" placeholder="Select SKU" v-model= "search.skus" :options="skus" :multiple="true" label="code" track-by="id" @input="assignSku"></multiselect>
              </td>
              <td>   
              <!-- <input class="form-control col-lg-4 col-centered" type="text" placeholder="Search Catagory" aria-label="Search" v-model="search.category" v-on:keyup.enter="getReminders"> -->
             
                <multiselect id="client_category_id" placeholder="Select Client category" v-model= "search.client_categories" :options="client_categories" :multiple="true" label="name" track-by="id" @input="assignClientCategory"></multiselect>              
              </td>
              <td>                
                <multiselect id="status_id" placeholder="Select Status" v-model= "search.status" :options="status" :multiple="true" label="original_code" track-by="id" @input="assignStatus"></multiselect>
              </td>
              <td>                
              <multiselect id="return_reason_id" placeholder="Select Return Reason" v-model= "search.customer_return_reasons" :options="customer_return_reassons" :multiple="true" label="name" track-by="id" @input="assignReturnReason"></multiselect>              
              </td>                                                       
              <td>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-on:click="getReminders">Search</button>
                <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" v-on:click="reset_search">Reset</button>
              </td>
            </tr>                
                  <tr v-for="reminder in reminders" :key="reminder.id" :reminder="reminder">
                      <td scope="row">
                        {{reminder.client_sku_master.code }}
                      </td>                      
                      <td>
                        {{reminder.client_category.name}}
                      </td>
                      <td>
                        {{reminder.status?reminder.status.original_code:""}}
                      </td>
                      <td>
                        {{reminder.customer_return_reason.name}}
                      </td>                      
                      <td>
                          <router-link :to="{name:'ShowAdminReminder', params:{id: reminder.id }}">
                            <i class="fa fa-eye"></i>
                          </router-link>
                          <router-link :to="{name:'EditAdminReminder', params:{id: reminder.id }}">
                            <i class="fa fa-edit"></i>
                          </router-link>
                          <a href="javascript:void(0)" class="icon">
                            <i  v-on:click="onDelete(reminder)" class="fas fa-trash-restore-alt"></i>
                          </a>
                      </td>
                  </tr>
              </tbody>             
          </table>
          <div class="card-footer pb-0 pt-3">
              <paginate
                :page-count=total_pages
                :click-handler="getReminders"
                :prev-text="'Prev'"
                :next-text="'Next'"
                :container-class="'pagination_custom'"
                :prev-class="'page-item'"
                :first-last-button = true
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
    data(){
        return {
          skus:[],
          status:[],
          client_categories:[],
          customer_return_reassons: [],
          reminders:[],
          search: {},
          name: '',
          category:'',
          // status:'', 
          return_reason:'',           
          page: 1,
          meta: '',
          total_pages: 1,
          sku_master_id:'',
          reminder_status_id:'',
          reminder_client_categories_id:'',
          customer_return_reasons_id:''
        }
    },
    created(){
      this.getClientCategories()
      this.getSkus()
      this.getCustomerReturnReasons()
      this.getStatus()

      this.getReminders()
    },
    methods:{

    getSkus () {
      this.$http.secured.get('/api/v1/lookups/get_client_sku_masters')
        .then(response => {this.skus = response.data.client_sku_masters })
        .catch(error => this.$toast.error('Error in fetching skus'))
    },
    maplookupValues(list){
      var roots = [], i, j;
      for (i = 0; i < list.length; i ++) {
        let lookup_values = list[i].lookup_values
          for(j=0;j<lookup_values.length;j++){
            roots.push(lookup_values[j]);
          }
      }
      return roots;
    },
    getStatus () {
      this.$http.secured.get('/api/v1/lookups/reminder_status')
        .then(response => {this.status = this.maplookupValues(response.data.lookup_keys)
         })
        .catch(error => this.$toast.error('Error in fetching status'))
    },
    getClientCategories () {
      this.$http.secured.get('/api/v1/lookups/get_client_categories')
        .then(response => {this.client_categories = response.data.client_categories })
        .catch(error => this.$toast.error('Error in fetching Client Categroies'))
    },
    getCustomerReturnReasons () {
        this.$http.secured.get('/api/v1/lookups/get_customer_return_reasons')
          .then(response => { this.customer_return_reassons = response.data.customer_return_reasons })
          .catch(error => this.$toast.error('Error in fetching customer return reasons'))
    },

    assignSku () {
      if (this.search.skus != null) {
          this.sku_master_id = this.search.skus.map(
        function(sku){
          return Number(sku.id);
        })
      }
    },

    assignStatus () {
      if (this.search.status != null) {
        this.reminder_status_id = this.search.status.map(
        function(status){
          return Number(status.id);
        })
      }
    },

    assignReturnReason () {
      if (this.search.customer_return_reasons != null) {
        this.customer_return_reasons_id = this.search.customer_return_reasons.map(
        function(customer_return_reason){
          return Number(customer_return_reason.id);
        })
      }  
        },

    assignClientCategory () {
      if (this.search.client_categories != null) {
        this.reminder_client_categories_id = this.search.client_categories.map(
        function(client_categories){
          return Number(client_categories.id);
        })
      }
    },

    getReminders(page) {
        let search_param = {
            params:
            {
              page:page,
              sku_master_id: this.sku_master_id,
              status_id: this.reminder_status_id,
              customer_return_reason: this.customer_return_reasons_id,
              client_category_id: this.reminder_client_categories_id
            }
        }
        this.$http.secured.get('/admin/reminders', page? search_param:{ params: { page:page } })
        .then(response => { this.reminders = response.data.reminders, this.total_pages = response.data.meta.total_pages })
        .catch(error => this.$toast.error('Error in fetching reminders'))
    },
    onDelete(reminder){
        this.$http.secured.delete(`/admin/reminders/${Number(reminder.id)}`)
        .then(response => {
        this.reminders.splice(this.reminders.indexOf(reminder), 1);
        this.$toast.error('Reminders deleted successfully');
        })
        .catch(error => this.$toast.error('Error in deleting reminders'))
    },
    reset_search () {
        this.reminder_status_id = ''
        this.reminder_status_id = ''
        this.customer_return_reasons_id = ''
        this.reminder_client_categories_id = ''

        this.search.skus = ''
        this.search.status = '' 
        this.search.customer_return_reasons = ''
        this.search.client_categories = ''         
        this.getReminders()
    },
                                                        
    }
}
</script>