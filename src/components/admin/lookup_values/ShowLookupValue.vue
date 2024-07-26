<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Show Lookup Value</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminLookupValues'}">List Lookup Values</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group row">
            <label for="code" class="col-4 col-form-label">Id:</label> 
            <div class="col-8">
              {{lookup_value.id}}
            </div>
          </div>
          <div class="form-group row">
            <label for="name" class="col-4 col-form-label">Lookup Key:</label> 
            <div class="col-8">
              {{lookup_value.lookup_key}}
            </div>
          </div>
          <div class="form-group row">
            <label for="code" class="col-4 col-form-label">Parent:</label> 
            <div class="col-8">
              {{lookup_value.parent_name}}
            </div>
          </div>
          <div class="form-group row">
            <label for="code" class="col-4 col-form-label">Code:</label> 
            <div class="col-8">
              {{lookup_value.code}}
            </div>
          </div>
          <div class="form-group row">
            <label for="code" class="col-4 col-form-label">Position:</label> 
            <div class="col-8">
              {{lookup_value.position}}
            </div>
          </div>
          <div class="form-group row">
            <label for="created_at" class="col-4 col-form-label">Created Time:</label> 
            <div class="col-8">
              {{lookup_value.created_at}}
            </div>
          </div>
          <div class="form-group row">
            <label for="updated_at" class="col-4 col-form-label">Updated Time:</label> 
            <div class="col-8">
              {{lookup_value.updated_at}}
            </div>
          </div>
          <div class="form-group row">
            <label for="deleted_at" class="col-4 col-form-label">Deleted Time:</label> 
            <div class="col-8">
              {{lookup_value.deleted_at}}
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
      lookup_value: {
        id: '',
        name: '',
        code: '',
        created_at: '',
        updated_at: ''
      }
    }
  },
  created() {
    this.getLookupValue()
  },
  methods: {
    getLookupValue () {
      this.$http.secured.get('/admin/lookup_values/'+this.$route.params.id)
        .then(response => {
          this.lookup_value = response.data.lookup_value;          
        })
        .catch(error => {
          this.$toast.success('Error in fetching value')
        })
    }
  }

}

</script>