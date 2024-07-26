<template>
  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Edit Qc Configuration</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminQcConfigurations'}">List Qc Configurations</router-link>
        </div>
      </div>
    </div>
    <div class="card-body">
      <form @submit.prevent="updateQcConfiguration">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="distribution_center_id" class="d-flex">Distribution Center</label>
            <multiselect v-model="editQcConfiguration.distribution_center_id" :options="select_distribution_centers" label="name" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select distribution center">
            </multiselect>
          </div>
          <div class="form-group col-md-6">
            <label for="label" class="d-flex">Sample Percentage</label>
            <input type="text" placeholder="Label" v-model="editQcConfiguration.sample_percentage" class="form-control" id="label">
          </div>
        </div>
        <button type="submit" class="btn btn-primary my-2">Update</button>
      </form>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {

  data () {
    return {
      select_distribution_centers: [],

      editQcConfiguration: {
        'id': '',
        'distribution_center_id': '',
        'sample_percentage': ''
      },
      all_distribution_centers: this.$http.secured.get('/admin/distribution_centers')
        .then(response => { this.select_distribution_centers = response.data.distribution_centers }),
    }
  },
  components: {
    Multiselect
  },
  created () {
    this.$http.secured.get('/admin/qc_configurations/'+this.$route.params.id)
      .then(response => { this.editQcConfiguration = response.data.qc_configuration })
      .catch(error => this.$toast.error('Error in getting Qc Configuration information'))
  },
  methods:{
    updateQcConfiguration () {
      this.$http.secured.put('/admin/qc_configurations/'+this.$route.params.id, {qc_configuration: { distribution_center_id: this.editQcConfiguration.distribution_center_id.id, sample_percentage: this.editQcConfiguration.sample_percentage} })
        .then(response => {
          this.$router.push('/admin/qc_configurations');
          this.$toast.success('Qc Configuration successfully updated');
        })
        .catch(error => this.$toast.error('Error in updating Qc Configuration'))
    }
  }
}

</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>