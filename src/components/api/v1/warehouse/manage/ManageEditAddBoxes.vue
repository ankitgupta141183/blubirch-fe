<template>
<body>

        <div class="modal fade cutom2_modal cutom3_modal" id="myModal2" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content" v-if="isActiveModal">
                    <button type="button" class="close qc_result" data-dismiss="modal">&times;</button>               
                <div class="modal-body" id="pod">
                    <div class="check_table">
                        <div class="modal_head">
                            <div class="modl_head_1">
                                <img src="@/assets/images/logo-modal-1.png" class="img-fluid">
                            </div>
                            <div class="modl_head_1">
                                <h3 class="modl_header">Proof Of Delivery</h3>
                            </div>
                            <div class="modl_head_1">
                                <h3 class="modl_headr1">Date: <span>{{new Date(today).toLocaleDateString()}}</span></h3>
                            </div>
                        </div>
                        <div class="check_tablw stow_scroll">
                            <h3 class="table_head5">Consignment Summary</h3>
                            <div class="table_colmw table_poup pading_nn">
                                <div class="table_modc1"><h4 class="table_head1"><span>Consignment Name : </span> {{selected_gate_pass.consignment_name}} </h4></div>
                                <div class="table_modc2"><h4 class="table_head1"><span>Vendor : </span> {{selected_gate_pass.vendor_name}}</h4></div>
                                <div class="table_modc3"><h4 class="table_head1"><span>City : </span> {{selected_gate_pass.city_name}}</h4></div>
                                <div class="table_modc4"><h4 class="table_head1"><span>Consignment Deliver Date :</span> {{new Date(selected_gate_pass.delivery_date).toLocaleDateString()}}</h4></div>
                            </div>
                        </div>
                    </div>
                    <h3 class="table_head6">All Boxes</h3>
                    <div class="check_table scnd_shadow">
                        <div class="check_tablw stow_scroll">
                            <div class="table_colmw table_bordr">
                                <div class="table_modd1"><h4 class="table_head1">AWB Number</h4></div>
                                <div class="table_modd2"><h4 class="table_head1">Auth ID</h4></div>
                                <div class="table_modd3"><h4 class="table_head1">PSlip Number</h4></div>
                                <div class="table_modd4"><h4 class="table_head1">Box Count</h4></div>
                            </div>

                            <div class="table_colmw table_poup table_bordr" v-for="(box, key) in selected_gate_pass.box_details" v-bind:id="box.id">
                                <div class="table_modd1"><h4 class="table_head1"><span class="complete_consignment">{{box.details.awb_number}}</span></h4></div>
                                <div class="table_modd2"><h4 class="table_head1"><span class="complete_consignment">{{box.details.auth_id}} </span></h4></div>
                                <div class="table_modd3"><h4 class="table_head1"><span class="complete_consignment">{{box.details.pslip_number}} </span></h4></div>
                                <div class="table_modd4"><h4 class="table_head1"><span class="complete_consignment">{{selected_gate_pass.received_box_count}}</span></h4></div>
                            </div>
                        </div>
                    </div>
                    <div class="modal_table">
                        <h3 class="sign_ghead1">Blubirch Signature</h3>
                    </div>
                    <div class="modal_table">
                        <h3 class="sign_ghead2">Delivery Executive Signature</h3>
                    </div>

                </div>

                    <div class="button_grop" style="margin-bottom: 10px;">
                        <button class="button_prce" onclick="window.print()">Print Document</button>
                        <!-- <button class="button_prce" @click="print">Print Document</button> -->
                        <button class="button_prce"  data-dismiss="modal" @click="completeConsignmentDone">Done</button>
                    </div>                
            </div> 
        </div>
    </div>

