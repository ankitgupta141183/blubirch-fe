<template>
  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">New Category</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminCategories'}">List Categories</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <form @submit.prevent="addCategory">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="name" class="d-flex">Name</label>
              <input type="text" placeholder="Name" v-model="newCategory.name" class="form-control" id="name" :class="{ 'is-invalid': $v.newCategory.name.$error, 'is-valid': !$v.newCategory.name.$invalid }">
              <div class="invalid-feedback">
                <span v-if="!$v.newCategory.name.required">Name is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="code" class="d-flex">Code</label>
              <input type="text" placeholder="Code" v-model="newCategory.code" class="form-control" id="code" :class="{ 'is-invalid': $v.newCategory.code.$error, 'is-valid': !$v.newCategory.code.$invalid }">
              <div class="invalid-feedback">
                <span v-if="!$v.newCategory.code.required">Code is required</span>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="attrs" class="d-flex">Attrs</label>
              <input type="text" placeholder="Attrs" v-model="newCategory.attrs" class="form-control" id="attrs">
            </div>

            <div class="form-group col-md-6">
              <label for="ancestry" class="d-flex">Parent</label>
              <multiselect v-model="newCategory.ancestry" :options="categories" label="name" track-by="id"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select Parent">
              </multiselect>
            </div>
          </div>

          <button type="submit" class="btn btn-primary my-2">Create</button>
        </form>
        <hr/>
        <form @submit.prevent="importFile">
          <div class="form-group">
          <div class="form-group col-md-6">
              <label for="file" class="d-flex">Upload Category File</label>
              <input type="file" ref="inputFile"  class="form-control" id="file" @change=uploadFile() :class="{ 'is-invalid': $v.file.$error }">
              <div class="invalid-feedback">
                <span v-if="!$v.file.required">File is required</span>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary my-2">Import File</button>
        </form>
      
    </div>
  </div>	

</template>

<script>
import { required } from 'vuelidate/lib/validators'

  export default {

    data () {
      return {
        file: "",
        categories: [],
        newCategory: {
          'name': '',
          'code': '',
          'attrs': '',
          'ancestry': '',
        }
      }
    },
    validations: {
      newCategory: {
        name: { required },
        code: { required }
      },
      file: {required}
    },
    created() {
      this.getCategory()
    },
    methods:{
      getCategory() {
        this.$http.secured.get('/admin/categories')
          .then(response => {
            this.categories = response.data.categories 
          })
          .catch(error => this.$toast.error('Error in fetching Category'))
      },
    	addCategory () {
        this.$v.newCategory.$touch();
        if (this.$v.newCategory.$invalid) {
            return;
        }      
        this.$http.secured.post('/admin/categories',  { category: { 
                                                          name: this.newCategory.name , 
                                                          code: this.newCategory.code, 
                                                          attrs: this.newCategory.attrs, 
                                                          ancestry: this.newCategory.ancestry.id 
                                                        } 
                                                      })
          .then(response => {
            this.$router.push('/admin/categories');
            this.$toast.success('Category successfully created');
          })
          .catch(error => this.$toast.error('Error in creating Category'))
      },
      uploadFile() {
        this.file = this.$refs.inputFile.files[0]
      },
      importFile() {
        this.$v.file.$touch();
        if (this.$v.file.$invalid) {
            return;
        }
        const formData = new FormData();
        formData.append('file', this.file);
        this.$http.secured.post('/admin/categories/import',formData)
          .then(response => {
            this.$router.push('/admin/categories')
            this.$toast.success('Category File Imported Successfully')
          })
          .catch(error => this.$toast.error('Error in importing Category file')) }
      }
  }

</script>
