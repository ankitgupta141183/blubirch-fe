<template>

	<div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Show Category</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminCategories'}">List Categories</router-link>
        </div>
      </div>
    </div>
    <div class="card-body">
    	<div class="row">
        <div class="col-md-6">
          <div class="form-group row">
            <label for="name" class="col-4 col-form-label">Name:</label> 
            <div class="col-8">
              {{category.name}}
            </div>
          </div>
         	<div class="form-group row">
            <label for="code" class="col-4 col-form-label">Code:</label> 
            <div class="col-8">
              {{category.code}}
            </div>
          </div>
          <div class="form-group row">
            <label for="created_at" class="col-4 col-form-label">Attrs:</label> 
            <div class="col-8">
              {{category.attrs}}
            </div>
          </div>
          <div class="form-group row">
            <label for="updated_at" class="col-4 col-form-label">Ancestry:</label> 
            <div class="col-8">
              {{category.parent_name}}
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
      category: {
      	'name': '',
        'code': '',
        'attrs': '',
        'ancestry': ''
      }
    }
  },
  created() {
    this.getCategory()
  },
  methods: {
    getCategory () {
      this.$http.secured.get('/admin/categories/'+this.$route.params.id)
        .then(response => {
        	this.category = response.data.category;        	
        })
        .catch(error => {
          this.setError(error, 'Something went wrong')
        })
    }
  }

}

</script>