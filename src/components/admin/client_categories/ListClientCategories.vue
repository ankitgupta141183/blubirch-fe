<template>

	<div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">List Client Category</div>
        <div class="p-2">
          <router-link :to="{ name: 'NewAdminClientCategory'}">Add Client Category</router-link>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="table-responsive-md">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th>Client</th>
              <th>Code</th>
              <th>Attrs</th>
              <th>Parent Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          <tr>
          <td>
            <input class="form-control" type="text" placeholder="Search Name" aria-label="Search" v-model="name" v-on:keyup.enter="getClientCategory">
          </td>
          <td>
            <multiselect placeholder="Select Client" v-model= "search.client_ids" :options="clients" label="name" :multiple=" true" track-by="id"  @input="assignClient"></multiselect>
          </td>
           <td>
            <input class="form-control" type="text" placeholder="Search Code" aria-label="Search" v-model="code" v-on:keyup.enter="getClientCategory">
          </td>
          <td></td>
          <td>
            <multiselect placeholder="Select Parent(s)" v-model= "search.parent_ids" :options="categories_all" label="name" :multiple=" true" track-by="id"  @input="assignParent"></multiselect>
          </td>
          <td>
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-on:click="getClientCategory">Search</button>
            <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" v-on:click="reset_search">Reset</button>
          </td>
        </tr>
            <tr v-for="category in filteredClientCategory" :key="category.id" :category="category">                
              <td scope="row">
                {{category.name}}
              </td>
              <td>
                {{category.client.name}}
              </td>
              <td>
                {{category.code}}
              </td>
              <td>
                {{category.attrs}}
              </td>
              <td>
                {{ category.parent_name }}
              </td>
              <td>
              	<router-link :to="{ name: 'ShowAdminClientCategory', params: { id: category.id }}">
                	<i class="fa fa-eye"></i>
                </router-link>                  
                <router-link :to="{ name: 'EditAdminClientCategory', params: { id: category.id }}">
                	<i class="fa fa-edit"></i>
                </router-link>
                <a href="javascript:void(0)" class="icon">
                  <i  v-on:click="onDelete(category)" class="fas fa-trash-restore-alt"></i>
                </a>
              </td>
            </tr> 
          </tbody>
        </table>
        <div class="card-footer pb-0 pt-3">
          <paginate
            :page-count=total_pages
            :click-handler="getClientCategory"
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
      client_categories: [],
      page: 1,
      meta: '',
      total_pages: 1,
      categories_all: [],
      search: {},
      parent_ids: [],
      ancestry: '',
      name: '',
      code: '',
      clients: [],
      client_ids: [],


    }
  },
  created() {
    this.getClientCategory()

    this.$http.secured.get('/admin/clients')
        .then(
        response => {this.clients = response.data.clients})
        .catch(error => this.$toast.error('Error in fetching clients'))


    this.$http.secured.get(`/admin/client_categories/get_client_category_parents`)
        .then(response => {
          this.categories_all = response.data.client_categories
        })
        .catch(error => this.$toast.error('Error in fetching Parent'))
  },
  computed:{
    filteredClientCategory(){
       return this.client_categories.slice().sort((a,b)=>{
        return a.id - b.id
      });
    }
  },
  methods: {
  getClientCategory (page) {
      this.$http.secured.get('/admin/client_categories' , {params: {page: page, name: this.name, code: this.code, ancestry: this.parent_ids, client_id: this.client_ids }})
        .then(response => {this.client_categories = response.data.client_categories, this.total_pages = response.data.meta.total_pages})
        .catch(error => this.$toast.error('Error in fetching Client Category'))
    },
    
    onDelete(category){
      this.$http.secured.delete(`/admin/client_categories/${category.id}`)
        .then(response => {
          this.client_categories.splice(this.client_categories.indexOf(category), 1);
          this.$toast.error('Client Category deleted successfully');
        })
        .catch(error => this.$toast.error('Error in deleting Client Category'))
    },
    reset_search () {
      this.name = ''
      this.code = ''
      this.client_name = ''
      this.getClientCategory()
    },
    assignClient(){
        if (this.search.client_ids != null) {
          let client_ids = this.search.client_ids.map(
          function(client){
            return client.id;
          })
          this.client_ids = client_ids
        }
      },
    assignParent() {
        if (this.search.parent_ids != null) {
          let parent_ids = this.search.parent_ids.map(
          function(parent){
            return parent.id;
          })
          this.parent_ids = parent_ids
        }
      }
  }
  
}

</script>