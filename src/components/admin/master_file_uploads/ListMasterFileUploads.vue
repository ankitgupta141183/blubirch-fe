<template>

	<div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">List Master File Upload</div>
        <div class="p-2">
          <router-link :to="{ name: 'NewAdminMasterFileUpload'}">Add New Upload</router-link>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="table-responsive-md">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th>Master File</th>
              <th>Master File Type</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="upload in sortedUploads" :key="upload.id" :upload="upload">                
              <td scope="row">
                {{upload.id}}
              </td>
              <td>
                {{upload.filename}}              
              </td>
              <td>
                {{upload.master_file_type}}              
              </td>
              <td>
                {{upload.status}}
              </td>
              <td>
                {{upload.created_at}}
              </td>              
            </tr>
          </tbody>
        </table>
        <div class="card-footer pb-0 pt-3">
          <paginate
            :page-count=total_pages
            :click-handler="getUploads"
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
      uploads: [],
      pageOfItems: [],
      page: 1,
      total_pages: 1
    }
  },
  created() {
    this.getUploads()
  },
  computed:{
    sortedUploads(){
      return this.uploads.slice().sort((a,b)=>{
        return a.id - b.id
      })
    }
  },
  methods: {
    getUploads (page) {
      this.$http.secured.get('/admin/master_file_uploads', {params: {page: page}})
      .then(response => { 
        this.uploads = this.uploads = response.data.master_file_uploads.filter(({ master_file_type }) => master_file_type != 'Gate Pass').slice().reverse();
        this.total_pages = response.data.meta.total_pages})
      .catch(error => this.$toast.error('Error in fetching master file uploads'))
    }
    
  }
  
}

</script>
