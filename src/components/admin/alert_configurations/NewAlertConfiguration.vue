<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">New Configuration</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAlertConfigurations'}">List Alert Configurations</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <form @submit.prevent="addConfiguration">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Code</label>
              <input type="text" placeholder="Code" v-model="newConfiguration.code" class="form-control" id="code" required="true">
            </div>
          </div>

          <button type="submit" class="btn btn-primary my-2">Create</button>
        </form>
      
    </div>
  </div>	

</template>

<script>
import { required, minLength, helpers } from 'vuelidate/lib/validators'
const alpha = helpers.regex('alpha', /^[a-zA-Z_]*$/)

export default {

  data () {
    return {
      newConfiguration: {
        'code': ''
      }
    }
  },
  validations: {
  newConfiguration: {
    name: {
      required,
      minLength: minLength(2),
      alpha
    }}
  },

  methods:{
  	addConfiguration () { 
      this.$http.secured.post('/admin/alert_configurations', {configuration: { code: this.newConfiguration.code } })
        .then(response => {
          this.$router.push('/admin/alert_configurations')
          this.$toast.success('Configuration successfully created')
        })
        .catch(error => this.$toast.error('Error in creating configuration'))
    }
  }

}

</script>