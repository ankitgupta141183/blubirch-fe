<template>
  <v-card class="overflow-hidden v-card v-sheet theme--light">
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
    </div>
    <ImageAnnotation
      v-show="isModalVisible"
      @close="closeModal"
      :capturedImages="misc.capturedImg"
      @update-number="update"
    />
    <ImageView
      v-show="isViewModalVisible"
      @close="closeViewModal"
      :imageDisplayed="misc.viewImage"
    />

    <v-row justify="center">
      <v-dialog v-model="viewUploadedImage" max-width="900px">
        <v-card class="v-card-100">
          <v-card-text>
            <v-container class="v-card-100">
              <v-container class="grey lighten-5">
                <!-- <img :src="imageurl" v-bind:alt="pic" /> -->

                <h3>Attached Images</h3>

                <v-row v-if="misc.capturedImg.length > 0">
                  <!-- <v-col :cols="3" v-for="img in misc.capturedImg" class="" v-on:click="openViewModal(img)" style="cursor: pointer;"> -->

                  <v-col v-if="img.url" :cols="3" v-for="img in capturedImgById">
                    <span>
                      <img :src="img.url" width="100" height="100" />
                    </span>
                    <!-- <a> <span class="close_btn" v-on:click="deleteIndividualImage(img)">x</span></a> -->
                  </v-col>
                </v-row>

                <v-row v-if="saved_images.length > 0">
                  <v-col v-if="img.url" :cols="3" v-for="img in saved_images">
                    <span>
                      <img :src="img.url" width="100" height="100" />
                    </span>
                  </v-col>
                </v-row>
              </v-container>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="viewUploadedImage = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

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
                      <!-- <img
                        justify="center"
                        src="@/assets/images/camera-img.jpg"
                        width="128"
                        height="83"
                      />-->
                      <img
                        :src="tag_detail.defective_image? tag_detail.defective_image[0].src:'@/assets/images/camera-img.jpg'"
                        width="128"
                        height="83"
                      />
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
                      <img
                        :src="tag_detail.defective_image? tag_detail.defective_image[0].src:'@/assets/images/camera-img.jpg'"
                        width="128"
                        height="83"
                      />
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
              <span
                v-b-tooltip.hover
                :title="tag_detail.item_type"
              >{{tag_detail.item_type | truncate(7, '...')}}</span>
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
                class="font-weight-bold spacing-playground pa-6"
                :items="tentative_grades"
                v-model="tag_detail.job_sheet.tentative_grade"
                v-disabled="isDisabled"
                :disabled="true"
              ></v-select>
            </small>

            <!-- <v-col cols="12" sm="6" md="2">
              <v-text-field
                v-model="tag_detail.job_sheet.tentative_grade"
                v-disabled="isDisabled"
                :disabled="true"
                outlined
              ></v-text-field>
            </v-col>-->
            <v-spacer></v-spacer>
            <v-actions>
              <v-btn
                v-on:click="submitForm($event, 'Save and Close')"
                class="ma-2"
                color="normal"
              >Save & Close</v-btn>
              <v-btn v-on:click="submitForm($event,'Submit')" class="ma-2" color="primary">Submit</v-btn>
            </v-actions>
          </v-card-title>

          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">#</th>
                  <th class="text-left">Defect</th>
                  <th class="text-left">Type of defect</th>
                  <th class="text-left">Part Required</th>
                  <th class="text-left">Repaired</th>
                  <th class="text-left">Remarks</th>
                  <th class="text-left">Image/s</th>
                  <th class="text-left">Take Image</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, counter) in job_sheet_data " v-bind:key="counter+1">
                  <td>{{counter+1}}</td>

                  <td>{{ item.defect }}</td>
                  <td>{{ item.type_of_defect }}</td>
                  <td>{{ item.part_required }}</td>
                  <td>
                    <v-select
                      v-model="item.repaired"
                      class="spacing-playground"
                      :items="repaired"
                      label="Yes/No"
                    ></v-select>
                  </td>
                  <td>
                    <v-text-field v-model="item.submission_remarks" label="Enter Remark" required></v-text-field>
                  </td>
                  <td v-on:click="UploadedImage(item.id, counter)">
                    <template>
                      <img src="@/assets/images/icons/baseline_visibility_black_18dp.png" />
                    </template>
                  </td>
                  <td>
                    <template>
                      <v-icon
                        color="primary"
                        v-on:click="checkPicture(item.id)"
                        name="image"
                      >mdi-camera</v-icon>
                    </template>
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

