<template>        
            <div class="container-fluid about-container box-container">
            <v-row class="main_header" style="margin-bottom:0px">
                <v-card style="width: 100vw; margin-right: 125px;">
                    <v-card-title>
                        <v-col class="pl-4" xs12 :cols="9" style="color: #1B3A57;margin-top:10px">{{ headerTitle }}</v-col>
                    </v-card-title>
                    <v-layout column>
                    <v-flex md6 style="overflow: auto">
                        <v-data-table
                        v-model="selected"
                        :headers="headers"
                        :items="table_data"
                        item-value="id"
                        class="elevation-1"
                        disable-pagination 
                        :hide-default-footer="true"
                        :style="{ 'font-size': '12px', 'color': '#68696e', 'font-weight':'400' }"
                        ></v-data-table>
                    </v-flex>
                    </v-layout>
                </v-card>
                <v-card style="width: 100vw; margin-right: 125px;">
                    <v-card-title>
                        <v-actions style="margin-bottom: 28px;">
                            <v-btn class="ma-2" color="#39a137" style="color: #FFFFFF;" @click="sendApprovalRequest">APPROVE </v-btn>
                            <v-btn class="ma-2" color="#d03403" style="color: #FFFFFF;" @click="sendRejectRequest">REJECT</v-btn>
                        </v-actions>
                    </v-card-title>
                </v-card>
                <!--  Success messeage popup -->
                <v-row justify="center">
                    <v-dialog v-model="successpopup" persistent max-width="424px">
                        <v-card class="v-card-100">
                            <v-card-title>
                                <v-spacer></v-spacer>
                                <v-btn icon @click="successpopup = false">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </v-card-title>
                            <v-card-text class="text-center">
                                <span> {{ successmessage }}</span>
                            </v-card-text>
                            <v-card-actions center>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" class="mb-3" @click="afterClickOkLoadData">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-row>
            </v-row>
        </div>
   
