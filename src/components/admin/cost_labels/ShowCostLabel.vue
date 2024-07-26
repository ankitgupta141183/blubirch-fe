<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Show Cost Label</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminCostLabels'}">List Cost Labels</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group row">
            <label for="code" class="col-4 col-form-label">Id:</label> 
            <div class="col-8">
              {{cost_label.id}}
            </div>
          </div>
          <div class="form-group row">
            <label for="name" class="col-4 col-form-label">Distribution Center:</label> 
            <div class="col-8">
              {{cost_label.distribution_center}}
            </div>
          </div>
          <div class="form-group row">
            <label for="code" class="col-4 col-form-label">Channel:</label> 
            <div class="col-8">
              {{cost_label.channel}}
            </div>
          </div>
          <div class="form-group row">
            <label for="code" class="col-4 col-form-label">Label:</label> 
            <div class="col-8">
              {{cost_label.label}}
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
      cost_label: {
        id: '',
        distribution_center_id: '',
        channel_id: '',
        label: '',
        created_at: '',
        updated_at: ''
      }
    }
  },
  created() {
    this.getCostLabel()
  },
  methods: {
    getCostLabel () {
      this.$http.secured.get('/admin/cost_labels/'+this.$route.params.id)
        .then(response => {
          this.cost_label = response.data.cost_label;          
        })
        .catch(error => {
          this.$toast.success('Error in fetching value')
        })
    }
  }

}

</script>