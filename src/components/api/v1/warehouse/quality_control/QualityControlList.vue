<template>
  <body>
    <div class="modal fade cutom2_modal" id="myModal2" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <button type="button" class="close qc_result" data-dismiss="modal">&times;</button>
          <div class="modal-body">
            <div class="check_table">
              <div class="check_tablw stow_scroll">
                <div class="table_colmw table_poup">
                  <h3 class="q2_modal_hd">{{modal_inventory.name}}<span></span></h3>
                  <div v-for="(item, key) in modal_inventory">
                    <div class="inward_colm1">
                      <div class="table_modl3" v-if="key != 'id'"><h4 class="table_head1"><span>{{ key.toUpperCase().replace('_', ' ') }} :</span>{{ item }}</h4></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade cutomr_modal" id="myModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <button type="button" class="close qc_result" data-dismiss="modal">&times;</button>
          <div class="modal-body">
            <h3 class="barc_mod_hed">Toat number : <span>{{entered_toat_number}}</span></h3>
            <div class="modal_sect1">
              <h3 class="qc_modal_hd"><span>Total Inventories </span>{{this.all_inventories.length}}</h3>
            </div>
            <div class="modal_sect2">
              <ul class="test_result">
                <li style="padding-left:8px;">Tested: <strong>{{passed+failed}}</strong></li>
                <li>Passed: <strong class="pass_test" >{{passed}}</strong></li>
                <li style="padding-left:32px;">Fail: <strong class="fail_test">{{failed}}</strong></li>
              </ul>
            </div>
            <div class="info_qc_sc">
              <div class="custome_tip2"><img src="@/assets/images/icons/info.svg"></img> QC Pass for the Box<div class="tooltip_pop2">Documentation and examples</div></div>
            </div>
            <button class="barcode_bt2" v-on:click="completeQc" >Complete QC</button>
          </div>
        </div> 
      </div>
    </div>

    <div class="rigt_navbar" id="content">
      <div>
      <h3 class="main_header display_non">Quality Control 
        <button :disabled="!isCompleteQCAvailable" class="qc_p_button" :style="isCompleteQCAvailable? { 'backgroundColor': 'blue' }:''" data-toggle="modal" data-target="#myModal" >Complete Quality Control</button></h3>
        </div>

    <form @submit.prevent="filterInventory">

      <div class="row">
        <div class="col-lg-6">
          <div class="row">
            <div class="col-lg-5">
              <div class="form_groupw sku_search mrgin_9px">
                <div class="row">
                  <h4 class="categ_head2 qh_smallhd1">Toat Number</h4>
                  <div class="form_group1 mobil50px">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <input class="search_form" type="text" v-model="entered_toat_number"></input>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-5">
              <div class="form_groupw sku_search mrgin_9px">
                <div class="row">
                  <h4 class="categ_head2 qh_smallhd1">Tag Number</h4>
                  <div class="form_group1 mobil50px">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <input class="search_form" type="text" v-model="entered_tag_number" placeholder="Scan or Enter tag number"></input>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-2">
              <div class="row">
                <button class="qc_search_b height_34px">Search</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="qc_test_sec dsply_none6">
            <ul class="qc_test_uli">
              <li>To Be Tested : <span>{{to_be_tested}}</span></li>
              <li>Passed : <span>{{passed}}</span></li>
              <li>Failed : <span class="failed_qc">{{failed}}</span></li>
            </ul>
          </div>
        </div>
      </div>
</form>
      <div class="check_table">
        <div class="check_tablw mob_60non stow_scroll table_font12px">
          <div class="table_colmw table_bordr">
            <div class="table_colq1"><h4 class="table_head1">Sl. no</h4></div>
            <div class="table_colq2"><h4 class="table_head1">Tag Number</h4></div>
            <div class="table_colq3"><h4 class="table_head1">Item Description</h4></div>
            <div class="table_colq4"><h4 class="table_head1">Physical Status</h4></div> 
            <div class="table_colq5"><h4 class="table_head1">Packaging Status</h4></div>
            <div class="table_colq6"><h4 class="table_head1">Grade</h4></div>
            <div class="table_colq7"><h4 class="table_head1">Disposition</h4></div>
            <div class="table_colq8"><h4 class="table_head1">Decision</h4></div>
          </div>
          <div v-for="(inventory,index) in selected_inventories" :class="{ 'table_colmw table_bordr table_poup current': activeIndex === index}" :key="inventory.id" @click="setActive(index)">
          <div class="table_colmw table_bordr table_poup">
          <div v-for="inv in inventory.inventory_grading_details">
            <div class="table_colq1"><h4 class="table_head1"><span>{{ index + 1  }}</span></h4></div>
            <div class="table_colq2"><h4 class="table_head1"><span><strong>Tag number :</strong>{{inventory.tag_number ? inventory.tag_number : "N/A"}}</span></h4></div>
            <div class="table_colq3"><h4 class="table_head1"><span><strong>Item Description :</strong>{{inventory.details.item_description ? inventory.details.item_description : "Nil"}}</span></h4></div>
            <div class="table_colq4"><h4 class="table_head1"><span><strong>Physical Status :</strong>{{inv.physical_status ? inv.physical_status : "Nil"}}</span></h4></div>
            <div class="table_colq5"><h4 class="table_head1"><span><strong>Packaging Status :</strong>{{inv.packaging_status ? inv.packaging_status : "Nil"}}</span></h4></div>
            <div class="table_colq6"><h4 class="table_head1"><span><strong>Grade :</strong>{{inventory.details.grade ? inventory.details.grade : "Nil" }}</span></h4></div>
            <div class="table_colq7"><h4 class="table_head1"><span><strong>Disposition :</strong>{{inventory.details.disposition ? inventory.details.disposition : "Nil"}}</span></h4></div>
            <div class="table_colq8"><h4 class="table_head1"><span><strong>Decision :</strong>{{inventory.details.decision ? inventory.details.decision : "Not Tested"}}</span></h4></div>
            <div class="butn_grpoups">
              <div class="group_butons">
                <button :disabled="inventory.details.decision != undefined" class="button1_fail" @click="failDecision(index)">Fail</button>
                <button :disabled="inventory.details.decision != undefined" class="button1_pass" @click="passDecision(index)">Pass</button>
              </div>
            </div>
            </div>
          </div>
          </div>
        </div>
        <div class="row">
          <button class="table_mobtn">Save and Continue</button>  
        </div>
      </div>
    </div>
  </body>
