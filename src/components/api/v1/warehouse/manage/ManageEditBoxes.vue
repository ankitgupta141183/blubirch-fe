<template>
 <body>
    <div class="mobile_head">
        <button class="menu_toggle sidebarCollapse"><i class="fa fa-bars"></i></button>
        <h3 class="main_header">Customer Returns</h3>
    </div>
    <div class="rigt_navbar" id="content">
        <h3 class="main_header">Manage or Edit Boxes <button class="consig_but3">Complete Consignement</button></h3>
        <div class="exchng_head consign2">
            <div class="row">
                <div class="col-lg-6">
                    <div class="row">
                        <div class="form_groupw">
                            <h4 class="categ_head1 inwad_head">Gate Pass Number</h4>
                            <div class="form_group1 secrch_wdt">
                                <i class="fa fa-search" aria-hidden="true"></i>
                            <input v-model="gate_pass_number" v-on:change="searchInwardBoxesBy(gate_pass_number)" class="search_form" type="text" placeholder="Scan or Enter Gate Pass Number">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                </div>
            </div>
            <div class="row">
                <div class="col_fil_wdt">
                    <div class="col_fil_wd2">
                        <div class="card">
                            <div class="card-header" id="headingTwo">
                              <h5 class="mb-0">
                                <b-button  v-b-toggle.collapse-3 class="btn btn-link collapsed" style="background-color: #FFFFFF;border:None">
                                    Bhairavi Resellers Pvt. Ltd | 08-01-2020 | Lot_1  (# Con _1803)
                                </b-button>
                              </h5>
                            </div>
                            <b-collapse id="collapse-3">
                            <div>
                                <div class="card-body">
                                    <h4 class="categ_head3">Manage Box Details- Box 1</h4>
                                    <div class="model_drop1">
                                        <input class="search_frm1" type="text" placeholder="Consignment ID * ">
                                    </div>
                                    <div class="model_drop1">
                                        <input class="search_frm1" type="text" placeholder="Seller * ">
                                    </div>
                                    <div class="model_drop1">
                                        <input class="search_frm1" type="text" placeholder="Service Request * ">
                                    </div>
                                    <div class="model_drop1">
                                        <input class="search_frm1" type="text" placeholder="Transporter *">
                                    </div>
                                    <div class="model_drop1">
                                        <input class="search_frm1" type="text" placeholder="City *">
                                    </div>
                                    <div class="model_drop1">
                                        <input class="search_frm1" type="text" placeholder="Box Count (As per Docket) *">
                                    </div>
                                    <div class="model_drop1">
                                        <input class="search_frm1" type="text" placeholder="Recieved Box Count *">
                                    </div>
                                    <div class="model_drop1">
                                        <input class="search_frm1" type="text" placeholder="Consignment Delivery Date * ">
                                    </div>
                                    <div class="exchng_wrap file_upload">
                                        <h4 class="categ_head2">Attach Documents</h4>
                                        <form method="post" class="file-uploader" action="" enctype="multipart/form-data">
                                            <div class="file-uploader__message-area">
                                                <!--<p>Select a file to upload</p>-->
                                            </div>
                                            <div class="file-chooser cstom_input">
                                                <label> Enter Your File
                                                    <input class="file-chooser__input" type="file" size="60" >
                                                </label> 
                                                <!--<input class="file-chooser__input" type="file">-->
                                            </div>
                                            <!--<input class="file-uploader__submit-button" type="submit" value="Upload">-->
                                        </form> 
                                    </div>
                                    <div class="exchng_wrap">
                                        <button class="consig_but2">Save Box Details</button>
                                    </div>
                                </div>
                            </div>
                            </b-collapse>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="packing_st1">
                <div class="exchng_cont">
                    <div class="exchng_wrap">
                        <h4 class="categ_head2">Manage Box Details- Box </h4>
                        <div class="model_drop1 new_modal">
                            <input class="search_frm1" type="text" placeholder="PSlip Number *" v-model="search_box_detail.pslip_number" id="pslip_number">
                        </div>
                        <div class="model_drop1 new_modal">
                            <input class="search_frm1" type="text" placeholder="AWB Number *" v-model="search_box_detail.awb_number" id="awb_number">
                        </div>
                        <div class="model_drop1 new_modal">
                            <input class="search_frm1" type="text" placeholder="SPOO ID *" v-model="search_box_detail.spot_id" id="spot_id">
                        </div>
                        <div class="model_drop1 new_modal">
                            <input class="search_frm1" type="text" placeholder="Removal Order ID *" v-model="search_box_detail.removal_order_id" id="removal_order_id">
                        </div>
                        <div class="model_drop1 new_modal">
                            <input class="search_frm1" type="text" placeholder="Auth ID *" v-model="search_box_detail.auth_id" id="auth_id">
                        </div>
                        <div class="model_drop1 new_modal new_modal2">
                            <select class="search_frm1">
                                <option value="volvo" hidden>Box Grade/ Condition *</option>
                                <option value="saab">Saab</option>
                                <option value="mercedes">Mercedes</option>
                                <option value="audi">Audi</option>
                            </select>
                        </div>
                        <div class="model_drop1 new_modal new_modal2">
                            <select class="search_frm1">
                                <option value="volvo" hidden>Reason(s) *</option>
                                <option value="saab">Saab</option>
                                <option value="mercedes">Mercedes</option>
                                <option value="audi">Audi</option>
                            </select>
                        </div>
                        <div class="exchng_wrap file_upload">
                            <h4 class="categ_head1">Attach Documents</h4>
                            <form method="post" class="file-uploader" action="" enctype="multipart/form-data">
                                <div class="file-uploader__message-area">
                                  <!--<p>Select a file to upload</p>-->
                                </div>
                                <div class="file-chooser cstom_input">
                                    <label> Choose a file to attach <img src="@/assets/images/icons/add.svg">
                                        <input class="file-chooser__input" type="file" size="60" >
                                    </label> 
                                    <!--<input class="file-chooser__input" type="file">-->
                                </div>
                                <input class="file-uploader__submit-button" type="submit" value="Upload">
                              </form>
                        </div>  
                        <div class="modl_upload">
                            <button class="table_butn3 display_non" v-on:click="saveReinwardBox">Save Box Details</button>
                        </div>
                    </div>
                    
                </div>    
            </div>
            <div class="packing_st2">
                <div class="packing_sw2">
                    <h4 class="categ_head3">Total Boxes Entered : 0 </h4>
                </div>
            </div>
        </div>
    </div>
 </body>
</template>


<script>
import $ from 'jquery'
import Vue from 'vue';

// import json from  "@/assets/data/reinward.json"

import json from  "@/assets/invoices.json"
import reason_json from  "@/assets/customer_return_reason.json"

export default {
  data () {
    return {
    search_box_detail: '',
    invoice_details: {},
    init_box_detail:[ {  "number":"",
                  "removal_order_id":"",
                  "pslip_number":"",
                  "auth_id":"",
                  "awb_number":"",
                  "box_condition":""}],
    gate_pass_number:'',
      clients: [{name:'Bhairavi Reseller Pvt. Ltd. | 12-05-2020'}],
    }
  },
  computed:{
  },
  created() {
        this.ReturnReasonSelect()
        this.search_box_detail = this.init_box_detail[0];
//   this.manage_boxes = json["manage_boxes"].find(x => x.id === this.$route.params.id)
//   this.box_detail = this.manage_boxes['box_details']
  },
  methods:{
      ReturnReasonSelect (){
        this.$store.commit('setWareHouseDetails', {return_reason: reason_json['return_reasons'], inventories:reason_json['return_reasons'], return_request: reason_json['return_reasons'].map(function(x){return x.return_request}), 
        // box_details: reason_json['return_reasons'].map(function(x){x.return_request.map(function(y){return y.box_details})})        
        })
        
      },      
        searchInwardBoxesBy(gate_pass_number) {
            this.search_box_detail = this.$store.state.return_request.find(x=>x.gate_pass === gate_pass_number).box_details[0]
            this.search_box_detail=this.search_box_detail?this.search_box_detail:this.init_box_detail[0];
        },
        
      saveReinwardBox() {
          this.$router.push({name: 'ManageEditAddBoxes', })
      },        
      
  }
}
</script>