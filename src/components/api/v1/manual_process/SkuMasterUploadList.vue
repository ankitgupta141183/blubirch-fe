<template>
	<div class="card mt-4">
        <div> <HeaderComponent :headerTitle="headerText" /></div>    

    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2"></div>
        <span class="pull-right">
          <v-btn color="success">
            <a href="https://beam-saas-dev.s3.ap-south-1.amazonaws.com/uploads/sample_format_reports/sample_client_sku_master_report_20220223_12_49_49.csv" download>Download Sample File</a>
          </v-btn>
        </span>
        <div class="p-2">
          <router-link :to="{ name: 'SkuMasterUpload'}">Add New Upload</router-link>
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
import HeaderComponent from "../../../commoncomponents/HeaderComponent";
export default {
  
  data () {
    return {
      headerText: "SKU Master File Upload",
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
      this.$http.secured.get('/admin/master_file_uploads', {params: {page: page, file_type: 'Client Sku Master' }})
      .then(response => { 
        this.uploads = response.data.master_file_uploads.filter(({ master_file_type }) => master_file_type == 'Client Sku Master')
        this.total_pages = response.data.meta.total_pages})
      .catch(error => this.$toast.error('Error in fetching master file uploads'))
    }
    
  }
  
}

</script>
