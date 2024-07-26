<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Edit Client Category</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminClientCategories'}">List Client Categories</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <form @submit.prevent="updateClientCategory">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="name" class="d-flex">Name</label>
              <input type="text" placeholder="Name" v-model="editCategory.name" class="form-control" id="name">
            </div>
             <div class="form-group col-md-6">
              <label for="name" class="d-flex">Clients</label>
              <multiselect v-model="search.client" :options="clients" label="name" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select Client">
              </multiselect>
            </div>
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Code</label>
              <input type="text" placeholder="Code" v-model="editCategory.code" class="form-control" id="code">
            </div>
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Attrs</label>
              <input type="text" placeholder="Attrs" v-model="editCategory.attrs" class="form-control" id="attrs">
            </div>
            <div class="form-group col-md-6">
              <label for="ancestry" class="d-flex">Parent</label>
              <multiselect v-model="editCategory.ancestry" :options="client_categories" label="name" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select Parent">
              </multiselect>
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
      client_categories: [], 
       search: {},
      client: '',
      clients: [], 
      editCategory: {
        'name': '',
        'code': '',
        'attrs': '',
        'ancestry': ''
      }
    }
  },
  components: {
    Multiselect
  },
  created () {

     this.$http.secured.get('/admin/clients')
      .then(response => { this.clients = response.data.clients })
      .catch(error => this.$toast.error('Error in fetching clients'))

    this.$http.secured.get('/admin/client_categories')
      .then(response => {this.client_categories = response.data.client_categories})
      .catch(error => this.$toast.error('Error in fetching Client Category'))
  

    this.$http.secured.get('/admin/client_categories/'+this.$route.params.id)
      .then(response => { this.editCategory = response.data.client_category })
      .catch(error => this.$toast.error('Error in getting client category information'))
  },
  methods:{
    updateClientCategory () {      
      this.$http.secured.put('/admin/client_categories/'+this.$route.params.id, {client_category : { name: this.editCategory.name, code: this.editCategory.code, attrs: this.editCategory.attrs, ancestry: this.editCategory.ancestry.id, client_id: this.search.client.id} })
        .then(response => {
          this.$router.push('/admin/client_categories');
          this.$toast.success('Client Category successfully updated');
        })
        .catch(error => this.$toast.error('Error in updating client category'))
    }
  }

}

</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>