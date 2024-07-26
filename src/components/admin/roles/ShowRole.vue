<template>

	<div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Show Role</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminRoles'}">List Roles</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
    	<div class="row">
        <div class="col-md-6">
          <div class="form-group row">
            <label for="name" class="col-4 col-form-label">Name:</label> 
            <div class="col-8">
              {{role.name}}
            </div>
          </div>
         	<div class="form-group row">
            <label for="code" class="col-4 col-form-label">Code:</label> 
            <div class="col-8">
              {{role.code}}
            </div>
          </div>
          <div class="form-group row">
            <label for="created_at" class="col-4 col-form-label">Created Time:</label> 
            <div class="col-8">
              {{role.created_at}}
            </div>
          </div>
          <div class="form-group row">
            <label for="updated_at" class="col-4 col-form-label">Updated Time:</label> 
            <div class="col-8">
              {{role.updated_at}}
            </div>
          </div>
          <div class="form-group row">
            <label for="deleted_at" class="col-4 col-form-label">Deleted Time:</label> 
            <div class="col-8">
              {{role.deleted_at}}
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
      role: {
      	id: '',
      	name: '',
      	code: '',
      	created_at: '',
      	updated_at: ''
      }
    }
  },
  created() {
    this.getRole()
  },
  methods: {
    getRole () {
      this.$http.secured.get('/admin/roles/'+this.$route.params.id)
        .then(response => {
        	this.role = response.data.role;
        })
        .catch(error => {
          this.$toast.success('Error in fetching role')
        })
    }
  }

}

</script>