<style>
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
import ImageAnnotation from "./ImageAnnotation";
import ImageView from "./ImageView";
//import Editor from "@tinymce/tinymce-vue";
export default {
  data() {
    return {
      alert: false,
      alert_type: "success",
      alert_message: "success",
      isModalVisible: false,
      isViewModalVisible: false,
      tentitive_grade: "",
      tag_detail: {},
      job: {},
      tagNumberDialog: false,
      viewImageDialog: false,
      viewUploadedImage: false,
      tentative_grades: [],
      name: "Test",
      misc: {
        pageTitle: "",
        questionType: false,
        capturedImg: [],
        capturedAnno: [],
        viewImage: {},
      },
      props: {
        msg: String,
      },
      applicants: [
        {
          previous: "",
          expiration: "",
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
      capturedImgById: [],
      saved_images: [],
      selected: [],
      search: "",
      dialog: false,
      settlementDialog: false,
      journeyDialog: false,
      dspRepairDialog: false,
      job_sheet_data: [],
      tentative_new_grade_items: ["Very Good", "Good", "Defective"],

      headers: [
        {
          text: "Defect",
          align: "start",
          sortable: false,
          value: "defect",
        },
        { text: "Type of defect", value: "type_of_defect" },
        { text: "Part Required", value: "part_required" },
        { text: "Repaired", value: "repaired", width: "12%" },
        { text: "Remarks", value: "remarks", width: "22%" },
        { text: "Image/s", value: "uploaded_images", sortable: false },
        { text: "Take Image", value: "capture_image", sortable: false },
      ],
      questions: [
        {
          text: "Functional Test : Powering On?",
          value: "Yes",
        },
        { text: "Functional Test : Display Working?", value: "Yes" },
      ],
      repaired: ["Yes", "No"],
      table_data: [],
      dailog_cancel: "Cancel",
      dailog_confirm: "Confirm",
      defects: {},
      typeOfDefect: [],
      selected_part_data: "",
    };
  },
  components: {
    ImageAnnotation,
    ImageView,
  },
  created() {
    this.tag_detail = this.$store.state.tag;
    this.tentative_grades.push(this.tag_detail.job_sheet.tentative_grade);
    if (this.tag_detail.job_sheet.job_sheet_parts) {
      this.initialDraftedData();
    }
  },

  methods: {
    selectedDefect(item) {
      this.typeOfDefect = this.tag_detail.all_defects[item];
    },

    selectedpart(id) {
      this.selected_part_data = this.tag_detail.all_parts.filter(
        (x) => x.id == id
      );
      this.job.cost = this.selected_part_data[0].price;
    },

    viewGrade() {
      this.viewImageDialog = true;
    },

    UploadedImage(id, counter) {
      this.capturedImgById = [];
      var selected_job_sheet_data = this.job_sheet_data.filter(
        (x) => x.id == id
      );
      this.saved_images = [];
      
      if (this.job_sheet_data[counter].images != null && this.saved_images.length == 0) {
        for (var i = 0; i < this.job_sheet_data[counter].images.length; i++) {
          this.saved_images.push({
            url: this.job_sheet_data[counter].images[i].url
          });
        }
      }
      // this.capturedImgById.push(selected_job_sheet_data[0].images);

      if (
        this.misc.capturedImg.length == 0 &&
        this.capturedImgById.length == 0 &&
        this.saved_images.length == 0
      ) {
        this.$toast.error("Please click a picture first");
        e.stopPropagation();
      } else {
        // this.capturedImgById = [];
        if(this.misc.capturedImg.length > 0){
          for (var i = 0; i < this.misc.capturedImg.length; i++) {
            if (Number(this.misc.capturedImg[i].src.split("&")[1]) == id) {
              this.capturedImgById.push({
                url: this.misc.capturedImg[i].src.split("&")[0],
              });
            }
          }
        }
        if(this.capturedImgById.length > 0 || this.saved_images.length > 0){
          this.viewUploadedImage = true;
        }
        else{
          this.$toast.error("Please click a picture first");
          e.stopPropagation();
        }

      }
    },
    submitForm(item, button_text) {
      for (var i = 0; i < this.job_sheet_data.length; i++) {
        this.capturedImgById = [];
        for (var j = 0; j < this.misc.capturedImg.length; j++) {
          if (
            Number(this.misc.capturedImg[j].src.split("&")[1]) ==
            this.job_sheet_data[i].id
          ) {
            //             if(this.capturedImgById.indexOf({
            //   url: this.misc.capturedImg[i].src.split("&")[0],
            // })===-1){
            this.capturedImgById.push({
              url: this.misc.capturedImg[j].src.split("&")[0],
            });
            //  }
          }
        }

        var selected_job_sheet_data = this.job_sheet_data.filter(
          (x) => x.id == this.job_sheet_data[i].id
        );

        if (selected_job_sheet_data[0].images != null) {
          for (var k = 0; k < selected_job_sheet_data[0].images.length; k++) {
            this.capturedImgById.push(selected_job_sheet_data[0].images[k]);
          }
        }

        this.job_sheet_data[i].images = this.capturedImgById;
      }

      let job_sheet_params = {
        repair_id: this.tag_detail.id,
        action_name: button_text,
        job_sheet: {
          id: this.tag_detail.job_sheet.id,
          // tentitive_grade: this.tag_detail.job_sheet.tentative_grade
        },
        // job_sheet_part: [
        //   {
        //     id: this.tag_detail.job_sheet.job_sheet_parts[0].id,
        //     repaired: this.job.repaired,
        //     remark: this.job.remarks,
        //     images: [
        //       {
        //         tet: "dfd"
        //       }
        //     ]
        //   }
        // ]
        job_sheet_part: this.job_sheet_data,
      };
      this.$http.secured
        .post(
          "/api/v1/warehouse/repairs/" + this.tag_detail.id + "/pending_repair",
          job_sheet_params
        )
        .then((response) => {
          if (response.data) {
            //this.original_table_data = response.data;
            if (button_text == "Submit"){
              this.showAlert("success", "Repair updated for QC Successfully");
            }
            else{
              this.showAlert("success", "Draft saved successfully");
            }
            // this.table_data = this.original_table_data
            // this.table_data = this.original_table_data.filter(
            //   x => x.repair_status == "Repair Initiation"
            // );
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
    checkPicture(id) {
      this.$store.commit("setselectedJobSheetId", {
        selectedRepairJobSheetId: id,
      });
      this.isModalVisible = true;
    },

    closeModal() {
      document.getElementById("video-outer-div").style.display = "block";
      document.getElementById("captured-image").style.display = "none";
      this.isModalVisible = false;
      this.misc.questionType = false;
      if (this.$store.state.url) {
        this.imageurl = this.$store.state.url.path_name;
      }
    },
    closeViewModal() {
      this.isViewModalVisible = false;
    },
    update(value) {
      this.misc.capturedAnno = value;
    },
    alertTimeOut() {
      setTimeout(() => {
        this.alert = false;
        this.$router.push({ name: "RepairInitiation" });
      }, 3000);
    },
    showAlert(alert_type, alert_message) {
      this.alert = true;
      this.alert_type = alert_type;
      this.alert_message = alert_message;
      this.alertTimeOut();
    },

    openViewModal(img) {
      this.isViewModalVisible = true;
      this.misc.viewImage = img;
      console.log(img);
      anno.destroy();
    },

    deleteIndividualImage(img) {
      event.stopPropagation();
      var removalIndices = [];
      this.misc.capturedImg = this.misc.capturedImg.filter(function (obj) {
        return !(img.src == obj.src);
      });

      for (const item in this.final_grading_result) {
        for (var i = 0; i < this.final_grading_result[item].length; i++) {
          this.final_grading_result[item][
            i
          ].annotations = this.final_grading_result[item][i].annotations.filter(
            function (obj) {
              return !(img.src == obj.src);
            }
          );
        }

        if (this.annotation_required_labels.includes(item)) {
          this.final_grading_result[item] = this.final_grading_result[
            item
          ].filter(function (obj) {
            return obj.annotations.length > 0;
          });
        }
      }

      this.deleteImages([img.src]);
    },

    deleteImages(arr) {
      this.misc.capturedImg = this.misc.capturedImg.filter(function (obj) {
        return !arr.includes(obj.src);
      });

      if (
        this.$store.state.currentUser.roles.includes(Roles.warehouseUser) ==
        true
      ) {
        this.$http.secured
          .post("/api/v1/warehouse/warehouse_grading/delete_images", {
            url: arr,
          })
          .then((response) => {})
          .catch((error) => this.$toast.error("Error in deletion of images"));
      } else {
        this.$http.secured
          .post("/api/v1/store/returns/customer_returns/delete_images", {
            url: arr,
          })
          .then((response) => {})
          .catch((error) => this.$toast.error("Error in deletion of images"));
      }
    },

    initialDraftedData() {
      //tag_detail.job_sheet.job_sheet_parts
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
          part_required: this.tag_detail.job_sheet.job_sheet_parts[i]
            .repair_part,
          cost: this.tag_detail.job_sheet.job_sheet_parts[i].part_cost,
          quantity: this.tag_detail.job_sheet.job_sheet_parts[i].quantity,
          amount: this.tag_detail.job_sheet.job_sheet_parts[i].amount,
          submission_remarks: this.tag_detail.job_sheet.job_sheet_parts[i]
            .submission_remarks,
          repaired: this.tag_detail.job_sheet.job_sheet_parts[i].repaired,
          edit: false, // or maybe this??
          images: this.tag_detail.job_sheet.job_sheet_parts[i].images,
        };
        this.job_sheet_data.push(draftedJob);
      }
    },
  },
  filters: {
    truncate: function (text, length, suffix) {
      if (text ? text.length : 0 > length) {
        return text.substring(0, length) + suffix;
      } else {
        return text;
      }
    },
  },
};
</script>