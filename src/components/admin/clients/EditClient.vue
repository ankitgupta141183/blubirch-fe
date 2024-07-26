<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Edit Client</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminClients'}">List Clients</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <form @submit.prevent="updateClient">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="name" class="d-flex">Name</label>
              <input type="text" placeholder="Name" v-model="editClient.name" class="form-control" id="name">
            </div>
            <div class="form-group col-md-6">
              <label for="domain_name" class="d-flex">Domain name</label>
              <input type="text" placeholder="Domain name" v-model="editClient.domain_name" class="form-control" id="domain_name">
            </div>
          </div>

          <button type="submit" class="btn btn-primary my-2">Update</button>
        </form>
      
    </div>
  </div>

</template>

<script>

export default {

  data () {
    return {
      editClient: {}
    }
  },

  created () {
    this.$http.secured.get('/admin/clients/'+this.$route.params.id)
        .then(response => { this.editClient = response.data.client })
        .catch(error => this.$toast.error('Error in getting client information'))
  },

  methods: {
    updateClient () {      
      this.$http.secured.put('/admin/clients/'+this.$route.params.id, {
                                                                        client: 
                                                                          { name: this.editClient.name, 
                                                                            domain_name: this.editClient.domain_name 
                                                                          }
                                                                      })
        .then(response => {
          this.$router.push('/admin/clients');
          this.$toast.success('Client successfully updated');
        })
        .catch(error => this.$toast.error('Error in updating client'))
    }
  }

}

</script>