<div>

    <div class="mobile_head">
        <button class="menu_toggle sidebarCollapse"><i class="fa fa-bars"></i></button>
        <h3 class="main_header">Customer Returns</h3>
    </div>
    <div class="rigt_navbar" id="content">
        <h3 class="main_header">Manage or Edit Boxes 
            <button :disabled="!isCompleteConsignment" class="edit_buttn1" :style="isCompleteConsignment? { 'backgroundColor': 'blue' }:''" data-toggle="modal" @click="generateProofOfDelivery" data-target="#myModal2">Complete Consignement</button></h3>
        <div class="exchng_head consign2">
            <div class="row">
                <div class="col-lg-6">
                    <div class="row">
                        <div class="form_groupw">
                            <h4 class="categ_head1 inwad_head">Gate Pass Number</h4>
                            <div class="form_group1 secrch_wdt">
                                <input v-model="selected_gate_pass.gate_pass_number" class="search_form margin6px" type="text" placeholder="Scan or Enter Gate Pass Number">
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
                                        {{selected_gate_pass.vendor_name}} / {{selected_gate_pass.gate_pass_number}}  
                                      </b-button>
                              </h5>
                            </div>
                            <b-collapse id="collapse-3">
                            <div>
                                <div class="card-body">
                                    <h4 class="categ_head3">Manage Box Details- {{selected_gate_pass.gate_pass_number}}</h4>
                                    <div class="model_drop1">
                                        <input class="search_frm1" v-model= "selected_gate_pass.invoice_number"  type="text" placeholder="Consignment ID * ">
                                    </div>
                                    <div class="model_drop1">
                                        <input class="search_frm1" v-model= "selected_gate_pass.vendor_name" type="text" placeholder="Seller * ">
                                    </div>
                                    <div class="model_drop1">
                                        <input class="search_frm1" v-model= "selected_gate_pass.trasporter" type="text" placeholder="Transporter *">
                                    </div>
                                    <div class="model_drop1">
                                        <input class="search_frm1" v-model= "selected_gate_pass.city_name" type="text" placeholder="City *">
                                    </div>
                                    <div class="model_drop1">
                                        <input class="search_frm1" v-model= "selected_gate_pass.box_count" type="text" placeholder="Box Count (As per Docket) *">
                                    </div>
                                    <div class="model_drop1">
                                        <input class="search_frm1" v-model= "selected_gate_pass.received_box_count" type="text" placeholder="Received Box Count *">
                                    </div>
                                    <div class="model_drop1">
                                        <input class="search_frm1" v-model= "new Date(selected_gate_pass.delivery_date).toLocaleDateString()" type="text" placeholder="Consignment Delivery Date * "> 
                                    </div>
                                    <div class="exchng_wrap file_upload">
                                        <h4 class="categ_head2">Attach Documents</h4>
                                        <form method="post" class="file-uploader" action="" enctype="multipart/form-data">
                                            <div class="file-uploader__message-area">
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
                                    <!-- <div class="exchng_wrap">
                                        <button class="consig_but2">Save Box Details</button>
                                    </div> -->
                                </div>
                            </div>
                            </b-collapse>
                        </div>
                    </div>
                </div>
            </div>
        </div>     
        <div class="packing_row">
			<div class="row">
				<div class="packing_st1 new_width1">
					<div class="exchng_cont">
						<div class="exchng_wrap">
							<div class="form_groupw new_scanbxf">
								<div class="form_group1 secrch_wdt">
									<input class="search_form margin6px" v-model="scaned_box" type="text" placeholder="Enter/Scan Box ID">
								</div>
								<button class="scanbox_btn" v-on:click="scan_Box_Detail(scaned_box)">Scan Box</button>
							</div>
							<div class="model_drop1 new_modal">
                                    <input class="search_frm1" type="text" placeholder="PSlip Number *" v-model="single_search_box_detail.pslip_number" id="pslip_number">
							</div>
							<div class="model_drop1 new_modal">
                                    <input class="search_frm1" type="text" placeholder="AWB Number *" v-model="single_search_box_detail.awb_number" id="awb_number" :class="{ 'is-invalid': $v.single_search_box_detail.awb_number.$error }">
                                <div>
                                    <span style="color:red" v-if="!$v.single_search_box_detail.awb_number.required && isSaveDetailClicked">awb Number is required</span>
                                </div>								
							</div>
							<div class="model_drop1 new_modal">
                                    <input class="search_frm1" type="text" placeholder="Auth ID *" v-model="single_search_box_detail.auth_id" id="auth_id">
							</div>                           
                            <div class="model_drop1 new_modal new_modal2">
                            <multiselect id="box_condition_id" placeholder="Select Box Grade/Condition" v-model= "single_search_box_detail.box_grade_conditions" :options="box_grade_conditions" label="original_code" track-by="id"  @input="assignBoxGradeCondition" :class="{ 'is-invalid': $v.single_search_box_detail.box_grade_conditions.$error }"></multiselect>                           
                                <div>
                                    <span style="color:red" v-if="!$v.single_search_box_detail.box_grade_conditions.required && isSaveDetailClicked">Box Grade/Condition is required</span>
                                </div> 
							</div>
							<div class="model_drop1 new_modal new_modal2">
                                    <multiselect id="return_reason_id" placeholder="Select Reason(s) *" v-model= "single_search_box_detail.return_reasons" :options="return_reasons" label="original_code" :disabled="is_reason_disabled" track-by="id"  @input="assignReturnReason" ></multiselect>
							</div>
							<div class="exchng_wrap file_upload">
								<h4 class="categ_head1 font_size14">Attach Documents</h4>
								<form method="post" class="file-uploader" action="" enctype="multipart/form-data">
									<div class="file-uploader__message-area">
									  <!--<p>Select a file to upload</p>-->
									</div>
									<div>
                                        <input ref="inputFile"  type="file" >
									</div>
									<input class="file-uploader__submit-button" type="submit" value="Upload">

								  </form>
							</div>  
							<div class="modl_upload">
								<button v-on:click="saveEditAddBox" class="table_butn3 font_size16 display_non">Save Box Details</button>
							</div>
						</div>
						
					</div>    
				</div>
				<div class="packing_st2 new_width2">
					<div class="packing_sw2">
						<h4 class="categ_head3 color_dull">Total Boxes Entered : {{Number(selected_gate_pass.received_box_count)}} of {{selected_gate_pass.box_count}} </h4>
						<div class="check_table">
							<div class="check_tablw">
								<div class="table_colmw table_bordr">
									<div class="table_cmng1"><h4 class="table_head1">BB Box ID</h4></div>
									<div class="table_cmng2"><h4 class="table_head1">Pslip No</h4></div>
									<!-- <div class="table_cmng3"><h4 class="table_head1">Spoo ID</h4></div> -->
									<div class="table_cmng4"><h4 class="table_head1">Auth ID</h4></div>
									<div class="table_cmng5"><h4 class="table_head1">AWB</h4></div>
									<!-- <div class="table_cmng6"><h4 class="table_head1">Removal Order ID</h4></div> -->
									<div class="table_cmng7"><h4 class="table_head1"></h4></div>
								</div>
								<div class="table_colmw table_bordr" v-for="(manage_box, key) in selected_gate_pass.received_box_count" :key="manage_box.id" v-bind:id="manage_box.id">
									<div class="table_cmng1"><h4 class="table_head1"><span>{{selected_gate_pass.box_details[key].details.box_number}}</span></h4></div>
									<div class="table_cmng2"><h4 class="table_head1"><span>{{selected_gate_pass.box_details[key].details.pslip_number ? selected_gate_pass.box_details[key].details.pslip_number:"NIL"}}</span></h4></div>
									<div class="table_cmng3"><h4 class="table_head1"><span>{{selected_gate_pass.box_details[key].details.auth_id ? selected_gate_pass.box_details[key].details.auth_id:"NIL"}}</span></h4></div>
									<div class="table_cmng4"><h4 class="table_head1"><span>{{selected_gate_pass.box_details[key].details.awb_number ? selected_gate_pass.box_details[key].details.awb_number:"NIL"}}</span></h4></div>
									<!-- <div class="table_cmng5"><h4 class="table_head1"><span>AWB123456</span></h4></div> -->
									<!-- <div class="table_cmng6"><h4 class="table_head1"><span>123456</span></h4></div> -->

                                <div style="display:none" :id="selected_gate_pass.box_details[key].details.box_number" class="row">
                                    <div style="margin-left:35%;margin-top:45%" id="section-to-print1" class="col-6 ">
                                        <barcode v-bind:value="selected_gate_pass.box_details[key].details.box_number">
                                            
                                        </barcode>
                                    </div>                                   
                                </div>                                     
									<div class="table_cmng7">
										<ul class="remove_butn"><li><a href="#" v-on:click="editSelectedBox(key)"><i class="fa fa-pencil-square-o"></i></a href="#"></li><li><a @click ="print(selected_gate_pass.box_details[key].details.box_number)"><i class="fa fa-print"></i></a></li></ul>
									</div>
								</div>                                
							</div>
						</div>
					</div>
				</div>
			</div>
        </div>
    </div>
