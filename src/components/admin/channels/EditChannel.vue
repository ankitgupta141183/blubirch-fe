<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Edit Channel</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminChannels'}">List Channels</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <form @submit.prevent="updatechannel">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="name" class="d-flex">Name</label>
              <input type="text" placeholder="Name" v-model="editChannel.name" class="form-control" id="name">
            </div>
            <div class="form-group col-md-6">
              <label for="distribution_center_id" class="d-flex">Distribution Center</label>
              <multiselect v-model="search.distribution" :options="distribution_center" label="name" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select Distribution Center"></multiselect>
            </div>
            <div class="form-group col-md-6">
              <label for="cost_formula" class="d-flex">Cost Formula</label>
              <input type="text" placeholder="Cost Formula" v-model="editChannel.cost_formula" class="form-control" id="cost_formula">
            </div>
            <div class="form-group col-md-6">
              <label for="revenue_formula" class="d-flex">Revenue Formula</label>
              <input type="text" placeholder="Revenue Formula" v-model="editChannel.revenue_formula" class="form-control" id="revenue_formula">
            </div>
            <div class="form-group col-md-6">
              <label for="recovery_formula" class="d-flex">Recovery Formula</label>
              <input type="text" placeholder="Revenue Formula" v-model="editChannel.recovery_formula" class="form-control" id="recovery_formula">
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
      distribution_center: [],
      search: {},
      distribution: '',
      editChannel: {
        'name': '',
        'distribution_center_id': '',
        'cost_formula': '',
        'revenue_formula': '',
        'recovery_formula': ''
      }
    }
  },
  components: {
    Multiselect
  },
  created () {
    this.$http.secured.get('/admin/distribution_centers')
      .then(response => {this.distribution_center = response.data.distribution_centers})
      .catch(error => this.$toast.error('Error in fetching channel'))

    this.$http.secured.get('/admin/channels/'+this.$route.params.id)
      .then(response => { this.editChannel = response.data.channel })
      .catch(error => this.$toast.error('Error in getting channel information'))
  },
  methods:{
    updatechannel () {      
      this.$http.secured.put('/admin/channels/'+this.$route.params.id, {channel : { name: this.editChannel.name , distribution_center_id: this.search.distribution.id, cost_formula: this.editChannel.cost_formula, revenue_formula: this.editChannel.revenue_formula, recovery_formula: this.editChannel.recovery_formula } })
        .then(response => {
          this.$router.push('/admin/channels');
          this.$toast.success('channel successfully updated');
        })
        .catch(error => this.$toast.error('Error in updating channel'))
    }
  }

}

</script>