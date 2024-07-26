<template>
    <div>
        <v-card class="overflow-hidden v-card v-sheet theme--light">
            <!-- Alert Messages -->
            <div>
                <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{ alert_message }}</v-alert>
            </div>
            <div>
                <div>
                    <HeaderComponent :headerTitle="headerText" :createLotComtBidding="createLotComtBidding" :lotIdB2b="lotIdB2b" :action="action"/>
                </div>
            </div>
            <!-- search, Action buttons -->
            <v-card class="v-card-100">
                <v-card-title style="padding: 12px 24px 4px 24px;">
                    <!-- Search fields -->
                    <v-text-field prepend-inner-icon="mdi-magnify" v-model="search_tag" label="Search"
                        style="max-width: 300px; margin-top: 12px;" outlined v-on:keyup.enter="loadData()"></v-text-field>
                    <v-spacer></v-spacer>
                    <!-- Actions buttons -->
                    <v-btn color="primary" class="mr-4 mb-2" @click="uploadDocum">UPLOAD</v-btn>
                </v-card-title>
            </v-card>
            <v-layout column>
                <v-flex md6 style="overflow: auto">
                    <v-data-table :dense="true" :headers="headers" :items="table_data" disable-pagination
                        :hide-default-footer="true" :loading="loading" loading-text="Loading Data... Please wait"
                        class="elevation-1">
                        <template v-slot:item.inventory_file="{item}">
                            <p>{{getFileName(item.inventory_file['url'])}}</p>
                        </template>
                        <template v-slot:item.org_file="{ item }">
                            <v-btn outlined class="cancel-color my-1" color="primary"
                                @click="downloadDocum(item)">DOWNLOAD</v-btn>
                        </template>
                        <template v-slot:item.status="{ item }">
                            <span v-if="item.status == 'Completed'">{{ item.status }}
                                <v-icon color="success" size="18">mdi-alert-circle</v-icon>
                            </span>
                            <span v-else-if="item.status == 'Halted'">{{ item.status }}
                                <v-icon color="warning" size="18">mdi-alert-circle</v-icon>
                            </span>
                            <span v-else-if="item.status == 'Failed'">{{ item.status }}
                                <v-icon color="error" size="18">mdi-alert-circle</v-icon>
                            </span>
                            <span v-else-if="!item.status">Pending</span>
                            <span v-else>{{ item.status }}</span>
                        </template>
                        <template v-slot:item.remarks="{ item }">
                            <span v-if="item.remarks"><a style="text-decoration:underline; color:#007BFF"
                                    @click="showError(item)">View Error</a></span>
                            <span v-else>-</span>
                            <!-- <span>{{ item.remarks ? <a style="text-decoration:underline; color:#007BFF">View Error</a> : "-" }}</span> -->
                        </template>
                    </v-data-table>
                </v-flex>
            </v-layout>
             <!-- pagination display -->
             <div class="float-right">
                <v-row class="ml-2">
                    <v-col cols="4" sm="3">
                        <v-select v-model="pageSize" :items="pageSizes" label="Items per page"
                        @change="handlePageSizeChange"></v-select>
                    </v-col>
                    <v-col cols="12" sm="9">
                        <v-pagination v-model="page" :length="totalPages" total-visible="7" next-icon="mdi-menu-right"
                        prev-icon="mdi-menu-left" @input="handlePageChange"></v-pagination>
                    </v-col>
                </v-row>
            </div>
                    <!-- File Upload popup -->
        <v-row justify="center">
            <v-dialog v-model="fileUploadPopup" persistent max-width="424px">
                <v-card class="v-card-100">
                    <v-card class="v-card-100">
                        <v-card-title>
                            <span>Upload Csv File</span>
                            <v-spacer></v-spacer>
                            <v-btn icon @click="cancelUploadFile">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-card-title>
                    </v-card>
                    <v-card-text>
                        <span class="sample-file">                            
                            <a class="sample-color" href="https://beam-saas-dev.s3.ap-south-1.amazonaws.com/uploads/inventory_file_upload/inventory_file/2880/Sample_lot_file.csv">Download Sample File</a>
                        </span>
                        <v-container>
                            <v-file-input
                                v-model="upload_file"
                                label="Attach Csv file"
                                @change="changeFile"
                                style="margin-top: 28px;"
                                accept=".csv"
                            >
                            </v-file-input>
                            <div v-if="uploading">
                                Uploading file ({{ uploadPercentage }}%)
                                <v-progress-linear
                                :value="uploadPercentage"
                                color="blue"
                                height="10"
                                ></v-progress-linear>
                            </div>
                        </v-container>
                    </v-card-text>
                    <v-card-actions center>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" class="mb-3" v-if="this.confirmButton != 'FINISH'" @click="uploadFile" :disabled="!upload_file">Confirm</v-btn>
                        <v-btn color="primary" class="mb-3" v-if="this.confirmButton == 'FINISH'" @click="confirmUploadFile" :disabled="!upload_file || number>0">Finish</v-btn>
                        <v-btn outlined color="primary" class="cancel-color mb-3" @click="cancelUploadFile">Cancel</v-btn>   
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
         <!-- message popup -->
         <v-row justify="center">
            <v-dialog v-model="messagePopup" persistent :max-width="messagePopWidth">
                <v-card class="v-card-100">
                    <v-card-title>
                        <span></span>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="messagePopup = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text class="text-center">
                        <span>{{ message }}</span>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="loadData" v-if="action_name == 'success_msg'">Ok</v-btn>
                        <v-btn color="primary" @click="downloadError" v-if="action_name == 'download_error'">DOWNLOAD</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        </v-card>
    </div>
