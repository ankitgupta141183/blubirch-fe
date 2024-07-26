<template>
  <div>
    <!-- Log Dialog -->
    <v-row justify="center">
      <v-dialog v-model="logDialog" max-width="750px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="inc-title">Logs</span>
          </v-card-title>
          <v-card-text class="pa-0">
            <v-container>
              <v-card height="400px" style="overflow-y: scroll;">
                <v-card-text height="400px">
                  <!-- {{logs}} -->
                  <v-list>
                   <template v-for="(item, i) in logs">
                      <v-list-tile>
                        <v-list-tile-content>
                          <div>{{i + 1}} . {{ item }}</div>
                        </v-list-tile-content>
                      </v-list-tile>
                    </template>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-container>
              <v-layout align-end>
                <v-spacer></v-spacer>
                <v-btn
                  class="mr-2"
                  small
                  color="primary"
                  @click="closeLogsDialog()"
                >CLOSE</v-btn>
              </v-layout>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="gradePopup" max-width="750px">
        <v-card  class="v-card-100">
          <v-card-title>
            <span class="inc-title">Edit Grade File Upload</span>
          </v-card-title>
          <v-card-text class="pa-0">
            <form @submit.prevent="importFile" enctype="multipart/form-data" ref="inv_file_upload_form">
              <v-card-title style="display: flow-root;"> 
              </v-card-title>
              <v-card-text>
                <v-container>
                  <div>
                    <input type="file" class="form-control" ref="file" @change="selectFile" :class="{ 'is-invalid': $v.file.$error }"/>
                    <div v-if="file_required">
                      <div class="warning_img">
                        <div class="warnig_imgw">
                          <img src="@/assets/images/icons/warning.svg">File is required 
                        </div>
                      </div>
                    </div>
                  </div>
                </v-container>
              </v-card-text>
              <v-card-actions center>
                <v-spacer></v-spacer>
                  <button class="main_button mr-2" :disabled="number > 0">Confirm</button>
                  <button small type="button" color="normal" @click="closePopup()">Cancel</button>
                <v-spacer></v-spacer>
              </v-card-actions>
            </form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- ============== Main page ==================== -->
      <v-card class="overflow-hidden v-card v-sheet theme--light">
        <div>
          <v-alert
            :type="alert_type"
            :value="alert"
            transition="scale-transition"
            >{{ alert_message }}</v-alert
          >
        </div>
        <div><HeaderComponent :headerTitle="headerText"/></div>
        <v-card-title>
          <v-text-field prepend-inner-icon="mdi-magnify" v-model="search" label="Search" single-line v-on:keyup.enter="getFileList"></v-text-field>
          <v-spacer></v-spacer>
            <v-card-actions >
            <v-flex xs12 d-flex>
              <v-btn color="primary" dense class="mr-4 mt-1" @click="editGradePopup()">Edit Grade File Upload</v-btn>
              <v-btn color="primary" dense class="mr-4 mt-1" to="/file_upload/new">Lot File Upload</v-btn>
            </v-flex>
          </v-card-actions>
        </v-card-title>
        <!-- <v-layout column>
          <v-flex md6 style="overflow: auto">
            <v-data-table
            :dense="true" 
            v-model="selected" 
            :search="search"
            disable-pagination 
            :hide-default-footer="true"
            :headers="headers" 
            :items="table_data" 
            :loading="loading" 
            loading-text="Loading Data... Please wait"
            class="elevation-1"
              >
               <template v-slot:item.inventory_file="{item}">
                <p>{{getFileName(item.inventory_file['url'])}}</p>
              </template>
              <template v-slot:item.created_at="{ item }">{{ dateTimeform(item.created_at) }}</template>
              <template v-slot:item.logs="{item}">
                <img @click="logsDialogOpen(item)"
                  src="@/assets/images/job_sheet.png"
                  title="File Logs"
                />
              </template>
            </v-data-table>
          </v-flex>
        </v-layout> -->
        <!-- Ag-grid table -->
        <div>
               <div class="export-button-container">
                    <button class="export-button" v-on:click="onBtnExport('csv')">{{ exporting ? 'Exporting...' : 'Export to CSV' }}</button>
                    <button class="export-button" v-on:click="onBtnExport('excel')">{{ exportingexcel ? 'Exporting...' : 'Export to Excel' }}</button>
              </div>
              <ag-grid-vue
              class="ag-theme-alpine"
              style="height: 450px;"
              :columnDefs="columnDefs"
              @grid-ready="onGridReady"
              :rowData="rowData"
              @firstDataRendered="onFirstDataRendered"
              enableColResize="true"
              :defaultColDef="defaultColDef"
              :rowSelection="rowSelection"
              animateRows="true"
              :suppressRowClickSelection="true"
              :sideBar="sideBar"
              :autoGroupColumnDef="autoGroupColumnDef"
              @cell-clicked="cellWasClicked"
              rowGroupPanelShow="always"
            >
          </ag-grid-vue>
        </div>
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
      </v-card>
  </div>  