</template>


<script>
import { mapState } from 'vuex'
import $ from 'jquery'

export default {
  name: 'ReturnRequest',
  computed: mapState([
    'toat_number'
    ]),
  data () {
    return {
      entered_toat_number: '',
      selected_inventories: [],
      all_inventories: [],
      entered_tag_number: '',
      modal_inventory: {},
      activeIndex: undefined,
      to_be_tested: '',
      passed: 0,
      failed: 0,
      sum_passed_failed: 0,
      isCompleteQCAvailable: false,
      to_be_tested_total: '',
    }
  },
  created () {
    this.getDataFromStore(this.$store.state.inventories, this.$store.state.toat_number)
  },
  methods: {
    getDataFromStore(all_inventory, toat_number){
      this.entered_toat_number = toat_number
      this.all_inventories = all_inventory.inventories
      this.passed = this.all_inventories.filter(x => x.details.decision === "Pass").length
      this.failed = this.all_inventories.filter(x => x.details.decision === "Fail").length
      this.selected_inventories = this.all_inventories
      this.to_be_tested = all_inventory.to_be_tested
      this.to_be_tested_total = this.to_be_tested 
    },

    getInventories (toat_number) {
      let search_param = {
        params:{
        toat_number:toat_number
        }
      }
      this.$http.secured.get('/api/v1/warehouse/quality_control/fetch_inventories', search_param)
      .then(response => { if(response.data.inventories.length) { this.all_inventories = response.data,
        this.getDataFromStore(this.all_inventories, this.entered_toat_number)
        this.$store.commit('setQc', {toat_number: this.entered_toat_number, inventories: this.all_inventories })
        } else { 
          this.all_inventories = [],
          this.selected_inventories = this.all_inventories
          this.$toast.error('Please check Toat No. entered')
        }
      })
      .catch(error => this.$toast.error('Error in fetching Inventories'))
    },

    setActive(index) { this.activeIndex = index },

    filterInventory () {
      if (this.entered_tag_number) {
        if(this.entered_toat_number === this.$store.state.toat_number){
          var entered_toat_number = this.entered_toat_number
          var entered_tag_number = this.entered_tag_number
          var selected_inventories = []
          let isInventoryFond = false;
          this.all_inventories = this.all_inventories.length?this.all_inventories:this.$store.state.inventories
          this.all_inventories.map(function (inventory) {
            if ( inventory.tag_number  && inventory.tag_number.toLowerCase().match(entered_tag_number.toLowerCase())) {
              selected_inventories.push(inventory);
              isInventoryFond = true
            }
          });
          !isInventoryFond? this.$toast.error("No Inventories matches") : ''
          this.selected_inventories = selected_inventories
        } else {
          this.getInventories(this.entered_toat_number)
        }
      } else {
        this.getInventories(this.entered_toat_number)
      }
    },

    goToQcTag () {
      this.$store.commit('setQc', {toat_number: this.toat_number, tag_number: this.entered_tag_number, inventories: this.selected_inventories})
      this.$router.push('/quality_control_decision')
    },

    failDecision (index) {
      if (this.selected_inventories[index].details.decision == undefined) {
        this.selected_inventories[index].details.decision = "Fail"
        this.failed ++
        this.computeCompleteQCAvailable(this.passed, this.failed)
      } else {
        this.$toast.error('This inventory is alreay Tested');
      }
    },
    
    passDecision (index) {
      if (this.selected_inventories[index].details.decision == undefined) {
        this.selected_inventories[index].details.decision = "Pass"
        this.passed ++
        this.computeCompleteQCAvailable(this.passed, this.failed)
      } else {
        this.$toast.error('This inventory is alreay Tested');
      }
    },

    computeCompleteQCAvailable (passed, failed) {
      this.to_be_tested --
      this.to_be_tested = this.to_be_tested < 0? 0 : this.to_be_tested
      this.sum_passed_failed = passed + failed
      this.isCompleteQCAvailable = this.sum_passed_failed >= this.to_be_tested_total ? true: false
    },

    completeQc () {
      if(this.sum_passed_failed >= this.to_be_tested_total){
        let qc_disposition = {
          params:{
            toat_number: this.entered_toat_number,
            failure_count: this.failed
          }
        }
        this.$http.secured.post('/api/v1/warehouse/quality_control/complete_qc', qc_disposition).
        then(response => { if(response.status == 200){
                $('#myModal').modal('hide');
          this.$toast.success('QC done successfully! ')
         this.$router.push({ name: 'QualityControl'})

        }}).catch(error=>this.$toast.error('Error while updating Complete QC'))
        } else{ this.$toast.error('Inventories must be tested as To Be Tested count') }
    }
  }
}
</script>

<style scoped>
.table_colq6 {
  float: left;
  width: 12%;
}
.table_colq8 .table_head1 span {font-weight:normal;}

.check_tablw.table_font12px .table_head1{
  font-size:14px;
}
</style>
