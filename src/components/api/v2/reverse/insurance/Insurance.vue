<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition" >{{ alert_message }}</v-alert >
    </div>

    <div>
      <HeaderComponent :headerTitle="headerText" />
    </div>

    <v-card class="v-card-100">
      <v-tabs>
        <v-tab style="text-transform: none !important" @click="loadData(tab, 'tab_clicked')" v-for="(tab, index) in tabs" :key="index" >{{ tab }}</v-tab >
      </v-tabs>
    </v-card>
    <v-card-title>
      <v-text-field prepend-inner-icon="mdi-magnify" v-model="search" label="Search" ></v-text-field>
      <v-spacer></v-spacer>
      <v-actions>
        <v-btn class="ma-2" color="primary" @click="handleAddInsurer" :disabled="selected.length >= 1" >ADD INSURER</v-btn >
        <v-btn class="ma-2" color="primary" :disabled="selected.length == 0 || selected.length > 1" @click="editUser" >EDIT</v-btn >
        <v-btn class="ma-2" color="primary" disabled @click="deleteInsurer" >DELETE</v-btn >
      </v-actions>
    </v-card-title>

    <v-layout column>
      <v-flex md6 style="overflow: auto">
        <v-data-table
        :dense="true" 
          :search="search" 
          v-model="selected" 
          show-select
          disable-pagination 
          :hide-default-footer="true"
          :headers="headers" 
          :items="table_data" 
          :loading="loading" 
          loading-text="Loading Data... Please wait"
          class="elevation-1"
        >
        </v-data-table>
      </v-flex>
    </v-layout>

    <!-- Dialogs -->
    <v-row justify="center">
      <v-dialog v-model="dialogOpen" persistent max-width="900px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span style="font-size: 24px;">Insurance Configuration</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="handleCloseAddInsurerPopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text class="mt-5">
             <v-row >                
                  <span style="font-weight: 500;">Insurance Claim Types And Damages Covered</span>                             
              </v-row>
              <span style="font-weight: 500;"><hr></span>
            </v-card-text>
          <v-card-text>
            <v-container style="margin-top: -51px;">
                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="insurerName" label="Insurer Name" outlined ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row v-for="claimTypeField in claimTypeFields" :key="claimTypeField.id" >
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="claimTypeField.insurance_type" label="Type of Insurance Claim" outlined ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="claimTypeField.damage_type" label="Claimable damages type"  outlined @keydown.enter="addItem(claimTypeField)"></v-text-field>
                    <div v-if="claimTypeField.damage_types.length">
                       <div class="selected_rule_box">
                      <span v-for="(item, index) in claimTypeField.damage_types" :key="index" class="rule-type_option">
                        {{ item }}
                        <v-icon small @click="removeItem(claimTypeField, index)">mdi-close</v-icon>
                      </span>
                    </div>
                    </div>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="accent" outlined @click="handleAddAnotherType('addAnotherType')" > + ADD ANOTHER TYPE </v-btn>
                  <!-- <v-btn color="blue-darken-1" variant="text" @click="dialog = false"> Save </v-btn> -->
                </v-card-actions>
                <v-card-text class="mt-5">
              <v-row >                
                <span style="font-weight: 500;">Other Details</span>                             
              </v-row>
              <span style="font-weight: 500;"><hr></span>
            </v-card-text>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="timeline" label="Timeline(Days)" outlined type="number" ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-autocomplete :items="valueParamItems" item-text="name" item-value="id" v-model="insuranceValueParameter" label="Insurance value parameter" outlined ></v-autocomplete>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="insuranceCover" label="Insurance cover(%)" outlined type="number" ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="excess" label="Excess(%)" outlined type="number" ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-autocomplete :items="claimTicketraisingItems" item-text="name" item-value="id" v-model="claimTicketRaisingMethod" label="Claim Ticket raising method" outlined ></v-autocomplete>
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-card-text class="mt-5">
             <v-row >                
                  <span style="font-weight: 500;">Required Information / Documents</span>                             
              </v-row>
              <span style="font-weight: 500;"><hr></span>
            </v-card-text>
                <v-card-text>
                  <v-row v-for="claimTypeRequiredField in claimTypeRequiredFields" :key="claimTypeRequiredField.id" >
                    <v-col cols="12" sm="5" md="5">
                      <v-autocomplete :items="claimTypeReqItem" item-text="name" item-value="id" v-model="claimTypeRequiredField.data_type" label="Select Data Type" outlined ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="5" md="5">
                      <v-text-field v-model="claimTypeRequiredField.field" label="Data Field Name" outlined ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2" md="2">
                      <v-checkbox label="Mandatory" v-model="claimTypeRequiredField.is_mandatory"></v-checkbox>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="accent" outlined @click="handleAddAnotherType('addDataField')" > + ADD DATA FIELD </v-btn>
                  <!-- <v-btn color="blue-darken-1" variant="text" @click="dialog = false"> Save </v-btn> -->
                </v-card-actions>
            </v-container>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn small text color="normal" @click="handleCloseAddInsurerPopup" > Cancel </v-btn>
            <v-btn small color="primary" @click="handleSaveAddInsurer" :disabled="saveButtonDisabled"> Submit </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Edit User --> 
    <v-row justify="center">
      <v-dialog v-model="EditDialogOpen" persistent max-width="900px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span style="font-size: 24px;">Edit Insurance Configuration</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="handleCloseAddInsurerPopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text class="mt-5">
            <v-row >                
                <span style="font-weight: 500;">Insurance Claim Types And Damages Covered</span>                             
              </v-row>
              <span style="font-weight: 500;"><hr></span>
            </v-card-text>
          <v-card-text>
            <v-container style="margin-top: -51px;">
                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="insurerName" label="Insurer Name" outlined ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row v-for="(claimTypeField, index) in claimTypeFields" :key="claimTypeField.id" >
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="claimTypeField.insurance_type" label="Type of Insurance Claim" outlined readonly disabled ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="claimTypeField.damage_type" :disabled="!isFieldDisabled" label="Claimable damages type" outlined @keydown.enter="addItem(claimTypeField)"></v-text-field>
                    <div v-if="claimTypeField.damage_types.length" >
                       <div class="selected_rule_box" >
                      <span v-for="(item, index) in claimTypeField.damage_types" disabled :key="index" class="rule-type_option">
                        {{ item }}
                        <v-icon small disabled @click="removeItem(claimTypeField, index)">mdi-close</v-icon>
                      </span>
                    </div>
                    </div>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-btn disabled color="accent" outlined @click="handleAddAnotherType('addAnotherType')" > + ADD ANOTHER TYPE </v-btn>
                  <!-- <v-btn color="blue-darken-1" variant="text" @click="dialog = false"> Save </v-btn> -->
                </v-card-actions>

                <v-card-title>
                  <span class="text-h5">Other Details</span>
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="timeline" label="Timeline(Days)" outlined type="number" readonly disabled ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-autocomplete :items="valueParamItems" item-text="name" item-value="id" v-model="insuranceValueParameter" label="Insurance value parameter" outlined readonly disabled ></v-autocomplete>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="insuranceCover" label="Insurance cover(%)" outlined type="number" readonly disabled ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="excess" label="Excess(%)" outlined type="number" readonly disabled ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-autocomplete :items="claimTicketraisingItems" item-text="name" item-value="id" v-model="claimTicketRaisingMethod" label="Claim Ticket raising method" outlined readonly disabled ></v-autocomplete>
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-card-title>
                  <span class="text-h5">Required Information / Documents</span>
                </v-card-title>
                <v-card-text>
                  <v-row v-for="claimTypeRequiredField in claimTypeRequiredFields" :key="claimTypeRequiredField.id" >
                    <v-col cols="12" sm="5" md="5">
                      <v-autocomplete :items="claimTypeReqItem" item-text="name" item-value="id" v-model="claimTypeRequiredField.data_type" label="Select Data Type" outlined readonly disabled ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="5" md="4">
                      <v-text-field v-model="claimTypeRequiredField.field" label="Data Field Name" outlined readonly disabled ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3" md="3">
                      <v-checkbox label="Mandatory" v-model="claimTypeRequiredField.is_mandatory"></v-checkbox>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-btn disabled color="accent" outlined @click="handleAddAnotherType('addDataField')" > + ADD DATA FIELD </v-btn>
                  <!-- <v-btn color="blue-darken-1" variant="text" @click="dialog = false"> Save </v-btn> -->
                </v-card-actions>
            </v-container>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn small text color="normal" @click="handleCloseAddInsurerPopup" > Cancel </v-btn>
            <v-btn small color="primary" @click="handleSaveUpdateInsurer"> Submit </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <div class="float-right">
      <v-row class="ml-2">
        <v-col cols="4" sm="3">
          <v-select v-model="pageSize" :items="pageSizes" label="Items per page" @change="handlePageSizeChange"></v-select>
        </v-col>
        <v-col cols="12" sm="9">
          <v-pagination v-model="page" :length="totalPages" total-visible="7" next-icon="mdi-menu-right" prev-icon="mdi-menu-left" @input="handlePageChange"></v-pagination>
        </v-col>
      </v-row>
    </div>
  </v-card>
  <!-- Popup modals -->
