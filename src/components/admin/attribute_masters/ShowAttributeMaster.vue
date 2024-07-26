<template>

	<div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Show Attribute Master</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminAttributeMasters'}">List Attribute Masters</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
    	<div class="row">
        <div class="col-md-6">
          <div class="form-group row">
            <label for="name" class="col-4 col-form-label">Attr Type:</label> 
            <div class="col-8">
              {{attribute.attr_type}}
            </div>
          </div>
         	<div class="form-group row">
            <label for="code" class="col-4 col-form-label">Reason:</label> 
            <div class="col-8">
              {{attribute.reason}}
            </div>
          </div>
          <div class="form-group row">
            <label for="created_at" class="col-4 col-form-label">Attr Label:</label> 
            <div class="col-8">
              {{attribute.attr_label}}
            </div>
          </div>
          <div class="form-group row">
            <label for="updated_at" class="col-4 col-form-label">Field Type:</label> 
            <div class="col-8">
              {{attribute.field_type}}
            </div>
          </div>
          <div class="form-group row">
            <label for="deleted_at" class="col-4 col-form-label">Options:</label> 
            <div class="col-8">
              {{attribute.options}}
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
      attribute: {}
    }
  },
  created() {
    this.getAttributeMaster()
  },
  methods: {
    getAttributeMaster () {
      this.$http.secured.get('/admin/attribute_masters/'+this.$route.params.id)
        .then(response => {
        	this.attribute = response.data.attribute_master;        	
        })
        .catch(error => this.$toast.error('Error in fetching Attribute Master'))
    }
  }

}

</script>