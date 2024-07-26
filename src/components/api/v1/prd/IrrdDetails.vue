<template>
    <div>
        <v-card class="overflow-hidden v-card v-sheet theme--light">
            <!-- Alert Messages -->
            <div>
                <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{ alert_message }}</v-alert>
            </div>
            <!-- ######## Main page ######## -->
            <HeaderComponent :headerTitle="headerText" :router-link="{ name: 'PRD' }"
             :router-link-text="action_title"  :return-condition="true" :component-name="prd_number"></HeaderComponent>
            <!-- <HeaderComponent :headerTitle="headerText" :IrrdDetails="IrrdDetails" :tagNumber="tagNumber"/> -->

            <!-- search, Action buttons -->
            <v-card class="v-card-100" v-if="action == 'IRD' || action == 'IRRD' || action == 'create_prd' || action == 'upload_prd'">
                <v-card-title style="padding: 12px 24px 4px 24px;">
                <!-- Search fields -->
                <v-text-field prepend-inner-icon="mdi-magnify" v-model="search_tag" label="Search" style="max-width: 300px; margin-top: 12px;" outlined v-on:keyup.enter="loadData()" ></v-text-field>
                <v-spacer></v-spacer>
                <!-- Actions buttons -->
                    <v-btn  color="primary" @click="downloadthis" class="mr-4" v-if="action != 'create_prd' && action != 'upload_prd'">Download</v-btn>
                    <v-btn  color="primary" @click="printThis" class="mr-4" v-if="action != 'create_prd' && action != 'upload_prd'">Print</v-btn>
                    <v-btn  color="primary" @click="emailThis" class="mr-4" v-if="action != 'create_prd' && action != 'upload_prd'">E-MAIL</v-btn>
                    <v-btn  color="primary" class="mr-4 mb-2" v-if="action == 'create_prd' ||  action == 'upload_prd'" @click="uploadDocum">UPLOAD</v-btn>
                </v-card-title>
            </v-card>

            <!--Name, Price and Creation Date-->
            <v-card class="v-card-100" v-if="action == 'IRD' || action == 'IRRD'">
                <v-row>
                    <v-col cols="4" class="text-center">
                        <span style="font-weight: 500;" >Vendor Name: {{ vendor_name }}</span>
                    </v-col>
                    <v-col cols="4" class="text-center">
                        <span style="font-weight: 500;" >Purchase Price: {{ purchase_price }}</span>
                    </v-col>
                    <v-col cols="4" class="text-center">
                        <span style="font-weight: 500;">Creation Date: {{ creation_date }}</span>
                    </v-col>
                </v-row>
            </v-card>

            <!-- Data Table -->
            <v-layout column  v-if="action == 'IRD' || action == 'IRRD' || action == 'create_prd' || action == 'upload_prd'">
                <v-flex md6 style="overflow: auto">
                    <v-data-table 
                        :dense="true" 
                        :headers="headers" 
                        :items="table_data"
                        disable-pagination 
                        :hide-default-footer="true"
                        :loading="loading" 
                        loading-text="Loading Data... Please wait"
                        class="elevation-1">
                        <template #[`item.org_file`]="{ item }">
                            <v-btn outlined class="cancel-color my-1" color="primary" @click="downloadDocum(item)">DOWNLOAD</v-btn>
                        </template>
                        <template #[`item.status`]="{ item }">
                            <span v-if="item.status == 'Completed'">{{ item.status  }} 
                                <v-icon color="success" size="18">mdi-alert-circle</v-icon>
                            </span>
                            <span v-else-if="item.status == 'Halted'">{{ item.status  }} 
                                <v-icon color="warning" size="18">mdi-alert-circle</v-icon>
                            </span>
                            <span v-else-if="item.status == 'Fail'">{{ item.status  }} 
                                <v-icon color="error" size="18">mdi-alert-circle</v-icon>
                            </span>
                            <span v-else-if="!item.status">Pending</span>
                            <span v-else>{{ item.status }}</span>
                        </template>
                        <template #[`item.remarks`]="{ item }">
                            <span v-if="item.remarks"><a style="text-decoration:underline; color:#007BFF" @click="showError(item)">View Error</a></span>
                            <span v-else>-</span>
                            <!-- <span>{{ item.remarks ? <a style="text-decoration:underline; color:#007BFF">View Error</a> : "-" }}</span> -->
                        </template>
                    </v-data-table>
                </v-flex>
            </v-layout>

            <!-- pagination display -->
            <div v-if="action == 'IRD' || action == 'IRRD' || action == 'create_prd' || action == 'upload_prd'">
                <v-row class="ml-2">
                    <v-col cols="4" sm="1" class="PaddingItemPerPage">
                        <v-select v-model="pageSize" :items="pageSizes" label="Items per page"
                        @change="handlePageSizeChange"></v-select>
                    </v-col>
                    <!-- <span class="item-selected"> <span v-if="selected.length == 1">{{selected.length}} Item Selected</span> <span v-if="selected.length > 1">{{selected.length}} Items Selected</span> </span> -->
                    <v-spacer></v-spacer>
                    <v-col cols="12" sm="4" class="PaddingItemPerPage">
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
                            <span v-if="action == 'create_prd'">Create PRD</span>
                            <span v-if="action == 'upload_prd'">Upload Csv File</span>
                            <v-spacer></v-spacer>
                            <v-btn icon @click="cancelUploadFile">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-card-title>
                    </v-card>
                    <v-card-text>
                        <v-container>
                            <div class="pb-3">
                                <span style="color: #007BFF;float: right; font-size: smaller;" @click="downloadSampleFile">Download PRD Sample File</span>
                            </div>
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

        <!-- e-mail popup -->
        <v-row justify="center">
            <v-dialog v-model="emailPopup" persistent max-width="424px">
                <v-card class="v-card-100">
                    <v-card class="v-card-100">
                        <v-card-title>
                            <span>Email ID</span>
                            <v-spacer></v-spacer>
                            <v-btn icon @click="emailPopup = false">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-card-title>
                    </v-card>
                    <v-card-text>
                        <div v-for="(email , index) in emailIds" :key="index">
                            <span v-if="index ==0 ">
                                <v-text-field label = "Enter Email ID" v-model="email.email_id" outlined class="mt-5" :rules="[validateEmail]"></v-text-field>
                            </span>
                            <span v-else>
                                <v-text-field label = "Enter Email ID" v-model="email.email_id" outlined :rules="[validateEmail]"></v-text-field>
                            </span>
                        </div>
                        <span style="text-decoration:underline; color:#007BFF" @click="add_more_emailId">Add More</span>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" class="mb-3" :disabled="isSendButtonDisabled()" @click="sendEmail">SEND</v-btn>  
                        <v-btn outlined color="primary" class="cancel-color mb-3" @click="emailPopup = false">CANCEL</v-btn>  
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>

        <!-- Complete PRD Details -->
        <v-card v-if="action == 'Incomplete PRD\'s'">
            <v-card-text class="pa-8">
                <v-row>
                    <v-col cols="4">
                        <span style="font-weight: bold;">Update Details</span>
                    </v-col>
                    <v-col cols="8">
                        <v-row>
                            <v-col cols="6" v-for="item in item_schema" :key="item">
                                <span v-if="item.type == 'dropDown'">
                                    <v-autocomplete :label="item.label" v-model="item.value" :items="location_list" item-text = "code" item-value = "id" outlined></v-autocomplete>
                                </span>
                                <span v-else-if="item.type == 'textField'">
                                    <v-text-field :label="item.label" v-model="item.value" outlined ></v-text-field>
                                </span>
                                <span v-else-if="item.type == 'date'">
                                    <v-menu v-model="item.openDatePopup" :close-on-content-click="false"
                                     transition="scale-transition" offset-y min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field :value="formattedDate(item)" :label="item.label" outlined
                                                append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on">
                                            </v-text-field>
                                        </template>
                                        <v-date-picker :max="new Date().toISOString().substr(0, 10)" v-model="item.value" no-title scrollable> 
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="handleCancel(item)">
                                                Cancel
                                            </v-btn>
                                            <v-btn text color="primary" @click="item.openDatePopup = false">
                                                OK
                                            </v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                </span>
                                <span v-else-if="item.type == 'checkBoxButton'" style="display: flex;">
                                    <span class="mb-0 mt-4" style="font-size: 16px;">{{ item.label }}</span>
                                    <v-checkbox v-model="item.value" label="True" value="true" class="ml-15 mt-3"></v-checkbox>
                                    <v-checkbox v-model="item.value" label="False" value="false" class="ml-15 mt-3"></v-checkbox>
                                </span>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" class="mb-7 mr-4" @click="submitUpdateDetails" :disabled="checkDisablebility">SUBMIT</v-btn>
            </v-card-actions>
        </v-card>
        </v-card>

        
    </div>
