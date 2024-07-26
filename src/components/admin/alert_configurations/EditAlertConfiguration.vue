<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Edit Configuration</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAlertConfigurations'}">List Alert Configurations</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <form @submit.prevent="updateConfiguration">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Code</label>
              <input type="text" placeholder="Code" v-model="editConfiguration.type" class="form-control" id="code">
            </div>
          </div>

          <button type="submit" class="btn btn-primary my-2">Update</button>
        </form>
      
    </div>
  </div>

</template>

<script>

export default {

  data () {
    return {
      editConfiguration: {
        id: '',
        code: ''
      }
    }
  },

  created () {
    this.$http.secured.get('/admin/alert_configurations/'+this.$route.params.id)
        .then(response => { this.editConfiguration = response.data.alert_configuration })
        .catch(error => this.$toast.error('Error in getting configuration information'))
  },

  methods:{
    updateConfiguration () {      
      this.$http.secured.put('/admin/alert_configurations/'+this.$route.params.id, {configuration: { code: this.editConfiguration.code } })
        .then(response => {
          this.$router.push('/admin/alert_configurations');
          this.$toast.success('Configuration successfully updated');
        })
        .catch(error => this.$toast.error('Error in updating configuration'))
    }
  }

}

</script>