</template>

<script>
  import HeaderComponent from "../../../../commoncomponents/HeaderComponent";
  import { required, minLength, helpers } from 'vuelidate/lib/validators';
  import "ag-grid-community/styles/ag-grid.css";
  import "ag-grid-community/styles/ag-theme-alpine.css";
  import { AgGridVue } from "@ag-grid-community/vue";
  import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
  import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
  import '@ag-grid-enterprise/menu';
  import '@ag-grid-enterprise/row-grouping';
  import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
  import { ModuleRegistry } from '@ag-grid-community/core';
  import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
  import { MultiFilterModule } from '@ag-grid-enterprise/multi-filter';
  import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
  import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
  import { MenuModule } from '@ag-grid-enterprise/menu'

  // Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  FiltersToolPanelModule,
  ColumnsToolPanelModule,
  SetFilterModule,
  ClientSideRowModelModule,
  MultiFilterModule,
  ExcelExportModule,
  RowGroupingModule,
  MenuModule  
]);
  export default {
    data() {
      return {
        number: 0,
        menu: false,
        logDialog: false,
        headerText: "Liquidation File Upload",
        loading: true,
        alert: false,
        search: "",
        file: "",
        file_required: false,
        disable: false,
        gradePopup: false,
        alert_type: "success",
        alert_message: "success",
        headers: [
          { text: "File Name", value: "inventory_file"},
          { text: "Upload Date", value: "created_at" },
          { text: "Type", value: "inward_type" },
          { text: "Status", value: "status" },
          { text: "Logs", value: "logs" }
        ],
        table_data: [],
        logs: "",      
        inv_file_upload_id: null,
        inward: 'Edit Grade',
        page: 1,
        totalPages: 1,
        pageSize: 50,
        pageSizes: [50, 100, 200],
        search_tag:'',
        columnDefs : [
        {
          field: 'inventory_file.url', 
          headerName: 'File name', 
          resizable: true, // Customize the header name here
          sortable: true, 
          filter: true, 
          headerCheckboxSelection: true,
          checkboxSelection:true,
          showDisabledCheckboxes: true,
          headerClass: 'fixed-size-header',
          filter: 'agTextColumnFilter',
          floatingFilter: true,
          valueGetter: (params) => {
            const rowData = params.data;
            if (rowData && rowData['inventory_file'] && rowData['inventory_file'].url) {
              const fileName = rowData['inventory_file'].url.split('/').pop();
              return fileName;
            }
            return '';
          }
        },
        {
          field: 'created_at',
          headerName: 'Upload Date',
          filter: 'agDateColumnFilter',
          filterParams: {
            comparator: (dataFromFilter, cellValue) => {
              if(cellValue == null){
                return 0;
              }
              const date = new Date(cellValue);
              const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
              const dateParts = formattedDate.split("/");
              const day = Number(dateParts[0]);
              const month = Number(dateParts[1]) - 1;
              const year = Number(dateParts[2]);
              const cellDate = new Date(year, month, day);
              if(cellDate < dataFromFilter){
                return -1;
              }else if(cellDate > dataFromFilter){
                return 1;
              }
              return 0;
            },
          },
          valueFormatter: this.dateFormatter, 
          floatingFilter: true,
          sortable: true,
          resizable: true,
          headerClass: 'fixed-size-header',
        },
        { field: 'inward_type', headerName: 'Type', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, resizable: true, filter: true, headerClass: 'fixed-size-header'},
        { field: 'status', headerName: 'Status', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, resizable: true, filter: true, headerClass: 'fixed-size-header'},
        {
          field: 'logs',
          headerName: 'Logs',
          sortable: true,
          resizable: true,
          filter: 'agSetColumnFilter',
          floatingFilter: true,
          headerClass: 'fixed-size-header',
          cellRenderer: (params) => {
            const imageUrl = require('@/assets/images/job_sheet.png');
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.style.cursor = 'pointer';
            imgElement.addEventListener('click', () => {
              this.logsDialogOpen(params.data);
            });
            return imgElement;
          },
          filter: true,
        },
      ],
        rowData: null,
        rowSelection: null,
        sideBar: null,
        autoGroupColumnDef: null,
        defaultColDef: {
        width: 400,
        resizable: false,
        // allow every column to be aggregated
        enableValue: true,
        // allow every column to be grouped
        enableRowGroup: true,
        // allow every column to be pivoted
        enablePivot: true,
        sortable: true,
        filter: true,
        enableRowGroup:true,
        filterParams: {buttons: ["apply", "clear", "reset"]}
      },
      gridApi: null,
      columnApi: null,
      totalCount:'',
      exporting: false,
      exportingexcel:false,
      cellWasClicked: event => {
        console.log('cell was clikced', event)
      }
      };
    }, 
    components: {
      HeaderComponent,
      AgGridVue,
    },

    validations: {
      file: {required }
    },
    async created() {
      // this.getFileList();
      this.rowSelection = 'multiple';
      this.sideBar = { toolPanels: ['columns','filters'] };
        this.autoGroupColumnDef = {
        minWidth: 250,
      };
    
    },
 
  methods: {
    onFirstDataRendered(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();
      },   
    async onBtnExport(format) {
      try {
        if(format === 'csv'){
          this.exporting = true;
        }else if (format === 'excel'){
          this.exportingexcel = true;
        }        
        const response = await this.$http.secured.get('/api/v1/warehouse/inventory_file_uploads', {
          params: {
            page: 1, 
            per_page: this.totalCount 
          }
        });
        if (response && response.data && response.data.inventory_file_uploads) {
          this.rowData = response.data.inventory_file_uploads;
          setTimeout(() => {
            if(format === 'csv'){
              this.gridApi.exportDataAsCsv();
              this.exporting = false;
            }else if(format === 'excel'){
              this.gridApi.exportDataAsExcel();
              this.exportingexcel = false;
            }              
            }, 1000);
        } else {
          console.error('Error fetching data for export:', response);
          this.exporting = false;
          this.exportingexcel = false;
        }
      } catch (error) {
        console.error('Error fetching data for export:', error);
        this.exporting = false;
        this.exportingexcel = false;
      }
   },
   onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.agGridApiCall(); 
      },  
    // APi call ag-grid table
    agGridApiCall(){
      const params = this.getRequestParams(
                    this.page,
                    this.pageSize
                );
      this.$http.secured
      .get('/api/v1/warehouse/inventory_file_uploads', { params: { search_text:this.search,page: params['page'], per_page: params['size'] } })
      .then((result) => {
        this.totalPages = result.data.meta.total_pages
        this.totalCount = result.data.meta.total_count
        const rowData = result.data.inventory_file_uploads;        
        this.rowData = rowData
        // this.gridApi.autoSizeColumns();
          
        })
        .catch((error) => {
          console.error('Error loading data:', error);
        });
      },

      getFileList() {
        const params = this.getRequestParams(
                    this.page,
                    this.pageSize
                );
        this.$http.secured
        .get("/api/v1/warehouse/inventory_file_uploads", { params: { search_text:this.search,page: params['page'], per_page: params['size'] } })
        .then((response) => {
          if (response) {
            this.table_data = response.data.inventory_file_uploads
            this.totalPages = response.data.meta.total_pages
            this.loading    = false;
          } else {
            this.showAlert("error", "No Data Found");
            this.loading    = false;
          }
        })
        .catch((error) => {
          this.showAlert("error", "Something went wrong from Network" + error);
          this.loading = false;
        });
      },

      selectFile(){
        this.file = this.$refs.file.files[0];
        if (this.$v.file.$invalid) {
          this.file_required = true;
          return;
        }else{
          this.file_required = false;
        } 
      },

      closePopup(){
        this.gradePopup = false
        this.file = ""
      },

      editGradePopup(){
        this.gradePopup = true
        this.number = 0;
        this.file = '';
      },

      alertTimeOut() {
        setTimeout(() => { this.alert = false;}, 3000);
      },
      showAlert(alert_type, alert_message) {
        this.alert         = true;
        this.alert_type    = alert_type;
        this.alert_message = alert_message;
        this.alertTimeOut();
      },

      importFile () {
        this.number++;
        if (this.$v.file.$invalid) {
          this.file_required = true;
          this.number = 0;
          return;
        }else{
           this.file_required = false;
        }  
        let formData = new FormData()

        if (this.file.name.split(".").pop() != 'csv'){
          this.$toast.error('Only CSV files can be imported');
          this.number = 0;
          return;
        }
        const params = {file: this.file, inward_type: this.inward}
        Object.entries(params).forEach(
          ([key, value]) => formData.append(key, value)
        )
        this.show  = true
        this.$http.secured.post('/api/v1/warehouse/inventory_file_uploads', formData)
        .then(response => {
          this.show   = false
          this.file = ""
          this.gradePopup = false
          this.$toast.success('File uploaded successfully');
        })
        .catch(error =>{ 
          this.number = 0;
          this.show   = false
          this.$toast.error('Please Enter Valid File')}          
        )
      },

      // ========== Logs ==============
      logsDialogOpen (item){
        this.logDialog = true;
        this.logs       = item.remarks
        // this.$http.secured
        // .get("/api/v1/inventory_file_uploads/" + item.id)
        // .then((response) => {
        //   if (response) {
        //     this.logs       = response.data.reason
        //     this.loading    = false;
        //   } else {
        //     this.loading    = false;
        //     this.showAlert("error", "No Logs Found");
        //   }
        // })
        // .catch((error) => {
        //   this.showAlert("error", "Something went wrong from Network" + error);
        //   this.loading = false;
        // });
      },
      closeLogsDialog(){
        this.logDialog = false;
      },

      // ====== utility ==================
      getFileName(file_url){
        var arr = file_url.split('/')
        return  arr[arr.length - 1]
      },
      dateTimeform(d){
        // 15/02/2021 08:32 AM
        var date    = new Date(d)
        var hours   = date.getHours();
        var minutes = date.getMinutes();
        var ampm    = hours >= 12 ? 'PM' : 'AM';
        hours       = hours % 12;
        hours       = hours ? hours : 12; // the hour '0' should be '12'
        minutes     = minutes < 10 ? '0'+minutes : minutes;
        var strTime = date.toLocaleDateString("en-US") + ' ' + hours + ':' + minutes + ' ' + ampm;
        return strTime;
      },
      handlePageChange(value) {
      this.page = value;
      this.agGridApiCall()
    },

    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1
      this.agGridApiCall()
    },
    getRequestParams(page, pageSize) {
            let params = {};

            if (page) {
                params["page"] = page;
            }
            if (pageSize) {
                params["size"] = pageSize;
            }
            return params;
        },
        dateFormatter(params) {
          const date = new Date(params.value);
          const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; // Adjust the format as needed
          return formattedDate;
      },
    },
  };
</script>
<style scoped>
  .ag-theme-alpine >>> .ag-body-viewport {
    max-height: 400px !important;
    overflow-y: auto !important;  
  }
  .export-button {
    padding: 10px;
    background-color: #3498db; /* Blue background color */
    color: #ffffff; /* White text color */
    border: 1px solid #2980b9; /* Border color */
    border-radius: 4px; /* Rounded corners */
    cursor: pointer;
    font-size: 14px;
    margin: -21px 10px 10px 10px
  }

  .export-button:hover {
    background-color: #2980b9; /* Darker blue on hover */
  }
</style>