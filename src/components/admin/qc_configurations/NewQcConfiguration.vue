<template>
  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">New Qc Configuration</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminQcConfigurations'}">List Qc Configurations</router-link>
        </div>
      </div>
    </div>
    <div class="card-body">
      <form @submit.prevent="addQcConfiguration">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="lookup_key" class="d-flex">Distribution Center</label>
            <multiselect v-model="newQcConfiguration.distribution_center_id" :options="select_distribution_center" label="name" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select distribution center" :class="{ 'is-invalid': $v.newQcConfiguration.distribution_center_id.$error}">
            </multiselect>
            <div class="invalid-feedback">
              <span v-if="!$v.newQcConfiguration.distribution_center_id.required">Distribution Center is required</span>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label for="domain_name" class="d-flex">Sample Percentage</label>
            <input type="text" placeholder="Sample Percentage" v-model="newQcConfiguration.sample_percentage" class="form-control" id="sample_percentage" :class="{ 'is-invalid': $v.newQcConfiguration.sample_percentage.$error, 'is-valid': !$v.newQcConfiguration.sample_percentage.$invalid }">
            <div class="invalid-feedback">
              <span v-if="!$v.newQcConfiguration.sample_percentage.required">Domain is required</span>
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

export default {
  data () {
    return {
      select_distribution_center: [],

      newQcConfiguration: {
        'distribution_center_id': '',
        'sample_percentage':''
      },
      all_distribution_centers: this.$http.secured.get('/admin/distribution_centers')
        .then(response => { this.select_distribution_center = response.data.distribution_centers })
    }
  },
validations: {
    newQcConfiguration: {
      distribution_center_id: { required },
      sample_percentage: { required }
    }
  },
  methods:{
  	addQcConfiguration () {
    this.$v.$touch();
    if (this.$v.$invalid) {
        return;
    }      
      this.$http.secured.post('/admin/qc_configurations', {
                                                  qc_configuration: 
                                                    { distribution_center_id: this.newQcConfiguration.distribution_center_id.id,
                                                      sample_percentage: this.newQcConfiguration.sample_percentage 
                                                    } 
                                                })
        .then(response => {
          this.$router.push('/admin/qc_configurations');
          this.$toast.success('Qc Configuration successfully created');
        })
        .catch(error => this.$toast.error('Error in creating Qc Configuration'))
    }
  }
}
</script>