<template>
  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">List Qc Configurations</div>
        <div class="p-2">
          <router-link :to="{ name: 'NewAdminQcConfiguration' }">Add New Qc Configuration</router-link>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="table-responsive-md">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th>Distribution Center</th>
              <th>Sample Percentage</th>
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
                <input class="form-control" type="text" placeholder="Search Invoice Number" aria-label="Search" v-model="sample_percentage" v-on:keyup.enter="getQcConfigurations">
              </td>
              <td>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-on:click="getQcConfigurations">Search</button>
                <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" v-on:click="reset_search">Reset</button>
              </td>
            </tr>
            <tr v-for="qc_configuration in qc_configurations" :key="qc_configuration.id" :role="qc_configuration">
              <td scope="row">
                {{qc_configuration.id}}
              </td>
              <td>
                {{qc_configuration.distribution_center.name}}
              </td>
              <td>
                {{qc_configuration.sample_percentage}}
              </td>
              <td>
                <router-link :to="{ name: 'ShowAdminQcConfiguration', params: { id: qc_configuration.id }}">
                  <i class="fa fa-eye"></i>
                  </router-link>                  
                  <router-link :to="{ name: 'EditAdminQcConfiguration', params: { id: qc_configuration.id }}">
                  <i class="fa fa-edit"></i>
                  </router-link>
                <a href="javascript:void(0)" class="icon">
                <i  v-on:click="onDelete(qc_configuration)" class="fas fa-trash-restore-alt"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="card-footer pb-0 pt-3">
          <paginate
            :page-count=total_pages
            :click-handler="getQcConfigurations"
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

export default {
  
  data () {
    return {
      qc_configurations: [],
      pageOfItems: [],
      page: 1,
      total_pages: 1,
      sample_percentage:'',
      distribution_center_id: '',
      select_distribution_center: [],
      all_distribution_centers: this.$http.secured.get('/admin/distribution_centers')
        .then(response => { this.select_distribution_center = response.data.distribution_centers })
    }
  },
  created() {
    this.getQcConfigurations()
  },
  methods: {
    getQcConfigurations (page) {
      this.$http.secured.get('/admin/qc_configurations',  {params: {page: page, distribution_center_id: this.distribution_center_id.id, sample_percentage: this.sample_percentage}} )
        .then(response => {
                            this.qc_configurations = response.data.qc_configurations, 
                            this.total_pages = response.data.meta.total_pages
                          })
        .catch(error => this.$toast.error('Error in fetching invoices'))
    },
    onDelete(qc_configuration){
      this.$http.secured.delete(`/admin/qc_configurations/${qc_configuration.id}`)
        .then(response => {
          this.qc_configurations.splice(this.qc_configurations.indexOf(qc_configuration), 1);
          this.$toast.error('Qc configuration deleted successfully');
        })
        .catch(error => this.$toast.error('Error in deleting qc configuration'))
    },
    reset_search () {
      this.distribution_center_id = ''
      this.sample_percentage = ''
      this.getQcConfigurations()
    }
  }
  
}

</script>
