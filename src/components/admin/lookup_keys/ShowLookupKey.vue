<template>

	<div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Show Lookup Key</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminLookupkeys'}">List Lookup Keys</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
    	<div class="row">
        <div class="col-md-6">
          <div class="form-group row">
            <label for="name" class="col-4 col-form-label">Name:</label> 
            <div class="col-8">
              {{lookup_key.name}}
            </div>
          </div>
         	<div class="form-group row">
            <label for="code" class="col-4 col-form-label">Code:</label> 
            <div class="col-8">
              {{lookup_key.code}}
            </div>
          </div>
          <div class="form-group row">
            <label for="created_at" class="col-4 col-form-label">Created Time:</label> 
            <div class="col-8">
              {{lookup_key.created_at}}
            </div>
          </div>
          <div class="form-group row">
            <label for="updated_at" class="col-4 col-form-label">Updated Time:</label> 
            <div class="col-8">
              {{lookup_key.updated_at}}
            </div>
          </div>
          <div class="form-group row">
            <label for="deleted_at" class="col-4 col-form-label">Deleted Time:</label> 
            <div class="col-8">
              {{lookup_key.deleted_at}}
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
      lookup_key: {
      	id: '',
      	name: '',
      	code: '',
      	created_at: '',
      	updated_at: ''
      }
    }
  },
  created() {
    this.getLookupKey()
  },
  methods: {
    getLookupKey () {
      this.$http.secured.get('/admin/lookup_keys/'+this.$route.params.id)
        .then(response => {
        	this.lookup_key = response.data.lookup_key;        	
        })
        .catch(error => {
          this.$toast.success('Error in fetching lookup key')
        })
    }
  }

}

</script>