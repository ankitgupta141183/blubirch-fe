<template>

	<div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Show Logistics Partner</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminLogisticsPartners'}">List Logistics Partner</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body"> 
    	<div class="row">
        <div class="col-md-6">
          <div class="form-group row">
            <label for="name" class="col-4 text-right">Name:</label> 
            <div class="col-8 text-left">
              {{logistics_partner.name}}
            </div>
          </div>
          <div class="form-group row">
            <label for="created_at" class="col-4 text-right">Created Time:</label> 
            <div class="col-8 text-left">
              {{logistics_partner.created_at}}
            </div>
          </div>
          <div class="form-group row">
            <label for="updated_at" class="col-4 text-right">Updated Time:</label> 
            <div class="col-8 text-left">
              {{logistics_partner.updated_at}}
            </div>
          </div>
          <div class="form-group row">
            <label for="deleted_at" class="col-4 text-right">Deleted Time:</label> 
            <div class="col-8 text-left">
              {{logistics_partner.deleted_at}}
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
      logistics_partner: {}
    }
  },
  created() {
    this.getLogisticsPartner()
  },
  methods: {
    getLogisticsPartner () {
      this.$http.secured.get('/admin/logistics_partners/'+this.$route.params.id)
        .then(response => {
        	this.logistics_partner = response.data.logistics_partner;        	
        })
        .catch(error => {
          this.$toast.success('Error in fetching Logistics Partner')
        })
    }
  }

}

</script>