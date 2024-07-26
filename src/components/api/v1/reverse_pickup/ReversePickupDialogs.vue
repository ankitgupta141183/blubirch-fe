<template>
  <v-row justify="center">
    <!-- ADD TAG ID -->
    <v-dialog
      v-model="dialogDetails.popup"
      persistent
      max-width="400px"
      v-if="dialogDetails.type == 'ADD TAG ID'"
    >
      <v-card class="v-card-100">
        <v-card class="v-card-100">
          <v-card-title>
            <span>Add Tag ID</span>
            <v-spacer></v-spacer>
            <v-btn icon @click="closePopup">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
        <v-form>
          <v-card-text>
            <v-container>
              <v-row justify="center">
                <v-col cols="12">
                  <v-text-field
                    v-model="modelData.add_tagId_btn.sku_code"
                    label="Article ID"
                    outlined
                  >
                    <template #append>
                      <img
                        src="@/assets/images/pickupFile.png"
                        style="display: flex"
                      />
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12">
                  <v-text-field
                    v-model="modelData.add_tagId_btn.serial_number"
                    label="Serial Number"
                    outlined
                  >
                    <template #append>
                      <img
                        src="@/assets/images/pickupFile.png"
                        style="display: flex"
                      />
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="10">
                  <v-text-field
                    v-model="modelData.add_tagId_btn.tag_number"
                    label="Tag ID"
                    outlined
                  >
                    <template #append>
                      <img
                        src="@/assets/images/pickupFile.png"
                        style="display: flex"
                      />
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="2">
                  <button type="button" @click="addTagId">
                    <img
                      src="@/assets/images/reverse_pickup.png"
                      style="display: flex"
                    />
                  </button>
                </v-col>
              </v-row>
              <v-row>
                <span class="mb-4 ml-4 mr-4">Summary</span>
              </v-row>
              <v-row justify="center">
                <span class="ml-4">Tag IDs</span>
                <v-spacer></v-spacer>
                <span class="mr-4">{{ tagAndBoxId.tagIds.length }}</span>
              </v-row>
              <v-row justify="center">
                <v-divider class="mr-4 ml-4"></v-divider>
              </v-row>
              <span class="mr-4 ml-4" style="float: right">{{
                tagAndBoxId.tagIds.join(", ")
              }}</span>
            </v-container>
          </v-card-text>
        </v-form>
        <v-card-actions center>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="callCompleteAddTagId" class="mb-3"
            >COMPLETE</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- ADD Box ID -->
    <v-dialog
      v-model="dialogDetails.popup"
      persistent
      max-width="400px"
      v-if="dialogDetails.type == 'START PACKING'"
    >
      <v-card class="v-card-100">
        <v-card class="v-card-100">
          <v-card-title>
            <span>Add Box ID</span>
            <v-spacer></v-spacer>
            <v-btn icon @click="closePopup">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
        <v-form>
          <v-card-text>
            <v-container>
              <v-row justify="center">
                <v-col cols="12">
                  <v-text-field
                    v-model="modelData.boxNumber"
                    label="Box ID"
                    @change="addBoxId"
                    outlined
                  >
                    <template #append>
                      <img
                        src="@/assets/images/pickupFile.png"
                        style="display: flex"
                      /> </template
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="10">
                  <v-text-field
                    v-model="modelData.tagNumbers"
                    label="Tag ID"
                    outlined
                  >
                    <template #append>
                      <img
                        src="@/assets/images/pickupFile.png"
                        style="display: flex"
                      />
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="2">
                  <button type="button" @click="addBoxTagId()">
                    <img
                      src="@/assets/images/reverse_pickup.png"
                      class="orientation-img"
                      style="display: flex"
                    />
                  </button>
                </v-col>
              </v-row>
              <v-row>
                <span class="mb-4 ml-4 mr-4">Summary</span>
              </v-row>
              <v-row justify="center">
                <span class="ml-4">Box IDs</span>
                <v-spacer></v-spacer>
                <span class="mr-4">{{ tagAndBoxId.boxIds.length }}</span>
              </v-row>
              <v-row justify="center">
                <v-divider class="mr-4 ml-4"></v-divider>
              </v-row>
              <span
                class="mr-4 ml-4"
                style="float: right"
                v-for="(boxId,index) in tagAndBoxId.boxIds"
                :key="boxId"
                @click="openDialog(boxId,index)"
              >
                <span v-if="modelData.add_boxId_btn[index].tag_numbers.length >0" style="text-decoration: underline; color:#007BFF">{{ boxId }}</span>
                <span v-else>{{ boxId }}</span>
              </span>
            </v-container>
          </v-card-text>
        </v-form>
        <v-card-actions center>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            color="primary"
            class="cancel-color mb-3"
            @click="addNewBoxId"
            >ADD BOX</v-btn
          >
          <v-btn color="primary" class="mb-3" @click="callConfirmPackaging"
            >CONFIRM PACKAGING</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Update Suggested Pick Up Date -->
    <v-dialog
      v-model="dialogDetails.popup"
      persistent
      max-width="400px"
      v-if="dialogDetails.type == 'UPDATE SUGGEST PICK UP DATE'"
    >
      <v-card class="v-card-100">
        <v-card class="v-card-100">
          <v-card-title>
            <span>Update Suggested Pick Up Date</span>
            <v-spacer></v-spacer>
            <v-btn icon @click="closePopup">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
        <v-form>
          <v-card-text>
            <v-container>
              <v-row justify="center">
                <v-col cols="12">
                  <v-menu
                    ref="menu_14"
                    v-model="menu_14"
                    :close-on-content-click="false"
                    :return-value.sync="modelData.pickup_date"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="modelData.pickup_date"
                        outlined
                        hide-details
                        prepend-inner-icon="event"
                        readonly
                        v-bind="attrs"
                        label="Update Suggested Pick up date"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      :min="new Date().toISOString().substr(0, 10)"
                      v-model="modelData.pickup_date"
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu_14 = false"
                        >Cancel</v-btn
                      >
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu_14.save(modelData.pickup_date)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-form>
        <v-card-actions center>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            color="primary"
            class="cancel-color mb-3"
            @click="closePopup"
            >Cancel</v-btn
          >
          <v-btn
            color="primary"
            class="mb-3"
            @click="callSubmitSuggestedPickupDate"
            :disabled = "!modelData.pickup_date || modelData.number>0"
            >Submit</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Assign Logistics Partner -->
    <v-dialog
      v-model="dialogDetails.popup"
      persistent
      max-width="400px"
      v-if="dialogDetails.type == 'ASSIGN LOGISTICS PARTNER'"
    >
      <v-card class="v-card-100">
        <v-card class="v-card-100">
          <v-card-title>
            <span>Assign Logistics Partner</span>
            <v-spacer></v-spacer>
            <v-btn icon @click="closePopup">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
        <v-form>
          <v-card-text>
            <v-container>
              <v-text-field
                v-model="modelData.assign_logistics_partner"
                label="Assign Logistics Partner"
                outlined
              >
              </v-text-field>
            </v-container>
          </v-card-text>
        </v-form>
        <v-card-actions center>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            color="primary"
            class="cancel-color mb-3"
            @click="closePopup"
            >Cancel</v-btn
          >
          <v-btn
            color="primary"
            class="mb-3"
            @click="callSubmitAssignLogisticsPartner"
            :disabled = "!modelData.assign_logistics_partner || modelData.number>0"
            >Submit</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Update Pick up Details -->
    <v-dialog
      v-model="dialogDetails.popup"
      persistent
      max-width="700px"
      v-if="dialogDetails.type == 'UPDATE PICK UP DETAILS'"
    >
      <v-card class="v-card-100">
        <v-card class="v-card-100">
          <v-card-title>
            <span>Update Pick Up Details</span>
            <v-spacer></v-spacer>
            <v-btn icon @click="closePopup">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
        <v-form>
          <v-card-text>
            <v-container>
              <span>Pickup Details</span>
              <v-row>
                <v-col cols="12" sm="5" md="6">
                  <v-menu
                    ref="menu_14"
                    v-model="menu_14"
                    :close-on-content-click="false"
                    :return-value.sync="modelData.actual_pickup_date"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        outlined
                        hide-details
                        v-model="modelData.actual_pickup_date"
                        label="Actual Pick Up Date"
                        prepend-inner-icon="event"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      :min="new Date().toISOString().substr(0, 10)"
                      v-model="modelData.actual_pickup_date"
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu_14 = false"
                        >Cancel</v-btn
                      >
                      <v-btn
                        text
                        color="primary"
                        @click="
                          $refs.menu_14.save(modelData.actual_pickup_date)
                        "
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="5" md="6">
                  <v-text-field
                    v-model="modelData.dispatch_document_number"
                    label="Dispatch Document Number"
                    outlined
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <span>Packing Details</span>
              <v-row>
                <v-col cols="12" sm="5" md="6">
                  <v-text-field
                    v-model="modelData.boxes_pickedup"
                    label="Number of boxes to be picked up"
                    outlined
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="5" md="6">
                  <v-text-field
                    v-model="modelData.actual_boxes_pickedup"
                    label="Actual boxes picked up"
                    outlined
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-form>
        <v-card-actions center>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            color="primary"
            class="cancel-color mb-3"
            @click="dialogDetails.popup = false"
            >Cancel</v-btn
          >
          <v-btn color="primary" class="mb-3" @click="callSubmitPickUpDetails" :disabled="!modelData.actual_pickup_date || !modelData.dispatch_document_number
          || !modelData.boxes_pickedup || !modelData.actual_boxes_pickedup || modelData.number>0"
            >Submit</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- boxTagIds popup -->
    <v-dialog v-model="boxIdPopup" persistent max-width="400px">
      <v-card class="v-card-100">
        <v-card class="v-card-100">
          <v-card-title>
            <span>Box Summary</span>
            <v-spacer></v-spacer>
            <v-btn icon @click="boxIdPopup = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
          <v-card-title>
            <span>{{ clickedBoxId }}</span>
          </v-card-title>
          <v-card-text>
              <span>{{
                modelData.add_boxId_btn[box_index].tag_numbers.join(", ")
              }}</span>
          </v-card-text>
        <v-card-actions >
          <v-spacer></v-spacer>
          <v-btn color="primary" class="mb-3" @click="boxIdPopup = false">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- confirm packaging popup -->
    <v-row justify="center">
      <v-dialog v-model="confirmPackPopup" persistent max-width="500px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Packing Summary</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="confirmPackPopup = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-title class="pa-4">
            <span>Packed Boxes</span>
          </v-card-title>
            <span v-for="(boxId,index) in tagAndBoxId.boxIds"
                :key="boxId"
              >
                  <v-card-title>
                    <span>{{ boxId }}</span>
                  </v-card-title>
                  <v-card-text>
                    <span>{{ modelData.add_boxId_btn[index].tag_numbers.join(", ") }}</span>
                  </v-card-text>
            </span>
            <v-card-actions class="mt-4">
              <v-spacer></v-spacer>
                <v-btn outlined color="primary" class="cancel-color mb-3" @click="addNewBoxId" >ADD BOX</v-btn>
                <v-btn color="primary" class="mb-3" @click="ConfirmedPackaging"
                >COMPLETE PACKAGING</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!--Approve Ok confirm popup -->
    <v-row justify="center">
      <v-dialog v-model="messageDetails.popup" persistent max-width="424px">
        <v-card class="v-card-100 pa-2">
          <v-card-title>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text class="text-center">
            <span> {{ messageDetails.message }} </span>
          </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mb-3" @click="afterClickOkLoadData"
              >Ok</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- filter data popup -->
    <v-dialog
      content-class="filter-repair"
      v-model="filterDetails.popup"
      persistent
      max-width="1224px"
    >
      <v-card>
        <v-card-actions>
          <v-text-field
            prepend-inner-icon="mdi-magnify"
            v-if="active_tab === 'Pending Reverse Pick Up'"
            v-model="filterDetails.article_id_search"
            label="Article Id"
            class="ma-2"
            outlined
            v-on:keyup.enter="loadData(active_tab)"
          ></v-text-field>
          <v-text-field
            prepend-inner-icon="mdi-magnify"
            v-if="active_tab === 'Pending Reverse Pick Up'"
            v-model="filterDetails.pickup_location_search"
            label="Pick Up Location"
            class="ma-2"
            outlined
            v-on:keyup.enter="loadData(active_tab)"
          ></v-text-field>
          <v-autocomplete
            v-if="active_tab === 'Pending Reverse Pick Up'"
            v-on:keyup.enter="loadData(active_tab)"
            prepend-inner-icon="mdi-magnify"
            v-model="filterDetails.delivery_location_search"
            outlined
            :items="deliveryLocationList"
            item-text="code"
            item-value="id"
            label="Delivery Location"
            class="mr-2"
          >
          </v-autocomplete>
          <v-text-field
            prepend-inner-icon="mdi-magnify"
            v-if="active_tab === 'Update Packaging Details'"
            v-model="filterDetails.article_id_search"
            label="Article Id"
            class="ma-2"
            outlined
            v-on:keyup.enter="loadData(active_tab)"
          ></v-text-field>
          <v-autocomplete
            v-if="active_tab === 'Update Packaging Details'"
            v-on:keyup.enter="loadData(active_tab)"
            prepend-inner-icon="mdi-magnify"
            v-model="filterDetails.return_type_search"
            outlined
            :items="returnTypesList"
            item-text="original_code"
            item-value="id"
            label="Return Types"
            class="mr-2"
          >
          </v-autocomplete>
        </v-card-actions>
        <v-card-actions class="margin-10">
          <v-spacer></v-spacer>
          <v-btn small text color="normal" @click="filterDetails.popup = false"
            >CANCEL</v-btn
          >
          <v-btn small color="primary" @click="callApplyFilterFunc"
            >APPLY FILTER(S)</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
