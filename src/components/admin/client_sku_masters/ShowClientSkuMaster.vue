<template>

	<div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Show Client Sku Master</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminClientSkuMaster'}">List Client Sku Masters</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
    	<div class="row">
        <div class="col-md-6">
          <div class="form-group row">
            <label for="name" class="col-4 col-form-label">Client Category id:</label> 
            <div class="col-8">
              {{clientskumaster.client_category }}
            </div>
          </div>
         	<div class="form-group row">
            <label for="code" class="col-4 col-form-label">Code:</label> 
            <div class="col-8">
              {{clientskumaster.code}}
            </div>
          </div>
          <div class="form-group row">
            <label for="created_at" class="col-4 col-form-label">Description:</label> 
            <div class="col-8">
              {{clientskumaster.description}}
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
      clientskumaster: {
      	client_catgeory_id: '',
      	code: '',
      	description: ''
      }
    }
  },
  created() {
    this.getClientSkuMaster()
  },
  methods: {
    getClientSkuMaster () {
      this.$http.secured.get('/admin/client_sku_masters/'+this.$route.params.id)
        .then(response => {
        	this.clientskumaster = response.data.client_sku_master;        	
        })
        .catch(error => {
          this.setError(error, 'Something went wrong')
        })
    }
  }

}

</script>