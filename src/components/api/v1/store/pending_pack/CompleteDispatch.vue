<template>
  <body>
    <div class="modal fade cutomr_modal" id="myModal" role="dialog" v-if="isActiveModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <button type="button" class="close qc_result" data-dismiss="modal">&times;</button>
          <div class="modal-body">
            <h3 class="barc_mod_hed">Gate Pass : <span> {{gate_passes}} </span></h3>
            <div class="modal_sect1 after_stow">
              <ul class="test_resul2">
                <li>Total Gate pass : <strong> {{selected_value.length}} </strong></li>
              </ul>
            </div>
            <div class="modal_sect2">
              <ul class="test_resul2">
                <li>Box: <strong>{{box_count}}</strong></li>
              </ul>
            </div>
            <div class="pick_button">
              <button class="barcode_bt2 no_bg_butn" data-dismiss="modal">Go back</button>
              <button class="barcode_bt2" data-dismiss="modal" @click="createConsignment()">Complete</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="">
      <div class="mobile_head">
        <button class="menu_toggle sidebarCollapse"><i class="fa fa-bars"></i></button>
        <h3 class="main_header">INV35643</h3>
      </div>
      <div class="rigt_navbar" id="content">
        <h3 class="main_header display_non">Pending Dispatch <button @click='showDetails()' class="qc_p_buttn3" data-toggle="modal" data-target="#myModal"><span>Complete Dispatch </span></button></h3>
        <div class="row">
          <div class="col-lg-6">
            <div class="pp_test_sec">
              <ul class="qc_test_ul4">
                <li>No. of Gate Pass : <span> {{selected_value.length}}</span></li>
                <li>Destination : <span>{{selected_value[0].client.details.warehouse_code}}</span></li>
              </ul>
            </div>
          </div>
        </div><br>
        <div class="pack_colum1">
          <div v-for = "(selected, index) in selected_value" class="card card2">
            <div class="accordion" id="myAccordion">
              <div class="card-header" id="headingOne">
                <div class="table_colmw table_bordr">
                    <div class="tbl_colpic1"><h4 class="table_head1">Gate Pass No - <span> {{selected.gatepass_number}}</span></h4></div>
                    <div class="tbl_colpic2"><h4 class="table_head1"><br></h4></div>
                    <div class="tbl_colpic3"><h4 class="table_head1">Boxes: <span> {{selected.box_count}} </span></h4> <button type="button" class="btn_Collapse collapsed" data-toggle="collapse" :data-target="`#collapseOne${index}`"><i class="fa fa-caret-down"></i></button></div>
                </div>
              </div>
              <div :id="`collapseOne${index}`" class="collapse" aria-labelledby="headingOne" data-parent="#myAccordion">
                <div v-for="box in  selected.boxes" class="check_table">
                  <div class="check_tablw">
                    <div class="table_colmw table_bordr table_poup">
                      <div class="tbl_p_pack4"><h4 class="table_head1"></h4></div>
                      <div class="tbl_p_pack1"><h4 class="table_head1"><span> {{box.box_number}} </span></h4></div>
                      <div class="tbl_p_pack2"><h4 class="table_head1"><span><br></span></h4></div>
                      <div class="tbl_p_pack3"><h4 class="table_head1"><span class="pass_test"><br></span></h4></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pack_colum2" >
          <form @submit.prevent="createConsignment"  novalidate="true" id="consignmentForm" enctype="multipart/form-data">
            <div class="check_table scroll">
              <h4 class="outwad_head">Dispatch Details</h4>
              <div class="model_drop1 pp_frm_w">
                <span >Outward document No. *</span>
                <input class="search_frm1" type="text" placeholder="123456787432" v-model="newconsignment.outward_document_number" :class="{'is-invalid': $v.newconsignment.outward_document_number.$error , 'is-valid': !$v.newconsignment.outward_document_number.$invalid}">
                <div class="invalid-feedback">
                  <span v-if="!$v.newconsignment.outward_document_number.required">Outward Document Number is required</span>
                </div>
              </div>

              <div class="model_drop1 pp_frm_w">
                <select class="search_frm1" v-model="newconsignment.logistics_partner_id" :class="{ 'is-invalid': $v.newconsignment.logistics_partner_id.$error , 'is-valid': !$v.newconsignment.logistics_partner_id.$invalid }">
                  <option disabled value="" selected="">Select a Logistics</option>
                  <option :value="logistic.id" v-for="logistic in logistics" :key="logistic.id">{{ logistic.name }}</option>
                </select>
                <div class="invalid-feedback">
                  <span v-if="!$v.newconsignment.logistics_partner_id.required">Logistics is required</span>
                </div>
              </div>

              <div class="model_drop1 pp_frm_w">
                <input class="search_frm1" type="text" onkeypress="return /[a-z]/i.test(event.key)" placeholder="Driver Name *" v-model="newconsignment.driver_name" :class="{'is-invalid': $v.newconsignment.driver_name.$error , 'is-valid': !$v.newconsignment.driver_name.$invalid}">
                <div class="invalid-feedback">
                  <span v-if="!$v.newconsignment.driver_name.required">Driver name is required</span>
                </div>
              </div>

              <div class="model_drop1 pp_frm_w">
                <input class="search_frm1" type="number" placeholder="Driver Contact Number *" v-model="newconsignment.driver_contact_number" :class="{'is-invalid': $v.newconsignment.driver_contact_number.$error , 'is-valid': !$v.newconsignment.driver_contact_number.$invalid}">
                <div class="invalid-feedback">
                    <span v-if="!$v.newconsignment.driver_contact_number.required">Driver number is required</span>
                  <span v-else-if="!$v.newconsignment.driver_contact_number.minLength">Number is invalid</span>
              <span v-else-if="!$v.newconsignment.driver_contact_number.maxLength">Number is invalid</span>
                </div>
              </div>

              <div class="model_drop1 pp_frm_w">
                <input class="search_frm1" type="text" placeholder="Truck Number *" v-model="newconsignment.truck_number" :class="{'is-invalid': $v.newconsignment.truck_number.$error , 'is-valid': !$v.newconsignment.truck_number.$invalid}">
                <div class="invalid-feedback">
                  <span v-if="!$v.newconsignment.truck_number.required">Truck number is required</span>
                </div>
              </div>

              <!-- <div class="model_drop1 pp_frm_w">
                <div class="file-chooser cstom_input">
                  <label> Choose a file to attach <img src="@/assets/images/icons/add.svg">

                    <input type="file" ref="inputFile"  class="form-control" id="file"></label>

                </div>
              </div> -->
              <div v-for="(file, index) in newconsignment.files">
                <div class="model_drop1 pp_frm_w">
                  <div align="right">
                    <span><i @click=removeFile(index) class="fa fa-trash"></i></span>
                  </div>
                  <select class="search_frm1" v-model="file.consignmment_file_type_id">
                    <option disabled value="" selected="">Select File Type</option>
                    <option :value="consignment_file_type.id" v-for="consignment_file_type in consignment_file_types" :key="consignment_file_type.id">{{ consignment_file_type.original_code }}</option>
                  </select>
                </div>

                <div class="model_drop1 pp_frm_w">
                  <input class="form-control" ref="inputFile"  type="file" @change="uploadFile(index, $event)" :id="`file-${index}`">
                </div>
              </div>

              <div class="model_drop1 pp_frm_w" align="right">
                <span><i @click= addFile class="fa fa-plus"></i></span>
              </div>

            </div>
          </form>
        </div>
      </div>

    </div>
  </body>
