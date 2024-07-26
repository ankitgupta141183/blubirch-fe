<template>

	<div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">List Cost Label</div>
        <div class="p-2">
          <router-link :to="{ name: 'NewAdminCostLabel' }">Add New Cost Label</router-link>
        </div>
      </div>
    </div>
    
    <div class="card-body">
      <br>
      <div class="table-responsive-md">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th>Distribution Center</th>
              <th>Channel</th>
              <th>Label</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <multiselect v-model="distribution_center_id" :options="select_distribution_center" label="name" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select distribution center">
                </multiselect>
              </td>
              <td>
                <multiselect v-model="channel_id" :options="select_channel" label="name" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select Channel">
                </multiselect>
              </td>
              <td>
                <input class="form-control col-lg-4 col-centered" type="text" placeholder="Search Code" aria-label="Search" v-model="label" v-on:keyup.enter="getCostLabels">
              </td>
              <td>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-on:click="getCostLabels">Search</button>
                <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" v-on:click="reset_search">Reset</button>
              </td>
            </tr>
            <tr v-for="cost_label in cost_labels" :key="cost_label.id" :role="cost_label">                
              <td scope="row">
                {{cost_label.id}}
              </td>
              <td>
                {{cost_label.distribution_center}}
              </td>
              <td>
                {{cost_label.channel}}
              </td>
              <td>
                {{cost_label.label}}
              </td>
              <td>
              	<router-link :to="{ name: 'ShowAdminCostLabel', params: { id: cost_label.id }}">
                	<i class="fa fa-eye"></i>
                </router-link>                  
                <router-link :to="{ name: 'EditAdminCostLabel', params: { id: cost_label.id }}">
                	<i class="fa fa-edit"></i>
                </router-link>
                <a href="javascript:void(0)" class="icon">
                  <i  v-on:click="onDelete(cost_label)" class="fas fa-trash-restore-alt"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="card-footer pb-0 pt-3">
          <paginate
            :page-count=total_pages
            :click-handler="getCostLabels"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination_custom'"
            :prev-class="'page-item'"
            :first-last-button=true
            :next-class="'page-item'"
            :page-class="'page-item'">
          </paginate>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
  
  data () {
    return {
      cost_labels: [],
      client_search: '',
      pageOfItems: [],
      page: 1,
      total_pages: 1,
      distribution_center_id: '',
      channel_id: '',
      label: '',
      select_distribution_center: [],
      select_channel: [],
      all_distribution_centers: this.$http.secured.get('/admin/distribution_centers')
        .then(response => { this.select_distribution_center = response.data.distribution_centers }),
      all_channels: this.$http.secured.get('/admin/channels')
        .then(response => { this.select_channel = response.data.channels })
    }
  },
  created() {
    this.getCostLabels()
  },
  computed:{
  },
  methods: {
    getCostLabels (page) {
      this.$http.secured.get('/admin/cost_labels',  {params: {page: page, distribution_center_id: this.distribution_center_id.id, channel_id: this.channel_id.id, label: this.label}} )
        .then(response => {
                            this.cost_labels = response.data.cost_labels, 
                            this.total_pages = response.data.meta.total_pages
                          })
        .catch(error => this.$toast.error('Error in fetching cost labels'))
    },
    onDelete(cost_label){
      this.$http.secured.delete(`/admin/cost_labels/${cost_label.id}`)
        .then(response => {
          this.cost_labels.splice(this.cost_labels.indexOf(cost_label), 1);
          this.$toast.error('Cost label deleted successfully');
        })
        .catch(error => this.$toast.error('Error in deleting cost label'))
    },
    reset_search () {
      this.distribution_center_id = ''
      this.channel_id = ''
      this.label = ''
      this.getCostLabels()
    }
  }
  
}

</script>
