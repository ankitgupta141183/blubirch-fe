<template>
<body>
    <div class="mobile_head">
        <button class="menu_toggle sidebarCollapse"><i class="fa fa-bars"></i></button>
        <h3 class="main_header">Customer Returns</h3>
    </div>
    <div class="rigt_navbar" id="content">
        <h3 class="main_header">Re-Inward  & ManageBoxes</h3>
        <div class="row">
            <div class="col-lg-6">
                <div class="row">
                    <div class="form_groupw">
                        <h4 class="categ_head1 inwad_head">Gate Pass Number</h4>
                        <div class="form_group1 secrch_wdt">
                            <i class="fa fa-search" aria-hidden="true"></i>
                            <input v-model="gate_pass_number" v-on:change="searchInwardBoxesBy(gate_pass_number)" class="gatepass_input search_form" type="text" placeholder="Scan or Enter Gate Pass Number">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
            </div>
        </div><br>
        <div class="exchng_cont consign_inwd">
            <div class="exchng_wrap">
                <h4 class="categ_head2">New Inward</h4>
                <div class="model_drop1">
                    <input class="search_frm1" v-model="entered_box.vendor_name" type="text" placeholder="Vendor * ">   
                </div>
                <div class="model_drop1">
                    <input class="search_frm1" v-model="entered_box.transporter_name" type="text" placeholder="Transporter *">
                </div>
                <div class="model_drop1">
                    <input class="search_frm1" v-model="entered_box.warehouse" type="text" placeholder="City *">
                </div>
                <div class="model_drop1">
                    <input class="search_frm1" type="text" v-model="entered_box.received_boxes" placeholder="Box Count (As per Sy)tem) *">
                </div>
                <div class="model_drop1">
                    <input class="search_frm1" type="text" v-model="entered_box.received_box_count" placeholder="Received Box Count *">
                </div>
                <div class="model_drop1">
                    <date-picker  :max="new Date().toISOString().substr(0, 10)" style="margin-top: 30px;width:100%;" format="DD-MM-YYYY" v-model="selected_date" valueType="date"></date-picker>  
                </div>
            </div>
            <div class="exchng_wrap file_upload">
                <h4 class="categ_head1">Attach Documents</h4>
                <div v-for="(file, index) in box_files">
                  <div align="right">
                    <span><i @click= removeFile(index) class="fa fa-trash"></i></span>
                  </div>
                  <div class="row">
                    <div class="model_drop1 pp_frm_w col-lg-6">
                      <select class="search_frm1" v-model="file.consignment_box_file_type_id">
                        <option disabled value="" selected="">Select File Type</option>
                        <option :value="consignment_box_file_type.id" v-for="consignment_box_file_type in consignment_box_file_types" :key="consignment_box_file_type.id">{{ consignment_box_file_type.original_code }}</option>
                      </select>
                    </div>

                    <div class="model_drop1 pp_frm_w col-lg-6">
                      <input class="form-control" ref="inputFile"  type="file" @change="uploadFile(index, $event)" :id="`file-${index}`">
                    </div>
                  </div>
                </div>
                <div class="row" >
                  <span style="position: relative; left: 98%;"><i @click= addFile class="fa fa-plus"></i></span>
                </div>
            </div>  
            <button class="save_buton1" v-on:click="saveReinwardBox" >Validate & Add boxes</button>
        </div>  
    </div>
    
</body>
</template>


<script>
import $ from 'jquery'
import Vue from 'vue';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import { required, minLength, helpers } from 'vuelidate/lib/validators'
const alpha = helpers.regex('alpha', /^[a-zA-Z_]*$/)

  export default {
    name: 'ReInwardManageBoxes',
    components: { DatePicker },
    data () {
      return {
        file: "",
        entered_box: '',
        gate_pass_number: this.$route.params.gatepass_number != "[object MouseEvent]" ? this.$route.params.gatepass_number : '',
        selected_gatepass:'',
        selected_date:new Date(),
        consignment_box_file_types: [],
        box_files: [{'consignment_box_file_type_id': '', 'consignment_box_file': null}]
      }
    },

  created() {
      var gatepass_number = this.$route.params.gatepass_number
      if (gatepass_number) {
        this.searchInwardBoxesBy(gatepass_number)
      }     
    this.getConsignmentBoxFileType()
  },
    methods: {
        searchInwardBoxesBy(gate_pass_number) {
            this.entered_box = this.$store.state.gate_passes.find(x=>x.gatepass_number === gate_pass_number) 
            if (this.entered_box == undefined){
              this.entered_box = {}
            }
           
            let today = new Date()
            this.entered_box.delivery_date = today.getDay()+'-'+today.getMonth()+'-'+today.getFullYear();
        },
        saveReinwardBox() {
            if(this.entered_box.received_box_count<=this.entered_box.received_boxes && this.entered_box.received_box_count != 0){

              for (var i = 0; i < this.box_files.length; i++){
                if (this.box_files[i].consignment_box_file_type_id != '' && this.box_files[i].consignment_box_file == null){
                  this.$toast.error('Please add file')
                  return
                }

                if (this.box_files[i].consignment_box_file != null  && this.box_files[i].consignment_box_file_type_id == '' ){
                  this.$toast.error('Please add file type')
                  return
                }
              }

                let formData = new FormData()

                const create_consignment_box_data = {
                    gate_pass_number:this.entered_box.gatepass_number,
                    consignment_box:{
                    consignment_gate_pass_id:this.entered_box.id,
                    distribution_center_id:this.entered_box.vendor_id,
                    box_count:Number(this.entered_box.received_boxes),
                    received_box_count:Number(this.entered_box.received_box_count),
                    logistics_partner_id:this.entered_box.transporter_id,
                    delivery_date:this.selected_date.toDateString()
                    }
                }

                Object.entries(create_consignment_box_data).forEach(
                  ([key, value]) => formData.append(key, value)
                )

                formData.append('consignment_box', JSON.stringify(create_consignment_box_data.consignment_box))

                for (var i = 0; i < this.box_files.length; i++){
                  formData.append('consignment_box_files_types[]', this.box_files[i].consignment_box_file_type_id);
                  formData.append('consignment_box_files[]', this.box_files[i].consignment_box_file);
                }

                this.$http.secured.post('/api/v1/warehouse/gate_passes/create_consignment_box', formData)
                .then(response => {if(response.status==200){
                this.$store.commit('setWareHouseDetails', {selected_gatepass: response.data.consignment_box})
                this.$router.push({name: 'ManageEditAddBoxes'})
                } })
                .catch(error => this.$toast.error('Error while validating boxes.'))
                }else{this.$toast.error('Received count should less/equal to box count')}
            
        },
        getConsignmentBoxFileType(){
          this.$http.secured.get('/api/v1/warehouse/gate_passes/consignment_box_file_types')
            .then(response => {
              this.consignment_box_file_types = response.data.lookup_values

            })
            .catch(error => {
              this.$toast.error('Error in fetching Consignment Box File Type')
            })
        },
        addFile(){
          this.box_files.push({'consignment_box_file_type_id': '', 'consignment_box_file': null})
        },

        removeFile(fileid){
          if (this.box_files.length >= 1) {
           this.box_files.splice(fileid, 1)
          }
        }
    }
  }
</script>