<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Upload Master File</div>
        <div class="p-2">
          <router-link :to="{ name: 'ListAdminMasterFileUploads'}">List Master File Uploads</router-link>
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <form @submit.prevent="uploadMasterFile">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="client_id" class="d-flex">Master File Type</label>
              <multiselect v-model="search.master_file_type" :options= "['Lookup Value','Lookup Key','Attribute Master', 'Category', 'Client Attribute Master','Client Category', 'Category Test Rule', 'Category Grading Rule', 'Client Category Test Rule', 'Client Category Grading Rule','Client Category Mapping','Client Sku Master','Cost Value','Order','Customer Return Reason','Email Template','Invoice','Reminder','Alert Configurations', 'VendorMaster']"  :searchable="true" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="Select Master Type" @input="getMaster()":class="{'is-invalid': $v.search.master_file_type.$error}">
              </multiselect>
              <div class="invalid-feedback">
                <span v-if="!$v.search.master_file_type.required">Master File Type is required</span>
              </div>
            </div>

            <div class="form-group col-md-6" v-if="showClient">
              <label for="client_id" class="d-flex">Client</label>
              <multiselect v-model="search.client_id" :options="clients" label="name" track-by="id"  :searchable="true" :close-on-select="true" placeholder="Select Client">
              </multiselect>
            </div>

            <div class="form-group col-md-6" v-if="showGradingType">
              <label for="client_id" class="d-flex">Grading Type</label>
              <!-- <multiselect v-model="grading_type" :options="grading_type_options" label="name" track-by="id"  :searchable="true" :close-on-select="true" placeholder="Select Client"> -->
                <multiselect v-model="grading_type":options="grading_type_options" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Pick a value"></multiselect>
              </multiselect>
            </div>


            <div class="form-group col-md-6" v-if="showDC">
              <label for="client_id" class="d-flex">Distribution Center</label>
              <!-- <multiselect v-model="grading_type" :options="grading_type_options" label="name" track-by="id"  :searchable="true" :close-on-select="true" placeholder="Select Client"> -->
                <multiselect v-model="distribution_center" :options="distribution_options" label="name" track-by="id"  :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Pick a value"></multiselect>
              </multiselect>
            </div>


            <div class="form-group col-md-6">
              <label for="file" class="d-flex">Upload Master File</label>
              <input type="file" ref="inputFile"  class="form-control" id="file" @change=uploadFile() :class="{ 'is-invalid': $v.getMasterFile.$error , 'is-valid': !$v.getMasterFile.$invalid }">
              <div class="invalid-feedback">
                <span v-if="!$v.getMasterFile.required">File is required</span>
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-primary my-2">Create</button>
        </form>
      
    </div>
  </div>  

</template>


<script>
import { required } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      search: {},
      getMasterFile: null,
      clients: [],
      grading_type:"",
      grading_type_options: ["Store","Warehouse","Repair"],
      distribution_center : "",
      showDC:false,
      distribution_options:[],
      showClient: false,
      showGradingType: false
    }
  },
  validations: {
    search: {
      master_file_type: { required }
    },
    getMasterFile: {required}
  },

  created () {
    this.$http.secured.get('/admin/clients')
      .then(response => {this.clients = response.data.clients })
      .catch(error => this.$toast.error('Error in fetching clients'))

    this.$http.secured.get('/admin/master_file_uploads/fetch_grading_type')
      .then(response => {this.grading_type_options = response.data.grading_types })
      .catch(error => this.$toast.error('Error in fetching grading_types'))


    this.$http.secured.get('/admin/master_file_uploads/fetch_distribution_centers')
      .then(response => { this.distribution_options = response.data.distribution_centers })
  },
  methods: { 
    getMaster(){
      if (['Client Category', 'Client Attribute Master', 'Client Category Test Rule', 'Client Category Grading Rule'].includes(this.search.master_file_type)) {
        this.showClient = true
      }
      else {
        this.showClient = false
      }

      if (['Client Category Grading Rule', 'Category Grading Rule'].includes(this.search.master_file_type)){
        this.showGradingType = true
      }
      else {
        this.showGradingType = false
      }

      if (this.search.master_file_type == "Alert Configurations") {
        this.showDC = true
      }
      else {
        this.showDC = false
      }
    },
    
    uploadFile: function() {

      this.getMasterFile = this.$refs.inputFile.files[0]
    },
    uploadMasterFile: function() {

      this.$v.search.$touch();
      this.$v.getMasterFile.$touch();

      if (this.$v.search.$invalid && this.$v.getMasterFile.$invalid) {
          return;
      }

      if (this.search.client_id != null) {
        this.search.client_id = this.search.client_id.id
      }

      let formData = new FormData()

      const params = {
                      master_file: this.getMasterFile,
                      client_id: (this.search.client_id == undefined) ? "" : this.search.client_id ,
                      grading_type: this.grading_type,
                      master_file_type: this.search.master_file_type,
                      user_id: this.$store.state.currentUser.id,
                      distribution_center_id: this.distribution_center.id
                    }


      Object.entries(params).forEach(
        ([key, value]) => formData.append(key, value)
      )

      this.$http.secured.post('/admin/master_file_uploads', formData)
        .then(response => {
          this.$router.push('/admin/master_file_uploads');
          this.$toast.success('Successfully uploaded');
        })
      .catch(error => this.$toast.error('Error in Uploading Master File'))
    }
  }
}
</script>
