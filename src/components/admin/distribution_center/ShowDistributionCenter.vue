<template>

	<div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Show Distribution Center</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminDistributionCenters'}">List Distribution Center</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body d-flex justify-content-between w-100">
      <div class="col-md-6">
        <div class="form-group row">
          <label for="name" class="col-4 text-right">Name:</label> 
          <div class="col-8 text-left">
            {{distribution_center.name}}
          </div>
        </div>
       	<div class="form-group row">
          <label for="code" class="col-4 text-right">Address 1:</label> 
          <div class="col-8 text-left">
            {{distribution_center.address_line1}}
          </div>
        </div>
        <div class="form-group row">
          <label for="code" class="col-4 text-right">Address 2:</label> 
          <div class="col-8 text-left">
            {{distribution_center.address_line2}}
          </div>
        </div>
        <div class="form-group row">
          <label for="code" class="col-4 text-right">Address 3:</label> 
          <div class="col-8 text-left">
            {{distribution_center.address_line3}}
          </div>
        </div>
        <div class="form-group row">
          <label for="code" class="col-4 text-right">Address 4:</label> 
          <div class="col-8 text-left">
            {{distribution_center.address_line4}}
          </div>
        </div>
        <div class="form-group row">
          <label for="deleted_at" class="col-4 text-right">Ancestry:</label> 
          <div class="col-8 text-left" v-if="distribution_center.parent">
            {{distribution_center.parent.name}}
          </div>
        </div>
        <div class="form-group row">
          <label for="created_at" class="col-4 text-right">Created Time:</label> 
          <div class="col-8 text-left">
            {{distribution_center.created_at}}
          </div>
        </div>
        <div class="form-group row">
          <label for="updated_at" class="col-4 text-right">Updated Time:</label> 
          <div class="col-8 text-left">
            {{distribution_center.updated_at}}
          </div>
        </div>
        <div class="form-group row">
          <label for="deleted_at" class="col-4 text-right">Deleted Time:</label> 
          <div class="col-8 text-left">
            {{distribution_center.deleted_at}}
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
      distribution_center: []
    }
  },
  created () {
    this.getDistributionCenter()
  },
  methods: {
    getDistributionCenter () {
      this.$http.secured.get('/admin/distribution_centers/' + this.$route.params.id)
        .then(response => {
          this.distribution_center = response.data.distribution_center
        })
        .catch(error => {
          this.setError(error, 'Something went wrong')
        })
    }
  }
}
</script>
