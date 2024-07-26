<template>
	<v-container fluid class="lighten-5">
		<div class="main_header" style="margin-left:16px;margin-top:16px">Alert Inventories</div>
	      <v-row
	        class=""
	        
	      >
	        <v-col cols = "12"
	        >
	         <v-data-table
	           v-model="selected"
	           :headers="headers"
	           :items="all_inventories"
	           :single-select="singleSelect"
	           :single-expand="singleExpand"
	           :expanded.sync="expanded"
	           item-key="id"
	           show-select
	           show-expand
	           class="elevation-1"
	         >
	        <template v-slot:item.criticality="{ item }">
	                           <v-chip
	                             class="ma-2"
	                             small
	                             label
	                             :color="getColor(item.criticality)"
	                             dark
	                           >{{ item.criticality }}</v-chip>
	        </template>
	        <template v-slot:expanded-item="{headers, item }">
	            <td :colspan="3"><b>Created At:</b> {{item.inventory.created_at}}</td>
	            <td :colspan="3"><b>MRP:</b> <i class="rupee icon"></i>16,240 </td>
	            <td :colspan="2"><b>Dispostion Cut-Off Date:</b>&nbsp; N/A</td>
	        </template>
	           
	         </v-data-table>
	        </v-col>

	        
	      </v-row>

	</v-container>
	
	
</template>
 

  <script>


  export default {
    name: 'Alert',
    data () {
      return {
      	singleSelect: false,
      	singleExpand: false,
      	expanded: [],
	      selected: [],
	      headers: [
	        {
	          text: 'Disposition',
	          align: 'start',
	          sortable: false,
	          value: 'inventory.details.disposition',
	        },
	        { text: 'Tag Number', value: 'inventory.tag_number' },
	        { text: 'Status', value: 'inventory.details.status' },
	        { text: 'Location', value: 'location' },
	        { text: 'Action Pending', value: 'pending_action' },
	        { text: 'Ageing', value: 'inventory.aging' },
	        { text: 'Alert', value: 'criticality' },
	        { text: '', value: 'data-table-expand' }
	      ],
        all_inventories: [],
        entered_tag_number: '',
        modal_inventory: {},
        activeIndex: undefined,
        stowed: 0,
        not_found: 0,
        sum_passed_failed: 0,
        isCompleteQCAvailable: false,
  	  locations:[],
  	  today_date: new Date(new Date().toJSON().slice(0,10).replace(/-/g,'-')),
  	  selected_rows: [],
      }
    },
    created () {
  	this.getInventories()
    },
    computed: {
  	selectAll: {
  		get: function () {
  			this.isAprroveItem = this.selected_rows.length>0?true:false         
  			return this.all_inventories ? this.selected_rows.length == this.all_inventories.length : false;
  		},
  		set: function (value) {
  			var selected_rows = [];
  			if (value) {
  				this.all_inventories.forEach(function (inventory) {
  				selected_rows.push(Number(inventory.id));
  				});
  			}
  			this.selected_rows = selected_rows;
  		}
  	}      
    },
    methods: {
      getColor(alert) {
      	
      	console.log(alert);
        if (alert == "High") return "red";
        else if (alert == "Medium") return "orange";
        else return "green";
      },
      getInventories (toat_number) {
        let search_param = {
          params:{
          toat_number:toat_number
          }
        }
        this.$http.secured.get('/api/v1/warehouse/alert_inventories', search_param)
        .then(response => { if(response.data.alert_inventories.length) {
          this.all_inventories = response.data.alert_inventories
          }
          else{
            this.$toast.error('No Records found')
          }
        })
        .catch(error => this.$toast.error('Error in fetching inventries'))
      },

      setActive(index) { this.activeIndex = index },

      filterInventory () {    
        if (this.entered_tag_number) {
          if(this.entered_toat_number === this.$store.state.toat_number){
            var entered_toat_number = this.entered_toat_number
            var entered_tag_number = this.entered_tag_number
            var selected_inventories = []
            let isInventoryFond = false;
            this.all_inventories = this.all_inventories.length?this.all_inventories:this.$store.state.inventories
            this.all_inventories.map(function (inventory) {
              if ((inventory.details.toat_number == entered_toat_number) && inventory.tag_number == entered_tag_number) {
                selected_inventories.push(inventory);
                isInventoryFond = true
              }
            });
            !isInventoryFond? this.$toast.error("No Inventories matches") : ''
            this.selected_inventories = selected_inventories
          } else {
            this.getInventories(this.entered_toat_number)
          }

        } else {
            if(this.entered_toat_number != this.$store.state.toat_number){
            this.getInventories(this.entered_toat_number)} 
            else { this.$toast.error("Enter Tag Number") }
          
        }
      },
    }
  }
  </script>