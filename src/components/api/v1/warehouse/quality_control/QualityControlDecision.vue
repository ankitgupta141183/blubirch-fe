<template>
  <body>
    <div class="modal fade cutomr_modal" id="myModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <button type="button" class="close qc_result" data-dismiss="modal">&times;</button>
          <div class="modal-body">
            <h3 class="barc_mod_hed">Toat number : <span>GP5939</span></h3>
            <div class="modal_sect1">
              <h3 class="qc_modal_hd"><span>Total Inventories </span> 22</h3>
            </div>
            <div class="modal_sect2">
              <ul class="test_result">
                <li>Tested: <strong>10</strong></li>
                <li>Passed: <strong>10</strong></li>
                <li>Fail: <strong class="fail_test">0</strong></li>
              </ul>
            </div>
            <div class="info_qc_sc">
              <div class="custome_tip2"><img src="@/assets/images/icons/info.svg"></img> QC Pass for the Box<div class="tooltip_pop2">Documentation and examples</div></div>
            </div>
            <button class="barcode_bt2">Complete QC</button>
          </div>
        </div> 
      </div>
    </div>

    <div class="rigt_navbar" id="content">
      <h3 class="main_header display_non">Quality Control <button class="qc_p_button" data-toggle="modal" data-target="#myModal">Complete Quality Control</button></h3>
      <div class="row">
        <div class="col-lg-6">
          <div class="row">
            <div class="col-lg-5">
              <div class="form_groupw sku_search">
                <div class="row">
                  <h4 class="categ_head2 qh_smallhd1">Toat Number</h4>
                  <div class="form_group1">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <input class="search_form" type="text" v-model="entered_toat_number"></input>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-5">
              <div class="form_groupw sku_search">
                <div class="row">
                  <h4 class="categ_head2">Tag Number</h4>
                  <div class="form_group1">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <input class="search_form" type="text" v-model="entered_tag_number" placeholder="Scan or Enter tag number"></input>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-2">
              <div class="row">
                <button class="qc_search_b" v-on:click="filter_inventory">Search</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="qc_test_sec">
            <ul class="qc_test_uli">
              <li>To Be Tested : <span>10</span></li>
              <li>Passed : <span>10</span></li>
              <li>Failed : <span class="failed_qc">1</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="check_table">
        <div class="check_tablw stow_scroll table_font12px">
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
          <div v-for="(inventory,index) in selected_inventories" :key="inventory.id">
            <div class="table_colmw table_bordr table_poup">
              <div class="table_colq1"><h4 class="table_head1"><span>{{inventory.id}}</span></h4></div>
              <div class="table_colq2"><h4 class="table_head1"><span><strong>Tag number :</strong>{{inventory.tag_number}}</span></h4></div>
              <div class="table_colq3"><h4 class="table_head1"><span><strong>Item Description :</strong>{{inventory.name}}</span></h4></div>
              <div class="table_colq4"><h4 class="table_head1"><span><strong>Packaging Status :</strong>{{inventory.physical_status}}</span></h4></div>
              <div class="table_colq5"><h4 class="table_head1"><span><strong>Packaging Status :</strong>{{inventory.packaging_status}}</span></h4></div>
              <div class="table_colq6"><h4 class="table_head1"><span><strong>Grade :</strong>{{inventory.grade}}</span></h4></div>
              <div class="table_colq7"><h4 class="table_head1"><span><strong>Disposition :</strong>{{inventory.disposition}}</span></h4></div>
              <div class="table_colq8"><h4 class="table_head1"><span><strong>Decision :</strong>{{myArray[Math.floor(Math.random() * myArray.length)]}}</span></h4></div>
              <div class="butn_grpoups">
                <div class="group_butons">
                  <button class="button1_fail">Fail</button>
                  <button class="button1_pass">Pass</button>
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
import json from  "@/assets/invoices.json"
import { mapState } from 'vuex'
import $ from 'jquery'

export default {
  name: 'ReturnRequest',
  computed: mapState([
    'toat_number', 'tag_number', 'inventories'
    ]),
  data () {
    return {
      entered_toat_number: '',
      selected_inventories: [],
      entered_tag_number: '',
      activeIndex: undefined,
      myArray: ["Pass", "Fail"]
    }
  },
  created () {
    this.entered_toat_number = this.$store.state.toat_number
    this.entered_tag_number = this.$store.state.entered_tag_number
    this.selected_inventories = this.$store.state.inventories
  },
  methods: {
    setActive(index) { this.activeIndex = index },
    filter_inventory () {
      if (this.entered_tag_number) {
        var entered_toat_number = this.entered_toat_number
        var entered_tag_number = this.entered_tag_number
        var selected_inventories = []
        json.invoice.map(function (el) {
          el["invoice_inventory_details"].map(function (inv) {
            if ((inv.toat_number == entered_toat_number) && inv.tag_number == entered_tag_number) {
              selected_inventories.push(inv);
            }
          });
        });
        this.selected_inventories = selected_inventories
      } else {
        this.$toast.error("Enter Tag Number")
      }
    }
  }
}
</script>
