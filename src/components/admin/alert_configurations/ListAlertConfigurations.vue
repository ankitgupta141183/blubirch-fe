<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">List Alert Configurations</div>
        <div class="p-2">
          <router-link :to="{ name: 'NewAlertConfiguration'}">Add New Configuration</router-link>
        </div>
      </div>
    </div>
    <div class="card-body">

      <div class="table-responsive-md">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th>Code</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input class="form-control col-lg-4 col-centered" type="text" placeholder="Search Code" aria-label="Search" v-model="code" v-on:keyup.enter="getConfigurations">
              </td>
              <td>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-on:click="getConfigurations">Search</button>
                <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" v-on:click="reset_search">Reset</button>
              </td>
            </tr>
            <tr v-for="configuration in configurations" :key="configuration.id" :configuration="configuration">
              <td scope="row">
                {{configuration.id}}
              </td>
              <td>
                {{configuration.type}}
              </td>
              <td>                
                <router-link :to="{ name: 'EditAlertConfiguration', params: { id: configuration.id }}">
                  <i class="fa fa-edit"></i>
                </router-link>
                <a href="javascript:void(0)" class="icon">
                  <i  v-on:click="onDelete(configuration)" class="fas fa-trash-restore-alt"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div class="card-footer pb-0 pt-3">
          <paginate
            :page-count=total_pages
            :click-handler="getConfigurations"
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
      configurations: [],
      page: 1,
      total_pages: 1,
      code: ''
    }
  },
  created() {
    this.getConfigurations()
  },
  computed: {
    sortedConfigurations(){
      return this.configurations.slice().sort((a,b)=>{
        return a.id - b.id
      })
    }
  },
  methods: {
    getConfigurations (page) {
      this.$http.secured.get('/admin/alert_configurations', {params: {page: page, code: this.code}})
        .then(response => {
                            this.configurations = response.data.alert_configurations, 
                            this.total_pages = response.data.meta.total_pages
                          })
        .catch(error => this.$toast.error('Error in fetching Alert Configurations'))
    },
    onDelete(configuration){
      this.$http.secured.delete(`/admin/alert_configurations/${configuration.id}`)
        .then(response => {
          this.configurations.splice(this.configurations.indexOf(configuration), 1);
          this.$toast.error('Configuration deleted successfully');
        })
        .catch(error => this.$toast.error('Error in deleting configuration'))
    },
    reset_search () {
      this.code = ''
      this.getConfigurations()
    }
  }
  
}

</script>