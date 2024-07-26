<template>
	<v-card class=" v-card v-sheet theme--light">
    <br>
    <h3>&nbspVendor Master File Upload</h3>
		<v-container >
			<v-layout class="ma-0 pa-0">
				<v-flex class="ma-0 pa-0">
					<v-row class="ma-0 pa-0">
						
						
						
            <v-col  cols = "12">
            	

              <v-data-table
                :headers="headers"
                :items="items"
                class="elevation-1"
              >                    
              </v-data-table>

            	            
               
              
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
      headers: [
              {
                text: 'Vendor Name',
                align: 'start',
                sortable: false,
                value: 'vendor_name',
              },
              { text: 'Vendor Type', value: 'vendor_type' },
              { text: 'Vendor Code', value: 'vendor_code' },
              { text: 'Vendor Address', value: 'vendor_address' },
              { text: 'Vendor City', value: 'vendor_city' },
              { text: 'Vendor State', value: 'vendor_state' },
              { text: 'Vendor Pin', value: 'vendor_pin' },
              { text: 'Vendor Email', value: 'vendor_email' }
            ],
      items: []
    }
  },
  created() {
    this.getVendors()
  },
  methods:{
    
    getVendors () {  
      securedAxiosInstance.get('/admin/vendor_masters')
        .then(response => {
                            this.items = response.data
                          })
        .catch(error => this.$toast.error('Error in retrieving vendors'))
      
    } 
  }
}
</script>