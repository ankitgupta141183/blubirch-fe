<template>

	<div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Show Client</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminClients'}">List Clients</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body"> 
    	<div class="row">
        <div class="col-md-6">
          <div class="form-group row">
            <label for="name" class="col-4 text-right">Name:</label> 
            <div class="col-8 text-left">
              {{client.name}}
            </div>
          </div>
         	<div class="form-group row">
            <label for="domain_name" class="col-4 text-right">Domain Name:</label> 
            <div class="col-8 text-left">
              {{client.domain_name}}
            </div>
          </div>
          <div class="form-group row">
            <label for="created_at" class="col-4 text-right">Created Time:</label> 
            <div class="col-8 text-left">
              {{client.created_at}}
            </div>
          </div>
          <div class="form-group row">
            <label for="updated_at" class="col-4 text-right">Updated Time:</label> 
            <div class="col-8 text-left">
              {{client.updated_at}}
            </div>
          </div>
          <div class="form-group row">
            <label for="deleted_at" class="col-4 text-right">Deleted Time:</label> 
            <div class="col-8 text-left">
              {{client.deleted_at}}
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
      client: {}
    }
  },
  created() {
    this.getClient()
  },
  methods: {
    getClient () {
      this.$http.secured.get('/admin/clients/'+this.$route.params.id)
        .then(response => {
        	this.client = response.data.client;        	
        })
        .catch(error => {
          this.$toast.success('Error in fetching client')
        })
    }
  }

}

</script>