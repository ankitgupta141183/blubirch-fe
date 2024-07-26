<template>
  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">New Channel</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminChannels'}">List Channels</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <form @submit.prevent="addchannel">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="name" class="d-flex">Name</label>
              <input type="text" placeholder="Name" v-model="newChannel.name" class="form-control" id="name" :class="{ 'is-invalid': $v.newChannel.name.$error, 'is-valid': !$v.newChannel.name.$invalid }">
              <div class="invalid-feedback">
                <span v-if="!$v.newChannel.name.required">Name is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="distribution_center_id" class="d-flex">Distribution Center</label>
              <multiselect v-model="newChannel.distribution_center_id" :options="distribution_center" label="name" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select Distribution Center" :class="{ 'is-invalid': $v.newChannel.distribution_center_id.$error}">
              </multiselect>
              <div class="invalid-feedback">
                <span v-if="!$v.newChannel.distribution_center_id.required">Distribution Center is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="cost_formula" class="d-flex">Cost Formula</label>
              <input type="text" placeholder="Cost Formula" v-model="newChannel.cost_formula" class="form-control" id="cost_formula">
            </div>
            <div class="form-group col-md-6">
              <label for="revenue_formula" class="d-flex">Revenue Formula</label>
              <input type="text" placeholder="Revenue Formula" v-model="newChannel.revenue_formula" class="form-control" id="revenue_formula">
            </div>
            <div class="form-group col-md-6">
              <label for="recovery_formula" class="d-flex">Recovery Formula</label>
              <input type="text" placeholder="Revenue Formula" v-model="newChannel.recovery_formula" class="form-control" id="recovery_formula">
            </div>
            
          </div>

          <button type="submit" class="btn btn-primary my-2">Create</button>
        </form>
      
    </div>
  </div>	

</template>



<script>
import { required } from 'vuelidate/lib/validators'

export default {

  data () {
    return {
      distribution_center: [],
      newChannel: {
        'name': '',
        'distribution_center_id': '',
        'cost_formula': '',
        'revenue_formula': '',
        'recovery_formula': ''
      }
    }
  },
  validations: {
    newChannel: {
      name : {required},
      distribution_center_id: { required}
    }
  },
  created() {
    this.getchannel()
  },
  methods:{
    getchannel () {
      this.$http.secured.get('/admin/distribution_centers')
        .then(response => {this.distribution_center = response.data.distribution_centers })
        .catch(error => this.$toast.error('Error in fetching distribution center'))
    },
  	addchannel () { 

      this.$v.$touch();
    if (this.$v.$invalid) {
        return;
    }

      this.$http.secured.post('/admin/channels', { channel: { name: this.newChannel.name , distribution_center_id: this.newChannel.distribution_center_id.id, cost_formula: this.newChannel.cost_formula, revenue_formula: this.newChannel.revenue_formula, recovery_formula: this.newChannel.recovery_formula } })
        .then(response => {
          this.$router.push('/admin/channels');
          this.$toast.success('channel successfully created');
        })
        .catch(error => this.$toast.error('Error in creating channel'))
    }
  }

}

</script>
