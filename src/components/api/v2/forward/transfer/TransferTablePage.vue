<template>
    <v-card class="overflow-hidden v-card v-sheet theme--light">
        <!-- Alert message -->
        <div>
            <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
        </div>
        <!-- Title-->
        <div>
            <header-component :headerTitle="headerText" :router-link="{ name: 'Transfer' }" :router-link-text="'Choose Transferrable Items'"  :return-condition="true" :component-name="'Transferrable Items'"/>
        </div>

        <!-- search, filter, Action buttons -->
        <v-card class="v-card-100">
            <v-card-title style="padding: 12px 24px 4px 24px;">
                <!-- Search fields -->
                <v-row>
                    <v-col cols="8" sm="8">
                        <v-text-field prepend-inner-icon="mdi-magnify" v-model="search_tag" label="Search" style="max-width: 300px;" outlined v-on:keyup.enter="loadData('tab_clicked')" ></v-text-field>
                    </v-col>
                </v-row>
                <!-- Transfer button -->
                <v-btn class="mr-6 mb-7" color="primary" :disabled="selected.length == 0" @click="transferClicked">Transfer</v-btn>
                    
                <!-- Filter -->
                <v-expansion-panels class="custom-control_outlined" style="max-width: 300px; margin-bottom: 28px; min-height: 56px;">
                    <v-expansion-panel outlined @click="filterListOfButtons" >
                        <v-expansion-panel-header>Filter
                            <template v-slot:actions>
                                <v-icon color="primary">
                                    mdi-menu-down
                                </v-icon>
                            </template>
                        </v-expansion-panel-header>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card-title>
        </v-card>

        <!-- Data Table-->
        <v-layout column>
            <v-flex md6 style="overflow: auto;">
                <v-data-table
                    :search = "search"
                    v-model = "selected"
                    show-select
                    disable-pagination
                    :hide-default-footer = "true"
                    :headers = "headers"
                    :items = "table_data"
                    :loading = "loading"
                    loading-text = "Loading Data... Please wait"
                    class="elevation-1"
                ></v-data-table>
            </v-flex>
        </v-layout>

        <!-- pagination display -->
        <div>
            <v-row class="ml-2">
                <v-col cols="4" sm="1" class="PaddingItemPerPage">
                    <v-select v-model="pageSize" :items="pageSizes" label="Items per page"
                    @change="handlePageSizeChange"></v-select>
                </v-col>
                <span class="item-selected"> <span v-if="selected.length == 1">{{selected.length}} Item Selected</span> <span v-if="selected.length > 1">{{selected.length}} Items Selected</span> </span>
                <v-spacer></v-spacer>
                <v-col cols="12" sm="4" class="PaddingItemPerPage">
                    <v-pagination v-model="page" :length="totalPages" total-visible="7" next-icon="mdi-menu-right"
                    prev-icon="mdi-menu-left" @input="handlePageChange"></v-pagination>
                </v-col>
            </v-row>
        </div>

        <!--Filter Popup-->
        <v-row justify="center">
            <v-dialog content-class="filter-data" v-model="filterPopUp" persistent max-width="624">
                <v-card style="max-width: 100% !important;">
                    <v-card-actions>
                        <v-text-field prepend-inner-icon="mdi-magnify" label="Tag ID" v-model="tagId_search" outlined class="ma-2"></v-text-field>
                        <v-text-field prepend-inner-icon="mdi-magnify" label="Article ID" v-model="articleId_search" outlined class="ma-2"></v-text-field>
                    </v-card-actions>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn small outlined color="primary" class="btn-cancel" @click="filterPopUp = false">CANCEL</v-btn>
                        <v-btn small color="primary" @click="applyFilterFunc">APPLY FILTER(S)</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>

        <!--Transfer Popup-->
        <v-row justify="center">
            <v-dialog v-model="transferPopup" persistent max-width="424">
                <v-card class="v-card-100">
                    <v-card class="v-card-100">
                        <v-card-title>
                            <span>Update Location</span>
                            <v-spacer></v-spacer>
                            <v-btn icon @click="transferPopup = false" >
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-card-title>
                    </v-card>
                    <v-card-text>
                        <v-autocomplete prepend-inner-icon="mdi-magnify" label = "Location" v-model = "new_location" :items="locationList" item-text="name" item-value="id" outlined class="mt-6"></v-autocomplete>
                        <v-text-field label = "Remarks" v-model = "remarks" outlined ></v-text-field>
                    </v-card-text>
                    <v-card-actions center>
                        <v-spacer></v-spacer>
                        <v-btn small outlined color="primary" class="btn-cancel" @click="transferPopup = false">CANCEL</v-btn>
                        <v-btn small color="primary" @click="transferSubmit" :disabled = "!new_location || number>0">SUBMIT</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>

        <!--Success Message-->
        <v-row justify="center">
            <v-dialog v-model="successPopup" persistent max-width="424">
                <v-card class="v-card-100">
                    <v-card-title>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="successPopup = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text class="text-center">
                        <span>{{ message }}</span>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="loadData">OK</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>

    </v-card>
