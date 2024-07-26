<template>
    <v-card class="overflow-hidden v-card v-sheet theme--light">
        <!-- Alert message -->
    <div>
      <v-alert :type="alert_type" :value="alert" transition="scale-transition">{{alert_message}}</v-alert>
    </div>
    <!-- Header component -->
    <div> <HeaderComponent :headerTitle="headerText" /></div>

        <!-- Update  popup  -->
    <v-row justify="center">
      <v-dialog v-model="UpdatePopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Update</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="UpdatePopup = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-form>
            <v-card-text>
             <v-container>
              <v-row v-for="(row, index) in rows" :key="index">
                    <v-col cols="12" sm="5" md="6">
                      <v-autocomplete 
                        v-model="row.field" 
                        outlined 
                        :items="getFilteredDocuments(row)" 
                        item-text="label"
                        item-value="field" 
                        label="Select data field"
                        style="max-width: 300px;"
                      >
                      <template v-slot:item="{ item }">
                        <div>
                          {{ item.label }} {{item.is_mandatory ? ' *' : ''}}
                        </div>
                      </template>
                    </v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="5" md="6">
                    <!-- Use a conditional rendering to show a file input or a text field -->
                    <template>
                      <v-text-field 
                      v-model="row.value" 
                      v-if="row.field[index] && rows[index].data_type === 'info'"
                      hide-details 
                      label="Enter Info" 
                      @keypress="onKeyPress"
                      :error="hasError"
                      outlined                      
                      type="text" required
                      >
                    </v-text-field>
                    <v-text-field 
                      v-if="isShow"
                      hide-details 
                      label="Update" 
                      outlined
                      v-model="update" 
                      type="text" required
                      disabled
                      >
                    </v-text-field>
                      
                    </template>
                    <template>
                      <v-file-input
                          v-model="row.file"
                          v-if="row.field[index] && rows[index].data_type !== 'info'"
                          :accept= "getAcceptType(row.field, index)" 
                          label="Update"
                          @change="handleFileChangeUpdate(row.file, index)"
                       >
                </v-file-input>
                    </template>
                  </v-col>

                    <!-- <v-col cols="12" sm="4" md="2">
                      <v-btn color="red" @click="deleteRow(index)">Delete</v-btn>
                    </v-col> -->
                  </v-row>
            </v-container>
              <v-btn
              color="blue"
              dark
              class="ma-2"
              @click="addNewRow(row, index)"
            >
              <v-icon>mdi-plus-circle</v-icon>ADD DATA FIELD
            </v-btn>
            </v-card-text>
            
          </v-form>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined class="cancel-color mb-3" @click="UpdatePopup = false">Cancel</v-btn>
            <!-- <v-btn outlined class="submit-color mb-3" @click="writeOffItemSubmit" :disabled=" number >0 || !raise_note_against || !debit_amount">submit</v-btn> -->
            <v-btn color="primary" class="mb-3" :disabled=" number >0" @click="bulkUpdateDocSubmit">Submit</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Update popup for pending claim ticket  -->
    <v-row justify="center">
      <v-dialog v-model="updatePopupPendingClaimTicket" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Update</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="updatePopupPendingClaimTicket = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-form>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="6" sm="6" md="6" >
                      <v-menu ref="menu_14" v-model="menu_14" :close-on-content-click="false" :return-value.sync="claim_ticket_date" transition="scale-transition" offset-y min-width="290px">
                          <template v-slot:activator="{ on, attrs }">
                                <v-text-field outlined hide-details
                                v-model="claim_ticket_date"
                                label="Insurance claim ticket Date"
                                prepend-inner-icon="event"
                                readonly
                                v-bind="attrs"
                                v-on="on" 
                                ></v-text-field>
                          </template>
                        <v-date-picker :max="new Date().toISOString().substr(0, 10)"  v-model="claim_ticket_date" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu_14= false">Cancel</v-btn>
                          <v-btn text color="primary" @click="$refs.menu_14.save(claim_ticket_date)">OK</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                  <v-col cols="12" sm="4" md="6">
                    <v-text-field label="Incurance claim ticket number" outlined @keypress="onKeyPress" v-model="claim_ticket_number" required></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-form>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined class="cancel-color mb-3" @click="updatePopupPendingClaimTicket = false">Cancel</v-btn>
            <!-- <v-btn outlined class="submit-color mb-3" @click="writeOffItemSubmit" :disabled=" number >0 || !raise_note_against || !debit_amount">submit</v-btn> -->
            <v-btn color="primary" class="mb-3" @click="updatePendingClaimSubmit" :disabled="number>0 || !claim_ticket_number || !claim_ticket_date">Submit</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
     <!-- Update popup for pending Inspection  -->
     <v-row justify="center">
      <v-dialog v-model="updatePopupPendingInspection" persistent max-width="700px">
        <v-form>
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Update</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="updatePopupPendingInspection = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="6" sm="6" md="6" >
                      <v-menu ref="menu_141" v-model="menu_141" :close-on-content-click="false" :return-value.sync="inspection_date" transition="scale-transition" offset-y min-width="290px">
                          <template v-slot:activator="{ on, attrs }">
                                <v-text-field outlined hide-details
                                v-model="inspection_date"
                                label="Insurance Inspection date"
                                prepend-inner-icon="event"
                                readonly
                                v-bind="attrs"
                                v-on="on" 
                                ></v-text-field>
                          </template>
                        <v-date-picker :max="new Date().toISOString().substr(0, 10)"  v-model="inspection_date" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu_141= false">Cancel</v-btn>
                          <v-btn text color="primary" @click="$refs.menu_141.save(inspection_date)">OK</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                  <v-col cols="12" sm="4" md="6">
                    <template>
                  <v-file-input
                    v-model="file"
                    accept=".pdf, .png"
                    :rules="[fileTypeRule]"
                    label="Inspection Report"
                    @change="handleFileChange"
                  ></v-file-input>
                </template>


                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>          
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined class="cancel-color mb-3" @click="updatePopupPendingInspection = false">Cancel</v-btn>
            <!-- <v-btn outlined class="submit-color mb-3" @click="writeOffItemSubmit" :disabled=" number >0 || !raise_note_against || !debit_amount">submit</v-btn> -->
            <v-btn color="primary" class="mb-3" @click="updatePendingInspectionSubmit" :disabled="number>0 || !file || !inspection_date ">Submit</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-form>
      </v-dialog>
    </v-row>
    <!-- Update popup for pending decision   -->
    <v-row justify="center">
      <v-dialog v-model="updatePopupPendingDecision" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Update</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closePopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="6" sm="6" md="6" style="height: 96px;">
                    <v-autocomplete v-model="insu_claim_decision" outlined :items="insu_claim_item" item-text="name" item-value="id"
                         label="Insurance claim Decision" style="max-width: 300px;" @change="changeDisposition(insu_claim_item)"></v-autocomplete> <br>
                    </v-col>
                  <v-col cols="12" sm="4" md="6" style="height: 96px;">
                    <v-text-field  hide-details label="Approval reference number" outlined
                      v-model="approval_ref_number" type="text" required oninput="this.value = this.value.replace(/[^0-9a-zA-Z]/g, '');"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" sm="6" md="6" style="height: 96px;">
                    <v-text-field :rules="mrp_rule" label="Approved Amount" outlined v-model="approved_amount" :min="0"
                      type="number" required></v-text-field>
                    </v-col>
                  <v-col cols="12" sm="4" md="6" style="height: 96px;">
                    <v-autocomplete v-model="salvage_action" outlined :items="salvage_item" item-text="name" item-value="id"
                         label="Salvage Action" style="max-width: 300px;"></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined class="cancel-color mb-3" @click="closePopup">Cancel</v-btn>
            <!-- <v-btn outlined class="submit-color mb-3" @click="writeOffItemSubmit" :disabled=" number >0 || !raise_note_against || !debit_amount">submit</v-btn> -->
            <v-btn color="primary" class="mb-3" @click="updatePendingDecisionSubmit" :disabled="number>0 || !salvage_action || !approved_amount || !approval_ref_number || !insu_claim_decision">Submit</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- data detail popup -->
    <v-row justify="center">
      <v-dialog v-model="datadetailpopup" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Tag ID: {{ tag_number }}</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="datadetailpopup = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
            <v-card-text>
              <v-container>
                <div>
                    <v-row>
                      <v-col cols="6" sm="6" md="6" >
                        <span style="font-weight: 500;">Article id</span>
                      </v-col>
                      <v-col cols="12" sm="4" md="6">
                        {{ item_details.sku_code ? item_details.sku_code : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                        <span style="font-weight: 500;">Article Description</span>
                      </v-col>
                      <v-col cols="12" sm="4" md="6">
                        {{ item_details.item_description ? item_details.item_description : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                        <span style="font-weight: 500;">Incident Location</span>
                      </v-col>
                      <v-col cols="12" sm="4" md="6">
                        {{ item_details.incident_location ? item_details.incident_location : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                        <span style="font-weight: 500;">Incident Date</span>
                      </v-col>
                      <v-col cols="12" sm="4" md="6">
                        {{ item_details.incident_date ? item_details.incident_date : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                        <span style="font-weight: 500;">Vendor Responsible For Damage</span>
                      </v-col>
                      <v-col cols="12" sm="4" md="6">
                        {{ item_details.responsible_vendor ? item_details.responsible_vendor : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row v-if="active_tab == 'Pending Information'">
                      <v-col cols="1" sm="4" md="3">
                          <span style="font-weight: 500;">Information / Documents</span>
                        </v-col>
                        <v-col>
                          <span style="font-weight: 500;"><hr></span>
                        </v-col>
                    </v-row>
                    <v-row v-for="doc in require_doc" :key="doc.field">
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 600; font-size: 14px; color: ##646464;">
                      {{ doc.label }} 
                      <template v-if="doc.is_mandatory">*</template>
                    </span>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    <template>
                      <span v-if="Array.isArray(doc.value) && doc.value.length > 0">
                        <ol class="alignitems">
                      <li v-for="(item, itemIndex) in doc.value" :key="itemIndex">
                        <a :href="item.url" 
                              target="_blank" 
                              style="color: #0357D0;
                              font-size: 14px;
                              font-weight: 600;">{{ item.name }}</a>
                      </li>
                    </ol>
                      </span>
                      <span v-else-if="doc.value && !Array.isArray(doc.value)" >
                        <a :href="doc.value.url" 
                          target="_blank"
                          style="color: #0357D0;
                              font-size: 14px;
                              font-weight: 600;"
                          >{{ doc.value.name }}</a>
                          <span v-if="doc.data_type == 'info'">{{ doc.value }}</span>
                      </span>
                      <span v-else>
                        <a style="color: #0357D0;
                            font-size: 14px;
                            font-weight: 600;"
                            @click="updateItemPopup(doc)"
                            >update</a>                                  
                      </span>
                    </template>
                  </v-col>
                </v-row>
                  <v-row v-if="active_tab == 'Pending Inspection' || active_tab == 'Pending Decision'">
                      <v-col cols="6" sm="6" md="6">
                        <span style="font-weight: 500;">Inurance Claim Ticket Number</span>
                      </v-col>
                      <v-col cols="12" sm="4" md="6">
                        {{ item_details.claim_ticket_number ? item_details.claim_ticket_number: 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row v-if="active_tab == 'Pending Inspection' || active_tab == 'Pending Decision'">
                      <v-col cols="6" sm="6" md="6">
                        <span style="font-weight: 500;">Inurance Claim Ticket Date</span>
                      </v-col>
                      <v-col cols="12" sm="4" md="6">
                        {{ item_details.claim_ticket_date ? item_details.claim_ticket_date: 'N/A'}}
                      </v-col>
                    </v-row>
                  </div>
              </v-container>
            
            </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- item detail popup in pending claim ticket -->
    <v-row justify="center">
      <v-dialog v-model="dataDetailPopupInClaimTicket" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Tag ID: {{ tag_number }}</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="dataDetailPopupInClaimTicket = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
            <v-card-text>
              <v-container>
                <div>
                    <v-row>
                      <v-col cols="6" sm="6" md="6" >
                        <span style="font-weight: 500;">Article id</span>
                      </v-col>
                      <v-col cols="12" sm="4" md="6">
                        {{ item_details.sku_code ? item_details.sku_code : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                        <span style="font-weight: 500;">Article Description</span>
                      </v-col>
                      <v-col cols="12" sm="4" md="6">
                        {{ item_details.item_description ? item_details.item_description : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                        <span style="font-weight: 500;">Incident Location</span>
                      </v-col>
                      <v-col cols="12" sm="4" md="6">
                        {{ item_details.incident_location ? item_details.incident_location : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                        <span style="font-weight: 500;">Incident Date</span>
                      </v-col>
                      <v-col cols="12" sm="4" md="6">
                        {{ item_details.incident_date ? item_details.incident_date : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                        <span style="font-weight: 500;">Vendor Responsible For Damage</span>
                      </v-col>
                      <v-col cols="12" sm="4" md="6">
                        {{ item_details.responsible_vendor ? item_details.responsible_vendor : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row v-for="doc in require_doc" :key="doc.field">
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 600; font-size: 14px; color: ##646464;">
                      {{ doc.label }} 
                      <template v-if="doc.is_mandatory">*</template>
                    </span>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    <template>
                      <span v-if="Array.isArray(doc.value) && doc.value.length > 0">
                        <ol class="alignitems">
                      <li v-for="(item, itemIndex) in doc.value" :key="itemIndex">
                        <a :href="item.url" 
                              target="_blank" 
                              style="color: #0357D0;
                              font-size: 14px;
                              font-weight: 600;">{{ item.name }}</a>
                      </li>
                    </ol>
                      </span>
                      <span v-else-if="doc.value && !Array.isArray(doc.value)" class="alignitems">
                        <a :href="doc.value.url" 
                          target="_blank"
                          style="color: #0357D0;
                              font-size: 14px;
                              font-weight: 600;"
                          >{{ doc.value.name }}</a>
                          <span v-if="doc.data_type == 'info'">{{ doc.value }}</span>
                      </span>
                      <span v-else>
                        <!-- <a style="color: #0357D0;
                            font-size: 14px;
                            font-weight: 600;"
                            @click="updateItemPopup(doc)"
                            >update</a>                                   -->
                            N/A
                      </span>
                    </template>
                  </v-col>
                </v-row>
                <v-row v-if="active_tab == 'Pending Inspection'">
                      <v-col cols="6" sm="6" md="6">
                        <span style="font-weight: 500;">Insurance Claim Ticket Number</span>
                      </v-col>
                      <v-col cols="12" sm="4" md="6">
                        {{ item_details.claim_ticket_number ? item_details.claim_ticket_number: 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row v-if="active_tab == 'Pending Inspection'">
                      <v-col cols="6" sm="6" md="6">
                        <span style="font-weight: 500;">Insurance Claim Ticket Date</span>
                      </v-col>
                      <v-col cols="12" sm="4" md="6">
                        {{ item_details.claim_ticket_date ? item_details.claim_ticket_date: 'N/A'}}
                      </v-col>
                    </v-row>
                  </div>
              </v-container>
            
            </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Item detail popup in pending decision -->
    <v-row justify="center">
      <v-dialog v-model="dataDetailPopupPendingDecision" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Tag ID: {{ tag_number }}</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="dataDetailPopupPendingDecision = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
            <v-card-text>
              <v-container>
                <div>
                    <v-row>
                      <v-col cols="6" sm="6" md="6" >
                        <span style="font-weight: 500;">Article id</span>
                      </v-col>
                      <v-col cols="12" sm="4" md="6">
                        {{ item_details.sku_code ? item_details.sku_code : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                        <span style="font-weight: 500;">Article Description</span>
                      </v-col>
                      <v-col cols="12" sm="4" md="6">
                        {{ item_details.item_description ? item_details.item_description : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                        <span style="font-weight: 500;">Incident Location</span>
                      </v-col>
                      <v-col cols="12" sm="4" md="6">
                        {{ item_details.incident_location ? item_details.incident_location : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                        <span style="font-weight: 500;">Incident Date</span>
                      </v-col>
                      <v-col cols="12" sm="4" md="6">
                        {{ item_details.incident_date ? item_details.incident_date : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                        <span style="font-weight: 500;">Vendor Responsible For Damage</span>
                      </v-col>
                      <v-col cols="12" sm="4" md="6">
                        {{ item_details.responsible_vendor ? item_details.responsible_vendor : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                        <span style="font-weight: 500;">Inspection Report</span>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <a :href="inspection_report_data.url"  
                                 target="_blank"
                                  style="color: #0357D0;
                                  font-size: 14px;
                                  font-weight: 600;"
                                  >{{ inspection_report_data.name }}</a>
                      </v-col>
                    </v-row>
                    <v-row v-for="doc in require_doc" :key="doc.field">
                  <v-col cols="6" sm="6" md="6">
                    <span style="font-weight: 600; font-size: 14px; color: ##646464;">
                      {{ doc.label }} 
                      <template v-if="doc.is_mandatory">*</template>
                    </span>
                  </v-col>
                  <v-col cols="12" sm="4" md="6">
                    <template>
                      <span v-if="Array.isArray(doc.value) && doc.value.length > 0">
                        <ol class="alignitems">
                      <li v-for="(item, itemIndex) in doc.value" :key="itemIndex">
                        <a :href="item.url" 
                              target="_blank" 
                              style="color: #0357D0;
                              font-size: 14px;
                              font-weight: 600;">{{ item.name }}</a>
                      </li>
                    </ol>
                      </span>
                      <span v-else-if="doc.value && !Array.isArray(doc.value)" class="alignitems">
                        <a :href="doc.value.url" 
                          target="_blank"
                          style="color: #0357D0;
                              font-size: 14px;
                              font-weight: 600;"
                          >{{ doc.value.name }}</a>
                          <span v-if="doc.data_type == 'info'" class="alignitems">{{ doc.value }}</span>
                      </span>
                      <span v-else>
                        <!-- <a style="color: #0357D0;
                            font-size: 14px;
                            font-weight: 600;"
                            @click="updateItemPopup(doc)"
                            >update</a>                                   -->
                            N/A
                      </span>
                    </template>
                  </v-col>
                </v-row>
                  <v-row>
                      <v-col cols="6" sm="6" md="6">
                        <span style="font-weight: 500;">Inurance Claim Ticket Number</span>
                      </v-col>
                      <v-col cols="12" sm="4" md="6">
                        {{ item_details.claim_ticket_number ? item_details.claim_ticket_number: 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="6" md="6">
                        <span style="font-weight: 500;">Inurance Claim Ticket Date</span>
                      </v-col>
                      <v-col cols="12" sm="4" md="6">
                        {{ item_details.claim_ticket_date ? item_details.claim_ticket_date: 'N/A'}}
                      </v-col>
                    </v-row>
                  </div>
              </v-container>
            
            </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
      <!-- item detail popup in pending disposition -->
      <v-row justify="center">
      <v-dialog v-model="datadetailpopupdisposition" persistent max-width="700px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Tag ID: {{ tag_number }}</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="datadetailpopupdisposition = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
            <v-card-text>
              <v-container>
                <div>
                    <v-row>
                      <v-col cols="6" sm="3" md="3" >
                        <span style="font-weight: 500;">Article id</span>
                      </v-col>
                      <v-col cols="12" sm="3" md="3">
                        {{ item_details.sku_code ? item_details.sku_code : 'N/A'}}
                      </v-col>
                      <v-col cols="6" sm="3" md="3" >
                        <span style="font-weight: 500;">Inspection date</span>
                      </v-col>
                      <v-col cols="12" sm="3" md="3">
                        {{ item_details.inspection_date ? item_details.inspection_date : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="3" md="3">
                        <span style="font-weight: 500;">Article Description</span>
                      </v-col>
                      <v-col cols="12" sm="3" md="3">
                        {{ item_details.item_description ? item_details.item_description : 'N/A'}}
                      </v-col>
                      <v-col cols="6" sm="3" md="3">
                        <span style="font-weight: 500;">Inspection Report</span>
                      </v-col>
                      <v-col cols="12" sm="3" md="3">
                        <a :href="inspection_report_data.url"  
                                 target="_blank"
                                  style="color: #0357D0;
                                  font-size: 14px;
                                  font-weight: 600;"
                                  >{{ inspection_report_data.name }}</a>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="3" md="3">
                        <span style="font-weight: 500;">Incident Location</span>
                      </v-col>
                      <v-col cols="12" sm="3" md="3">
                        {{ item_details.incident_location ? item_details.incident_location : 'N/A'}}
                      </v-col>
                      <v-col cols="6" sm="3" md="3">
                        <span style="font-weight: 500;">Insurance claim Decision</span>
                      </v-col>
                      <v-col cols="12" sm="3" md="3">
                        {{ item_details.claim_decision ? item_details.claim_decision : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="3" md="3">
                        <span style="font-weight: 500;">Incident Date</span>
                      </v-col>
                      <v-col cols="12" sm="3" md="3">
                        {{ item_details.incident_date ? item_details.incident_date : 'N/A'}}
                      </v-col>
                      <v-col cols="6" sm="3" md="3">
                        <span style="font-weight: 500;">Approval Ref No.</span>
                      </v-col>
                      <v-col cols="12" sm="3" md="3">
                        {{ item_details.approval_ref_number ? item_details.approval_ref_number : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="3" md="3">
                        <span style="font-weight: 500;">Type Of Claimable Damage</span>
                      </v-col>
                      <v-col cols="12" sm="3" md="3">
                        {{ item_details.claimable_danage ? item_details.claimable_danage : 'N/A'}}
                      </v-col>
                      <v-col cols="6" sm="3" md="3">
                        <span style="font-weight: 500;">Approval Date</span>
                      </v-col>
                      <v-col cols="12" sm="3" md="3">
                        {{ item_details.approval_date ? item_details.approval_date : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="3" md="3">
                        <span style="font-weight: 500;">Vendor Responsible For Damage</span>
                      </v-col>
                      <v-col cols="12" sm="3" md="3">
                        {{ item_details.responsible_vendor ? item_details.responsible_vendor : 'N/A'}}
                      </v-col>
                      <v-col cols="6" sm="3" md="3">
                        <span style="font-weight: 500;">Incident Date</span>
                      </v-col>
                      <v-col cols="12" sm="3" md="3">
                        {{ item_details.incident_date ? item_details.incident_date : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="3" md="3">
                        <span style="font-weight: 500;">Insurance Claim Ticket Number</span>
                      </v-col>
                      <v-col cols="12" sm="3" md="3">
                        {{ item_details.claim_ticket_number ? item_details.claim_ticket_number : 'N/A'}}
                      </v-col>
                      <v-col cols="6" sm="3" md="3">
                        <span style="font-weight: 500;">Inurance Claim Ticket date</span>
                      </v-col>
                      <v-col cols="12" sm="3" md="3">
                        {{ item_details.claim_ticket_date ? item_details.claim_ticket_date : 'N/A'}}
                      </v-col>
                    </v-row>
                    <v-row v-for="doc in require_doc" :key="doc.field">
                  <v-col cols="3" sm="3" md="3">
                    <span style="font-weight: 600; font-size: 14px; color: ##646464;">
                      {{ doc.label }} 
                      <template v-if="doc.is_mandatory">*</template>
                    </span>
                  </v-col>
                  <v-col cols="3" sm="3" md="3">
                    <template>
                      <span v-if="Array.isArray(doc.value) && doc.value.length > 0">
                        <ol class="alignitems">
                      <li v-for="(item, itemIndex) in doc.value" :key="itemIndex">
                        <a :href="item.url" 
                              target="_blank" 
                              style="color: #0357D0;
                              font-size: 14px;
                              font-weight: 600;">{{ item.name }}</a>
                      </li>
                    </ol>
                      </span>
                      <span v-else-if="doc.value && !Array.isArray(doc.value)">
                        <a :href="doc.value.url" 
                          target="_blank"
                          class="alignitems"
                          style="color: #0357D0;
                              font-size: 14px;
                              font-weight: 600;"
                          >{{ doc.value.name }}</a>
                          <span v-if="doc.data_type == 'info'">{{ doc.value }}</span>
                      </span>
                      <span v-else>
                        <!-- <a style="color: #0357D0;
                            font-size: 14px;
                            font-weight: 600;"
                            @click="updateItemPopup(doc)"
                            >update</a>                                   -->
                            N/A
                      </span>
                    </template>
                  </v-col>
                </v-row>
                  </div>
              </v-container>
            
            </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  <!-- update popup in detail item -->
    <v-row justify="center">
      <v-dialog v-model="updatepopinitem" persistent max-width="700px">
        <v-form>
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Update</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closeItempopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="6" sm="6" md="6" >
                    <v-text-field 
                      hide-details 
                      label="Label Name" 
                      outlined
                      v-model="item_label_name" 
                      type="text" required
                      ></v-text-field>
                    </v-col>
                  <v-col cols="12" sm="4" md="6">
                    <template>
                  <v-file-input
                    v-model="file"
                    v-if="this.data_type_upload != 'info'"
                    :accept= "acceptedFileType" 
                    label="Update"
                    @change="handleFileChange"
                  ></v-file-input>
                </template>
                <v-text-field 
                      v-if="this.data_type_upload == 'info'" 
                      hide-details 
                      label="Enter Info" 
                      outlined
                      v-model="data_type_info" 
                      type="text" required>
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>          
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn outlined class="cancel-color mb-3" @click="closeItempopup">Cancel</v-btn>
            <!-- <v-btn outlined class="submit-color mb-3" @click="writeOffItemSubmit" :disabled=" number >0 || !raise_note_against || !debit_amount">submit</v-btn> -->
            <v-btn color="primary" class="mb-3" @click="updateInfoDocItemSubmit()" :disabled="number >0">Submit</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-form>
      </v-dialog>
    </v-row>

    <!-- Reject popup -->
    <v-row justify="center">
      <v-dialog v-model="rejectpopup" persistent max-width="366px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Reject</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="rejectColsePopup()">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
            <v-card-text>
              <v-container>
                  <v-col cols="6" sm="12" md="12" style="height: 96px;">
                    <v-autocomplete 
                    v-model="rejectdisposition" 
                    outlined 
                    :items="reject_disposition_lit" 
                    item-text="id" 
                    item-value="code"
                    label="Disposition" 
                    style="max-width: 300px;"
                    ></v-autocomplete> <br>
                    </v-col>               
              </v-container>
            </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mb-3" @click="adminRejectItem" :disabled="!rejectdisposition">Submit</v-btn>
            <v-btn outlined class="cancel-color mb-3" @click="rejectColsePopup">Cancel</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Update Amount -->
    <v-row justify="center">
      <v-dialog v-model="updateAmountPopup" persistent max-width="366px">
        <v-card class="v-card-100">
          <v-card class="v-card-100">
            <v-card-title>
              <span>Update Claim Amount (₹)</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closePopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
            <v-card-text>
              <v-container>
                  <v-col cols="6" sm="12" md="12" style="height: 96px;">
                    <v-text-field label="Update Amount (₹)" outlined v-model="update_amount" @keypress="onKeyPressUpdate" :min="0"
                      type="number" :rules="[positiveNumberRule]" required></v-text-field>
                    </v-col>               
              </v-container>
            </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mb-3" @click="updateAmountSubmit" :disabled="!update_amount">Submit</v-btn>
            <v-btn outlined class="cancel-color mb-3" @click="closePopup">Cancel</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!--  Success messeage popup -->
    <v-row justify="center">
      <v-dialog v-model="rejectsussesspopup" persistent max-width="424px">
        <v-card class="v-card-100">
            <v-card-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="rejectsussesspopup = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text class="text-center" v-if="(active_tab == 'Pending Disposition') && currentUser.roles.includes('central_admin')">
              <span> {{ successmessage }}</span>
            </v-card-text>
            <v-card-text class="text-center" v-if="(active_tab == 'Pending Disposition') && currentUser.roles.includes('default_user')">
              <span>{{ successmessage }}</span>
            </v-card-text>
            <v-card-text class="text-center" v-if="this.active_tab != 'Pending Disposition'">
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
    <!-- Approve confirm popup -->
    <v-row justify="center">
      <v-dialog v-model="approveconfirmpopup" persistent max-width="424px">
        <v-card class="v-card-100">
            <v-card-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="approveconfirmpopup = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text class="text-center" v-if="(active_tab == 'Pending Disposition') && currentUser.roles.includes('central_admin')">
              <span> Are you sure you want to Approve?</span>
            </v-card-text>
          <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mb-3" @click="adminApproveItem">Yes</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- filter data popup -->
    <v-row justify="center">
      <v-dialog content-class="filter-insurance" v-model="filteWithSubPopup" persistent max-width="1224px">
        <v-card>
          <v-card-actions>
            <v-text-field prepend-inner-icon="mdi-magnify"  v-model="aricle_id_search" label="Article Id" style="max-width: 300px;" class="ma-2" outlined v-on:keyup.enter="loadData(active_tab)"></v-text-field>
            <v-text-field prepend-inner-icon="mdi-magnify"  v-model="incident_info_search" label="Incident Location" style="max-width: 300px;" class="ma-2" outlined v-on:keyup.enter="loadData(active_tab)"></v-text-field>
            <template>
              <div>
                <v-menu ref="menu_171" v-model="menu_171" :close-on-content-click="false" :return-value.sync="incdent_date_search"
                    transition="scale-transition" offset-y min-width="290px">

                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field outlined
                          v-model="incdent_date_search"
                          label="Incident date"
                          prepend-inner-icon="event"
                          readonly
                          v-bind="attrs"
                          v-on="on" 
                          :rules="inputRules"
                        ></v-text-field>
                      </template>
                      <v-date-picker :max="new Date().toISOString().substr(0, 10)"  v-model="incdent_date_search" no-title scrollable >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu_171 = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.menu_171.save(incdent_date_search)">OK</v-btn>
                      </v-date-picker>
                  </v-menu>
              </div>
            </template>

            <v-text-field prepend-inner-icon="mdi-magnify"  v-model="claimabe_damage_search" label="Claimable Damage Type" style="max-width: 300px;" class="ma-2" outlined v-on:keyup.enter="loadData(active_tab)"></v-text-field>
          </v-card-actions>
          <v-card-actions class="margin-10">
            <v-spacer></v-spacer>
            <v-btn small text color="normal" @click="closeFilterpopup">CANCEL</v-btn>
            <v-btn small color="primary" @click="applyFilterFunc" :disabled="number > 0">APPLY FILTER(S)</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Tabs -->
    <v-card class="v-card-100">
      <v-tabs>
        <v-tab ripple :href="'#'" style="text-transform:none!important;" @click="loadData(tab, 'tab_clicked')"
          v-for="(tab, index) in tabs" :key="index">{{tab}}</v-tab>
      </v-tabs>
    </v-card>
    
    <v-card-title style="padding:12px 20px 0px 20px;">
        <!-- Search fields -->
        <v-row>
        <v-col cols="8" sm="8">
          <v-text-field prepend-inner-icon="mdi-magnify"  v-model="pending_info_search" label="Search" style="max-width: 300px;" outlined v-on:keyup.enter="loadData(active_tab)"></v-text-field>
        </v-col>
      </v-row>
      <!-- Actions buttons -->
      <v-actions style="margin-bottom: 28px;">
        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)"  v-if="active_tab == 'Pending Information'" @click="updatedialog">UPDATE</v-btn>
        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)"  v-if="active_tab == 'Pending Claim Ticket'" @click="updatedialogPCT">UPDATE</v-btn>
        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)"  v-if="active_tab == 'Pending Inspection'" @click="updatedialogPCT">UPDATE</v-btn>
        <v-btn class="ma-2" color="primary" :disabled="(this.selected.length == 0)"  v-if="active_tab == 'Pending Decision'" @click="updatedialogPCT">UPDATE</v-btn>
        <v-btn class="ma-2" color="#19B100" style="color: #FFFFFF;" :disabled="(this.selected.length == 0)"  v-if="(active_tab == 'Pending Disposition') && currentUser.roles.includes('central_admin')" @click="approveConfirmPopup">APPROVE</v-btn>
        <v-btn class="ma-2" color="primary" style="color: #FFFFFF;" :disabled="(this.selected.length == 0)"  v-if="(active_tab == 'Pending Disposition') && currentUser.roles.includes('central_admin')" @click="rejectDialog">REJECT</v-btn>
          <v-flex style="position: relative; top: 17px;">
          <v-autocomplete 
            v-if="(active_tab == 'Pending Disposition') && currentUser.roles.includes('default_user')"
            v-model="selectedDisposition"
            :items="disposition_item"
            item-text="code"
            item-value="id"
            label="ASSIGN DISPOSITION"
            solo
            class="ma-2 field"
            @change="assignDisposition"   
            color="primary" 
          style="position: relative;bottom: 0px;width: 200px;"    
          ></v-autocomplete>
        </v-flex>
    </v-actions>
    <!-- Filter -->
    <v-expansion-panels class="custom-control_outlined" ref = "filterPopupRef" readonly style="max-width: 300px; margin-bottom: 28px; min-height: 56px;">
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
          fixed-header
          height="100%"
          loading-text="Loading Data... Please wait"
          class="elevation-1">
          <template #[`item.tag_number`]="{ item }">
              <a @click="itemDetailpopup(item)" style="color: #1976d2;">
                <u> {{ item.tag_number }}</u>
              </a>
            
            </template>
            <template #[`item.action`]="{ item }">
              <span v-if="active_tab == 'Pending Claim Ticket'">
                <img src="@/assets/images/job_sheet.png" @click="updateAmount(item)">
              </span>
            </template>
        </v-data-table>
      </v-flex>
    </v-layout>

    <div>
      <v-row class="ml-2">
        <v-col cols="4" sm="1" class="PaddingItemPerPage">
          <v-select v-model="pageSize" :items="pageSizes" label="Items per page" @change="handlePageSizeChange"></v-select>
        </v-col>
        <span class="item-selected"> 
          <span v-if="selected.length == 1">{{selected.length}} Item Selected</span>
          <span v-if="selected.length > 1">{{selected.length}} Items Selected</span>
        </span>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="4" class="PaddingItemPerPage">
          <v-pagination v-model="page" :length="totalPages" total-visible="7" next-icon="mdi-menu-right" prev-icon="mdi-menu-left" @input="handlePageChange"></v-pagination>
        </v-col>
      </v-row>
    </div>
    </v-card>
  </template>

  <script>
    import $ from 'jquery'
    import Editor from "@tinymce/tinymce-vue";
    import HeaderComponent from '../../../../commoncomponents/HeaderComponent.vue';
    import { securedAxiosInstance, plainAxiosInstance } from '@/backend/axios'
    import { strict } from 'assert';
    import { required, minLength, helpers } from 'vuelidate/lib/validators';

    export default {
      props: {
      fileTypeMapping: {
        type: Object,
        default: () => ({
          image: 'image/png',
          video: 'video/mp4',
          doc: 'application/pdf'
        })
      },
      itemData: {
        type: Object,
        required: true
      }
    },
      computed: {
      acceptedFileType() {
        const fileType = this.fileTypeMapping[this.data_type_upload];
        return fileType ? fileType : '';
      },

      fileTypeRule() {
        return (value) => {
          if (!value) {
          this.invalidFileType = false;
          return true;
        }
          const allowedTypes = ['.png', '.pdf'];
          const fileType = value ? value.name.slice(value.name.lastIndexOf('.')) : '';
          this.invalidFileType = !allowedTypes.includes(fileType);
          return !this.invalidFileType || 'Invalid file type';
        };
      },
      
    },

      data() {
        return {
          headerText: "Insurance", 
          number:0,
          infoDataType:[], 
          isShow:true,    
          file: '',
          binaryData:'',
          alert_type:'',
          alert_message:'',
          menu: false,
          claimSubmissionDate: "",
          insuranceSubmissionDialog: false,
          loading: false,
          attachment: "",
          alert: false,
          active_tab: "Pending Information",
          files: [],
          selected_item: {},
          selected: [],
          filteWithSubPopup: false,
          tabs: [
            "Pending Information",
            "Pending Claim Ticket",
            "Pending Inspection",
            "Pending Decision",
            "Pending Disposition"
          ],
          headers: [
          { text: "Tag ID", value: "tag_number", width: '12%', align: "start", sortable: false },
          {text: "Incident Location", value: "aisle_location"},
          { text: "Article Id", value: "sku_code" },
          { text: "Article Description", value: "item_description" },
          { text: "Incident date", value: "grade" },
          { text: "Damage Type", value: "sub_location" },
          { text: "Responsible Vendor", value: "distribution_center" }
        ],
        table_data: [],
        page : 1 ,
        totalPages : 1,
        pageSize :  100,
        pageSizes : [100 , 200, 300],
        pending_info_search:'',
        UpdatePopup: false,
        pending_documents:[],
        pending_doc:'',
        update:'',
        rows: [
                {
                  field: '',
                  file: '',
                  value:'',
                  data_type:'',
                  label:''
                }
          ],
      
      updatePopupPendingClaimTicket: false,
      claim_ticket_date:'',
      claim_ticket_number:'',
      updatePopupPendingInspection:false,
      updatePopupPendingDecision:false,
      inspection_date: '',
      menu_141: false,
      menu_14:false,
      insu_claim_decision:'',
      approval_ref_number:'',
      approved_amount:'',
      salvage_action:'',
      datadetailpopup:false,
      tag_number:'',
      menu_171: false,
      incdent_date_search:'',
      aricle_id_search:'',
      incident_info_search:'',
      claimabe_damage_search:'',
      ins_id:[],
      item_details:[],
      require_doc:'',
      inspection_report_data:'',
      file_required:false,
      insu_claim_item:'',
      insu_claim_decision:'',
      salvage_item:'',
      salvage_action:'',
      updatepopinitem:false,
      item_label_name:'',
      data_type_upload:'',
      data_type_info:'',
      item_id:'',
      item_field_name:'',
      search:'',
      datadetailpopupdisposition: false,
      dataDetailPopupInClaimTicket: false,
      dataDetailPopupPendingDecision: false,
      rejectpopup:false,
      reject_disposition_lit:'',
      rejectdisposition:'',
      rejectsussesspopup: false,
      successmessage:'',
      updatemessage:'',
      currentUser: {},
      itemLength:'',
      disposition_item:'',
      selectedDisposition:'',
      approveconfirmpopup:false,
      updateAmountPopup:false,
      claim_amount:'',
      update_amount:'',
      mrp_rule: [ v => !!v || 'The field is required',
        v => (Number(v) <= Number(this.claim_amount)) || 'Approved amount should be less then claim amount' ],
      }
    },
    components: {
        HeaderComponent
      },
      validations: {
        file: {required }
      },
      async created() {
      this.currentUser = this.$store.state.currentUser;
      this.loadData('Pending Information')    
    },
    watch: {    
      selected(newVal) {
        if(this.active_tab === 'Pending Information' || this.active_tab === 'Pending Claim Ticket'){
          const putawayInward = newVal.filter(insurances => insurances.is_putaway_inwarded === false)
        if(putawayInward.length > 0){
          this.showAlert("warning", "Please complete Putaway Process");
          this.scrollToTop();
          this.selected = []
        }   
      }
          
      }
    },
      methods: {
        scrollToTop() {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        },
      onKeyPress(event) {
        const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        if (specialCharsRegex.test(event.key)) {
          event.preventDefault();
        }
      },
      onKeyPressUpdate(event) {
          const allowedKeys = /[0-9]/;
          if (!allowedKeys.test(event.key) || event.key === ' ' || event.key === '-' || event.key === '.') {
              event.preventDefault();
          }
      },
        addNewRow() {
          this.rows = [
            ...this.rows,
            {
              field: "",
              file: '',
              value:'',
              data_type:'',
              label:''
            }
          ];
        },
      getFilteredDocuments(currentRow) {
        const filteredItems = JSON.parse(JSON.stringify(this.pending_documents));
        this.rows.forEach((row) => {
          if (row !== currentRow && row.field) {
            const index = filteredItems.findIndex((item) => item.field === row.field);
            if (index !== -1) {
              filteredItems.splice(index, 1);
            }
          }
        });

        return filteredItems;
      },

    deleteRow(index) {
      this.rows.splice(index, 1);
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

      loadData(tab, tab_action) {
        if(tab_action){
          this.pending_info_search = ''
        }
        this.loading = true;
        this.selected = []
        this.active_tab = tab
        this.table_data = []
        this.page = 1
        this.totalPages = 1
        this.pageSize = 100
        if (tab == "Pending Information") {
          (this.headers = [
          { text: "Tag ID", value: "tag_number", width: '12%', align: "start", sortable: false },
          {text: "Incident Location", value: "incident_location"},
          { text: "Article ID", value: "sku_code" },
          { text: "Article Description", value: "item_description" },
          { text: "Incident Date", value: "incident_date" },
          { text: "Damage Type", value: "damage_type" },
          { text: "Responsible Vendor", value: "responsible_vendor" }
          ]);

          this.fetchPendingInfromation();
        }
        if (tab == 'Pending Claim Ticket') {
          (this.headers = [
          { text: "Tag ID", value: "tag_number", width: '12%', align: "start", sortable: false },
          { text: "Incident Location", value: "incident_location" },
          { text: "Article ID", value: "sku_code" },
          { text: "Claim Amount (₹)", value: "claim_amount" },
          { text: "Article Description", value: "item_description" },
          { text: "Incident Date", value: "incident_date" },
          { text: "Damage Type", value: "damage_type" },
          { text: "Action", value: "action" }
          ]);

          this.fetchPendingClaimTicket();
        }
        if (tab == 'Pending Inspection') {
          (this.headers = [
          { text: "Tag ID", value: "tag_number", width: '12%', align: "start", sortable: false },
          { text: "Article ID", value: "sku_code" },
          { text: "Article Description", value: "item_description" },
          { text: "Claim Amount (₹)", value: "claim_amount" },        
          { text: "Insurance Ticket No.", value: "claim_ticket_number" },
          ]);

          this.fetchPendingInspection();
        }
        if ((tab == 'Pending Disposition') && (this.currentUser.roles.includes('default_user'))) {
          this.selectedDisposition = '';
          (this.headers = [
          { text: "Tag ID", value: "tag_number", width: '12%', align: "start", sortable: false },
          { text: "Article ID", value: "sku_code" },
          { text: "Article Description", value: "item_description" },
          { text: "Grade", value: "grade" },       
          { text: "Benchmark Price (₹)", value: "benchmark_price" },        
          { text: "Net Recovery (₹)", value: "net_recovery" },
          { text: "Net Recovery (%)", value: "recovery_percent" }
          ]);
          this.fetchPendingDisposition();

          this.$http.secured
          .get("/api/v1/warehouse/new_insurances/get_dispositions")
          .then(response => {
            if (response.data) {
              this.disposition_item = response.data.dispositions;
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
        if ((tab == 'Pending Disposition') && (this.currentUser.roles.includes('central_admin'))) {
          this.selectedDisposition = '';
          (this.headers = [
          { text: "Tag ID", value: "tag_number", width: '12%', align: "start", sortable: false },
          { text: "Article ID", value: "sku_code" },
          { text: "Article Description", value: "item_description" },
          { text: "Grade", value: "grade" },
          { text: "Assigned Disposition", value: "assigned_disposition" },   
          { text: "Net Recovery (%)", value: "recovery_percent" }
        
          ]);
          this.fetchPendingDisposition();

          this.$http.secured
          .get("/api/v1/warehouse/new_insurances/get_dispositions")
          .then(response => {
            if (response.data) {
              this.disposition_item = response.data.dispositions;
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

        if (tab == 'Pending Decision') {
          (this.headers = [
          { text: "Tag ID", value: "tag_number", width: '12%', align: "start", sortable: false },
          { text: "Article ID", value: "sku_code" },
          { text: "Article Description", value: "item_description" },
          { text: "Claim Amount (₹)", value: "claim_amount" },        
          { text: "Insurance Ticket No.", value: "claim_ticket_number" },
          ]);
          this.fetchPendingDecision();
        }     
      },
      fetchPendingInfromation() {
        const params = this.getRequestParams(
          this.page,
          this.pageSize
        );
        this.$http.secured
          .get("/api/v1/warehouse/new_insurances?status=pending_information", { params: { tag_number: this.pending_info_search, page: params['page'], per_page: params['size'] } })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.insurances
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
      fetchPendingClaimTicket() {
        const params = this.getRequestParams(
          this.page,
          this.pageSize
        );
        this.$http.secured
          .get("/api/v1/warehouse/new_insurances?status=pending_claim_ticket", { params: { tag_number: this.pending_info_search, page: params['page'], per_page: params['size'] } })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.insurances
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
      fetchPendingInspection() {
        const params = this.getRequestParams(
          this.page,
          this.pageSize
        );
        this.$http.secured
          .get("/api/v1/warehouse/new_insurances?status=pending_inspection", { params: { tag_number: this.pending_info_search, page: params['page'], per_page: params['size'] } })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.insurances
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
      fetchPendingDecision() {
        const params = this.getRequestParams(
          this.page,
          this.pageSize
        );
        this.$http.secured
          .get("/api/v1/warehouse/new_insurances?status=pending_decision", { params: { tag_number: this.pending_info_search, page: params['page'], per_page: params['size'] } })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.insurances
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
      fetchPendingDisposition() {
        const params = this.getRequestParams(
          this.page,
          this.pageSize
        );
        this.$http.secured
          .get("/api/v1/warehouse/new_insurances?status=pending_disposition", { params: { tag_number: this.pending_info_search, page: params['page'], per_page: params['size'] } })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.insurances
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
      handlePageChange(value) {
        this.page = value;
        if (this.active_tab == 'Pending Information') {
          this.fetchPendingInfromation();
        }else if(this.active_tab == 'Pending Claim Ticket'){
          this.fetchPendingClaimTicke();
        }else if(this.active_tab == 'Pending Inspection'){
          this.fetchPendingInspection();
        }else if(this.actions == 'Pending Decision'){
          this.fetchPendingDecision
        }else{
          this.fetchPendingDisposition();
        }
      },
      handlePageSizeChange(size) {
        this.pageSize = size;
        this.page = 1
        if (this.active_tab == 'Pending Information') {
          this.fetchPendingInfromation();
        }else if(this.active_tab == 'Pending Claim Ticket'){
          this.fetchPendingClaimTicke();
        }else if(this.active_tab == 'Pending Inspection'){
          this.fetchPendingInspection();
        } else if(this.actions == 'Pending Decision'){
          this.fetchPendingDecision
        }else{
          this.fetchPendingDisposition();
        }
      },
      updatedialog(){
        this.UpdatePopup = true;
        this.number = 0;
        this.isShow = true;
        this.rows = [];
        this.addNewRow();
        this.ins_id = this.selected.map(insurances => insurances.id);
        this.$http.secured
          .get("/api/v1/warehouse/new_insurances/get_pending_documents", { params: { ids:this.ins_id } })
          .then(response => {
            if (response.data) {
              this.pending_documents = response.data.pending_documents;
              this.pending_doc = response.data.pending_documents;
              this.data_type_upload = 
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
      filterListOfButtons(ev) {
        this.filterCategory= [],
        this.filterGrade = [],
        this.filterBrand = [],
        this.filterStatus = '',
        this.filterRequestType = '',
        this.putaway_search = ''
        this.pending_info_search = ''
        document.documentElement.style.setProperty('--dialog-ypos', (this.$refs.filterPopupRef.$el.getBoundingClientRect().top + 40).toString() + 'px');
        this.filteWithSubPopup = true;
      },
      updatedialogPCT(){
        if(this.active_tab == 'Pending Claim Ticket'){
          this.ins_id = this.selected.map(insurances => insurances.id);
          var selected = this.selected.filter(x => x.claim_amount == null)
          if(selected.length > 0){
            this.showAlert("warning", 'Please Select only updated amount only')
          this.selected = [];
          return
          }
          this.updatePopupPendingClaimTicket = true;
          this.number=0;
          this.claim_ticket_date ='';
          this.claim_ticket_number = '';
        }
        if(this.active_tab == 'Pending Inspection'){
          this.ins_id = this.selected.map(insurances => insurances.id);
          this.updatePopupPendingInspection = true;
          this.number=0;
          this.inspection_date ='';
          this.file = '';
        }
        if(this.active_tab == 'Pending Decision'){
          this.ins_id = this.selected.map(insurances => insurances.id);
          var inventory_ids  = []
          for (var i = 0; i < this.selected.length; i++) {inventory_ids.push(this.selected[i].id)}
          inventory_ids = inventory_ids.map((id) => id.toString());
          var idsString = inventory_ids.join(','); 
          if(this.selected.length == 1){
            this.has_multiple_items = false
          }else{
            this.has_multiple_items = true
          }
          this.updatePopupPendingDecision = true;
          this.number=0;
          this.$http.secured
          .get("api/v1/warehouse/new_insurances/get_claim_decisions",{ params: { has_multiple_items: this.has_multiple_items, ids: idsString } })
          .then(response => {
            if (response.data) {
              this.insu_claim_item = response.data.claim_decisions;
              this.salvage_item = response.data.salvage_actions;
              this.claim_amount = response.data.approved_amount;
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
      itemDetailpopup(item){
        if(this.active_tab == 'Pending Disposition'){
          this.datadetailpopupdisposition = true
          this.tag_number = item.tag_number;
          let str = String(this.tag_number);
          this.tag_number = str;
          this.item_id = item.id;
          this.$http.secured
          .get(`api/v1/warehouse/new_insurances/${this.item_id}`)
          .then(response => {
            if (response.data) {
              this.item_details = response.data.insurance
              this.require_doc = response.data.insurance.required_documents
              this.inspection_report_data = response.data.insurance.inspection_report;
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
        }else if(this.active_tab == 'Pending Information'){
          this.datadetailpopup = true;
          this.tag_number = item.tag_number;
          let str = String(this.tag_number);
          this.tag_number = str;
          this.item_id = item.id;
          this.$http.secured
          .get(`api/v1/warehouse/new_insurances/${this.item_id}`)
          .then(response => {
            if (response.data) {
              this.item_details = response.data.insurance
              this.require_doc = response.data.insurance.required_documents
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
        }else if(this.active_tab == 'Pending Decision'){
            this.dataDetailPopupPendingDecision = true;
            this.tag_number = item.tag_number;
            let str = String(this.tag_number);
            this.tag_number = str;
            this.item_id = item.id;
            this.$http.secured
          .get(`api/v1/warehouse/new_insurances/${this.item_id}`)
          .then(response => {
            if (response.data) {
              this.item_details = response.data.insurance
              this.require_doc = response.data.insurance.required_documents
              this.inspection_report_data = response.data.insurance.inspection_report;
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
        }else if(this.active_tab == 'Pending Claim Ticket' || this.active_tab == 'Pending Inspection'){
          this.dataDetailPopupInClaimTicket = true;
          this.tag_number = item.tag_number;
          let str = String(this.tag_number);
          this.tag_number = str;
          this.item_id = item.id;
          this.$http.secured
          .get(`api/v1/warehouse/new_insurances/${this.item_id}`)
          .then(response => {
            if (response.data) {
              this.item_details = response.data.insurance
              this.require_doc = response.data.insurance.required_documents
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
      applyFilterFunc() {
        const params = new URLSearchParams();
        params.append('incident_location', this.incident_info_search);
        params.append('incident_date', this.incdent_date_search); 
        params.append('damage_type', this.claimabe_damage_search);
        params.append('sku_code', this.aricle_id_search);
        
        const pageparams = this.getRequestParams(
          this.page,
          this.pageSize
        );
        params.append('page' , pageparams['page'])
        params.append('per_page' , pageparams['size'])

        if(this.active_tab  == "Pending Information"){
          this.$http.secured
          .get('/api/v1/warehouse/new_insurances?status=pending_information', { params })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.insurances
              this.totalPages = response.data.meta.total_pages
              this.filteWithSubPopup=false;
              this.aricle_id_search = '';
              this.incident_info_search = '';
              this.incdent_date_search = '';
              this.claimabe_damage_search = '';
              this.menu_171 = false
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
        if(this.active_tab  == "Pending Claim Ticket"){
          this.$http.secured
          .get('/api/v1/warehouse/new_insurances?status=pending_claim_ticket', { params })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.insurances
              this.totalPages = response.data.meta.total_pages
              this.filteWithSubPopup=false;
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
        if(this.active_tab  == "Pending Inspection"){
          this.$http.secured
          .get('/api/v1/warehouse/new_insurances?status=pending_inspection', { params })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.insurances
              this.totalPages = response.data.meta.total_pages
              this.filteWithSubPopup=false;
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
        if(this.active_tab  == "Pending Decision"){
          this.$http.secured
          .get('/api/v1/warehouse/new_insurances?status=pending_decision', { params })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.insurances
              this.totalPages = response.data.meta.total_pages
              this.filteWithSubPopup=false;
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
        if(this.active_tab  == "Pending Disposition"){
          this.$http.secured
          .get('/api/v1/warehouse/new_insurances?status=pending_disposition', { params })
          .then(response => {
            if (response.data) {
              this.table_data = response.data.insurances
              this.totalPages = response.data.meta.total_pages
              this.filteWithSubPopup=false;
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
      closeFilterpopup(){
        this.filteWithSubPopup = false;
        this.aricle_id_search = '';
        this.incident_info_search = '';
        this.incdent_date_search = '';
        this.claimabe_damage_search = '';

      },
      updatePendingClaimSubmit() {
        this.number++;
        const formData = new FormData();
        this.$http.secured.put("/api/v1/warehouse/new_insurances/update_claim_ticket", {
          "ids": this.ins_id,
          "claim_ticket_date": this.claim_ticket_date,
          "claim_ticket_number": this.claim_ticket_number
        },)
          .then(response => {
            if (response.data) {
              this.updatePopupPendingClaimTicket = false
              this.successmessage = response.data.message;
              this.updatemessage = 'Pending Inspection'
              this.rejectsussesspopup = true;
              this.itemLength = this.selected.length;
              this.showAlert("success", "Successfully updated");
              this.number = 0;
            } else {
              this.showAlert("error", "No Data Found");
              this.number = 0;
            }
          }).catch(error => {
            this.showAlert("error", "Something went wrong from Network");
            this.loading = false;
            this.number = 0;

          });
      },
      updatePendingInspectionSubmit() {
        this.number++;
        
        if (this.file) {
        const allowedFileTypes = ['.pdf', '.png'];
        const fileType = this.file.name.substring(this.file.name.lastIndexOf('.')).toLowerCase();
        if (!allowedFileTypes.includes(fileType)) {
          console.error('Invalid file type. Only PDF and PNG files are allowed.');
          return;
        }
        }

        this.ins_id = Array.from(this.selected.map(insurances => insurances.id));
        const formData = new FormData();
        formData.append('claim_inspection_date', this.inspection_date );
        formData.append('inspection_report', this.file);
        formData.append('ids', this.ins_id);
        this.$http.secured.put("/api/v1/warehouse/new_insurances/update_inspection_details", formData, {
          headers: {
          'Content-Type': 'multipart/form-data'
              }
          }     
        )
          .then(response => {
            if (response.data) {
              this.updatePopupPendingInspection = false
              this.successmessage = response.data.message;
              this.rejectsussesspopup = true;
              this.inspection_date ='';
              this.file = '';
              this.updatemessage = 'Pending Decision'
              this.rejectsussesspopup = true;
              this.itemLength = this.selected.length;
              this.showAlert("success", "Successfully updated");
              this.number = 0;
            } else {
              this.showAlert("error", "No Data Found");
              this.number = 0;
            }
          }).catch(error => {
            this.showAlert("error", "Something went wrong from Network");
            this.loading = false;
            this.number = 0;
          });
      },
      updatePendingDecisionSubmit() {
        this.number++;

        if (this.file) {
        const allowedFileTypes = ['.pdf', '.png'];
        const fileType = this.file.name.substring(this.file.name.lastIndexOf('.')).toLowerCase();
        if (!allowedFileTypes.includes(fileType)) {
          console.error('Invalid file type. Only PDF and PNG files are allowed.');
          return;
        }
        }

        const formData = new FormData();
        this.$http.secured.put("/api/v1/warehouse/new_insurances/update_approval_details", {
          "ids": this.ins_id,
          "claim_decision": this.insu_claim_decision,
          "approval_ref_number": this.approval_ref_number,
          "approved_amount" : this.approved_amount,
          "salvage_action": this.salvage_action
        },)
          .then(response => {
            if (response.data) {
              this.updatePopupPendingDecision = false
              this.successmessage = response.data.message;
              this.salvage_action = '';
              this.approved_amount = '';
              this.approval_ref_number = '';
              this.insu_claim_decision = '';
              this.updatemessage = 'Pending Disposition'
              this.rejectsussesspopup = true;
              this.itemLength = this.selected.length;
              this.showAlert("success", "Successfully updated");
              this.number = 0;
            } else {
              this.showAlert("error", "No Data Found");
              this.number = 0;
            }
          }).catch(error => {
            this.showAlert("error", error.response.data.error);
            this.loading = false;
            this.number = 0;
          });
      },

      handleFileChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          this.file = reader.result;
        };
        reader.readAsBinaryString(file);
      },
      selectFile(event){
        this.file = event.target.files[0]
        const reader = new FileReader()
        reader.readAsBinaryString(this.file)
        reader.onload = () => {
          this.binaryData = btoa(reader.result)
        }
        },
        closePopup(){
          this.updatePopupPendingDecision = false;
          this.salvage_action = '';
          this.approved_amount = '';
          this.approval_ref_number = '';
          this.insu_claim_decision = '';
          this.updateAmountPopup = false;
          this.update_amount = '';
        },

        updateItemPopup(doc){
          this.updatepopinitem = true;
          this.number = 0;
          this.item_label_name = doc.label;
          this.item_field_name = doc.field;
          this.data_type_upload = doc.data_type;
        },
        closeItempopup(){
          this.updatepopinitem = false;
          this.file = '';
          this.item_label_name = '';
          this.data_type_info = '';
        },
        updateInfoDocItemSubmit() {
          this.number++;
      
        const formData = new FormData();
        formData.append('field', this.item_field_name );
        formData.append('label', this.item_label_name);
        formData.append('data_type', this.data_type_upload);
        formData.append('file', this.file);
        formData.append('value', this.data_type_info);

        this.$http.secured.put(`/api/v1/warehouse/new_insurances/${this.item_id}/update_document`,  formData, {
          headers: {
          'Content-Type': 'multipart/form-data'
              }
          } )
          .then(response => {
            if (response.data) {
              this.updatepopinitem = false
              this.datadetailpopup = false;
              this.data_type_info ='';
              this.file = '';
              this.selected = []
              this.showAlert("success", "Successfully updated");
              this.number=0;
              this.loadData(this.active_tab);
            } else {
              this.showAlert("error", "No Data Found");
              this.number = 0;
            }
          }).catch(error => {
            this.showAlert("error", error.response.data.error);
            this.number = 0;
            this.loading = false;

          });
      },
      selectPendingDoc(dataType, index){
        let docu=this.pending_doc.filter(obj =>  obj.field==dataType)
        this.infoDataType = docu[0].data_type;
      },
      getAcceptType(dataType, index) {
        this.isShow = false;     
        let docu=this.pending_documents.filter(obj =>  obj.field==dataType)    
        const fileType = this.fileTypeMapping[docu[0].data_type];
        this.rows[index].data_type = docu[0].data_type; 
        // this.infoDataType[index]  = this.rows[index].data_type   
        this.rows[index].label = docu[0].label;
        return fileType ? fileType : '';
    
    },


    handleFileChangeUpdate(event, index) {
      this.rows[index].file = event;
    },
    bulkUpdateDocSubmit() {
          this.number++;
          const formData = new FormData();
          // const rowsJson = JSON.stringify(this.rows);
          // formData.append('documents', this.rows);
          formData.append('ids', this.ins_id );        
          for (let i = 0; i < this.rows.length; i++) {
                formData.append(`file[${i}]`, this.rows[i].file);
                formData.append(`field[${i}]`, this.rows[i].field);
                formData.append(`label[${i}]`, this.rows[i].label);
                formData.append(`data_type[${i}]`, this.rows[i].data_type);
                formData.append(`value[${i}]`, this.rows[i].value);
              }
        this.$http.secured.post('/api/v1/warehouse/new_insurances/bulk_update_docs', formData, {
          headers: {
          'Content-Type': 'multipart/form-data'
              }
          }
            )
          .then(response => {
            if (response.data) {
              this.UpdatePopup = false
              this.successmessage = response.data.message;
              this.rows=[];
              this.updatemessage = 'Pending Claim Ticket'
              this.rejectsussesspopup = true;
              this.itemLength = this.selected.length;
              this.showAlert("success", "Successfully updated");
              this.number = 0;
            } else {
              this.showAlert("error", "No Data Found");
              this.number = 0;
            }
          }).catch(error => {
            this.showAlert("error", error.response.data.error);
            this.number = 0;
            this.loading = false;

          });
      },
      approveConfirmPopup(){
        this.approveconfirmpopup = true;
      },
      adminApproveItem() {
          this.number++;
          this.ins_id = this.selected.map(insurances => insurances.id);
        this.$http.secured.post('/api/v1/warehouse/new_insurances/set_disposition', {
          "ids":this.ins_id
        },)
          .then(response => {
            if (response.data) {
              this.approveconfirmpopup = false
              this.successmessage = response.data.message;
              this.rejectsussesspopup = true;
              this.showAlert("success", "Successfully updated");
              this.loadData(this.active_tab);
            } else {
              this.showAlert("error", "No Data Found");
              this.number = 0;
            }
          }).catch(error => {
            this.showAlert("error", error.response.data.error);
            this.number = 0;
            this.loading = false;

          });
      },
      rejectDialog(){
        this.rejectpopup = true;
        this.$http.secured
          .get("/api/v1/warehouse/new_insurances/get_dispositions")
          .then(response => {
            if (response.data) {
              this.reject_disposition_lit = response.data.dispositions;
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
      adminRejectItem() {
          this.number++;
          this.ins_id = this.selected.map(insurances => insurances.id);
        this.$http.secured.post('/api/v1/warehouse/new_insurances/set_disposition', {
          "ids":this.ins_id,
          "disposition_action": "reject",
          "disposition": this.rejectdisposition
        },)
          .then(response => {
            if (response.data) {
              this.rejectpopup = false;
              this.successmessage = response.data.message;
              this.rejectsussesspopup = true;
              this.loadData(this.active_tab);
            } else {
              this.showAlert("error", "No Data Found");
              this.number = 0;
            }
          }).catch(error => {
            this.showAlert("error", error.response.data.error);
            this.number = 0;
            this.loading = false;

          });
      },
      rejectColsePopup(){
        this.rejectpopup = false;
        this.rejectdisposition = '';
      },
      afterClickOkLoadData(){
        this.rejectsussesspopup = false;
        this.selectedDisposition = '';
        this.selected=[];
        this.loadData(this.active_tab);
      },
      assignDisposition(){
        this.ins_id = this.selected.map(insurances => insurances.id);
        this.$http.secured.post('/api/v1/warehouse/new_insurances/update_disposition', {
          "ids":this.ins_id,
          "disposition": this.selectedDisposition
        },)
          .then(response => {
            if (response.data) {
              this.successmessage = response.data.message;
              this.rejectsussesspopup = true;
              this.selectedDisposition = '';
            } else {
              this.showAlert("error", "No Data Found");
            }
          }).catch(error => {
            this.showAlert("warning", "Please select the insurance ids");
            this.selectedDisposition = '';
            this.loading = false;

          });
      },
      updateAmount(item){
        this.updateAmountPopup = true;
        this.item_id = item.id
        this.update_amount =''; 
        this.positiveNumberRule = null;
      },
      updateAmountSubmit(){     
        this.$http.secured.put(`/api/v1/warehouse/new_insurances/${this.item_id}/update_claim_amount`, {
          "claim_amount": this.update_amount
          } )
          .then(response => {
            if (response.data) {
              this.updateAmountPopup = false
              this.update_amount ='';          
              this.showAlert("success", "Successfully updated");
              this.loadData(this.active_tab);
            } else {
              this.showAlert("error", "No Data Found");
              this.number = 0;
            }
          }).catch(error => {
            this.showAlert("error", error.response.data.error);
            this.number = 0;
            this.loading = false;

          });
      },
      changeDisposition(item){
        if(this.insu_claim_decision == 'approved'){
          this.claim_amount = this.selected.map(insurances => insurances.claim_amount);
          this.approved_amount = this.claim_amount;
        }else if(this.insu_claim_decision == 'partially_approved'){
          this.approved_amount = ''
        }else{
          this.approved_amount = '0'
        }
      },
      changeDisposition(item){
        if(this.insu_claim_decision == 'approved'){
          this.disableApproveAmount = true;
          this.approved_amount = this.claim_amount.toString();
        }else if(this.insu_claim_decision == 'partially_approved'){
          this.disableApproveAmount =false;
          this.approved_amount = ''
        }else{
          this.disableApproveAmount = true;
          this.approved_amount = '0'
        }
      },
      positiveNumberRule(value) {
        if (!value) {
          return 'Input is required';
        }
        if (value <= 0 || isNaN(value)) {
          return 'Input must be a positive number';
        }
        return true;
      },
      validatePositiveNumber(value) {
        const numberValue = parseFloat(value);
        if (!isNaN(numberValue) && numberValue >= 0) {
          return true;
        } else {
          this.approved_amount = '';
          return 'Please enter a positive value';
        }
      },
    }

  }
</script>

  <style scoped>
  .v-dialog>.v-card>:has(.v-card__title){
  overflow-wrap: break-word !important;
  }
  .custom-control_outlined .v-expansion-panel:before {
    box-shadow: none;
  }
  .custom-control_outlined button {
    min-height: 56px;
    border-width: 1px;
    border-color: rgba(0,0,0,.42);
    border-style: solid;
  }
  .custom-control_outlined button:focus {
    outline: none;
  }
  .v-dialog__content:has(.filter-insurance){
  justify-content: right;
  align-items: baseline;
  top: var(--dialog-ypos);
  }
  .v-card__text > .row > .col hr{
  border-top: 0.5px solid #2D2D2D;
  }
  .my-autocomplete {
    background-color: blue;
    color: white;
  }
  /* .theme--light.v-text-field--solo>.v-input__control>.v-input__slot {
  background-color: #1867c0 !important;
  color: #fff !important;
  margin-bottom: -35px !important;
  } */
  .field > .v-input__control > .v-input__slot {
  background-color: #0357D0 !important;
  min-height: 36px;
  } 
  .field > .v-input__control > .v-input__slot .v-label {
  color: #fff !important;
  }
  .field > .v-input__control > .v-input__slot input{
  color: #fff;
  }
  .field > .v-input__control > .v-input__slot .v-input__append-inner .v-icon {
  color: #fff !important;
  }
  .field > .v-input__control > .v-input__slot > .v-input__icon .mdi-menu-down::before{
  color: #fff !important;
  }

  .alignitems{
    padding-left: 12px !important;
  }
  .item-selected {
    margin-top: 29px;
    position: absolute;
    left: 35%;
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
