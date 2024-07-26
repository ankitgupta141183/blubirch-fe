<template>

	<div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">List Client Sku Masters</div>
        <div class="p-2">
          <router-link :to="{ name: 'NewAdminClientSkuMaster'}">Add New Client Sku Master</router-link>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="table-responsive-md">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th>Client Category</th>
              <th>Code</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td></td>
              <td>
                  <multiselect id="category" placeholder="Select Client Category" v-model= "search.client_category" :options="client_categories" label="name" track-by="id" @input="setClientCategoryId"></multiselect>
              </td>
              <td>
                <input class="form-control" type="text" placeholder="Search Code" aria-label="Search" v-model="code" v-on:keyup.enter="getClientSkuMasters">
              </td>
              <td></td>
              <td>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-on:click="getClientSkuMasters">Search</button>
                <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" v-on:click="reset_search">Reset</button>
              </td>
          </tr>
            <tr v-for="sku_master in filteredSkuMaster" :key="sku_master.id" :sku_master="sku_master">                
              <td scope="row">
                {{sku_master.id}}
              </td>
              <td>
                {{sku_master.client_category }}
              </td>
              <td>
                {{sku_master.code}}
              </td>
              <td>
                {{sku_master.description}}
              </td>
              <td>
              	<router-link :to="{ name: 'ShowAdminClientSkuMaster', params: { id: sku_master.id }}">
                	<i class="fa fa-eye"></i>
                </router-link>                  
                <router-link :to="{ name: 'EditAdminClientSkuMaster', params: { id: sku_master.id }}">
                	<i class="fa fa-edit"></i>
                </router-link>
                <a href="javascript:void(0)" class="icon">
                  <i  v-on:click="onDelete(sku_master)" class="fas fa-trash-restore-alt"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="card-footer pb-0 pt-3">
          <paginate
            :page-count=total_pages
            :click-handler="getClientSkuMasters"
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
    client_categories:[],
      sku_masters: [],
      pageOfItems: [],
      search: '',
      page: 1,
      meta: '',
      total_pages: 1,
      client_category:'',
      code: '',
      search: {}
    }
  },
  created() {
    this.getClientSkuMasters()

    this.$http.secured.get('/admin/client_categories')
        .then(
        response => { this.client_categories = response.data.client_categories})
        .catch(error => this.$toast.error('Error in fetching client Category'))
  },
  computed:{

  filteredSkuMaster(){
 return this.sku_masters.slice().sort((a,b)=>{
        return a.id - b.id
      });
    }
  },
    
  methods: {
  setClientCategoryId () {
      if (this.search.client_category != null) {
        this.client_category = this.search.client_category.id
      }
    },
    getClientSkuMasters (page) {
      this.$http.secured.get('/admin/client_sku_masters', {params: {page: page , code: this.code, client_category_id: this.client_category }})
                        .then(response => { this.sku_masters = response.data.client_sku_masters, this.total_pages = response.data.meta.total_pages})
        .catch(error => this.$toast.error('Error in fetching Client Sku Masters'))
    },

    onDelete(sku_master){
      this.$http.secured.delete(`/admin/client_sku_masters/${sku_master.id}`)
        .then(response => {
          this.sku_masters.splice(this.sku_masters.indexOf(sku_master), 1);
          this.$toast.error('Client Sku Master deleted successfully');
        })
        .catch(error => this.$toast.error('Error in deleting client sku master'))
    },
    reset_search () {
      this.code = ''
      this.client_category = ''
      this.getClientSkuMasters()
    }
  }
  
}

</script>