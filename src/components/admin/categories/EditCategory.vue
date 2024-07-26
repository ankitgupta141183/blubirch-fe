<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Edit Category</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminCategories'}">List Categories</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <form @submit.prevent="updateCategory">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="name" class="d-flex">Name</label>
              <input type="text" placeholder="Name" v-model="editCategory.name" class="form-control" id="name">
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
              <multiselect v-model="editCategory.ancestry" :options="categories" label="name" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select Parent">
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
      categories: [],
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
    this.$http.secured.get('/admin/categories')
      .then(response => {this.categories = response.data.categories})
      .catch(error => this.$toast.error('Error in fetching Category'))
  

    this.$http.secured.get('/admin/categories/'+this.$route.params.id)
      .then(response => { this.editCategory = response.data.category })
      .catch(error => this.$toast.error('Error in getting category information'))
  },
  methods:{
    updateCategory () {      
      this.$http.secured.put('/admin/categories/'+this.$route.params.id, {category : { name: this.editCategory.name, code: this.editCategory.code, attrs: this.editCategory.attrs, ancestry: this.editCategory.ancestry.id } })
        .then(response => {
          this.$router.push('/admin/categories');
          this.$toast.success('Category successfully updated');
        })
        .catch(error => this.$toast.error('Error in updating category'))
    }
  }

}

</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>