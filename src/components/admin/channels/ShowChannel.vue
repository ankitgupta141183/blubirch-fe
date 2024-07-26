<template>

	<div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Show Channel</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminChannels'}">List Channels</router-link>
        </div>
      </div>
    </div>
    <div class="card-body">
    	<div class="row">
        <div class="col-md-6">
          <div class="form-group row">
            <label for="name" class="col-4 col-form-label">Name:</label> 
            <div class="col-8">
              {{channel.name}}
            </div>
          </div>
         	<div class="form-group row">
            <label for="code" class="col-4 col-form-label">Distribution Center:</label> 
            <div class="col-8">
              {{channel.distribution_center}}
            </div>
          </div>
          <div class="form-group row">
            <label for="created_at" class="col-4 col-form-label">Cost Formula:</label> 
            <div class="col-8">
              {{channel.cost_formula}}
            </div>
          </div>
          <div class="form-group row">
            <label for="updated_at" class="col-4 col-form-label">Revenue Formula:</label> 
            <div class="col-8">
              {{channel.revenue_formula}}
            </div>
          </div>
          <div class="form-group row">
            <label for="updated_at" class="col-4 col-form-label">Recovery Formula:</label> 
            <div class="col-8">
              {{channel.recovery_formula}}
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
      channel: {
      	'name': '',
        'distribution_center_id': '',
        'cost_formula': '',
        'revenue_formula': '',
        'recovery_formula': ''
      }
    }
  },
  created() {
    this.getchannel()
  },
  methods: {
    getchannel () {
      this.$http.secured.get('/admin/channels/'+this.$route.params.id)
        .then(response => {
        	this.channel = response.data.channel;        	
        })
        .catch(error => {
          this.setError(error, 'Something went wrong')
        })
    }
  }

}

</script>