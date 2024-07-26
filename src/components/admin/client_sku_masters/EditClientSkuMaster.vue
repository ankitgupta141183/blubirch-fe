<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Edit Role</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminRoles'}">List Roles</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <form @submit.prevent="updateClientSkuMaster">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="client_catgeory_id" class="d-flex">Client Category</label>
              <multiselect v-model="search.category_id" :options="client_category" label="name" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select Client Category">
              </multiselect>
            </div>
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Code</label>
              <input type="text" placeholder="Code" v-model="editClientSkuMaster.code" class="form-control" id="code">
            </div>
            <div class="form-group col-md-6">
              <label for="description" class="d-flex">Description</label>
              <input type="text" placeholder="Code" v-model="editClientSkuMaster.description" class="form-control" id="code">
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
    client_category: [],
    search: {},
    category_id: '',
      editClientSkuMaster: {
        client_category_id: '',
        code: '',
        description: '',

      }
    }
  },

  created () {
  this.$http.secured.get('/admin/client_categories')
      .then(response => { this.client_category = response.data.client_categories })
      .catch(error => this.setError(error, 'Could not retrieve client category'))  

    this.$http.secured.get('/admin/client_sku_masters/'+this.$route.params.id)
        .then(response => { this.editClientSkuMaster = response.data.client_sku_master })
        .catch(error => this.$toast.error('Error in getting client sku information'))
  },

  methods:{
  setClientCategoryId () {
      if (this.editClientSkuMaster.client_category_id != null) {
        this.editClientSkuMaster.client_category_id = this.editClientSkuMaster.client_category_id.id
      }
    },
    updateClientSkuMaster () {      
      this.$http.secured.put('/admin/client_sku_masters/'+this.$route.params.id, {client_sku_master: { client_category_id : this.search.category_id.id, code: this.editClientSkuMaster.code, description: this.editClientSkuMaster.description  } })
        .then(response => {
          this.$router.push('/admin/client_sku_masters');
          this.$toast.success('Client Sku Master successfully updated');
        })
        .catch(error => this.$toast.error('Error in updating client sku master'))
    }
  }

}

</script>