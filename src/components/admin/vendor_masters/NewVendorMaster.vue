<template>
	<v-card class=" v-card v-sheet theme--light">
		<v-container class="ma-0 pa-0">
			<v-layout class="ma-0 pa-0">
				<v-flex class="ma-0 pa-0">
					<v-row class="ma-0 pa-0">
						
						
						
            <v-col xs12 :cols="10">
            	<h3>Vendor Master File Upload</h3>

            	<v-form ref="form" @submit.prevent="importFile1" enctype="multipart/form-data">
            	        
            	  <v-file-input multiple v-model="file" label="File input"  ></v-file-input>
            	   
            	  <v-btn color="success" type="submit" class="mr-4"  >
      	          Submit
      	        </v-btn>            	        
            	</v-form>             
               
              
            </v-col>
            
          </v-row>
				</v-flex>
			</v-layout>	
		</v-container>
		
	</v-card>
	
</template>
<script>
import axios from 'axios'
import { securedAxiosInstance, plainAxiosInstance } from '@/backend/axios'

export default {
  
  data () {
    return {
      file: ""
    }
  },
  methods:{
    selectFile(){
      this.file = this.$refs.file
    },
    importFile1 () {  
    	console.log(this.file)
      const formData = new FormData();
      formData.append('file', this.file[0]);
      if (this.file) {
        securedAxiosInstance.post('/admin/vendor_masters/import',formData)
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