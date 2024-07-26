<template>
  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">New Order</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminOrders'}">List Orders</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <form @submit.prevent="addOrder">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="client_id" class="d-flex">Client</label>
              <multiselect id="client_id" placeholder="Select Client" v-model= "newOrder.clients" :options="clients" label="name" track-by="id" @input="assignClient"  :class="{ 'is-invalid': $v.newOrder.clients.$error}"></multiselect>              
              <div class="invalid-feedback">
                <span v-if="!$v.newOrder.clients.required">Client is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="user_id" class="d-flex">User</label>
              <multiselect id="user_id" placeholder="Select User" v-model= "newOrder.users" :options="users" label="username" track-by="id" @input="assignUser" :class="{ 'is-invalid': $v.newOrder.users.$error}"></multiselect>              
              <div class="invalid-feedback">
                <span v-if="!$v.newOrder.users.required">User is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="cost_formula" class="d-flex">Order Number</label>
              <input type="text" placeholder="Order Number" v-model="newOrder.order_number" class="form-control" id="cost_formula" :class="{ 'is-invalid': $v.newOrder.order_number.$error, 'is-valid': !$v.newOrder.order_number.$invalid }">
              <div class="invalid-feedback">
                <span v-if="!$v.newOrder.order_number.required">Order Number is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="order_types" class="d-flex">Order Type</label>
              <multiselect id="order_types" placeholder="Select Order Type" v-model= "newOrder.order_types" :options="order_types" label="original_code" track-by="id" @input="assignOrderTypes" :class="{ 'is-invalid': $v.newOrder.order_types.$error}"></multiselect>              
              <div class="invalid-feedback">
                <span v-if="!$v.newOrder.order_types.required">Order Type is required</span>
              </div>

            </div>
            <div class="form-group col-md-6">
              <label for="recovery_formula" class="d-flex">From Address</label>
              <textarea placeholder="From Address" v-model="newOrder.from_address" class="form-control" id="from_address" :class="{ 'is-invalid': $v.newOrder.from_address.$error, 'is-valid': !$v.newOrder.from_address.$invalid }"></textarea>
              <div class="invalid-feedback">
                <span v-if="!$v.newOrder.from_address.required">From Address is required</span>
              </div>
            </div>
             <div class="form-group col-md-6">
              <label for="recovery_formula" class="d-flex">To Address</label>
              <textarea resize="none" placeholder="To Address" v-model="newOrder.to_address" class="form-control" id="to_address" :class="{ 'is-invalid': $v.newOrder.to_address.$error, 'is-valid': !$v.newOrder.to_address.$invalid }"></textarea>
              <div class="invalid-feedback">
                <span v-if="!$v.newOrder.to_address.required">To address is required</span>
              </div>
            </div>
            
          </div>

          <button type="submit" class="btn btn-primary my-2">Create</button>
        </form>

        <hr/>
        <form @submit.prevent="importFile" enctype="multipart/form-data">
          <div class="form-group col-md-6">
            <label for="file" class="label">Import Order File </label>
            <input type="file" class="form-control" ref="file" @change="selectFile" :class="{ 'is-invalid': $v.file.$error , 'is-valid': !$v.file.$invalid}"/>
            <div class="invalid-feedback">
                <span v-if="!$v.file.required">File is required</span>
              </div>
            <button class="btn btn-primary my-2">Import File</button>
          </div>
        </form>        
      
    </div>
  </div>	

</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {

  data () {
    return {
      file: "",
      clients: [],
      users:[],
      order_types:[],
      newOrder: {}
    }
  },

  validations: {
    newOrder: {
      clients : {required},
      users: { required},
      order_number: { required},
      order_types : {required},
      from_address : {required},
      to_address : {required}
    },
    file: {required}
  },
  created() {
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
    assignOrderTypes () {      
      this.newOrder.order_type_id = this.newOrder.order_types.id
    },
    assignUser () {      
      this.newOrder.user_id = this.newOrder.users.id
    },
    assignClient () {
      this.newOrder.client_id = this.newOrder.clients.id
    },
  	addOrder () {
      this.$v.newOrder.$touch();
      if (this.$v.newOrder.$invalid) {
          return;
      }

      let order_data = { 
          order: { client_id: this.newOrder.client_id, 
          user_id: this.newOrder.user_id, 
          order_number: this.newOrder.order_number, 
          order_type_id: this.newOrder.order_type_id, 
          from_address: this.newOrder.from_address,
          to_address: this.newOrder.to_address } 
          }   
      this.$http.secured.post('/admin/orders', order_data)
        .then(response => { let res = response;
          this.$router.push('/admin/orders');
          this.$toast.success('Order added successfully!');
        })
        .catch(error => this.$toast.error('Error in adding Order'))
    },
    selectFile(){
      this.file = this.$refs.file.files[0];
    },
    importFile () {  
      this.$v.file.$touch();
      if (this.$v.file.$invalid) {
          return;
      }
      const formData = new FormData()
      formData.append('file', this.file)
      this.$http.secured.post('/admin/orders/import',formData)
        .then(response => {
          this.$router.push('/admin/orders');
          this.$toast.success('File Imported Successfully');
        })
        .catch(error => this.$toast.error('Error in importing orders'))
    }     
  }

}

</script>