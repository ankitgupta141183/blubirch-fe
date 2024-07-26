<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
    </div>
  
    <v-row justify="center">
      <v-dialog v-model="viewImageDialog" max-width="900px">
        <v-card class="v-card-100">
          <v-card-text>
            <v-container class="v-card-100">
              <v-container class="grey lighten-5">
                <v-row no-gutters>
                  <v-col :cols="12">
                    <v-card
                      class="v-card-100 pa-5 font-weight-black"
                      outlined
                      tile
                    >{{ tag_detail.item_desc}}</v-card>
                  </v-col>

                  <v-col :cols="8">
                    <v-card class="v-card-100 pa-5 font-weight-black" outlined tile>Questions</v-card>
                  </v-col>
                  <v-col :cols="4">
                    <v-card
                      class="v-card-100 text-md-center pa-5 font-weight-black"
                      outlined
                      tile
                    >Grade:Very Good</v-card>
                  </v-col>

                  <v-col :cols="8">
                    <v-card class="v-card-100 pa-5 py-14 font-weight-black" outlined tile>
                      <ul>
                        <li>Packaging Status</li>
                      </ul>
                    </v-card>
                  </v-col>
                  <v-col :cols="4">
                    <v-card class="v-card-100 text-md-center pa-4 font-weight-black" outlined tile>
                      <div>Open Box</div>
                      <!-- <img v-if="tag_detail.defective_image[0].src =='undefined'"
                        justify="center"
                        src="@/assets/images/camera-img.jpg"
                        width="128"
                        height="83"
                      /> -->
                      <img  :src="tag_detail.defective_image? tag_detail.defective_image[0].src:'@/assets/images/camera-img.jpg'" width="128" height="83" />
                    </v-card>
                  </v-col>

                  <v-col :cols="8">
                    <v-card class="v-card-100 pa-5 font-weight-black" outlined tile>
                      <ul>
                        <li>Item Condition</li>
                      </ul>
                    </v-card>
                  </v-col>
                  <v-col :cols="4">
                    <v-card
                      class="v-card-100 text-md-center pa-5 font-weight-black"
                      outlined
                      tile
                    >Grade:{{ tag_detail.grade}}</v-card>
                  </v-col>

                  <v-col :cols="8">
                    <v-card class="v-card-100 pa-5 py-11 font-weight-black" outlined tile>
                      <ul>
                        <li class="py-2">Physical Status</li>
                        <v-row no-gutters>
                          <v-col :cols="2">
                            <img src="@/assets/images/icons/thunmb-1.png" width="24" height="24" />
                            <div>Front</div>
                          </v-col>
                          <v-col :cols="2">
                            <img src="@/assets/images/icons/thunmb-2.png" width="24" height="24" />
                            <div>Back</div>
                          </v-col>
                          <v-col :cols="2">
                            <img src="@/assets/images/icons/thunmb-3.png" width="24" height="24" />
                            <div>Left</div>
                          </v-col>
                          <v-col :cols="2">
                            <img src="@/assets/images/icons/thunmb-4.png" width="24" height="24" />
                            <div>Right</div>
                          </v-col>
                          <v-col :cols="2">
                            <img src="@/assets/images/icons/thunmb-5.png" width="24" height="24" />
                            <div>Top</div>
                          </v-col>
                          <v-col :cols="2">
                            <img src="@/assets/images/icons/thunmb-5.png" width="24" height="24" />
                            <div>Bottom</div>
                          </v-col>
                        </v-row>
                      </ul>
                    </v-card>
                  </v-col>
                  <v-col :cols="4">
                    <v-card class="v-card-100 text-md-center pa-8 font-weight-black" outlined tile>
                      <div>Minor (Dent/Scratch/Damage)</div>
                      <v-icon color="primary" :hint="item">mdi-chevron-left</v-icon>
                      <!-- <img src="@/assets/images/camera-img.jpg" width="128" height="83" /> -->
                      <img :src="tag_detail.defective_image? tag_detail.defective_image[0].src:'@/assets/images/camera-img.jpg'" width="128" height="83" />
                      
                      <v-icon color="primary" :hint="item">mdi-chevron-right</v-icon>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row no-gutters v-for="(item, i) in tag_detail.test_rules" :key="i">
                  <v-col :cols="8">
                    <v-card class="v-card-100 pa-5 font-weight-black" outlined tile>
                      <ul>
                        <li>{{item.test}}</li>
                      </ul>
                    </v-card>
                  </v-col>
                  <v-col :cols="4">
                    <v-card
                      class="v-card-100 text-md-center pa-5 font-weight-black"
                      outlined
                      tile
                    >{{item.value}}</v-card>
                  </v-col>
                </v-row>
                
              </v-container>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="viewImageDialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="tagNumberDialog" max-width="900px">
        <v-card class="v-card-100">
          <v-card-title>
            <span class="headline">{{ tag_detail.item_desc}}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row no-gutters>
                <v-col :cols="6">
                  <v-col :cols="12">
                    <span class="ma-2 font-weight-black" justify="center">Inventory ID :</span>
                    <span>{{ tag_detail.id}}</span>
                  </v-col>
                  <v-col :cols="12">
                    <span class="ma-2 font-weight-black" justify="center">Descritption:</span>
                    <span
                      v-b-tooltip.hover
                      :title="tag_detail.item_desc"
                    >{{tag_detail.item_desc | truncate(20, '...')}}</span>
                  </v-col>

                  <v-col :cols="12">
                    <span class="ma-2 font-weight-black" justify="center">Brand :</span>
                    <span>{{ tag_detail.brand}}</span>
                  </v-col>

                  <v-col :cols="12">
                    <span class="ma-2 font-weight-black" justify="center">MRP(INR) :</span>
                    <i class="mdi mdi-currency-inr"></i>
                    <span>{{ tag_detail.cost}}</span>
                  </v-col>
                  <v-col :cols="12">
                    <span class="ma-2 font-weight-black" justify="center">Tag Number:</span>
                    <span>{{ tag_detail.tag_number}}</span>
                  </v-col>
                  <v-col :cols="12">
                    <span
                      class="ma-2 font-weight-black"
                      justify="center"
                    >Item Description as per candidate file:</span>
                    <span
                      v-b-tooltip.hover
                      :title="tag_detail.item_desc"
                    >{{tag_detail.item_desc | truncate(10, '...')}}</span>
                  </v-col>
                  <v-col :cols="12">
                    <span class="ma-2 font-weight-black" justify="center">Client SKU :</span>
                    <span>{{ tag_detail.client_sku}}</span>
                  </v-col>
                  <v-col :cols="12">
                    <span class="ma-2 font-weight-black" justify="center">Toat Number :</span>
                    <span>{{ tag_detail.toat_number ? tag_detail.toat_number : "N/A"}}</span>
                  </v-col>
                </v-col>
                <v-col :cols="6">
                  <v-col :cols="12">
                    <span class="ma-2 font-weight-black" justify="center">Modal :</span>
                    <span>MNBNB</span>
                  </v-col>
                  <v-col :cols="12">
                    <span class="ma-2 font-weight-black" justify="center">Selling Price(INR) :</span>
                    <i class="mdi mdi-currency-inr"></i>
                    <span>{{ tag_detail.cost}}</span>
                  </v-col>
                  <v-col :cols="12">
                    <span class="ma-2 font-weight-black" justify="center">Return Request Number :</span>
                    <span>{{ tag_detail.rr_number}}</span>
                  </v-col>
                  <v-col :cols="12">
                    <span class="ma-2 font-weight-black" justify="center">SKU :</span>
                    <span>{{ tag_detail.sku}}</span>
                  </v-col>
                  <v-col :cols="12">
                    <span class="ma-2 font-weight-black" justify="center">Invoice Number:</span>
                    <span>{{ tag_detail.invoice_number}}</span>
                  </v-col>
                  <v-col :cols="12">
                    <span class="ma-2 font-weight-black" justify="center">Status:</span>
                    <span>{{ tag_detail.status}}</span>
                  </v-col>
                  <v-col :cols="12">
                    <span class="ma-2 font-weight-black" justify="center">Repair Status:</span>
                    <span>{{ tag_detail.repair_status}}</span>
                  </v-col>
                  <v-col :cols="12">
                    <span class="ma-2 font-weight-black" justify="center">Color:</span>
                    <span>White</span>
                  </v-col>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="tagNumberDialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="addEditDefect" max-width="900px">
        <v-card class="v-card-100">
          <v-card-title>
            <v-col class="text-md-left" :cols="6">
              <span>{{ defectTitle}}</span>
            </v-col>

            <v-col class="text-md-right" :cols="6">
              <v-btn color="normal" @click="reset">RESET</v-btn>
            </v-col>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <!-- <form> -->
              <v-container class="v-card-100">
                <v-row no-gutters>
                  <v-spacer></v-spacer>
                  <v-col :cols="4">
                    <v-select
                      outlined
                      v-on:change="selectedDefect($event)"
                      class="spacing-playground"
                      v-model="job.defect"
                      :items="tag_detail.defect_names"
                      label="Defect*"
                      name="defect"
                      :rules="[v => !!v || 'Defect is required']"
                      required
                    ></v-select>
                  </v-col>

                  <v-col :cols="1"></v-col>

                  <v-col :cols="7">
                    <v-select
                      outlined
                      v-model="job.type_of_defect"
                      class="spacing-playground"
                      :items="typeOfDefect"
                      label="Type of defect*"
                      :rules="[v => !!v || 'Type of Defect is required']"
                      required
                    ></v-select>
                  </v-col>

                  <v-row
                    class="ma-0 pa-0"
                    :cols="12"
                    v-for="(applicant, counter) in applicants"
                    v-bind:key="counter"
                  >
                    <v-col class="ma-0 pa-0" :cols="4">
                      <v-select
                        outlined
                        v-on:change="selectedpart($event, counter)"
                        v-model="applicant.part_required"
                        class="spacing-playground"
                        item-text="name"
                        item-value="id"
                        :items="tag_detail.all_parts"
                        label="Part Required*"
                        :rules="[v => !!v || 'Part name is required']"
                        required
                      ></v-select>
                    </v-col>
                    <v-col class="ma-0 pa-0" :cols="1"></v-col>
                    <v-col class="ma-0 pa-0" :cols="2">
                      <v-text-field
                        outlined
                        v-model="applicant.cost"
                        type="number"
                        label="Cost"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="ma-0 pa-0" :cols="2">
                      <v-text-field
                        outlined
                        v-model="applicant.quantity"
                        label="Quantity*"
                        type="number"
                        pattern="^[0-9]"
                         min="1"
                          step="1"
                        :rules="numberRule"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col :cols="1" class="text-md-right ma-0 pa-0">
                      <span v-if="addSymbol" @click="deleteVisa(counter)">
                        <img style="margin-top:25px;" src="@/assets/images/Cross.png" />
                      </span>
                    </v-col>
                    <v-col :cols="1" class="text-md-right ma-0 pa-0">
                      <span>
                        <button v-if="addSymbol" @click="addVisa($event)">
                          <img style="margin-top:25px" src="@/assets/images/Vector.png" />
                        </button>
                      </span>
                    </v-col>
                  </v-row>

                  <v-col :cols="12">
                    <v-textarea outlined v-model="job.remarks" label="Add Remark" value></v-textarea>
                  </v-col>

                  <v-col :cols="12" class="text-md-right">
                    <v-spacer></v-spacer>
                    <v-btn color="normal" text @click="addEditDefect = false">CANCEL</v-btn>
                    <span class="my-2">
                      <v-btn color="primary" @click="addJob" :disabled="!valid">CONFIRM</v-btn>
                    </span>
                  </v-col>
                </v-row>
              </v-container>
              <!-- </form> -->
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- <div class="main_header" style="margin-left:16px;">Repair</div> -->
    <v-spacer></v-spacer>
    <v-layout>
      <v-flex class="text-xs-center">
        <div class="main_header" style="margin-left:16px;margin-top:16px">Job Sheet</div>
        <v-card class="v-card-100">
          <v-row class="ma-0">
            <v-col cols="3" sm="3">
              <span class="ma-2 font-weight-black" justify="center">Tag Number:</span>
              <a v-on:click="tagAction('')">
                <span
                  class="text-no-wrap text-example text-decoration-underline"
                  v-b-tooltip.hover
                  :title="tag_detail.tag_number"
                >{{tag_detail.tag_number }}</span>
              </a>
            </v-col>
            <v-col cols="2" sm="2">
              <span class="ma-2 font-weight-black" justify="center">Grade:</span>
              <a @click="viewGrade">
                <span class="text-decoration-underline">{{tag_detail.grade}}</span>
              </a>
            </v-col>
            <v-col cols="4" sm="4">
              <span class="ma-2 font-weight-black" justify="center">Item Description:</span>
              <span
                v-b-tooltip.hover
                :title="tag_detail.item_desc"
              >{{tag_detail.item_desc | truncate(20, '...')}}</span>
            </v-col>
            <v-col cols="3" sm="3">
              <span class="ma-2 font-weight-black" justify="center">Item Type:</span>
              <span v-b-tooltip.hover :title="tag_detail.item_type">{{tag_detail.item_type | truncate(7, '...')}}</span>
            </v-col>
          </v-row>
        </v-card>
      </v-flex>
    </v-layout>
    <br />

    <v-card class="v-card-100">
      <v-layout>
        <v-flex>
          <v-card-title>
            <small>Tentative new Grade</small>

            <small>
              <v-select
                v-model="tentitive_grade"
                class="spacing-playground pa-6"
                :items="tentative_new_grade_items"
                label="Enter Grade"
              ></v-select>
            </small>
            <v-spacer></v-spacer>
            <v-actions>
              <v-btn
                v-on:click="submitForm($event, 'Save and Close')"
                class="ma-2"
                color="normal"
              >SAVE & CLOSE</v-btn>
              <v-btn v-on:click="submitForm($event, 'Submit')" class="ma-2" color="primary">SUBMIT</v-btn>
              <v-btn v-on:click="addDefectModal()" class="ma-2" color="primary">ADD DEFECT</v-btn>
            </v-actions>
          </v-card-title>
          <!-- <v-data-table
                  :dense="true"
                  :headers="headers"
                  :items="job_sheet_data"
                  :single-select="singleSelect"
                  :search="search"
                  :item-key="item_key"
                  :hide-default-footer="true"
                  class="elevation-1"
                >
                  <template v-slot:item.actions="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                    <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
                  </template>
          </v-data-table>-->

          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">#</th>
                  <th class="text-left">Defect</th>
                  <th class="text-left">Type of defect</th>
                  <th class="text-left">Part Required</th>
                  <th class="text-left">Cost</th>
                  <th class="text-left">Quantity</th>
                  <th class="text-left">Total Cost</th>
                  <th class="text-left">Remarks</th>
                  <th class="text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, counter) in job_sheet_data" v-bind:key="counter">
                  <td>{{ counter+1 }}</td>
                  <td>{{ item.defect }}</td>
                  <td>{{ item.type_of_defect }}</td>
                  <td>{{ item.part_name }}</td>
                  <td>{{ item.cost }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>
                    <i class="mdi mdi-currency-inr"></i>{{ item.amount }}
                  </td>
                  <td v-b-tooltip.hover :title="item.remarks">{{item.remarks | truncate(15, '...')}}</td>
                  <td style="width:10%;">
                    <!-- <div v-slot:item.actions="{ item }"> -->
                    <!-- <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon> -->
                    <button v-on:click="editJob(counter,item)">
                      <img src="@/assets/images/Edit_pencil.png" />
                    </button>
                    <button @click="deleteItem(counter,item)">
                      <img src="@/assets/images/Delete_Icon.png" />
                    </button>
                    <!-- <v-icon small @click="deleteItem(item)">mdi-delete</v-icon> -->
                    <!-- </div> -->
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-flex>
      </v-layout>
    </v-card>
  </v-card>
</template>


<style >
#styled-input {
  height: 40px;
  font-size: 20pt;
}
.styled-input label[for] {
  height: 40px;
  font-size: 20pt;
}
.font-weight-black {
  color: black;
  font-weight: bold;
}