</div>
</body>
</template>

<script>
  import { required } from 'vuelidate/lib/validators'
  import VueBarcode from 'vue-barcode';

  export default {
    name: 'ManageEditAddBoxes',
    data () {
      return {
        single_search_box_detail:{
                    'pslip_number':'',
                    'box_grade_conditions':'',
                    "auth_id":"",
                    'awb_number':'',
                    "return_reason_id":"",
                    "box_condition_id":"",
                    "box_number":""},
        gate_pass_number:'',
        selected_gate_pass:'',
        selected_id:'',
        return_reasons: [],
        box_grade_conditions: [],
        today:'',
        isActiveModal:false,
        isSaveDetailClicked:false,
        is_reason_disabled:true,
        random:20,
        isCompleteConsignment:false,
        count:0, 
        scaned_box:'',
        scaned_box_detail:{}      
      }
    },
      components: {
    'barcode': VueBarcode
  },    
  validations: {
        single_search_box_detail:{
                    awb_number:{required},
                    box_grade_conditions:{required},}
    },
  computed:{
  },
  created() {
    let dateTime = new Date()
    this.today = (dateTime.getMonth()+1)+'/'+dateTime.getDate()+'/'+dateTime.getFullYear()
    this.getReturnReason()
    this.getBoxGradeConditions()
    this.selected_gate_pass = this.$store.state.selected_gatepass
    this.single_search_box_detail.box_condition_id = this.selected_gate_pass.box_details[0].box_condition_id
    },    
    methods: {
    print (id) {
      this.$htmlToPaper(id);
    },
    assignReturnReason () {
      this.single_search_box_detail.return_reason_id = this.single_search_box_detail.return_reasons.id
    },

    assignBoxGradeCondition (){
        this.single_search_box_detail.box_condition_id = this.single_search_box_detail.box_grade_conditions.id
        if(this.single_search_box_detail.box_grade_conditions.original_code==='Damaged'){
            this.is_reason_disabled = false
        }
        else{
            this.is_reason_disabled = true
        }        
    },

    getReturnReason () {
    this.$http.secured.get('/api/v1/lookups/get_warehouse_reasons')
    .then(response => { 
    this.return_reasons = response.data.lookup_values })
    .catch(error => this.$toast.error('Error in fetching customer return reasons'))
    },

    getBoxGradeConditions () {
    this.$http.secured.get('api/v1/warehouse/gate_passes/get_box_conditions')
    .then(response => { this.box_grade_conditions = response.data.lookup_values })
    .catch(error => this.$toast.error('Error in fetching box conditions'))
    },

    editSelectedBox(selectedId){
        this.single_search_box_detail = this.mapBoxDetails(this.selected_gate_pass.box_details[selectedId].details)
        this.selected_id = selectedId;
    },

    scan_Box_Detail(boxNumber){
         this.scaned_box_detail = this.selected_gate_pass.box_details.find(x => x.details.box_number === boxNumber)
         if(this.scaned_box_detail!= undefined){
         this.single_search_box_detail = this.scaned_box_detail.details;
         }
         else{
             this.clearBoxDetails();
         }
    },

    mapBoxDetails (selectedObj){
        this.single_search_box_detail = selectedObj
        this.single_search_box_detail.auth_id = selectedObj.auth_id
        this.single_search_box_detail.awb_number = selectedObj.awb_number
        this.single_search_box_detail.number = selectedObj.number
        this.single_search_box_detail.pslip_number = selectedObj.pslip_number
        box_condition_id
        this.single_search_box_detail.box_condition_id = selectedObj.box_condition_id?selectedObj.box_condition_id:0
        this.single_search_box_detail.return_reason_id = selectedObj.return_reason_id?selectedObj.return_reason_id:0
        this.single_search_box_detail.box_number = selectedObj.box_number

        if(this.single_search_box_detail.box_condition_id===0){
            this.is_reason_disabled = false
        }
        else{
            this.is_reason_disabled = true
        }         
        return this.single_search_box_detail
    },
    
    saveEditAddBox() {       
      this.$v.single_search_box_detail.$touch();
        if (this.$v.single_search_box_detail.$invalid) {
        this.isSaveDetailClicked = true;
            return;
        }   
        this.count++; 
        this.single_search_box_detail.box_number = this.selected_gate_pass.box_details[this.selected_id==""?0:this.selected_id].details.box_number  
        this.selected_gate_pass.box_details[this.selected_id==""?0:this.selected_id].details = this.single_search_box_detail
        this.selected_gate_pass.box_details[this.selected_id==""?0:this.selected_id].box_condition_id = this.single_search_box_detail.box_condition_id
        if(this.count>=Number(this.selected_gate_pass.received_box_count)){
            this.isCompleteConsignment = true;
        }
        else{
            this.isCompleteConsignment = false;
        }        
        this.clearBoxDetails();
        this.isSaveDetailClicked = false;
        this.is_reason_disabled = true
    },

    generateProofOfDelivery (){
        let box_details = {
        consignment_box:{
            id:this.selected_gate_pass.id,
            box_details:this.selected_gate_pass.box_details}
        }
    this.$http.secured.post('/api/v1/warehouse/gate_passes/update_box_detail', box_details)
    .then(response => {if(response.status==200){
        this.isActiveModal=true
    } })
    .catch(error => this.$toast.error('Error while updating boxes.'))
    },
    clearBoxDetails(){
        this.single_search_box_detail ={
                "pslip_number":"",
                "auth_id":"",
                "awb_number":"",
                "return_reason_id":"",
                "box_condition_id":""}
    },
    completeConsignmentDone (){
    this.$http.secured.post('/api/v1/warehouse/gate_passes/complete_consignment', {gate_pass_number:this.selected_gate_pass.gate_pass_number})
    .then(response => {if(response.status==200){
        this.isActiveModal=false
        this.$toast.success('Consignment updated successfully !')
        this.$store.commit('setWareHouseDetails', {selected_gatepass: ''})
        this.$router.push({ name: 'ReInwardInventry'})
        return
    } })
    .catch(error => this.$toast.error('Error while updating Consignment.'))
    }
   }
  }
</script>