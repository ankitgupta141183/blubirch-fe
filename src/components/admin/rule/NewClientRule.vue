<template>
  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">Client Disposition Rules Upload</div>
        <div class="p-2">
        </div>
      </div>
    </div>
     
    <div class="card-body">
       <!-- <form @submit.prevent="addCCMapping">
          <button type="submit" class="btn btn-primary my-2">Create</button>
        </form> -->
        <hr/>
      <form @submit.prevent="importFile1" enctype="multipart/form-data">
        <div class="row">
          <div class="col-4 form-item mb-3">
            <label for="file" class="label">Import Rule File </label>
            <input type="file" class="form-control-file" ref="file" @change="selectFile" />
            
          </div>
          <div class="col-3 form-item mb-3" >
              <label  class="d-flex">Disposition Type</label>
              <input type="text"  class="form-control" autofocus autocomplete="off" placeholder="Disposition Type" v-model="dispositionType"/>
          </div>
          
        </div>

        <div class="row">
          <div class="col-5">
            <button class="btn btn-primary my-2">Submit and Import File</button>
          </div>          
        </div>
        
        
      </form>
    </div>
  </div>	
</template>

<script>
import axios from 'axios'
import { securedAxiosInstance, plainAxiosInstance } from '@/backend/axios'

export default {
  
  data () {
    return {
      file: "",
      dispositionType:""
    }
  },
  methods:{
    selectFile(){
      this.file = this.$refs.file.files[0];
    },
    importFile1 () {  
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('disposition_type',this.dispositionType)
      if (this.file) {
        securedAxiosInstance.post('/admin/rules/import_client',formData)
          .then(response => this.$toast.success('Mapping has been sucessfully created'))
          .catch(error => this.$toast.error('Error in creating mapping'))
      }
      else{
        this.$toast.error('No file has been selected');
      }
    } 
  }
}
</script>