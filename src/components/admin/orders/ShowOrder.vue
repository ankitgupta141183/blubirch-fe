<template>

	<div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Show Order</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminOrders'}">List Order</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
    	<div class="row">
        <div class="col-md-6">
          <div class="form-group row">
            <label for="client_id" class="col-4 col-form-label">Client id:</label> 
            <div class="col-8">
              {{order.client ? order.client.name : ""}}
            </div>
          </div>
          <div class="form-group row">
            <label for="user_id" class="col-4 col-form-label">User id:</label> 
            <div class="col-8">
              {{order.user ? order.user.username : ""}}
            </div>
          </div>
          <div class="form-group row">
            <label for="order_number" class="col-4 col-form-label">Order Number:</label> 
            <div class="col-8">
              {{order.order_number}}
            </div>
          </div>                    
         	<div class="form-group row">
            <label for="order_type_id" class="col-4 col-form-label">Order Type id:</label> 
            <div class="col-8">
              {{order.order_type ? order.order_type.original_code : ""}}
            </div>
          </div>
         	<div class="form-group row">
            <label for="from_address" class="col-4 col-form-label">From Address:</label> 
            <div class="col-8">
              {{order.from_address}}
            </div>
          </div>

         	<div class="form-group row">
            <label for="to_address" class="col-4 col-form-label">To address:</label> 
            <div class="col-8">
              {{order.to_address}}
            </div>
          </div>                    
          <div class="form-group row">
            <label for="created_at" class="col-4 col-form-label">Created Time:</label> 
            <div class="col-8">
              {{order.created_at}}
            </div>
          </div>
          <div class="form-group row">
            <label for="updated_at" class="col-4 col-form-label">Updated Time:</label> 
            <div class="col-8">
              {{order.updated_at}}
            </div>
          </div>
          <div class="form-group row">
            <label for="deleted_at" class="col-4 col-form-label">Deleted Time:</label> 
            <div class="col-8">
              {{order.deleted_at}}
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
      order: {
        id: '',
        client_id: '',
        user_id: '',
        order_number: '',
        order_type_id:'',
        from_address:'',
        to_address:'',
      	created_at: '',
      	updated_at: ''
      }
    }
  },
  created() {
    this.getOrder()
  },
  methods: {
    getOrder () {
      this.$http.secured.get('/admin/orders/'+this.$route.params.id)
        .then(response => {
        	this.order = response.data.order;
        })
        .catch(error => {
          this.$toast.success('Error in fetching order')
        })
    }
  }

}

</script>