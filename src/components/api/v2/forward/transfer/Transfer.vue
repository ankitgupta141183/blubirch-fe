<template>
    <div>
        <!-- Alert message -->
        <div>
            <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
        </div>
        <span>  
            <header-component :headerTitle="headerText" />
        </span>

        <v-card class="v-card-96">
            <v-card-text style="padding: 32px;">
                <v-row>
                    <v-col cols="3" class="pt-7">
                        <span style="font-weight: 600;">Disposition Type</span>
                    </v-col>
                    <v-col cols="4">
                            <v-autocomplete label="Select Disposition Type" v-model="selected_dispoType" :items="dispo_type_List" @change="fetchDisposition" outlined></v-autocomplete>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>


        <v-card class="v-card-96 mt-4">
            <v-card-text style="padding: 32px;">
                <v-row>
                    <v-col cols="3" class="pt-7">
                        <span style="font-weight: 600;">Disposition</span>
                    </v-col>
                    <v-col cols="4">
                            <v-autocomplete label="Select Disposition" v-model="selected_dispos" :items="dispos_list" item-text="original_code" return-object @change="fetchStage" outlined></v-autocomplete>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>



        <v-card class="v-card-96 mt-4">
            <v-card-text style="padding: 32px;">
                <v-row>
                    <v-col cols="3" class="pt-7">
                        <span style="font-weight: 600;">Stage</span>
                    </v-col>
                    <v-col cols="4">
                            <v-autocomplete label="Select Disposition Stage" v-model="selected_stage" :items="stageList" outlined></v-autocomplete>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>



        <v-card class="v-card-96 mt-4">
            <v-card-text style="padding: 32px;">
                <v-row>
                    <v-col cols="3" class="pt-7">
                        <span style="font-weight: 600;">Location</span>
                    </v-col>
                    <v-col cols="4">
                            <v-autocomplete label="Select Location" v-model="selected_location" :items="locationList" item-text="name" item-value="id" outlined></v-autocomplete>
                    </v-col>
                </v-row>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" class="float-right" @click="proceedButton" :disabled="!selected_location || !selected_dispoType">Proceed</v-btn>
                </v-row>
            </v-card-text>
        </v-card>
    </div>

</template>
<script>
import HeaderComponent from "./../../../../commoncomponents/HeaderComponent";

export default {
    components: {
        HeaderComponent
    },

    data(){
        return{
            headerText : "Transfer",
            alert_type : 'success',
            alert      : false,
            alert_message : '',
            selected_dispoType : '',
            dispo_type_List : [],
            selected_dispos : '',
            dispos_list : [],
            selected_stage : '',
            stageList : [],
            selected_location : '',
            locationList :[],

        }
    },
    async created(){
        this.scrollToTop();
        this.fetchDestination();
        // this.fetchDisposition();
        this.fetchLocation();
    },
    methods: {
        scrollToTop() {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        },
        showAlert(alert_type, alert_message) {
            this.scrollToTop();
            this.alert = true;
            this.alert_type = alert_type;
            this.alert_message = alert_message;
            this.alertTimeOut();
        },
        alertTimeOut() {
            setTimeout(() => {
            this.alert = false;
            }, 3000);
        },
        proceedButton(){
            let disp ='';
            if(this.selected_dispos.original_code){
                disp = this.selected_dispos.original_code
            }
            this.$store.commit("transferSelectedLot", {
                disposition:  disp,
                locationId : this.selected_location,
                status : this.selected_stage,
                dispo_type : this.selected_dispoType,
            });
            this.$router.push({ name: 'TransferTablePage' });
        },
        fetchDestination(){
            this.$http.secured
            .get("/api/v1/transfer_inventories/dispositions_type")
                .then(response => {
                if (response.data) {
                    this.dispo_type_List = response.data.disposition_type
                } else {
                    this.showAlert("error", "No Data Found");
                }
            })
            .catch(error => {
                this.showAlert("error", "Something went wrong from Network" + error);
            });
        },
        fetchDisposition(){
            this.$http.secured
            .get("/api/v1/transfer_inventories/dispositions", {params : { disposition_type : this.selected_dispoType }})
                .then(response => {
                if (response.data) {
                    this.dispos_list = response.data.dispositions
                } else {
                    this.showAlert("error", "No Data Found");
                }
            })
            .catch(error => {
                this.showAlert("error", "Something went wrong from Network" + error);
            });
        },
        fetchStage(){
            this.$http.secured
            .get("/api/v1/transfer_inventories/dispositions_sub_status?disposition_id="+this.selected_dispos.id)
                .then(response => {
                if (response.data) {
                    this.stageList = response.data.statuses
                } else {
                    this.showAlert("error", "No Data Found");
                }
            })
            .catch(error => {
                this.showAlert("error", "Something went wrong from Network" + error);
            });
        },
        fetchLocation(){
            this.$http.secured
            .get("/api/v1/distribution_centers")
                .then(response => {
                if (response.data) {
                    this.locationList = response.data.distribution_centers
                } else {
                    this.showAlert("error", "No Data Found");
                }
            })
            .catch(error => {
                this.showAlert("error", "Something went wrong from Network" + error);
            });
        },
    }
}
</script>