<template>
	<div>
		<div><HeaderComponent :headerTitle="headerText"/></div>
		<v-row>
			<v-col cols = "8">
				<v-card class="overflow-hidden v-card v-sheet theme--light">
					<v-card-title>
						<v-col cols="5">
			      	<v-text-field prepend-inner-icon="mdi-magnify" v-model="search" label="Search" single-line></v-text-field>
			      </v-col>
			    </v-card-title>
			    <v-spacer></v-spacer>
		      <v-layout column>
			      <v-flex md6 style="overflow: auto">
			        <v-data-table
			          :dense="true"
			          :headers="headers"
			          :items="table_data"
			          :search="search"
			          :item-key="item_key"
			          class="elevation-1"
			          :loading="loading"
			          loading-text="Loading Data... Please wait"
			        >
			         <template v-slot:item.action="{ item }">
				          <img @click="(item)"
				            src="@/assets/images/icons/expand_more.svg"
				            title="action"
				          />
		        		</template>
			    		</v-data-table>
						</v-flex>
					</v-layout>
				</v-card>		
			</v-col>
			<v-col cols='4'>
				<v-card class="overflow-hidden v-card v-sheet theme--light">
			<div>
				<v-col cols="12">
					<div cols="3" class="d-inline-block"><strong>All Alerts</strong></div>
					<div cols="9" class="d-inline-block text-right float-right d-time">12:00am {{yesterday_date}}</div>
				</v-col>
				<v-col cols="12">
					<v-simple-table
		      :dense="true"
		      :fixed-header="true"
		    >
		      <template v-slot:default>
		        <thead>
		          <tr>
		            <th class="text-left">Total:<span class="total">{{total}}</span></th>
		            <th class="text-left">High:<span class="high-alert">{{high_count}}</span></th>
		            <th class="text-left">Med:<span class="med-alert">{{medium_count}}</span></th>
		            <th class="text-left">Low:<span class="low-alert">{{low_count}}</span></th>
		          </tr>
		        </thead>
		      </template>
		    	</v-simple-table>  
				</v-col>
				<v-col cols="12">
					<!-- <v-img src="https://www.amcharts.com/wp-content/uploads/2013/11/demo_129_none.png" aspect-ratio="1.7"></v-img> -->
					<!-- https://tobiasahlin.com/blog/chartjs-charts-to-get-you-started/ -->
					<canvas id="planet-chart"></canvas>
				</v-col>
				<v-simple-table
					:dense="true"
		      :fixed-header="true"
		    >
		      <template v-slot:default>
		        <thead>
		          <tr>
		            <th class="text-left">Alert Type</th>
		            <th class="text-left"><span class="high-alert">High</span></th>
		            <th class="text-left"><span class="med-alert">Med</span></th>
		            <th class="text-left"><span class="low-alert">Low</span></th>
		          </tr>
		        </thead>
		        <tbody>
		        	<tr v-for="(value, key) in rhs_data" :key="key">
			          <td>{{ key | titleize}}</td>
			          <td>{{ value.high }}</td>
		            <td>{{ value.medium }}</td>
		            <td>{{ value.low }}</td>
			        </tr>
		        </tbody>
		      </template>
		    </v-simple-table>
			</div>
		</v-card>
			</v-col>
		</v-row>
	</div>
