<template>
<body>
    <div class="mobile_head">
        <button class="menu_toggle sidebarCollapse"><i class="fa fa-bars"></i></button>
        <h3 class="main_header">Customer Returns</h3>
    </div>
    <div class="rigt_navbar" id="content">
        <h3 class="main_header">New Inward  & ManageBoxes</h3>
        <div class="row">
            <div class="col-lg-6">
                <div class="row">
                    <div class="form_groupw">
                        <h4 class="categ_head1 inwad_head">Gate Pass Number</h4>
                        <div class="form_group1 secrch_wdt">
                            <i class="fa fa-search" aria-hidden="true"></i>
                            <input class="search_form" v-model="gate_pass_number" v-on:change="searchInwardBoxesBy(gate_pass_number)" type="text" placeholder="Scan or Enter Gate Pass Number">
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
                    <input class="search_frm1" v-model="enteredBox.vendor" type="text"  id="vendor" placeholder="Vendor*" :class="{ 'is-invalid': $v.enteredBox.vendor.$error}">
                    <div class="invalid-feedback">
                    <span v-if="!$v.enteredBox.vendor.required">Vendor is required</span>
                     </div>
                </div>
                <div class="model_drop1">
                    <input class="search_frm1" v-model="enteredBox.number" type="text" placeholder="Service Request *" :class="{ 'is-invalid': $v.enteredBox.number.$error}">
                    <div class="invalid-feedback">
                    <span v-if="!$v.enteredBox.number.required">Service Request is required</span>
                     </div>
                </div>
                <div class="model_drop1">
                    <input class="search_frm1" v-model="enteredBox.transporter" type="text" placeholder="Transporter *" :class="{ 'is-invalid': $v.enteredBox.transporter.$error}">
                     <div class="invalid-feedback">
                    <span v-if="!$v.enteredBox.transporter.required">Transporter is required</span>
                     </div>
                </div>
                <div class="model_drop1">
                    <input class="search_frm1" v-model="enteredBox.model" type="text" placeholder="Model" :class="{ 'is-invalid': $v.enteredBox.model.$error}">
                    <div class="invalid-feedback">
                    <span v-if="!$v.enteredBox.model.required">Model is required</span>
                     </div>
                </div>
                <div class="model_drop1">
                    <input class="search_frm1" type="text" v-model="enteredBox.actual_box_count" placeholder="Box Count (As per Sy)tem) *" :class="{ 'is-invalid': $v.enteredBox.actual_box_count.$error}">
                    <div class="invalid-feedback">
                    <span v-if="!$v.enteredBox.actual_box_count.required">Actual Box Count is required</span>
                     </div>
                </div>
                <div class="model_drop1">
                    <input class="search_frm1" type="text" v-model="enteredBox.received_box_count" placeholder="Recieved Box Count *" :class="{ 'is-invalid': $v.enteredBox.received_box_count.$error, 'is-valid': !$v.enteredBox.received_box_count.$invalid }">
                    <div class="invalid-feedback">
                    <span v-if="!$v.enteredBox.received_box_count.required">Recieved Box Count is required</span>
                     </div>
                </div>
                <div class="model_drop1">
                    <input class="search_frm1" v-model="enteredBox.delivery_date" type="text" placeholder="Delivery Date  *" :class="{ 'is-invalid': $v.enteredBox.delivery_date.$error, 'is-valid': !$v.enteredBox.delivery_date.$invalid }">
                    <div class="invalid-feedback">
                    <span v-if="!$v.enteredBox.delivery_date.required">Delivery Date is required</span>
                     </div>
                </div>
            </div>
            <div class="exchng_wrap file_upload">
                <h4 class="categ_head1">Attach Documents</h4>
                <form method="post" class="file-uploader" action="" enctype="multipart/form-data">
                    <div class="file-uploader__message-area">
                      <!--<p>Select a file to upload</p>-->
                    </div>
                   <!-- <div class="file-chooser cstom_input">
                        <label> Choose a file to attach <img src="@/assets/images/icons/add.svg">
                            <input class="file-chooser__input" type="file" size="60" >
                        </label> 
                    </div> -->
                        <input type="file" ref="inputFile"  class="form-control" id="file">

                    <input class="file-uploader__submit-button" type="submit" value="Upload">
                  </form>
            </div>  
            <button class="save_buton1" v-on:click="saveNewBox">Save & Add boxes</button>
        </div>  
    </div>
</body>
</template>

<script>
  import { required } from 'vuelidate/lib/validators'

  export default {
    name: 'NewInwardManageBoxes',
    data () {
      return {
        enteredBox: {
        'vendor': '',
        'number': '',
        'transporter': '',
        'actual_box_count': '',
        'received_box_count': '',
        'delivery_date': ''
      },
        enter_box_number: '',
        box_numbers: ["a123", "b123", "c123"],
        sku_codes: '',
        errors1: [],
        enter_sku: '',
        errors2: [],
        hideSearch: false,
        hideGrading: true,
        selected_reason: '',
        gate_pass_number:''
      }
    },
    validations: {
    enteredBox: {
      vendor: { required },
      number: { required },
      model: {required},
        transporter : {required},
        actual_box_count : {required},
        received_box_count : {required},
        delivery_date : {required}
    }
  },
    methods: {
        searchInwardBoxesBy(gate_pass_number) {
            this.enteredBox = this.$store.state.return_request.find(x=>x.gate_pass === gate_pass_number)
            this.enteredBox.delivery_date = '20-05-2020'
            this.enteredBox.model = 'G-8125'
        },
      saveNewBox() {
        this.$v.$touch();
        if (this.$v.$invalid) {
            return;
        }
          this.$router.push({name: 'ManageEditBoxes'})
      },
    }
  }
</script>