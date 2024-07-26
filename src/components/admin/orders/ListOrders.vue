<template>
  <div class="card mt-4">
    <div class="card-header">
        <div class="d-flex">
           <div class="mr-auto p-2">List Orders</div>
           <div class="p-2">
             <router-link :to="{name:'NewAdminOrder'}"> Add New Order </router-link>
           </div>
        </div>
    
    </div>

    <div class="card-body">
      <div class="table-responsive-md">
          <table class="table">
              <thead class="thead-dark">
                  <tr>
                    <th scope="col">Client</th>
                    <th>Username</th>
                    <th>Order Number</th>
                    <th>Order Type</th>
                    <th>Action</th>
                  </tr>
              </thead>

              <tbody>
            <tr>
              <td>
                <multiselect id="client_ids" placeholder="Select Client name(s)" v-model= "search.client_ids" :options="client_ids" label="name" :multiple="true" track-by="id" @input="assignClients"></multiselect>

              </td>
              <td>                
                <multiselect id="user_ids" placeholder="Select User(s)" v-model= "search.user_ids" :options="user_ids" label="username" :multiple="true" track-by="id"  @input="assignUsers"></multiselect>
              </td>
              <td>
                <input class="form-control col-lg-4 col-centered" type="text" placeholder="Search Order Number" aria-label="Search" v-model="order_number" v-on:keyup.enter="getOrders">
              </td>
              <td>
                <multiselect id="order_type_ids" placeholder="Select Order Type(s)" v-model= "search.order_type_ids" :options="order_type_ids" label="original_code" :multiple="true" track-by="id"  @input="assignOrders"></multiselect>
              </td>                            
              <td>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-on:click="getOrders">Search</button>
                <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" v-on:click="reset_search">Reset</button>
              </td>
            </tr>                
                  <tr v-for="order in orders" :key="order.id" :order="order">
                      <td scope="row">
                        {{order.client ? order.client.name : ""}}
                      </td>                      
                      <td>
                        {{order.user ? order.user.username : ""}}
                      </td>
                      <td>
                        {{order.order_number}}
                      </td>
                      <td>
                        {{order.order_type ? order.order_type.original_code : ""}}
                      </td>
                      <td>
                          <router-link :to="{name:'ShowAdminOrder', params:{id: order.id }}">
                            <i class="fa fa-eye"></i>
                          </router-link>
                          <router-link :to="{name:'EditAdminOrder', params:{id: order.id }}">
                            <i class="fa fa-edit"></i>
                          </router-link>
                          <a href="javascript:void(0)" class="icon">
                            <i  v-on:click="onDelete(order)" class="fas fa-trash-restore-alt"></i>
                          </a>
                      </td>

                  </tr>
              </tbody>
              
          </table>

          <div class="card-footer pb-0 pt-3">
              <paginate
                :page-count=total_pages
                :click-handler="getOrders"
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
            orders: [],
            search: {},
            name: '',
            client_id: '',
            user_id: '',
            order_number: '',
            order_type_id:'',            
            page: 1,
            meta: '',
            total_pages: 1,
            order_type_ids: [],
            client_ids:[],
            user_ids:[]

        }
    },
    created(){
       this.getOrders()
        this.getClients()
        this.getUsers()
        this.getOrderType()
    },
    methods:{
        getClients () {
        this.$http.secured.get('/admin/clients')
            .then(response => {this.client_ids = response.data.clients })
            .catch(error => this.$toast.error('Error in fetching clients'))
        },
        getUsers () {
        this.$http.secured.get('/admin/users')
            .then(response => {this.user_ids = response.data.users })
            .catch(error => this.$toast.error('Error in fetching users'))
        },
        getOrderType () {
        this.$http.secured.get('/api/v1/lookups/logistics_order_types')
            .then(response => {this.order_type_ids = response.data.lookup_key.lookup_values })
            .catch(error => this.$toast.error('Error in fetching orderTypes'))
        },

        getOrders (page) {
            let search_param = {
                params:
                {
                  page:page,
                  order_type_id: this.order_type_id,
                  client_id: this.client_id,
                  order_number: this.order_number,
                  user_id: this.user_id
                }
            }
            this.$http.secured.get('/admin/orders', page? search_param:{ params: { page:page } })
            .then(response => { this.orders = response.data.orders, this.total_pages = response.data.meta.total_pages })
            .catch(error => this.$toast.error('Error in fetching orders'))
        },
        onDelete(order){
            this.$http.secured.delete(`/admin/orders/${order.id}`)
            .then(response => {
            this.orders.splice(this.orders.indexOf(order), 1);
            this.$toast.error('Order deleted successfully');
            })
            .catch(error => this.$toast.error('Error in deleting order'))
        },
        reset_search () {
            this.order_number = ''
            this.client_id = []
            this.user_id = []            
            this.order_type_id = []

            this.search.client_ids = []
            this.search.user_ids = []            
            this.search.order_type_ids = []
            this.getOrders()
        },

       assignOrders() {
        if (this.search.order_type_ids != null) {
           this.order_type_id = this.search.order_type_ids.map(
          function(orderType){
            return orderType.id;
          })
        }
      },
        assignClients() {
        if (this.search.client_ids != null) {
          this.client_id = this.search.client_ids.map(
          function(client){
            return client.id;
          })
        }
      },
        assignUsers() {
        if (this.search.user_ids != null) {
          this.user_id = this.search.user_ids.map(
          function(user){
            return user.id;
          })
        }
      }                                                         
    }
}
</script>