export default {
  props: {
    dialogDetails: Object,
    modelData: Object,
    tagAndBoxId : Object,
    filterDetails: Object,
    completeAddTagId: Function,
    clickOkLoadData: Function,
    messageDetails: Object,
    confirmPackaging: Function,
    submitSuggestedPickupDate: Function,
    submitAssignLogisticsPartner: Function,
    submitPickUpDetails: Function,
    returnTypesList: Array,
    deliveryLocationList: Array,
    active_tab: String,
    applyFilterFunc: Function,
    confirmPackPopup : Boolean,
  },
  data() {
    return {
      UpdatePopup: false,
      // tagIds: [],
      // boxIds: [],
      box_index : 0,
      clickedBoxId: null,
      boxIdPopup: false,
      menu_14 : false,
    };
  },

  methods: {
    addTagId() {
      if (
        this.modelData.add_tagId_btn.tag_number.trim() &&
        this.modelData.add_tagId_btn.sku_code.trim() &&
        this.modelData.add_tagId_btn.serial_number.trim()
      ) {
        const newTagId = {
          sku_code: this.modelData.add_tagId_btn.sku_code,
          serial_number: this.modelData.add_tagId_btn.serial_number,
          tag_number: this.modelData.add_tagId_btn.tag_number,
        };

        this.modelData.add_tagId_btn.splice(0, 0, newTagId);
        this.tagAndBoxId.tagIds.push(this.modelData.add_tagId_btn.tag_number);

        this.modelData.add_tagId_btn.tag_number = "";
        this.modelData.add_tagId_btn.sku_code = "";
        this.modelData.add_tagId_btn.serial_number = "";
      }
    },

    addBoxId() {
      if (this.modelData.boxNumber) {
        const newBox = {
          box_number: this.modelData.boxNumber,
          tag_numbers: [],
        };
        if (this.modelData.add_boxId_btn.length === 0) {
          this.modelData.add_boxId_btn.push(newBox);
        } else {
          const lastBox =
            this.modelData.add_boxId_btn[
              this.modelData.add_boxId_btn.length - 1
            ];
          if (lastBox.box_number !== "") {
            this.modelData.add_boxId_btn.push(newBox);
          } else {
            this.modelData.add_boxId_btn.splice(-1, 1, newBox);
          }
        }
        this.tagAndBoxId.boxIds.push(this.modelData.boxNumber);
      }
    },

    addBoxTagId() {
      if (
        this.modelData.tagNumbers &&
        this.modelData.add_boxId_btn.length > 0
      ) {
        const lastBox =
          this.modelData.add_boxId_btn[this.modelData.add_boxId_btn.length - 1];
        lastBox.tag_numbers.push(this.modelData.tagNumbers);
        this.modelData.tagNumbers = "";
      }
    },
    openDialog(boxId,index) {
      this.clickedBoxId = boxId;
      this.boxIdPopup = true;
      this.box_index = index;
    },

    addNewBoxId() {
      this.tagAndBoxId.tagIds = [];
      this.modelData.boxNumber = "";
      this.confirmPackPopup = false;
    },

    callCompleteAddTagId() {
      if (typeof this.completeAddTagId === "function") {
        this.completeAddTagId();
      }
    },

    afterClickOkLoadData() {
      if (typeof this.clickOkLoadData === "function") {
        this.clickOkLoadData();
      }
    },

    callConfirmPackaging() {
      this.confirmPackPopup = true;
      // if (typeof this.confirmPackaging === "function") {
      //   this.confirmPackaging();
      // }
    },

    ConfirmedPackaging(){
      if (typeof this.confirmPackaging === "function") {
        this.confirmPackaging();
      }
    },

    callSubmitSuggestedPickupDate() {
      if (typeof this.submitSuggestedPickupDate === "function") {
        this.submitSuggestedPickupDate();
      }
    },

    callSubmitAssignLogisticsPartner() {
      if (typeof this.submitAssignLogisticsPartner === "function") {
        this.submitAssignLogisticsPartner();
      }
    },

    callSubmitPickUpDetails() {
      if (typeof this.submitPickUpDetails === "function") {
        this.submitPickUpDetails();
      }
    },

    callApplyFilterFunc() {
      if (typeof this.applyFilterFunc === "function") {
        this.applyFilterFunc();
      }
    },

    closePopup(){
        this.dialogDetails.popup=false;
        this.modelData.add_tagId_btn.sku_code="";
        this.modelData.add_tagId_btn.serial_number="";
        this.modelData.add_tagId_btn.tag_number=[];
        this.modelData.boxNumber="";
        this.modelData.tagNumbers=[];
        this.modelData.pickup_date="";
        this.modelData.assign_logistics_partner="";
        this.modelData.actual_pickup_date="";
        this.modelData.dispatch_document_number="";
        this.modelData.boxes_pickedup="";
        this.modelData.actual_boxes_pickedup="";
        this.tagAndBoxId.boxIds=[];
        this.tagAndBoxId.tagIds=[];
    },

  },
};
</script>

<style scoped>
.v-dialog__content:has(.filter-repair) {
  justify-content: right;
  align-items: baseline;
  top: 15rem;
}

.link-color {
  color: #0357d0;
  font-size: 14px;
  font-weight: 600;
}

.bg-color {
  background: #0357d0;
  color: #ffffff;
}
</style>