</template>

<script>
  import $ from 'jquery'
  import { required , minLength , maxLength } from 'vuelidate/lib/validators'

  export default {
    name: 'CompleteDispatch',
    data () {
      return {
        selected_value: [],
        gate_passes: '',
        gate_pass_ids: [],
        box_count: 0,
        logistics: [],
        consignment_file_types: [],
        file: '',
        isActiveModal: true,
        selected_ids: this.$store.state.selected_rrn.map(value => value.id),
        newconsignment: {
          'outward_document_number': '',
          'driver_name': '',
          'driver_contact_number': '',
          'truck_number': '',
          'logistics_partner_id': '',
          'files': [{'consignmment_file_type_id': '', 'consignment_file': null}],
        }
      }
    },
    validations: {
      newconsignment: {
        outward_document_number: { required },
        driver_name: { required },
        driver_contact_number: { required, minLength: minLength(10) , maxLength: maxLength(10) },
        truck_number: { required},
        logistics_partner_id: {required}

      }
    },


    created () {
      this.getGatepasses()
      this.getLogistics()
      this.getConsignmentFileType()
    },
    methods: {

      getGatepasses(){

        this.$http.secured.get('/api/v1/store/pending_dispatch/get_selected_gate_passes', {params:{ids: this.selected_ids}})
          .then(response => {
            this.selected_value = response.data.gate_passes
          })
          .catch(error => {
            this.$toast.error('Error in fetching Gate Passes')
          })

      },

      showDetails(){
        this.$v.newconsignment.$touch();
          if (this.$v.newconsignment.$invalid) {
              this.isActiveModal = false
              return;
          }
          this.isActiveModal = true

        var passes = []
        var ids = []
        var count = 0
        this.selected_value.forEach(function(value, index){
          passes.push(value.gatepass_number)
          ids.push(value.id)
          count += value.box_count
        })
        this.gate_passes = passes.join(', ')
        this.gate_pass_ids = ids
        this.box_count = count
      },

      getLogistics(){
        this.$http.secured.get('/api/v1/store/pending_dispatch/logistics')
          .then(response => {
            this.logistics = response.data.logistics_partners
            this.newconsignment.logistics_partner_id = response.data.logistics_partners[0].id

          })
          .catch(error => {
            this.$toast.error('Error in fetching Logistics')
          })
      },
      getConsignmentFileType(){
        this.$http.secured.get('/api/v1/store/pending_dispatch/consignment_file_types')
          .then(response => {
            this.consignment_file_types = response.data.lookup_values

          })
          .catch(error => {
            this.$toast.error('Error in fetching Consignment File Type')
          })
      },

      createConsignment(){
        this.showDetails()
        

        for (var i = 0; i < this.newconsignment.files.length; i++){
          if (this.newconsignment.files[i].consignmment_file_type_id != '' && this.newconsignment.files[i].consignment_file == null){
            this.$toast.error('Please add file')
            return
          }

          if (this.newconsignment.files[i].consignment_file != null  && this.newconsignment.files[i].consignmment_file_type_id == '' ){
            this.$toast.error('Please add file type')
            return
          }
        }

        let formData = new FormData()
        const params = {

            outward_document_number: this.newconsignment.outward_document_number,
            driver_name: this.newconsignment.driver_name,
            driver_contact_number: this.newconsignment.driver_contact_number,
            truck_number: this.newconsignment.truck_number,
            logistics_partner_id: this.newconsignment.logistics_partner_id
          }

        Object.entries(params).forEach(
          ([key, value]) => formData.append(key, value)
        )

        for (var i = 0; i < this.gate_pass_ids.length; i++) {
          formData.append('gate_pass_ids[]', this.gate_pass_ids[i]);
        }

        for (var i = 0; i < this.newconsignment.files.length; i++){
          formData.append('consignment_files_types[]', this.newconsignment.files[i].consignmment_file_type_id);
          formData.append('consignment_files[]', this.newconsignment.files[i].consignment_file);
        }


        this.$http.secured.post('/api/v1/store/pending_dispatch/create_consignment', formData)
          .then(response => {
            this.isActiveModal = false
            this.$toast.success('Dispatch successfully completed')
            
            this.$router.push('/api/v1/store/pending_pack/pending_dispatch')
          })
          .catch(error => this.$toast.error('Error in creating consignment'))

      },

      addFile(){
        this.newconsignment.files.push({'consignmment_file_type_id': '', 'consignment_file': null})
      },

      removeFile(fileid){
        if (this.newconsignment.files.length >= 1) {
         this.newconsignment.files.splice(fileid, 1)
        }
      },
      uploadFile: function(ind, eve) {
        this.newconsignment.files[ind].consignment_file = eve.target.files[0]
      }
    }
  }

</script>

<style type="text/css" scoped>
  .card2 {
    width: 104%;
  }

  .model_drop1 {
    float: left;
    width: 100% !important;
    padding: 14px 35px;
  }
  .scroll {
    float:left;
    overflow-y: auto;
    height: 500px;
  }
</style>