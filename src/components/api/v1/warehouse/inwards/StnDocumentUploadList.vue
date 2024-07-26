<template>
	<div class="card mt-4">
        <div> <HeaderComponent :headerTitle="headerText" /></div>    

    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2"></div>
        <div class="p-2">
          <router-link :to="{ name: 'StnDocumentUpload'}">Add New Upload</router-link>
        </div>
        <div class="p-2">
          <router-link :to="{ name: 'StnDocumentUpload'}">Document Search</router-link>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="table-responsive-md">
      <v-container
        id="scroll-target"
        style="max-height: 600px; max-width:1500px;"
        class="overflow-y-auto"
      >
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th>File</th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Re-Try</th>
              <th>Existing Obd file</th>
              <th>Original file</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(upload,index) in uploads" :key="upload.id" :upload="upload">                
              <td scope="row">
                {{ index + 1 }}
              </td>
              <td>
                {{upload.filename}}              
              </td>
              <td>
                {{upload.status}}
              </td>
              <td>
                {{upload.remarks}}
                
              </td>
              <td>
                <v-btn small v-if="upload.retry_enabled == true" @click="reTryFile(upload)" class="ma-2" color="primary">Retry</v-btn>
              </td>
              <td>
                <v-btn small v-if="upload.errors_file" :href="upload.errors_file" download class="ma-2" color="primary">Download</v-btn>
              </td>
              <td>
                <v-btn small v-if="upload.master_file.url" :href="upload.master_file.url" download class="ma-2" color="primary">Download</v-btn>
              </td>
            </tr>
          </tbody>
        </table>
        </v-container>
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
import HeaderComponent from "../../../../commoncomponents/HeaderComponent";
export default {
  
  data () {
    return {
      headerText: "PRD File Upload",
      uploads: [],
      pageOfItems: [],
      page: 1,
      total_pages: 1
    }
  },
  created() {
    this.getUploads()
  },
  components: {
      HeaderComponent
    },
  computed:{
    sortedUploads(){
      return this.uploads.slice().sort((a,b)=>{
        return a.id - b.id
      })
    }
  },
  methods: {
      onScroll (e) {
      this.offsetTop = e.target.scrollTop
    },
    getUploads (page) {
      this.$http.secured.get('/admin/master_file_uploads', {params: {page: page}})
      .then(response => { 
        this.uploads = response.data.master_file_uploads.filter(({ master_file_type }) => master_file_type == 'Gate Pass')
        this.total_pages = response.data.meta.total_pages})
      .catch(error => this.$toast.error('Error in fetching master file uploads'))
    },
    reTryFile(item){
      var item_id = item.id;
      this.$http.secured.patch(`/admin/master_file_uploads/${item_id}/retry_upload`)
      .then(response => { 
        this.$toast.success(response.data.message);
        this.getUploads();
      })
      .catch(error => this.$toast.error('Error in fetching master file uploads'))
    }
    
  }
  
}

</script>