</template>
<script>
import HeaderComponent from "./../../../../commoncomponents/HeaderComponent"

export default {
    components: {
        HeaderComponent
    },
    data() {
        return {
            headerText : "Transfer",
            alert      : false,
            alert_message : '',
            alert_type  : '',
            search  : '',
            selected : [],
            page : 1,
            pageSize : 100,
            pageSizes : [100, 200, 500],
            totalPages : 1,
            headers : [
                {text: "Tag ID", value: "tag_number"},
                {text: "Article ID", value: "sku_code"},
                {text: "Article Description", value: "item_description"},
                {text: "Category", value: "category"},
                {text: "Item Sub-Location", value: "sub_location"},
                {text: "Item Location", value: "location"},
            ],
            loading : false,
            table_data : [],
            filterPopUp : false,
            articleId_search : '',
            tagId_search : '',
            transferPopup : false,
            new_location : '',
            remarks : '',
            number  :0,
            successPopup : false,
            message : '',
            location : '',
            disposition : '',
            status : '',
            locationList : [],
            dispo_type : '',
        }
    },
    async created(){
        this.location = this.$store.state.locationId
        this.disposition = this.$store.state.disposition
        this.status = this.$store.state.status
        this.dispo_type = this.$store.state.dispo_type
        this.loadData();
        this.fetchLocation();
        this.scrollToTop();
    },
    methods :{
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
        loadData(tab_action){
            if(tab_action != 'tab_clicked'){
                this.search_tag = '';
            }
            this.loading = true;
            this.page = 1;
            this.pageSize = 100;
            this.successPopup = false;
            this.totalPages = 1;
            this.selected = [];
            this.fetchTableData();
        },
        fetchTableData(){
            const params = {
                'search' : this.search_tag,
                'page' : this.page,
                'per_page' : this.pageSize
            }
            this.$http.secured
            .get("/api/v1/transfer_inventories?distribution_center_id="+this.location+"&disposition="+this.disposition+"&status="+this.status+"&disposition_type="+this.dispo_type, { params : params })
                .then(response => {
                if (response.data) {
                    this.table_data = response.data.inventories
                    this.totalPages = response.data.meta.total_pages
                    this.loading = false;
                } else {
                    this.loading = false;
                    this.showAlert("error", "No Data Found");
                }
            })
            .catch(error => {
                this.loading = false;
                this.showAlert("error", "Something went wrong from Network" + error);
            });
        },
        handlePageSizeChange(){
            this.page = 1;
            this.fetchTableData();
        },
        handlePageChange(){
            this.fetchTableData();
        },
        filterListOfButtons(){
            this.filterPopUp = true;
            this.articleId_search = '';
            this.tagId_search = '';
        },
        transferClicked(){
            this.transferPopup = true;
            this.number = 0;
            this.new_location = '';
            this.remarks = '';
        },
        transferSubmit(){
            this.number++;
            const idsList = this.selected.map(x => x.id);
            this.$http.secured
            .post("/api/v1/transfer_inventories/transfer_inventories",
            {
                'ids' : idsList,
                'distribution_center_id': this.new_location,
                'remarks': this.remarks,
                'disposition_type' : this.dispo_type,
            })
                .then(response => {
                if (response.data) {
                    this.transferPopup = false;
                    this.message = response.data.message,
                    this.successPopup = true,
                    this.updatePendingConfirmationCancel();
                } else {
                    this.number=0;
                    this.$toast.error("error", "No Data Found");
                }
            })
            .catch(error => {
                this.number=0;
                this.$toast.error(error.response.data.error);
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
        applyFilterFunc(){
            this.search_tag = '';
            const params = {
                'article_ids' : this.articleId_search,
                'tag_numbers' : this.tagId_search,
                'page' : this.page,
                'per_page' : this.pageSize
            }
            this.$http.secured
            .get("/api/v1/transfer_inventories?distribution_center_id="+this.location+"&disposition="+this.disposition+"&status="+this.status+"&disposition_type="+this.dispo_type, {params})
                .then(response => {
                if (response.data) {
                    this.table_data = response.data.inventories
                    this.totalPages = response.data.meta.total_pages
                    this.loading = false;
                } else {
                    this.loading = false;
                    this.showAlert("error", "No Data Found");
                }
            })
            .catch(error => {
                this.loading = false;
                this.showAlert("error", "Something went wrong from Network" + error);
            });

            this.filterPopUp =false;
            // call filter api
        }

    }
}
</script>
<style scoped>
    .custom-control_outlined button {
        min-height: 56px;
        border-width: 1px;
        border-color: rgba(0,0,0,.42);
        border-style: solid;
    }
    .v-dialog__content:has(.filter-data){
        justify-content: right;
        align-items: baseline;
        top: 11rem;
    }
    .item-selected{
        margin-top: 23px;
        position: absolute;
        left: 41%;
    }
    @media (max-height: 1104px) {
        .PaddingItemPerPage{
            padding: 8px !important;
        }
    }
    @media (min-height: 1126px) {
        .PaddingItemPerPage{
            padding: 24px !important;
        }
    }
</style>