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
                  <div v-for="(item, key) in modal_inventory" >
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
                <!-- <li>Total Inventories: <strong>{{this.all_inventories.length}}</strong></li> -->
                <li style="padding-left:27px;">Stowed: <strong class="pass_test">{{stowed}}</strong></li>
                <li>Not Found: <strong class="fail_test">{{not_found}}</strong></li>
              </ul>
            </div>
            <div class="info_qc_sc" style="padding:0px!important;">
            </div>
            <button class="barcode_bt2" v-on:click="completeStowing" >Complete Stowing</button>
          </div>
        </div> 
      </div>
    </div>

    <div class="rigt_navbar" id="content">
      <h3 class="main_header display_non">Stowing List 
        <button :disabled="this.stow_ids.length <= 0" class="qc_p_button" :style="this.stow_ids.length > 0? { 'backgroundColor': 'blue' }:''" data-toggle="modal" data-target="#myModal">Complete Stowing</button></h3>
            <form @submit.prevent="filterInventory">

      <div class="row">
        <div class="col-lg-6">
          <div class="row">
            <div class="col-lg-5">

              <div class="form_groupw sku_search">
                <div class="row">
                  <h4 class="categ_head2 qh_smallhd1 margin_btmpx">Toat Number</h4>
                  <div class="form_group1 mobil50px">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <input class="search_form" type="text" v-model="entered_toat_number"></input>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-5">
              <div class="form_groupw sku_search">
                <div class="row">
                  <h4 class="categ_head2 qh_smallhd1 margin_btmpx">Tag Number</h4>
                  <div class="form_group1 mobil50px">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <input class="search_form" type="text" v-model="entered_tag_number" placeholder="Scan or Enter tag number"></input>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-2">
              <div class="row">
                <button class="qc_search_b butt_mobile">Search</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="qc_test_sec dsply_none6">
            <ul class="qc_test_uli">
              <li>Total Inventories  : <span>{{this.all_inventories.length}}</span></li>
              <li>Stowed : <span>{{stowed}}</span></li>
              <li>Not Found : <span class="failed_qc">{{not_found}}</span></li>
            </ul>
          </div>
        </div>
      </div>
      </form>
      <div class="check_table">
        <div class="check_tablw stow_scroll">
                <div class="table_colmw table_bordr">
                    <div class="table_cols1"><h4 class="table_head1">Sl. no</h4></div>
                    <div class="table_cols2"><h4 class="table_head1">Tag Number</h4></div>
                    <div class="table_cols3"><h4 class="table_head1">Item Description</h4></div>
                    <div class="table_cols4"><h4 class="table_head1">Status</h4></div>
                    <div class="table_cols5"><h4 class="table_head1">Disposition</h4></div>
                    <div class="table_cols6"><h4 class="table_head1">Location</h4></div>
                </div>
          <div v-for="(inventory,index) in selected_inventories" :class="{ 'table_colmw table_bordr table_poup current': activeIndex === index}" :key="inventory.id" @click="setActive(index)">
                <div class="table_colmw table_bordr table_poup">
                    <div class="table_cols1"><h4 class="table_head1"><span>{{index + 1 }}</span></h4></div>
                    <div class="table_cols2"><h4 class="table_head1"><span>{{inventory.tag_number ? inventory.tag_number : "N/A"}}</span></h4></div>
                    <div class="table_cols3"><h4 class="table_head1"><span>{{inventory.details.item_description}} </span></h4></div>
                    <div class="table_cols4"><h4 class="table_head1"><span>{{inventory.details.packaging_status}}</span></h4></div>
                    <div class="table_cols5"><h4 class="table_head1"><span>{{inventory.details.disposition}}</span></h4></div>
                    <div class="table_cols6"><h4 class="table_head1"><span>{{inventory.details.location}}</span></h4></div>
                    <div class="loation_frn">
                        <div class="loation_frm">
                            <div class="loatin_frm1"><h4 class="location_hed">Location</h4></div>
                            <div class="loatin_frm2">
                                <div class="form_group1">
                                    <input class="search_form" type="text" v-model="locations[index]" placeholder="Scan or Enter Location">
                                </div>
                            </div>
                            <div  class="loatin_frm3"><button :disabled="(inventory.details.location != undefined && inventory.details.location != '')" class="table_mobt2" @click="doStow(index)">Save Location</button></div>
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
      stowed: 0,
      not_found: 0,
      sum_passed_failed: 0,
      locations:[],
      stow_ids: [],
    }
  },
  created () {
    this.calculateStowSummary(this.$store.state.inventories, this.$store.state.toat_number)
  },
  methods: {
    calculateStowSummary(inventories, toat_number){
        this.entered_toat_number = toat_number
        this.all_inventories = inventories
        this.stowed = this.all_inventories.filter(inventory => inventory.details.location != undefined && inventory.details.location != "").length
        this.not_found = this.all_inventories.filter(inventory => inventory.details.packaging_status === 'Not Found').length
        this.selected_inventories = this.all_inventories
        this.stow_ids = this.$store.state.stowed_ids?this.$store.state.stowed_ids:[]
    },
    getInventories (toat_number) {
      let search_param = {
        params:{
        toat_number:toat_number
        }
      }
      this.$http.secured.get('/api/v1/warehouse/stowing/fetch_inventories', search_param)
      .then(response => { if(response.data.inventories.length) {
        this.calculateStowSummary(response.data.inventories, this.entered_toat_number)
        this.$store.commit('setQc', {toat_number: this.entered_toat_number, inventories: this.all_inventories})
        }
        else{
          this.calculateStowSummary([], this.entered_toat_number)
          this.$toast.error('Please check Toat No. entered')
        }
      })
      .catch(error => this.$toast.error('Error in fetching inventories'))
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

    updateInventoryLocation (update_param, index) {
      this.$http.secured.post('/api/v1/warehouse/stowing/set_location', update_param)
      .then(response => { if(response.status==200){
          this.$toast.success('Inventory stowed successfully! ')
          this.selected_inventories[index].details.location = this.locations[index]
          this.selected_inventories[index].details.packaging_status = response.data.inventory.details.packaging_status
          this.stow_ids = this.$store.state.stowed_ids?this.$store.state.stowed_ids:[]
          this.stow_ids.push(update_param.id)
          this.$store.commit('setQc', {toat_number: this.entered_toat_number, inventories: this.selected_inventories, stowed_ids: this.stow_ids}),
          this.locations[index] = ''
          this.stowed ++
          this.not_found = this.$store.state.inventories.length - this.stowed
       }
      })
      .catch(error => this.$toast.error('Error in fetching inventories'))
    },

    doStow (index) {
      if(this.locations[index] != undefined){
        if (this.selected_inventories[index].details.location === undefined || this.selected_inventories[index].details.location === "") {
          let update_param = {
              id: this.selected_inventories[index].id,
              location: this.locations[index]
          }
          this.updateInventoryLocation(update_param, index)
        } else {
          this.$toast.error('Inventory is alreay Stowed');
        }
      }
      else{
        this.$toast.error('Please scan or Enter Location');
      }
    },

    completeStowing () {
      let not_found = this.all_inventories.filter(inventory => inventory.details.location == undefined || inventory.details.location == "").map(function(inv){return inv.id})
      let inventory_ids = {
        inventory_ids: this.stow_ids,
        not_found_ids: not_found
      }
      if(not_found.length > 0 && confirm(not_found.length+" Item(s) are not found, Do you realy want to continue?")) {
        this.$http.secured.post('/api/v1/warehouse/stowing/complete_stowing', inventory_ids).
        then(response => { if(response.status == 200){
          this.stow_ids = []
                $('#myModal').modal('hide');
          this.$toast.success('Stowing completed successfully! ')
             this.$router.push({ name: 'Stowing'})

        }}).catch(error=>this.$toast.error('Error while updating Complete QC'))
        } else if(not_found.length <= 0) {
          this.$http.secured.post('/api/v1/warehouse/stowing/complete_stowing', inventory_ids).
          then(response => { if(response.status == 200){
            this.stow_ids = []
                  $('#myModal').modal('hide');
            this.$toast.success('Stowing completed successfully! ')
              this.$router.push({ name: 'Stowing'})

          }}).catch(error=>this.$toast.error('Error while updating Complete QC'))
        }
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
</style>
