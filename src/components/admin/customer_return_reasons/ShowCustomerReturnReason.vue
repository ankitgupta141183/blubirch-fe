<template>
	<div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Show Customer Return Reasons</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminCustomerReturnReasons'}">List Customer Return Reasons</router-link>
        </div>
      </div>
    </div>     
    <div class="card-body">
    	<div class="row">
        <div class="col-md-6">
          <div class="form-group row">
            <label for="name" class="col-4 col-form-label">Name:</label> 
            <div class="col-8">
              {{customer_return_reason.name}}
            </div>
          </div>
          <div class="form-group row">
            <label for="grading" class="col-4 col-form-label">Grading Required:</label> 
            <div class="col-8">
              {{customer_return_reason.grading_required}}
            </div>
          </div>                 
          <div class="form-group row">
            <label for="created_at" class="col-4 col-form-label">Created Time:</label> 
            <div class="col-8">
              {{customer_return_reason.created_at}}
            </div>
          </div>
          <div class="form-group row">
            <label for="updated_at" class="col-4 col-form-label">Updated Time:</label> 
            <div class="col-8">
              {{customer_return_reason.updated_at}}
            </div>
          </div>
          <div class="form-group row">
            <label for="deleted_at" class="col-4 col-form-label">Deleted Time:</label> 
            <div class="col-8">
              {{customer_return_reason.deleted_at}}
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
      customer_return_reason: {
        name: '',
        grading_required: ''
      }
    }
  },
  created() {
    this.getCustomer_Return_Reasons()
  },
  methods: {
    getCustomer_Return_Reasons () {
      this.$http.secured.get('/admin/customer_return_reasons/'+this.$route.params.id)
        .then(response => {
        	this.customer_return_reason = response.data.customer_return_reason;
        })
        .catch(error => {
          this.$toast.success('Error in fetching customer_return_reason')
        })
    }
  }

}
</script>