</template>

<script>
  // import $ from 'jquery'
  import HeaderComponent from '../../../../commoncomponents/HeaderComponent.vue';
  // import moment from 'moment'
  export default {
    data() {
      return {
        headerText: "Settings",
        loading: true,
        alert: false,
        alert_type: "success",
        alert_message: "",
        dialog: false,
        headers: [
          { text: "Insurer Name", value: "insurer_name" },
          { text: "Added On", value: "added_on" },
        ],
        table_data: [],
        search: "",
        page: 1,
        totalPages: 1,
        pageSize: 100,
        pageSizes: [100, 200, 500],
        alert_value: "",
        alert_item: [
          { name: "All", value: "" },
          { name: "High", value: "high" },
          { name: "Medium", value: "medium" },
          { name: "Low", value: "low" },
        ],
        tabs: ["Insurance Module"],
        selected: [],
        dialogOpen: false,
        active_tab:'Insurance Module',
        claimTypeFields: [
          {
            insurance_type: "",
            damage_types: [],
          },
        ],
        arr:[],
        insurerName: "",
        timeline: "",
        insuranceValueParameter: "",
        insuranceCover: "",
        excess: "",
        claimTicketRaisingMethod: "",
        claimTypeReqItem:'',
        valueParamItems:'',
        claimTicketraisingItems:'',
        EditDialogOpen:false,
        claimTypeRequiredFields: [
          {
            data_type: [],
            field: "",
            is_mandatory: false,
          },
        ],
      };
    },
    created() {
      this.loadData('Insurance Module');
    },
    components: {
      HeaderComponent,
    },
    computed: {
      saveButtonDisabled() {
        // Check if all required fields have values
        if (
          !this.insurerName ||
          this.claimTypeFields.some(
            (field) =>
              !field.insurance_type ||
              !field.damage_types.length
          ) ||
          !this.timeline ||
          !this.insuranceValueParameter ||
          !this.insuranceCover ||
          !this.excess ||
          !this.claimTicketRaisingMethod ||
          this.claimTypeRequiredFields.some(
            (field) => !field.data_type || !field.field
          )
        ) {
          return true; // Disable Save button
        } else {
          return false; // Enable Save button
        }
      },
    
    },
    methods: {
      addItem(claimTypeField) {
        if (claimTypeField.damage_type.trim() !== '') {
          claimTypeField.damage_types.push(claimTypeField.damage_type.trim())
          claimTypeField.damage_type = ''
        }
      },
      removeItem(claimTypeField, index) {
        claimTypeField.damage_types.splice(index, 1)
      },
      loadData(tab, tab_action) {
        this.loading = true;
        this.selected = []
        this.active_tab = tab
        this.table_data = []
        this.page = 1
        this.totalPages = 1
        this.pageSize = 100
        if (tab == "Insurance Module") {
          (this.headers = [
          { text: "Insurer Name", value: "name" },
          { text: "Added On", value: "added_on" },
          ]);

          this.fetchInsuranceModule();
        }
      },
      fetchInsuranceModule() {
        const params = this.getRequestParams(
          this.page,
          this.pageSize
        );
        this.$http.secured
          .get("/api/v1/warehouse/insurers", { params: { tag_number: this.pending_info_search, page: params['page'], per_page: params['size'] } })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.insurers
              this.totalPages = response.data.meta.total_pages
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

      handleAddInsurer() {
        this.dialogOpen = true;
        // console.log(this.selected , "selected");
        this.$http.secured
        .get("/api/v1/warehouse/insurers/get_insurer_configs")
          .then(response => {
            if (response.data) {
              this.valueParamItems = response.data.insurance_value_parameters;
              this.claimTypeReqItem = response.data.data_types;
              this.claimTicketraisingItems = response.data.claim_raising_methods;
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

      handleAddAnotherType(type) {
        let id = "id" + Math.random().toString(36).substring(2);
        if (type === "addAnotherType") {
          this.claimTypeFields = [
            ...this.claimTypeFields,
            {
              insurance_type: "",
              damage_types: [],
            },
          ];
        } else {
          this.claimTypeRequiredFields = [
            ...this.claimTypeRequiredFields,
            {
              data_type: [],
              field: "",
              is_mandatory: false
            },
          ];
        }
      },
      addToArr() {
        this.arr.push(this.claimTypeFields);
        this.claimTypeFields.claimDamagesTypeValue = '';
      },

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

      handlePageChange(value) {
        this.page = value;
        this.getDocumentData(this.active_tab);
      },

      handlePageSizeChange(size) {
        this.pageSize = size;
        this.page = 1;
        this.getDocumentData(this.active_tab);
      },

      handleCloseAddInsurerPopup() {
        this.dialogOpen = false;
        this.EditDialogOpen = false;
        this.selected=[];
        this.claimTypeFields = [
          {
            
            insurance_type: "",
            damage_types: [],
          },
        ]
          this.insurerName = ""
          this.timeline = ""
          this.insuranceValueParameter = ""
          this.insuranceCover = ""
          this.excess = ""
          this.claimTicketRaisingMethod = ""
          this.claimTypeRequiredFields = [
          {
            data_type: [],
            field: "",
            is_mandatory: false
          },
        ]
      },

      handleSaveAddInsurer() {
        console.log(
          this.claimTypeFields,
          this.insurerName,
          this.timeline,
          this.insuranceValueParameter,
          this.insuranceCover,
          this.excess,
          this.claimTicketRaisingMethod,
          this.claimTypeRequiredFields
        );
        const formData = new FormData();
        this.$http.secured.post("/api/v1/warehouse/insurers", {
          insurer:
          {
            "name": this.insurerName,
            "insurance_claim_type":this.claimTypeFields,
            "timeline":this.timeline,
            "insurance_value_parameter":this.insuranceValueParameter,
            "insurance_cover": this.insuranceCover,
            "excess":this.excess,
            "claim_raising_method": this.claimTicketRaisingMethod,
            "required_documents" :this.claimTypeRequiredFields
          }
        },)
          .then(response => {
            if (response.data) {
              this.handleCloseAddInsurerPopup();
              this.selected = []            
              this.successMsg = response.data.message;
              this.showAlert("success", response.data.message);
              this.loadData(this.active_tab);
            } else {
              this.showAlert("error", "No Data Found");
            }
          }).catch(error => {
            this.showAlert("error", error.response.data.error);
            this.loading = false;
          });
      },
      handleSaveUpdateInsurer() {
        console.log(
          this.claimTypeFields,
          this.insurerName,
          this.timeline,
          this.insuranceValueParameter,
          this.insuranceCover,
          this.excess,
          this.claimTicketRaisingMethod,
          this.claimTypeRequiredFields
        );
        var dc = this.selected.map(x => x.id)
        const formData = new FormData();
        this.$http.secured.put(`/api/v1/warehouse/insurers/${dc}`, {
          insurer:
          {
            "name": this.insurerName,
            "insurance_claim_type":this.claimTypeFields,
            "timeline":this.timeline,
            "insurance_value_parameter":this.insuranceValueParameter,
            "insurance_cover": this.insuranceCover,
            "excess":this.excess,
            "claim_raising_method": this.claimTicketRaisingMethod,
            "required_documents" :this.claimTypeRequiredFields
          }
        },)
          .then(response => {
            if (response.data) {
              this.handleCloseAddInsurerPopup();
              this.selected = []            
              this.successMsg = response.data.message;
              this.showAlert("success", response.data.message);
              this.loadData(this.active_tab);
            } else {
              this.showAlert("error", "No Data Found");
            }
          }).catch(error => {
            this.showAlert("error", error.response.data.error);
            this.loading = false;
          });
      },
      editUser(){
        var dc = this.selected.map(x => x.id)
        this.EditDialogOpen = true;
        this.$http.secured
        .get("/api/v1/warehouse/insurers/get_insurer_configs")
          .then(response => {
            if (response.data) {
              this.valueParamItems = response.data.insurance_value_parameters;
              this.claimTypeReqItem = response.data.data_types;
              this.claimTicketraisingItems = response.data.claim_raising_methods;
              this.loading = false;
            } else {
              this.loading = false;
              this.showAlert("error", "No Data Found");
            }
          })
          .catch(error => {
            this.showAlert("error", error.response.data.error);
            this.loading = false;
          });
        this.$http.secured
        .get("/api/v1/warehouse/insurers/"+dc)
          .then(response => {
            if (response.data) {
              this.insurerName = response.data.insurer.name;
              this.timeline = response.data.insurer.timeline;
              this.insuranceValueParameter = response.data.insurer.insurance_value_parameter;
              this.insuranceCover = response.data.insurer.insurance_cover;
              this.excess = response.data.insurer.excess;
              this.claimTicketRaisingMethod = response.data.insurer.claim_raising_method;
              this.claimTypeFields = response.data.insurer.insurance_claim_type;
              // this.claimTypeFields = response.data.insurer.insurance_claim_type.map((item, index) => {
              //   this.claimTypeFields[index].typeOfInsuranceClaimvalue = item.insurance_type;
              //   this.claimTypeFields[index].claimDamagesTypeValue = item.damage_types;
              // });            
              
              this.claimTypeRequiredFields = response.data.insurer.required_documents;
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
      deleteInsurer(){
        var dc = this.selected.map(x => x.id)
        this.$http.secured.delete("/api/v1/warehouse/insurers/bulk_delete", { params: { ids: dc } })
          .then(response => {
            if (response.data) {
              this.editRequestPopup = false
              this.showAlert("success", "Successfully deleted");
              this.loadData(this.active_tab);
            } else {
              this.showAlert("error", "No Data Found");
            }
          }).catch(error => {
            this.showAlert("error", "Something went wrong from Network");
            this.loading = false;

          });

      },
    },
  };
</script>
<style>
  .rule-type_option {
    border: 1px solid #000000;
    padding: 4px 8px;
    border-radius: 5px;
    margin: 1px 2px;
  }
  .selected_rule_box{
    display: flex;
    flex-wrap: wrap;
  }
  .hidescrollbar{
    overflow-y: hidden !important;
  }
</style>