</template>
<script>
import axios from 'axios';
export default {
    name: "approveStatus",
    data() {
        return {
            headerTitle: 'Your approval is required. Click below links to proceed further',
            successpopup: false,
            successmessage:'',
            userId: '',
            userName: '',
            req_id: '',
            table_data: [],
            selected:[],
            headers: [
                { text: "Tag Number", value: "tag_number", width: '12%', align: "start", sortable: false },
                { text: "Brand", value: "brand" },
                { text: "MRP(₹)", value: "mrp" },
                { text: "Description", value: "description" },
                { text: "Requested By", value: "requested_by" },
                { text: "Inward Date", value: "inventory_created_date" }
            ],
            url_type:''
        }
    },
    created() {
        const urlParams = new URLSearchParams(window.location.search);
        this.userId = urlParams.get('user_id');
        this.userName = urlParams.get('user_name');
        this.req_id = urlParams.get('id');
        this.url_type = urlParams.get('type');
        if(this.url_type == 1){
            const url = `https://ruleengine-api.blubirch.com/api/v1/approval_requests/${this.req_id}`
            axios.get(url)
            .then(response => {
                if (response.data) {                    
            this.table_data = [response.data.details];
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
        }else if(this.url_type == 2){
            const url = `https://qa-ruleengine-k8s.blubirch.com/api/v1/approval_requests/${this.req_id}`
            axios.get(url)
            .then(response => {
                if (response.data) {                    
            this.table_data = [response.data.details];
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
        }else if(this.url_type == 3){
            const url = `https://ruleengine.blubirch.com/api/v1/approval_requests/${this.req_id}`
            axios.get(url)
            .then(response => {
                if (response.data) {                    
            this.table_data = [response.data.details];
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
        }               
    },
    methods: {
        sendApprovalRequest() {
            if(this.url_type == 1){
                const url = `https://ruleengine-api.blubirch.com/api/v1/approval_requests/${this.req_id}/approve_request`;
                const params = { user_id: this.userId, user_name: this.userName };
                axios.get(url, { params })
                    .then(response => {
                    this.successmessage = response.data.message;
                    this.successpopup = true;
                    this.$toast.success('Approval request sent successfully:', response.data);
                    })
                    .catch(error => {
                    if(error.response && error.response.data && error.response.data.message) {
                        this.successmessage = error.response.data.message;
                        this.successpopup = true;
                    } else {
                        this.$toast.error('Error sending approval request', error);
                    }
                    });
            }else if(this.url_type == 2){
                const url = `https://qa-ruleengine-k8s.blubirch.com/api/v1/approval_requests/${this.req_id}/approve_request`;
                const params = { user_id: this.userId, user_name: this.userName };
                axios.get(url, { params })
                    .then(response => {
                    this.successmessage = response.data.message;
                    this.successpopup = true;
                    this.$toast.success('Approval request sent successfully:', response.data);
                    })
                    .catch(error => {
                    if(error.response && error.response.data && error.response.data.message) {
                        this.successmessage = error.response.data.message;
                        this.successpopup = true;
                    } else {
                        this.$toast.error('Error sending approval request', error);
                    }
                    });
            }else if(this.url_type == 3){
                const url = `https://ruleengine.blubirch.com/api/v1/approval_requests/${this.req_id}/approve_request`;
                const params = { user_id: this.userId, user_name: this.userName };
                axios.get(url, { params })
                    .then(response => {
                    this.successmessage = response.data.message;
                    this.successpopup = true;
                    this.$toast.success('Approval request sent successfully:', response.data);
                    })
                    .catch(error => {
                    if(error.response && error.response.data && error.response.data.message) {
                        this.successmessage = error.response.data.message;
                        this.successpopup = true;
                    } else {
                        this.$toast.error('Error sending approval request', error);
                    }
                    }); 
            }
               
        },
        sendRejectRequest() {
            if(this.url_type == 1){
                const url = `https://ruleengine-api.blubirch.com/api/v1/approval_requests/${this.req_id}/reject_request`;
                const params = { user_id: this.userId, user_name: this.userName };    
                axios.get(url, { params })
                    .then(response => {
                        this.successmessage = response.data.message;
                        this.successpopup = true;
                        this.$toast.success('Rejection request sent successfully', response.data)
                    })
                    .catch(error => {
                        if(error.response && error.response.data && error.response.data.message){
                            this.successmessage = error.response.data.message;
                            this.successpopup = true;
                        }else {
                            this.$toast.error('Error sending approval request', error);
                        }
                    });
            }else if(this.url_type == 2){
                const url = `https://qa-ruleengine-k8s.blubirch.com/api/v1/approval_requests/${this.req_id}/reject_request`;
                const params = { user_id: this.userId, user_name: this.userName };
    
                axios.get(url, { params })
                    .then(response => {
                        this.successmessage = response.data.message;
                        this.successpopup = true;
                        this.$toast.success('Rejection request sent successfully', response.data)
                    })
                    .catch(error => {
                        if(error.response && error.response.data && error.response.data.message){
                            this.successmessage = error.response.data.message;
                            this.successpopup = true;
                        }else {
                            this.$toast.error('Error sending approval request', error);
                        }
                    });

            }else if(this.url_type == 3){
                const url = `https://ruleengine.blubirch.com/api/v1/approval_requests/${this.req_id}/reject_request`;
                const params = { user_id: this.userId, user_name: this.userName };
    
                axios.get(url, { params })
                    .then(response => {
                        this.successmessage = response.data.message;
                        this.successpopup = true;
                        this.$toast.success('Rejection request sent successfully', response.data)
                    })
                    .catch(error => {
                        if(error.response && error.response.data && error.response.data.message){
                            this.successmessage = error.response.data.message;
                            this.successpopup = true;
                        }else {
                            this.$toast.error('Error sending approval request', error);
                        }
                    });                
            }
        },
        afterClickOkLoadData() {
            this.successpopup = false;
            // window.location.href = 'about:blank'; 
            
        },
    },

}
</script>
<style scoped>
    .text-start{
        color: #68696e;
        font-size: 12px;
    }
</style>