<template>

	<div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">List Category</div>
        <div class="p-2">
          <router-link :to="{ name: 'NewAdminCategory'}">Add Category</router-link>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="table-responsive-md">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th>Code</th>
              <th>Parent</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          <tr>
          <td>
            <input class="form-control" type="text" placeholder="Search Name" aria-label="Search" v-model="name" v-on:keyup.enter="getCategory">
          </td>
           <td>
            <input class="form-control" type="text" placeholder="Search Code" aria-label="Search" v-model="code" v-on:keyup.enter="getCategory">
          </td>
          <td>
            <multiselect placeholder="Select Parent(s)" v-model= "search.parent_ids" :options="categories_all" label="name" :multiple=" true" track-by="id"  @input="assignParent"></multiselect>
          </td>
          <td>
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-on:click="getCategory">Search</button>
            <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" v-on:click="reset_search">Reset</button>
          </td>
        </tr>
            <tr v-for="category in filteredCategory" :key="category.id" :category="category">                
              <td scope="row">
                {{category.name}}
              </td>
              <td>
                {{category.code}}
              </td>
              <td>
                {{category.parent ? category.parent.name : ""}}
              </td>
              <td>
              	<router-link :to="{ name: 'ShowAdminCategory', params: { id: category.id }}">
                	<i class="fa fa-eye"></i>
                </router-link>                  
                <router-link :to="{ name: 'EditAdminCategory', params: { id: category.id }}">
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
            :click-handler="getCategory"
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
      categories: [],
      categories_all: [],
      search: {},
      ancestry: '',
      name: '',
      code: '',
      page: 1,
      meta: '',
      total_pages: 1,
      parent_ids: []
    }
  },
  created() {
    this.getCategory()

    this.$http.secured.get(`/admin/categories/get_category_parents`)
        .then(response => {
          this.categories_all = response.data.categories
        })
        .catch(error => this.$toast.error('Error in fetching Parent'))
  },
  computed:{
    filteredCategory(){
      return this.categories.slice().sort((a,b)=>{
        return a.id - b.id
      });
    }
  },

  methods: {
    getCategory (page) {
      this.$http.secured.get('/admin/categories' , {params: {page: page, name: this.name, code: this.code, ancestry: this.parent_ids }})
        .then(response => {this.categories = response.data.categories, this.total_pages = response.data.meta.total_pages})
        .catch(error => this.$toast.error('Error in fetching Category'))
    },
     
    onDelete(category){
      this.$http.secured.delete(`/admin/categories/${category.id}`)
        .then(response => {
          this.categories.splice(this.categories.indexOf(category), 1);
          this.$toast.error('Category deleted successfully');
        })
        .catch(error => this.$toast.error('Error in deleting Category'))
    },
    reset_search () {
      this.name = ''
      this.code = ''
      this.getCategory()
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