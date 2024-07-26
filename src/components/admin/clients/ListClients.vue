<template>

	<div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">List Clients</div>
        <div class="p-2">
          <router-link :to="{ name: 'NewAdminClient' }">Add New Client</router-link>
        </div>
      </div>
    </div>
    
    <div class="card-body">
      <div class="table-responsive-md">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th>Name</th>
              <th>Domain Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input class="form-control col-lg-4 col-centered" type="text" placeholder="Search Name" aria-label="Search" v-model="name" v-on:keyup.enter="getClients">
              </td>
              <td>
                <input class="form-control col-lg-4 col-centered" type="text" placeholder="Search Code" aria-label="Search" v-model="domain_name" v-on:keyup.enter="getClients">
              </td>
              <td>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-on:click="getClients">Search</button>
                <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" v-on:click="reset_search">Reset</button>
              </td>
            </tr>
            <tr v-for="client in clients" :key="client.id" :role="client">                
              <td scope="row">
                {{client.id}}
              </td>
              <td>
                {{client.name}}
              </td>
              <td>
                {{client.domain_name}}
              </td>
              <td>
              	<router-link :to="{ name: 'ShowAdminClient', params: { id: client.id }}">
                	<i class="fa fa-eye"></i>
                </router-link>                  
                <router-link :to="{ name: 'EditAdminClient', params: { id: client.id }}">
                	<i class="fa fa-edit"></i>
                </router-link>
                <a href="javascript:void(0)" class="icon">
                  <i  v-on:click="onDelete(client)" class="fas fa-trash-restore-alt"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="card-footer pb-0 pt-3">
          <paginate
            :page-count=total_pages
            :click-handler="getClients"
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
      clients: [],
      client_search: '',
      pageOfItems: [],
      page: 1,
      total_pages: 1,
      search: '',
      name: '',
      domain_name: ''
    }
  },
  created() {
    this.getClients()
  },
  computed:{
    sortedClients(){
      return this.clients.slice().sort((a,b)=>{
        return a.id - b.id
      });
    }
  },
  methods: {
    getClients (page) {
      this.$http.secured.get('/admin/clients',  {params: {page: page, name: this.name, domain_name: this.domain_name}} )
        .then(response => {
                            this.clients = response.data.clients, 
                            this.total_pages = response.data.meta.total_pages
                          })
        .catch(error => this.$toast.error('Error in fetching clients'))
    },
    onDelete(client){
      this.$http.secured.delete(`/admin/clients/${client.id}`)
        .then(response => {
          this.clients.splice(this.clients.indexOf(client), 1);
          this.$toast.error('Client deleted successfully');
        })
        .catch(error => this.$toast.error('Error in deleting client'))
    },
    reset_search () {
      this.name = ''
      this.domain_name = ''
      this.getClients()
    }
  }
  
}

</script>
