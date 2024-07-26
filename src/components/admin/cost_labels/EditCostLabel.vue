<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Edit Cost Label</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminCostlabels'}">List Cost Labels</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
      <form @submit.prevent="updateCostLabel">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="distribution_center_id" class="d-flex">Distribution Center</label>
            <multiselect v-model="editCostLabel.distribution_center_id" :options="select_distribution_centers" label="name" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select distribution center">
            </multiselect>
          </div>
          <div class="form-group col-md-6">
            <label for="channel_id" class="d-flex">Channel</label>
            <multiselect v-model="editCostLabel.channel_id" :options="select_channels" label="name" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select channel">
            </multiselect>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="label" class="d-flex">Label</label>
            <input type="text" placeholder="Label" v-model="editCostLabel.label" class="form-control" id="label">
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
      select_channels: [],

      editCostLabel: {
        'id': '',
        'distribution_center_id': '',
        'channel_id': '',
        'label': ''
      },
      all_distribution_centers: this.$http.secured.get('/admin/distribution_centers')
        .then(response => { this.select_distribution_centers = response.data.distribution_centers }),
      all_channels: this.$http.secured.get('/admin/channels')
        .then(response => { this.select_channels = response.data.channels })
    }
  },
  components: {
    Multiselect
  },
  created () {
    this.$http.secured.get('/admin/cost_labels/'+this.$route.params.id)
        .then(response => { this.editCostLabel = response.data.cost_label })
        .catch(error => this.$toast.error('Error in getting cost label information'))
  },

  methods:{
    updateCostLabel () {
      this.$http.secured.put('/admin/cost_labels/'+this.$route.params.id, {cost_label: { distribution_center_id: this.editCostLabel.distribution_center_id.id, channel_id: this.editCostLabel.channel_id.id, label: this.editCostLabel.label} })
        .then(response => {
          this.$router.push('/admin/cost_labels');
          this.$toast.success('Cost Label successfully updated');
        })
        .catch(error => this.$toast.error('Error in updating Cost Label'))
    }
  }

}

</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>