</template>
<script>
import HeaderComponent from '../../../../commoncomponents/HeaderComponent.vue';
export default {
    data() {
        return {
            headerText: "Liquidation",
            selected: [],
            file: '',
            binaryData: '',
            alert_type: '',
            alert_message: '',
            alert:'',
            menu: false,
            loading: false,
            search_tag: '',
            headers: [],
            table_data: [],
            page : 1,
            pageSize : 100,
            pageSizes : [100,200,500],
            totalPages : 1,
            fileUploadPopup : '',
            upload_file : '',
            uploading: false,
            confirmButton:'CONFIRM',
            number: 0,
            uploadPercentage: 0,
            messagePopup : false,
            messagePopWidth:'',
            createLotComtBidding:true,
            action:'',
            lotIdB2b:'',
            message:'',
            action_name:'',
        }
    },
    components: {
        HeaderComponent
    },
    async created(){
        this.action = 'file_upload'     
        if(this.action === 'file_upload'){
          this.ids = this.$store.state.lotIds;
        }
        this.loadData();
    },
    methods: {
        showAlert(alert_type, alert_message) {
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
        loadData(){
            this.loading = true;
            this.messagePopup = false;
           
                this.headers = [
                    { text: "ID", value: "id"},
                    { text: "File", value: "inventory_file"},
                    { text: "Status", value: "status"},
                    { text: "Uploaded Date & Time", value: "updated_at"},
                    { text: "Remarks", value: "remarks"},
                    { text: "Original File", value: "org_file"}
                ] 
                this.fetchCreatePRDIndexData();
        },
        fetchCreatePRDIndexData(){
            const params = {
                search_text : this.search_tag,
                page : this.page,
                per_page : this.pageSize,
            }
            this.$http.secured
            .get('/api/v2/warehouse/inventory_file_uploads',{ params : params })
            .then(response => {
                this.table_data = response.data.inventory_file_uploads;
                this.totalPages = response.data.meta.total_pages
                this.loading = false;
            })
            .catch(error => {
                this.number = 0;
                this.$toast.error(error.response.data.message);
            }); 
        },
        handlePageChange(value) {
            this.page = value;
            this.loadData();
        },
        handlePageSizeChange(size) {
            this.pageSize = size;
            this.page = 1
            this.loadData();
        },
        getFileName(file_url){
        var arr = file_url.split('/')
        return  arr[arr.length - 1]
      },
      uploadDocum(){
            this.fileUploadPopup = true;
            this.confirmButton='CONFIRM';
        },
        cancelUploadFile(){
            this.fileUploadPopup = false;
            this.number = 0;
            this.upload_file = '';
            this.uploadPercentage = 0;
            this.uploading = false;
        },
        confirmUploadFile(){
            this.number++;
            const formData = new FormData();
            formData.append('file' , this.upload_file);
            formData.append('inward_type' , 'Competitive Lot');
            this.$http.secured
            .post('/api/v2/warehouse/inventory_file_uploads', formData )
                .then(response => {
                this.fileUploadPopup = false;
                this.messagePopup = true;
                this.action_name = 'success_msg';
                this.message = "Successfully uploaded.";
                this.messagePopWidth = "424px"
                this.upload_file = ''
                })
                .catch(error => {
                    this.number = 0;
                    this.showAlert("error", error.response.data.error);
                });  
        },
        changeFile(){
            if(this.upload_file == null){
                this.confirmButton = 'CONFIRM'
            }
        },
        uploadFile() {
            this.uploading = true;
            const reader = new FileReader();
            reader.onloadend = (event) => {
                setTimeout(() => {
                this.uploading = false;
                this.uploadPercentage = 0;
                }, 2000);
            };
            reader.onprogress = (event) => {
                if (event.lengthComputable) {
                const percentage = Math.round((event.loaded / event.total) * 100);
                this.uploadPercentage = percentage;
                this.number = 0;
                this.confirmButton = 'FINISH'
                }
            };
            reader.readAsDataURL(this.upload_file);
        },
        showError(item){
            this.messagePopup = true;
            this.message = item.remarks;
            // const temp = item.filename.split('.')
            const temp = this.getFileName(item.inventory_file['url'])
            this.file_name_for_error = temp
            this.messagePopWidth = "850px";
            this.action_name = 'download_error';
        },
        downloadError(){
            const url = window.URL.createObjectURL(new Blob([this.message.split(',').join('\n')]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${this.file_name_for_error}_error.txt`);
            document.body.appendChild(link);
            link.click();
            this.action_name = 'success_msg';
            this.message = "Error Downloaded Successfully Completed";
            this.messagePopWidth = "424px"
        },
        downloadDocum(item){
            const link = document.createElement('a');
            link.href = item.inventory_file.url;
            link.setAttribute('download', this.file_name_for_error);
            document.body.appendChild(link);
            link.click();
        },
    }
}
</script>
<style scoped>
.sample-file{
    position: absolute;
    right: 10px;
}
.sample-color{
    color: #0357D0;
}
</style>