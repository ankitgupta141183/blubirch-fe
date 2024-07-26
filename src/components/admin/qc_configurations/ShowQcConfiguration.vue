<template>
  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Show Qc Configuration</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminQcConfigurations'}">List Qc Configurations</router-link>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group row">
            <label for="code" class="col-4 col-form-label">Id:</label> 
            <div class="col-8">
              {{qc_configuration.id}}
            </div>
          </div>
          <div class="form-group row">
            <label for="name" class="col-4 col-form-label">Distribution Center:</label> 
            <div class="col-8">
              {{qc_configuration.distribution_center}}
            </div>
          </div>
          <div class="form-group row">
            <label for="code" class="col-4 col-form-label">Sample Percentage:</label> 
            <div class="col-8">
              {{qc_configuration.sample_percentage}}
            </div>
          </div>
          <div class="form-group row">
            <label for="code" class="col-4 col-form-label">Updated At:</label> 
            <div class="col-8">
              {{qc_configuration.updated_at}}
            </div>
          </div>
          <div class="form-group row">
            <label for="code" class="col-4 col-form-label">Updated At:</label> 
            <div class="col-8">
              {{qc_configuration.created_at}}
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
      qc_configuration: {
        id: '',
        distribution_center_id: '',
        sample_percentage: '',
        created_at: '',
        updated_at: ''
      }
    }
  },
  created() {
    this.getQcConfiguration()
  },
  methods: {
    getQcConfiguration () {
      this.$http.secured.get('/admin/qc_configurations/'+this.$route.params.id)
        .then(response => {
          this.qc_configuration = response.data.qc_configuration;          
        })
        .catch(error => {
          this.$toast.success('Error in fetching value')
        })
    }
  }

}
</script>