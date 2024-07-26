<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Edit Order</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminOrders'}">List Orders</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <form @submit.prevent="updateOrder">
          <div class="form-row">

            <div class="form-group col-md-6">
              <label for="client_id" class="d-flex">Client Id</label>
              <multiselect id="client_id" placeholder="Select Client" v-model= "editOrder.client" :options="clients" label="name" track-by="id" @input="assignClient"></multiselect>
            </div>

            <div class="form-group col-md-6">
              <label for="user_id" class="d-flex">User Id</label>
              <multiselect id="user_id" placeholder="Select User" v-model= "editOrder.user" :options="users" label="username" track-by="id" @input="assignUser"></multiselect>
            </div>

            <div class="form-group col-md-6">
              <label for="order_number" class="d-flex">Order Number</label>
              <input type="text" placeholder="Order Number" v-model="editOrder.order_number" class="form-control" id="order_number">
            </div>

            <div class="form-group col-md-6">
              <label for="order_types" class="d-flex">Order Type id</label>
              <multiselect id="order_types" placeholder="Select Order Type" v-model= "editOrder.order_type" :options="order_types" label="original_code" track-by="id" @input="assignOrderTypes"></multiselect>
            </div>
            <div class="form-group col-md-6">
              <label for="from_address" class="d-flex">From Address</label>
              <textarea placeholder="From Address" v-model="editOrder.from_address" class="form-control" id="from_address"></textarea>
            </div> 
            <div class="form-group col-md-6">
              <label for="to_address" class="d-flex">To address</label>
              <textarea resize="none" placeholder="To Address" v-model="editOrder.to_address" class="form-control" id="to_address"></textarea>
            </div>                       
          </div>

          <button type="submit" class="btn btn-primary my-2">Update</button>
        </form>      
    </div>
  </div>
</template>


<script>
export default {

  data () {
    return {
      clients: [],
      users:[],
      order_types:[],
      editOrder: {}
    }
  },

  created () {
    this.getOrderById(this.$route.params.id)
    this.getClients()
    this.getUsers()
    this.getOrderType()
  },

  methods:{
    getClients () {
      this.$http.secured.get('/admin/clients')
        .then(response => {this.clients = response.data.clients })
        .catch(error => this.$toast.error('Error in fetching clients'))
    },
    getUsers () {
      this.$http.secured.get('/admin/users')
        .then(response => {this.users = response.data.users })
        .catch(error => this.$toast.error('Error in fetching users'))
    },
    getOrderType () {
      this.$http.secured.get('/api/v1/lookups/logistics_order_types')
        .then(response => {this.order_types = response.data.lookup_key.lookup_values })
        .catch(error => this.$toast.error('Error in fetching orderTypes'))
    },
    assignClient () {
      this.editOrder.client_id = this.editOrder.client.id
    },
    assignUser() {
      this.editOrder.user_id = this.editOrder.user.id
    },
    assignOrderTypes () {
      this.editOrder.order_type_id = this.editOrder.order_type.id
    },
    getOrderById(id){
    this.$http.secured.get('/admin/orders/'+id)
      .then(response => { this.editOrder = response.data.order })
      .catch(error => this.$toast.error('Error in getting order information'))
    },
    updateOrder () {
      let edit_order_data = { 
          order: { client_id: this.editOrder.client_id, 
          user_id: this.editOrder.user_id, 
          order_number: this.editOrder.order_number, 
          order_type_id: this.editOrder.order_type_id, 
          from_address: this.editOrder.from_address,
          to_address: this.editOrder.to_address } 
          }   
      this.$http.secured.put('/admin/orders/'+this.$route.params.id, edit_order_data)
        .then(response => {
          this.$router.push('/admin/orders');
          this.$toast.success('Order successfully updated');
        })
        .catch(error => this.$toast.error('Error in updating order'))
    }
  }
}

</script>