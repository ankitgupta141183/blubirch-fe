<template>
    <v-row justify="center">
                    <v-dialog v-model="successpopup" persistent max-width="424px">
                        <v-card class="v-card-100">
                            <v-card-title>
                                <v-spacer></v-spacer>
                                <v-btn icon @click="afterClickOkLoadData">
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
</template>
<script>
import axios from 'axios';
 export default{
    name: "ApprovalRequest",
    data(){
        return{
            successmessage:'',
            successpopup: false,
            userId: '',
            userName: '',
            req_id: '',
            url_type:''

        }
    },
    created() {
        const urlParams = new URLSearchParams(window.location.search);
        this.userId = urlParams.get('user_id');
        this.userName = urlParams.get('user_name');
        this.req_id = urlParams.get('id');
        this.url_type = urlParams.get('type');
        this.sendApprovalRequest();
    },
    methods:{
        afterClickOkLoadData() {
            this.successpopup = false;
            this.successmessage = '';
            window.location.href = "https://qa-docker.blubirch.com:3780/api/v1/disposition";
 
            
        },
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
    }
 }
</script>