.theme--light.v-icon {
  color: #1867c0;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  font-size: 14px !important;
}
/* .v-card {
  max-width: 98% !important;
} */

.v-card-100 {
  max-width: 100% !important;
}
</style>

<script>
export default {
  data: () => ({}),
};
</script>

<script>
//import Editor from "@tinymce/tinymce-vue";
export default {
  data() {
    return {
      isSelectedPart: false,
      valid: false,
      selected_index: "",
      alert: false,
      alert_type: "success",
      alert_message: "success",
      tentitive_grade: "",
      viewUploadedImage: false,
      tag_detail: {},
      job: {},
      tagNumberDialog: false,
      addEditDefect: false,
      isNewRow: false,
      defectTitle: "Add New Defect",
      name: "Test",
      props: {
        msg: String,
      },
      addSymbol: true,
      deleted_parts: [],
      applicants: [
        {
          defect: "",
          type_of_defect: "",
          part_required: "",
          cost: 0.0,
          quantity: 0,
          remarks: "",
          amount: 0.0,
          part_name: "",
          edit: false,
        },
      ],
      escalateDialog: false,
      active_tab: "Repair Initiation",
      tabs: [
        "Repair Initiation",
        "Pending Repair",
        "Repair QC",
        "Pending Putaway",
        "Report",
      ],
      singleSelect: false,
      selected: [],
      search: "",
      viewImageDialog: false,
      dialog: false,
      settlementDialog: false,
      journeyDialog: false,
      dspRepairDialog: false,
      isEdit: false,
      numberRule: [v => (!isNaN(parseFloat(v)) && v >= 1) || 'Enter quantity'],

      tentative_new_grade_items: [],

      headers: [
        {
          text: "Defect",
          align: "start",
          sortable: false,
          value: "defect",
        },
        { text: "Type of defect", value: "type_of_defect" },
        { text: "Part Required", value: "part_required" },
        { text: "Part Name", value: "part_name" },
        { text: "Cost", value: "cost" },
        { text: "Quantity", value: "quantity" },
        // { text: "Tag", value: "tag" },
        { text: "Total Cost", value: "amount" },
        { text: "Remarks", value: "remarks" },
        { text: "Action", value: "actions" },
      ],
      questions: [
        {
          text: "Functional Test : Powering On?",
          value: "Yes",
        },
        { text: "Functional Test : Display Working?", value: "Yes" },
      ],
      job_sheet_data: [],

      table_data: [],
      dailog_cancel: "Cancel",
      dailog_confirm: "Confirm",
      defects: {},
      typeOfDefect: "",
      selected_part_data: "",
    };
  },
  created() {
    this.tag_detail = this.$store.state.tag;
    this.tentative_new_grade_items = this.tag_detail.inventory_grades;
    this.tentitive_grade = this.tag_detail.job_sheet.tentative_grade;
    if (this.tag_detail.job_sheet.job_sheet_parts) {
      this.initialDraftedData();
    }
    this.applicants = [
      {
        defect: this.job.defect,
        type_of_defect: this.job.type_of_defect,
        part_required: "",
        amount: 0.0,
        cost: this.selected_part_data[0].price,
        quantity: 0,
        part_name: this.selected_part_data[0].name,
        remarks: "",
        edit: false,
      },
    ];
  },

  methods: {
    alertTimeOut() {
      setTimeout(() => {
        this.alert = false;
        this.$router.push({ name: "RepairInitiation" });
      }, 3000);
    },
    selectedDefect(item) {
      this.typeOfDefect = this.tag_detail.all_defects[item];
    },

    selectedpart(id, counter) {
      this.selected_part_data = this.tag_detail.all_parts.filter(
        (x) => x.id == id
      );
      this.applicants[counter].cost = this.selected_part_data[0].price;
      this.applicants[counter].part_name = this.selected_part_data[0].name;
    },

    addVisa(e) {
      e.preventDefault();
      this.isNewRow = true;
      this.applicants.push({
        defect: this.job.defect,
        type_of_defect: this.job.type_of_defect,
        amount: 0.0,
        cost: 0.0,
        quantity: 0,
        remarks: this.job.remarks,
        part_name: this.selected_part_data[0].name,
        edit: false,
      });
    },
    viewGrade() {
      this.viewImageDialog = true;
    },
    deleteVisa(counter) {
      if (this.applicants.length > 1){
        this.applicants.splice(counter, 1);
      }
    },

    rejectConfirmation() {
      (this.dailog_cancel = "Cancel"), (this.dailog_confirm = "Reject");
      this.dialog = true;
      this.dialog_title = "Confirmation Rejection";
    },
    submitForm(item, button_text) {
      if (this.tentitive_grade == undefined) {
        this.$toast.error("Please Add Tentative Grade");
        e.stopPropagation();
      }

      let job_sheet_params = {
        repair_id: this.tag_detail.id,
        deleted_parts_ids: this.deleted_parts,
        action_name: button_text,
        job_sheet: {
          id: "",
          tentitive_grade: this.tentitive_grade,
        },
        job_sheet_part: this.job_sheet_data,
      };
      if (job_sheet_params.job_sheet_part.length == 0) {
        this.$toast.error("Please add at-least one defect");
        e.stopPropagation();
      }
      this.$http.secured
        .post(
          "/api/v1/warehouse/repairs/" +
            this.tag_detail.id +
            "/create_job_sheet",
          job_sheet_params
        )
        .then((response) => {
          if (response.status == 204) {
            this.original_table_data = response.data;
            if (button_text == "Submit"){
              this.showAlert("success", "Repair initiated Successfully");
            }
            else{
              this.showAlert("success", "Draft saved successfully");
            }
          } else {
            alert("no data");
          }
        })
        .catch((error) => {
          alert("API Error :: " + error);
        });
    },
    tagAction(actionTitle) {
      this.dialog_title = "Settlement Amount";
      this.tagNumberDialog = true;
    },

    addJob() {
      this.addSymbol = true;
      if (!this.$refs.form.validate()) return;

      if (this.isEdit) {
        this.addEditDefect = false;
        this.job_sheet_data[this.selected_index].defect = this.job.defect;
        this.job_sheet_data[
          this.selected_index
        ].type_of_defect = this.job.type_of_defect;
        this.job_sheet_data[this.selected_index].part_name = this.applicants[0]
          .part_name
          ? this.applicants[0].part_name
          : this.selected_part_data[0].name;
        this.job_sheet_data[this.selected_index].part_required = this
          .applicants[0].part_required
          ? this.applicants[0].part_required
          : this.selected_part_data[0].id;
        this.job_sheet_data[
          this.selected_index
        ].quantity = this.applicants[0].quantity;
        this.job_sheet_data[this.selected_index].cost = this.applicants[0].cost;
        this.job_sheet_data[this.selected_index].amount =
          Number(this.applicants[0].cost) * Number(this.applicants[0].quantity);
        this.job_sheet_data[this.selected_index].remarks = this.job.remarks;
      } else {
        let qty = this.job.quantity == undefined ? 0 : this.job.quantity;
        let cost =
          this.selected_part_data[0].price == undefined
            ? 0
            : this.selected_part_data[0].price;
        this.job.amount = Number(cost) * Number(qty);
        // this.job.part_name = this.selected_part_data[0].name;
        // let newJob = {
        //   defect: this.job.defect,
        //   type_of_defect: this.job.type_of_defect,
        //   part_required: this.job.part_required,
        //   cost: this.job.cost,
        //   quantity: this.job.quantity,
        //   amount: this.job.amount,
        //   remarks: this.job.remarks,
        //   part_name: this.selected_part_data[0].name,
        //   edit: false // or maybe this??
        // };
        // let newJob = this.applicants;
        // this.job_sheet_data = [];

        for (let i = 0; i < this.applicants.length; i++) {         
          // let qty = this.applicants[i].quantity == undefined ? 0 : this.applicants[i].quantity;
          // let cost =
          //   this.applicants[i].price == undefined
          //     ? 0
          //     : this.applicants[i].price;
          this.applicants[i].defect = this.job.defect;
          this.applicants[i].remarks = this.job.remarks;
          this.applicants[i].type_of_defect = this.job.type_of_defect;
          this.applicants[i].amount =
            Number(this.applicants[i].cost) *
            Number(this.applicants[i].quantity);
          // this.applicants[i].part_name = this.selected_part_data[0].name

          this.job_sheet_data.push(this.applicants[i]);
        }
        this.applicants = [
          {
            defect: "",
            type_of_defect: "",
            part_required: "",
            cost: 0.0,
            quantity: 0,
            remarks: "",
            amount: 0.0,
            part_name: "",
            edit: false,
          },
        ];
        this.addSymbol = true;
        this.addEditDefect = false;
        this.isEdit = false;
      }
    },
    editJob(id, item) {
      this.addSymbol = false;
      this.selected_index = id;
      this.defectTitle = "Edit Defect";
      this.addEditDefect = true;
      this.isEdit = true;
      id = 0;
      this.job.defect = item.defect;
      this.typeOfDefect = this.tag_detail.all_defects[item.defect];
      this.job.remarks = item.remarks;
      this.job.type_of_defect = item.type_of_defect;
      this.applicants[id].quantity = item.quantity;
      this.applicants[id].cost = item.cost;
      this.applicants[id].part_name = item.part_name;
      this.applicants[id].part_required = item.part_required;
    },

    deleteItem(counter, item) {
      if (item.id != undefined) {
        this.deleted_parts.push(item.id);
      }
      if (confirm("Do you really want to delete this defect?")) {
        this.job_sheet_data.splice(counter, 1);
      }
    },
    showAlert(alert_type, alert_message) {
      this.alert = true;
      this.alert_type = alert_type;
      this.alert_message = alert_message;
      this.alertTimeOut();
    },
    addDefectModal() {
     // this.$refs.form.reset();
      this.applicants = [
        {
          defect: "",
          type_of_defect: "",
          part_required: "",
          cost: 0.0,
          quantity: 0,
          remarks: "",
          amount: 0.0,
          part_name: "",
          edit: false,
        },
      ];
      this.addSymbol = true;
      this.isEdit = false;
      this.addEditDefect = true;
      this.job = {};
      this.valid = false;
      this.reset();
    },
    reset() {
      this.$refs.form.reset();
    },
    initialDraftedData() {
      for (
        var i = 0;
        i < this.tag_detail.job_sheet.job_sheet_parts.length;
        i++
      ) {
        let draftedJob = {
          id: this.tag_detail.job_sheet.job_sheet_parts[i].id,
          defect: this.tag_detail.job_sheet.job_sheet_parts[i].details.defect,
          type_of_defect: this.tag_detail.job_sheet.job_sheet_parts[i].details
            .type_of_defect,
          part_name: this.tag_detail.job_sheet.job_sheet_parts[i].repair_part,
          part_required: this.tag_detail.job_sheet.job_sheet_parts[i]
            .repair_part_id,
          cost: this.tag_detail.job_sheet.job_sheet_parts[i].part_cost,
          quantity: this.tag_detail.job_sheet.job_sheet_parts[i].quantity,
          amount: this.tag_detail.job_sheet.job_sheet_parts[i].amount,
          remarks: this.tag_detail.job_sheet.job_sheet_parts[i].remarks,
          edit: false, // or maybe this??
        };
        this.job_sheet_data.push(draftedJob);
      }
    },
  },
  filters: {
    truncate: function (text, length, suffix) {
      if (text?text.length:0 > length) {
        return text.substring(0, length) + suffix;
      } else {
        return text;
      }
    },
  },
};
</script>