</template>
<script>
import $ from 'jquery';
import HeaderComponent from "./../../../commoncomponents/HeaderComponent";
export default {
    components: {
        HeaderComponent,
    },
    data(){
        return {
        headerText: "PRD",
        prd:true,
        search_tag:'',
        IrrdDetails:true,
        loading: false,
        alert: false,
        alert_type: "success",
        alert_message: "success",
        headers : [],
        table_data : [],
        page : 1,
        pageSize : 25,
        pageSizes : [25,50,75,100],
        totalPages : 1,
        item_details : '',
        prd_number : '',
        irrdNumTodfetchData : '',
        vendor_name : '',
        purchase_price : '',
        creation_date : '',
        action : '',
        fileUploadPopup : '',
        upload_file : '',
        uploading: false,
        confirmButton:'CONFIRM',
        number: 0,
        uploadPercentage: 0,
        messagePopup : false,
        messagePopWidth:'',
        action_name : '',
        file_name_for_error : '',
        message : '',
        action_title : '',
        tab_name : '',
        emailIds : [],
        emailPopup : false,
        location_list : [],
        item_id : '',
        prd_item_details: '',
        item_key : {
                'tag_number' : 'Tag Number',
                'box_number' : 'Box Number',
                'brand' : 'Brand',
                'model' : 'Model',
                'scan_indicator' : 'Scan Indicator',
                'imei_flag' : 'IMEI Flag',
                'serial_number1' : 'Serial Number 1',
                'serial_number2' : 'Serial Number 2',
                'quantity' : 'Quantity',
                'mrp' : 'MRP',
                'asp' : 'ASP',
                'sales_price' : 'Sales Price',
                'map' : 'MAP',
                'purchase_price' : 'Purchase Price',
                'type_of_damage' : 'Types Of Damage',
                'type_of_loss' : 'Types Of Loss',
                'estimated_loss' : 'Estimated Loss',
                'purchase_invoice_number' : 'Purchase Invoice Number',
                'doa_certificate_number' : 'DOA Certificate Number',
                'supplying_site_id' : 'Supplying Site',
                'receiving_site_id' : 'Receiving Site',
                'brand_approval_required' : 'Brand Approval',
                'buyer_available' : 'Buyer Available',
                'prd_number' : 'PRD Number',
                'incident_date' : 'Incident Date',
                'sales_invoice_date' : 'Sales Invoice Date',
                'installation_date' : 'Installation date',
                'purchase_date' : 'Purchase Date',
                'purchase_invoice_date' : 'Purchase Invoice Date',
                'doa_certificate_date' : 'DOA Certificate Date',
            },
        item_schema : [],
        menu_141: false,
        selectedDate : '',
        }
    },
    async created(){
        this.action = this.$store.state.action;
        const item_detail = JSON.parse(this.$store.state.items);
        this.tab_name = this.$store.state.tab_name
        if(this.action == 'create_prd' || this.action == 'upload_prd'){
            this.prd_number = (this.action == 'create_prd') ? 'Create PRD' : 'Upload PRD';
            this.action_title = 'Incomplete PRD'
        } else if(this.action == 'IRRD'){
            this.prd_number = item_detail.irrd_number;
            this.action_title = this.action;
        }else if(this.action == 'IRD'){
            this.prd_number = item_detail.ird_number;
            this.action_title = this.action;
        }else {
            this.prd_number = 'Update Information';
            this.item_id =  item_detail.id
            this.action_title = this.action;
            this.irrdNumTodfetchData = item_detail.irrd_number;
            this.getLocationData();
            this.getPrdDetails();
        }
        this.loadData();
    },
    computed : {
        checkDisablebility(){
            return !this.item_schema.some( x => x.value);
        },
    },
    methods : {
        loadData(){
            this.loading = true;
            this.messagePopup = false;
            if(this.action == 'IRRD'){
                this.headers = [
                    { text: "IRD No.", value: "ird_number"},
                    { text: "Tag ID", value: "tag_number"},
                    { text: "Article ID", value: "sku_code"},
                    { text: "Article Description", value: "sku_description"},
                    { text: "Serial Number", value: "serial_number1"}
                ]
            this.fetchIRRDData();
            } else if(this.action == 'IRD'){
                this.headers = [
                    { text: "Article ID", value: "sku_code"},
                    { text: "Article Description", value: "sku_description"},
                    { text: "Serial Number", value: "serial_number1"}
                ]
            this.fetchIRDData();
            } else if(this.action == 'create_prd'){
                this.headers = [
                    { text: "ID", value: "id"},
                    { text: "File", value: "filename"},
                    { text: "Status", value: "status"},
                    { text: "Uploaded Date & Time", value: "updated_at"},
                    { text: "Remarks", value: "remarks"},
                    { text: "Original File", value: "org_file"}
                ] 
                this.fetchCreatePRDIndexData();
            } else if(this.action == 'upload_prd'){
                this.headers = [
                    { text: "ID", value: "id"},
                    { text: "File", value: "filename"},
                    { text: "Status", value: "status"},
                    { text: "Uploaded Date & Time", value: "updated_at"},
                    { text: "Remarks", value: "remarks"},
                    { text: "Original File", value: "org_file"}
                ] 
                this.fetchUploadIndexData();
            }
        },
        fetchIRRDData(){
            this.purchase_price = 0;
            const params = {
                search : this.search_tag,
                page : this.page,
                per_page : this.pageSize
            }
            this.$http.secured
            .get('/api/v1/warehouse/prd/get_irrd_items?status='+this.tab_name+'&irrd_number='+this.prd_number,{ params : params })
            .then(response => {
                this.table_data = response.data.pending_receipt_document_items;
                this.totalPages = response.data.meta.total_pages
                if(this.table_data.length > 0){
                    this.creation_date = this.table_data[0].created_date
                    this.vendor_name = this.table_data[0].vendor_name
                    this.table_data.forEach( x=> { this.purchase_price+= x.purchase_price; })
                }
                this.loading = false;
            })
            .catch(error => {
                this.number = 0;
                this.$toast.error(error.response.data.message);
            }); 
        },
        fetchIRDData(){
            this.purchase_price = 0;
            const params = {
                search : this.search_tag,
                page : this.page,
                per_page : this.pageSize
            }
            this.$http.secured
            .get('/api/v1/warehouse/prd/get_ird_items?status='+this.tab_name+'&ird_number='+this.prd_number,{ params : params })
            .then(response => {
                this.table_data = response.data.pending_receipt_document_items;
                this.totalPages = response.data.meta.total_pages
                if(this.table_data.length > 0){
                    this.creation_date = this.table_data[0].created_date
                    this.vendor_name = this.table_data[0].vendor_name
                    this.table_data.forEach( x => { this.purchase_price+= x.purchase_price; })
                }
                this.loading = false;
            })
            .catch(error => {
                this.number = 0;
                this.$toast.error(error.response.data.message);
            }); 
        },
        fetchCreatePRDIndexData(){
            const params = {
                search : this.search_tag,
                page : this.page,
                per_page : this.pageSize
            }
            this.$http.secured
            .get('/api/v1/warehouse/prd/file_uploads',{ params : params })
            .then(response => {
                this.table_data = response.data.master_file_uploads;
                this.totalPages = response.data.meta.total_pages
                this.loading = false;
            })
            .catch(error => {
                this.number = 0;
                this.$toast.error(error.response.data.message);
            }); 
        },
        fetchUploadIndexData(){
            const params = {
                search : this.search_tag,
                page : this.page,
                per_page : this.pageSize
            }
            this.$http.secured
            .get('/api/v1/warehouse/prd/file_uploads?file_type=Update PRD Items',{ params : params })
            .then(response => {
                this.table_data = response.data.master_file_uploads;
                this.totalPages = response.data.meta.total_pages
                this.loading = false;
            })
            .catch(error => {
                this.number = 0;
                this.$toast.error(error.response.data.message);
            }); 
        },
        downloadthis(){
            const api_link = (this.action == 'IRRD') ? 'download_irrd_items' : 'download_ird_items';
            const irrd_type = (this.action == 'IRRD') ? 'irrd_number' : 'ird_number';
            this.$http.secured.
            get('/api/v1/warehouse/prd/'+api_link+'?status='+this.tab_name+'&'+irrd_type+'='+this.prd_number,
                {
                responseType: 'blob'
                }
            )
            .then(response => {
            if (response.data) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${this.prd_number}-Items.csv`);
                document.body.appendChild(link);
                link.click();
                this.messagePopup = true;
                this.action_name = 'success_msg';
                this.message = String(this.prd_number)+" - Downloaded Successfully";
                this.messagePopWidth = "424px"
            }
            })
            .catch(error => {
            this.showAlert("error", "Something went wrong from Network" + error);
            });
        },
        printThis(){
            window.print();
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
            if(this.action == 'upload_prd'){
                formData.append('file_type' , "Update PRD Items");
            }
            this.$http.secured
            .post('/api/v1/warehouse/prd/upload_file', formData )
                .then(response => {
                this.fileUploadPopup = false;
                this.messagePopup = true;
                this.action_name = 'success_msg';
                this.message = "PRD Successfully Initiated";
                this.messagePopWidth = "424px"
                })
                .catch(error => {
                    this.number = 0;
                    this.$toast.error(error.response.data.message);
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
        downloadDocum(item){
            const link = document.createElement('a');
            link.href = item.master_file.url;
            link.setAttribute('download', `${item.filename}`);
            document.body.appendChild(link);
            link.click();
            this.action_name = 'success_msg';
            this.message = item.filename + " Downloded Successfully!";
            this.messagePopWidth = "424px"
            this.messagePopup = true;
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
        showError(item){
            this.messagePopup = true;
            this.message = item.remarks;
            const temp = item.filename.split('.')
            this.file_name_for_error = temp[0]
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
        emailThis(){
            this.emailPopup = true;
            this.emailIds= [{ email_id : '' }];
        },
        add_more_emailId(){
            this.emailIds.push({email_id : ''});
        },
        validateEmail(value) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                return 'This Field is Required'
            }
            if (!regex.test(value)) {
                return 'Not a valid email address.';
            }
            const domain = value.split('.').pop();
            if (domain.toLowerCase() !== 'com') {
                return 'Please use a .com email address.';
            }
            return null;
        },
        isSendButtonDisabled() {
            return this.emailIds.some((email) => {
                const trimmedEmail = email.email_id.trim();
                const validationError = this.validateEmail(trimmedEmail);
                return !trimmedEmail || validationError;
            });
        },
        sendEmail(){
            const api_link = (this.action == 'IRRD') ? 'download_irrd_items' : 'download_ird_items';
            const irrd_type = (this.action == 'IRRD') ? 'irrd_number' : 'ird_number';
            var emails = [];
            this.emailIds.forEach( x => { emails.push(x.email_id)});
            const params = {
                "email_ids":emails
            }
            this.$http.secured.
            get('/api/v1/warehouse/prd/'+api_link+'?send_email=true&status='+this.tab_name+'&'+irrd_type+'='+this.prd_number,
                { params : params }
            )
            .then(response => {
            if (response.data) {
                this.emailPopup = false;
                this.action_name = 'success_msg';
                this.message = response.data.message;
                this.messagePopWidth = "424px"
                this.messagePopup = true;
            }
            })
            .catch(error => {
                this.$toast.error(error.response.data.error);
            });
        },
        downloadSampleFile(){
            var api;
            if(this.action == 'create_prd'){
                api = "/api/v1/warehouse/prd/download_prd_sample"
            } else {
                api = "/api/v1/warehouse/prd/download_prd_sample?upload=true"
            }
            this.$http.secured
            .get(api)
                .then(response => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    const file_name = (this.action == 'create_prd') ? 'Create PRD Sample' : 'Upload PRD Sample';
                    link.setAttribute('download', `${file_name}.csv`);
                    document.body.appendChild(link);
                    link.click();
                    this.$toast.success("PRD Sample file downloaded!");
                })
                .catch(error => {
                    this.number = 0;
                    this.$toast.error(error.response.data.message);
                });
        },
        getLocationData(){
            this.$http.secured
            .get("/api/v1/warehouse/prd/filters_data")
                .then(response => {
                if (response.data) {
                    this.location_list = response.data.locations
                }
            })
                .catch(error => {
                    this.$toast.error(error.response.data.error);
            });
        },
        getPrdDetails(){
            this.$http.secured
            .get("/api/v1/warehouse/prd/"+this.item_id)
                .then(response => {
                if (response.data) {
                    this.prd_item_details = response.data.prd_item
                    this.item_schema = [];
                    for( var key in this.prd_item_details){
                        if(!this.prd_item_details[key]){
                            if(key == 'supplying_site_id' || key == 'receiving_site_id'){
                                this.item_schema.push({'key' : key, 'label' : this.item_key[key], 'type' : 'dropDown', 'value' : ''})
                            } else if(key.includes('date')){
                                this.item_schema.push({'key' : key, 'label' : this.item_key[key], 'type' : 'date', 'value' : '', 'openDatePopup' : false})
                            } else if(key == 'brand_approval_required'){
                                this.item_schema.push({'key' : key, 'label' : this.item_key[key], 'type' : 'checkBoxButton', 'value' : ''})
                            } else {
                                this.item_schema.push({'key' : key, 'label' : this.item_key[key], 'type' : 'textField', 'value' : ''})
                            }
                        }
                    }
                }
            })
                .catch(error => {
                    this.$toast.error(error.response.data.error);
            });
        },
        submitUpdateDetails(){
            this.item_schema.forEach( x => {this.prd_item_details[x.key] = x.value;})
            this.$http.secured
            .put("/api/v1/warehouse/prd/"+this.item_id, { "prd_item": this.prd_item_details })
                .then(response => {
                if (response.data) {        
                    this.$store.commit("showMessage",{
                        alert_type : 'success',
                        alert_message : response.data.message
                    });
                    this.$router.push({ name: 'PRD' });
                }
            })
                .catch(error => {
                    this.$toast.error(error.response.data.error);
            });
        },
        formattedDate(item){
            if (item.value) {
                const temp = item.value
                return temp.split('-').reverse().join('/')
            }
            return '';
        },
        handleCancel(item){
            item.value = '';
            item.openDatePopup = false;
        },
    }

}
</script>
<style>
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