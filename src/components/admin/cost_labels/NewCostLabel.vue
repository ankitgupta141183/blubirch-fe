<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">New Cost Label</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminCostLabels'}">List Cost Label</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <form @submit.prevent="addCostLabel">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="lookup_key" class="d-flex">distribution Center</label>
              <multiselect v-model="newCostLabel.distribution_center_id" :options="select_distribution_center" label="name" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select distribution center" :class="{ 'is-invalid': $v.newCostLabel.distribution_center_id.$error}">
              </multiselect>
              <div class="invalid-feedback">
                <span v-if="!$v.newCostLabel.distribution_center_id.required">Distribution Center is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="channel" class="d-flex">Channel</label>
              <multiselect v-model="newCostLabel.channel_id" :options="select_channel" label="name" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select Channel" :class="{ 'is-invalid': $v.newCostLabel.channel_id.$error}">
              </multiselect>
              <div class="invalid-feedback">
                <span v-if="!$v.newCostLabel.channel_id.required">Channel is required</span>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Label</label>
              <input type="text" placeholder="Label" v-model="newCostLabel.label" class="form-control" id="label" :class="{ 'is-invalid': $v.newCostLabel.label.$error, 'is-valid': !$v.newCostLabel.label.$invalid }">
              <div class="invalid-feedback">
                <span v-if="!$v.newCostLabel.label.required">Label is required</span>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary my-2">Create</button>
        </form>
      
    </div>
  </div>	

</template>



<script>
import { required } from 'vuelidate/lib/validators'
import Multiselect from 'vue-multiselect'

export default {
  data () {
    return {
      select_distribution_center: [],
      select_channel: [],
      
      newCostLabel: {
        'distribution_center_id': '',
        'channel_id': '',
        'label': ''
      },

      all_distribution_centers: this.$http.secured.get('/admin/distribution_centers')
        .then(response => { this.select_distribution_center = response.data.distribution_centers }),
      all_channels: this.$http.secured.get('/admin/channels')
        .then(response => { this.select_channel = response.data.channels })
    }
  },
  validations: {
    newCostLabel: {
      channel_id : {required},
      distribution_center_id: { required},
      label: { required }
    }
  },
  methods:{
  	addCostLabel () {  

      this.$v.$touch();
      if (this.$v.$invalid) {
          return;
      }

      this.$http.secured.post('/admin/cost_labels', {cost_label: { distribution_center_id: this.newCostLabel.distribution_center_id.id, channel_id: this.newCostLabel.channel_id.id, label: this.newCostLabel.label } })
        .then(response => {
          this.$router.push('/admin/cost_labels');
          this.$toast.success('Cost Label successfully created');
        })
        .catch(error => this.$toast.error('Error in creating cost label'))
    }
  }

}

</script>