</template>
<script>
	import Chart from 'chart.js';
	import HeaderComponent from "./../../../commoncomponents/HeaderComponent";
  var ydate = new Date();
  ydate.setDate(ydate.getDate() - 1);
 	
	export default {
    data() {
      return {
      	date: ydate.getDate()+'/'+ (ydate.getMonth()+1) +'/'+ ydate.getFullYear(),
      	yesterday_date: ('0' + ydate.getDate()).slice(-2) + '/' + ('0' + (ydate.getMonth()+1)).slice(-2) + '/' + ydate.getFullYear(),
      	headerText: 'Alerts',
      	item_key:'',
      	search:'',
      	headers: [
          { text: "RPA Location", value: "location", sortable: false},
          { text: "Alert Type", value: "disposition", sortable: false},
          { text: "Trigger Type", value: "status", sortable: false},
          { text: "High", value: "high", sortable: false, sortable: false, class: "high-alert-text"},
          { text: "Med", value: "medium", sortable: false, class: "med-alert-text"},
          { text: "Low", value: "low", sortable: false, class: "low-alert-text"},
          { text: "", value: "action" , sortable: false},
        ],
      	table_data:[],
      	loading: false,
      	high_count: 0,
      	medium_count: 0,
      	low_count: 0,
      	total: 0,
      	rhs_data:[]
    	}
  	},
  	components: {
      HeaderComponent
    },
    created() {
      this.getAlertsData(); 
      this.getAlertsDataCounts();
    },
    filters: {
    	titleize(value){
        if(value == 'rtv'){
        	return 'RTV'
        }
        else{
        	return value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, " ");
        }        
    	}
		},
    methods: {
		  createChart(alert_types, alert_counts) {
		    const ctx = document.getElementById('planet-chart');
		    const myChart = new Chart(ctx, {
		      type: 'doughnut',
		      data: {
          	labels: alert_types,
          	datasets: [{
            	label: "Alerts Types",
            	backgroundColor: ["#2E4358","#369ADB","#1CBF96","#EEB536","#E36917","#ED3833","#AD2959","#62013C","#3346FF"],
            	data: alert_counts,
            }]
          },
		      options: {
				    responsive: true,
            maintainAspectRatio: false,
				    lineTension: 1,
				    // scales: {
				    //   yAxes: [{
				    //     ticks: {
				    //       beginAtZero: true,
				    //       padding: 25,
				    //     }
				    //   }]
				    // }
				  },
		    });
        myChart.canvas.parentNode.style.height = '268px';
        myChart.canvas.parentNode.style.width = '536px';
		  },
		  getAlertsData(){
		  	this.loading = true;
	      this.$http.secured.get("/api/v1/warehouse/inventories/bucket_alert_records")
        .then(response => {
          if (response.data) {
            this.table_data = response.data;
            this.loading = false;
          } else {
            this.loading = false;
            this.showAlert("error", "No Data Found");
          }
        })
        .catch(error => {
          this.showAlert("error", "Something went wrong from Network" + error);
          this.loading = false;
        });
		  },
		  getAlertsDataCounts(){
				var keys	 			 = [];
				var values			 = [];
				var high_count   = 0;
				var medium_count = 0;
				var low_count    = 0;
				var total    		 = 0;
	      this.$http.secured.get("/api/v1/warehouse/inventories/disposition_criticality_count")
        .then(response => {
          if (response.data) {
            this.rhs_data = response.data;
			     	for (let [key, value] of Object.entries(response.data)) {
						  high_count 	 += value.high
						  medium_count += value.medium
						  low_count 	 += value.low
					  	var newStr 		= key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ");
					  	keys.push(newStr);
						  values.push(value.high+value.medium+value.low);
						}
						this.high_count 	= high_count 	 
						this.medium_count = medium_count 
						this.low_count 		= low_count
						this.total 				= high_count + medium_count + low_count
						this.createChart(keys,values)
          } else {
            this.showAlert("error", "No Data Found");
          }
        })
        .catch(error => {
          this.showAlert("error", "Something went wrong from Network" + error);
        });
		  }
		}
  }
</script>
<style>
	.high-alert {color: #DE350B;}
	.med-alert {color: #FF8B00;}
	.low-alert {color: #00875A;}
	.high-alert-text span{color: #DE350B;}
	.med-alert-text span{color: #FF8B00;}
	.low-alert-text span{color: #00875A;}
	.total{color: #2962FF;}
	.d-time{color: rgba(0, 0, 0, 0.6);font-weight: bold;font-size: 14px;}
</style>