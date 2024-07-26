<template>

  <div class="card mt-4">
    <div class="card-header">
      <div class="d-flex">
        <div class="mr-auto p-2">New Alert Configuration</div>
        <div class="p-2">
        </div>
      </div>
    </div>


    
     
    <div class="card-body">
        <form @submit.prevent="importFile" enctype="multipart/form-data">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="name" class="d-flex">Clients</label>
              <multiselect id="distribution_centers" placeholder="Select Distribution Center" v-model= "dc_ids" :options="distribution_centers" label="name" track-by="id" ></multiselect>
              
            </div>
            <div class="form-group col-md-6">
              <label for="file" class="label">Import Alert Configuration File </label>
              <input type="file" class="form-control" ref="file" @change="selectFile" />
              
              <button class="btn btn-primary my-2">Import File</button>
            </div>
          </div>
          
        </form>
      
    </div>
  </div>  

</template>



<script>
import { required } from 'vuelidate/lib/validators'
import Multiselect from 'vue-multiselect'

export default {

  data () {
    return {
      file: "",
      dc_ids:[],
      distribution_centers:[]
    }
  },
  components: {
    Multiselect
  },
  created(){

    this.$http.secured.get('/admin/distribution_centers')
            .then(response => { this.distribution_centers = response.data.distribution_centers })

  },
  methods:{
    selectFile(){
      this.file = this.$refs.file.files[0];
    },
    importFile () { 
      
       
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('distribution_center_id',this.dc_ids.id)
      this.$http.secured.post('/admin/alert_configurations/import',formData);
      this.$toast.success('Alert Configurations successfully created');
    }
  }

}

</script>