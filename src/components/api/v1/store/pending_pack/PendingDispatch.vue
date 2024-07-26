<template>
  <body>
    <div>
      <div class="mobile_head">
        <button class="menu_toggle sidebarCollapse"><i class="fa fa-bars"></i></button>
        <h3 class="main_header">INV35643</h3>
      </div>
      <div class="rigt_navbar" id="content">
        <div v-if="isdisable">
          <button  class="qc_p_button" @click="checkProceed">Proceed</button>
        </div>
        <div v-else>
          <router-link :to="{ name: 'CompleteDispatch'}"><button :disabled="isdisable"  class="qc_p_button">Proceed</button></router-link>
          </div>

        <h3 class="main_header display_non">Pending Dispatch</h3>
        <div class="row">
          <div class="col-lg-6">
            <div class="form_groupw">
              <div class="row">
                <div class="form_group1">
                  <i class="fa fa-search" aria-hidden="true"></i>
                  <input v-model='gp_number' v-on:change="searchGp(gp_number)" class="search_form" type="text" placeholder="Enter Gate Pass Number">
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">

          </div>
        </div>
        <div class="check_table">
          <div class="check_tablw">
            <div class="table_colmw table_bordr">
              <div class="table_clpp11"><br></div>
              <div class="table_clds1"><div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck1" name="example1" @click="updateList($event)" value="all" ><label class="custom-control-label" for="customCheck1"></label></div></div>
              <div class="table_clpp12"><h4 class="table_head1">Gate Pass</h4></div>
              <div class="table_clpp13">
                <div class="dropdown">
                  <button class="custp_dropd" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <h4 class="table_head1">Destination Station <i class="fa fa-angle-down"></i></h4>
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <div class="form_group1">
                      <i class="fa fa-search" aria-hidden="true"></i>
                      <input class="search_form" type="text" placeholder="Enter Destination Station">
                    </div>
                    <li v-for= "destination in destination_stations"><a class="dropdown-item" href="#"><div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>{{destination}}</a></li>
                  </div>
                </div>
              </div>
              <div class="table_clpp14"><h4 class="table_head1" style="margin-left: 30px;">Box Count</h4></div>
              <div class="table_clpp15 module2_Wdt"><h4 class="table_head1" style="margin-left: 40px;">Return Request Number</h4></div>
              <div class="table_clpp16">
                <div class="dropdown">
                  <button class="custp_dropd" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <h4 class="table_head1">Return Reason <i class="fa fa-angle-down"></i></h4>
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <div class="form_group1">
                      <i class="fa fa-search" aria-hidden="true"></i>
                      <input class="search_form" type="text" placeholder="Enter Return Reason">
                    </div>
                    <li v-for="(return_reason, index) in return_reasons"><a class="dropdown-item" href="#"><div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" :id="`customCheck5--${index}`" name="example1"><label class="custom-control-label" :for="`customCheck5--${index}`"></label></div>{{return_reason}}</a></li>
                  </div>
                </div>
              </div>
            </div>
            <div v-for="(rr_record, index ) in gate_passes"class="table_colmw table_bordr">
              <div class="table_clpp11"><br></div>
              <div class="table_clds1"><div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" :id=" `customCheck--${index}` " name="example1" @click= "updateGatePass($event)" :value = "rr_record.gatepass_number"><label class="custom-control-label" :for="`customCheck--${index}`"></label></div></div>
              <router-link :to="{ name: 'CompleteDispatch'}" >
                <div @click="rowClick(rr_record.gatepass_number)">
                  <div class="table_clpp12"><h4 class="table_head1"><span> {{rr_record.gatepass_number}} </span></h4></div>
                  <div class="table_clpp13"><h4 class="table_head1"><span> {{rr_record.client.details.warehouse_code ? rr_record.client.details.warehouse_code : "NA" }} </span></h4></div>
                  <div class="table_clpp14"><h4 class="table_head1" style="margin-left: 50px;"><span> {{rr_record.box_count}}</span></h4></div>
                  <div class="table_clpp15 module2_Wdt"><h4 class="table_head1" style="margin-left: 40px;"><span> {{rr_record.rr_number}} </span></h4></div>
                  <div class="table_clpp16"><h4 class="table_head1"><span> {{rr_record.return_reason}} </span></h4></div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div class="check_pagnt">
          <nav class="navigation" aria-label="Page navigation example pull-right">
            <paginate
              :page-count=total_pages
              :click-handler="getGatePasses"
              :prev-text="'Prev'"
              :next-text="'Next'"
              :container-class="'pagination_custom'"
              :prev-class="'page-item'"
              :first-last-button = true
              :next-class="'page-item'"
              :page-class="'page-item'">
            </paginate>
          </nav>
        </div>
      </div>

    </div>
  </div>

</body>

</template>

<script>
  
  import $ from 'jquery'
  export default {
    name: 'PendingDispatch',
    data () {
      return {
      gate_passes: [],
      return_reasons: [],
      destination_stations: [],
      isdisable: true,
      gp_number: '',
      page: 1,
      total_pages: 1
    }
    },
    created () {
      this.getGatePasses()
      this.$store.commit('setbulkRrnrecords', {record: []})
    },
    methods:{
      checkProceed(){
            this.$toast.error('Select atleast 1 Gate Pass Number')
            return;
      },
      getGatePasses(page){

        let search_param = { 
           params:
           {
              page:page,
              gatepass_number: this.gp_number
           }
        }

        this.$http.secured.get('/api/v1/store/pending_dispatch', !page ? search_param: { params: { page: page}} )
          .then(response => {
            this.gate_passes = response.data.gate_passes
            this.total_pages = response.data.meta.total_pages
            this.destination_stations = [...new Set(this.gate_passes.map(item => item.client.details.warehouse_code))];
            this.return_reasons = [...new Set(this.gate_passes.map(item => item.return_reason))];

          })
          .catch(error => {
            this.$toast.error('Error in Fetching Gate Pass')
          })
      },

      searchGp(gp_number){
        this.getGatePasses()
      },

      updateGatePass(event){
        if (event.target.checked){
          var record = this.gate_passes.find (x => x.gatepass_number == event.target.value )
          this.$store.commit('addrrnrecord', {obj: record})
          this.isdisable = false
        }else{
          var record = this.gate_passes.find (x => x.gatepass_number == event.target.value )
          var ind = this.$store.state.selected_rrn.indexOf(record)
          this.$store.commit('removerrnrecord', {ind: ind})
          this.isdisable = (this.$store.state.selected_rrn.length == 0)
        }
      },
      updateList(event){
        var checkboxes =  $(".check_table :input");
        if (event.target.checked && event.target.value === 'all'){
          var values = []
          $.each(this.gate_passes, function(index, value){
            {

              values.push(this)
            }
          })
          this.$store.commit('setbulkRrnrecords', {record: values})
          this.isdisable = false
          $.each(checkboxes, function (index, value) {
            if (value.type == 'checkbox'){
              value.checked = true;
            }
          })
        } else {
          this.$store.commit('setbulkRrnrecords', {record: []})
          this.isdisable = true
          $.each(checkboxes, function (index, value) {
            if (value.type == 'checkbox'){
              value.checked = false;
            }
          })
        }
      },
      rowClick(gatepass_no){
        var record = this.gate_passes.find (x => x.gatepass_number == gatepass_no )
        this.$store.commit('addrrnrecord', {obj: record})
      }
    }
  }

</script>

<style type="text/css" scoped>
  .table_clpp11 {
    float: left;
    width: 2%;
  }

  .table_clpp11 .custom-control {
    min-height: 0;
    margin: 0 auto !important;
    padding-left: 0;
    float: left;
    display: table;
  }
  .table_clpp11 .custom-control-label:before {position:absolute;top:0;background-color:#fff;border:1px solid #ccc;}
  .table_clpp11 .custom-control-label:after {top:0;}
  .table_clpp12 {
    float: left;
    width: 12%;
  }

  .table_clpp12 .table_head1 {
    text-align: left;
  }

  .table_clpp13.tbl_center {
    float: left;
    width: 15%;
  }

  .table_clpp13.tbl_center .table_head1 {
    text-align: left;
  }

  .table_clpp13 {
    float: left;
    width: 15%;
  }

  .table_clpp14 {
    float: left;
    width: 15%;
    margin-left: 30px;
  }

/*  .table_clpp14 .table_head1 {
    text-align: left;
    margin-left: 60px;
  }*/

  .table_clpp14 .custome_tip2 {
    float: none;top: -9px;
    margin-left: 9px;
  }
  .table_clpp14 .custome_tip2 img {
    max-width: 18px;
    opacity: 0.6;
  }

  .table_clpp15 {
    float: left;
    width: 30%;
  }

  .table_clpp15 .table_head1 {
    text-align: left;
    /*margin-left: 70px;*/
  }

  .table_clpp15.module2_Wdt .table_head1 {
    text-align: left;
  }

  .table_clpp16 {
    float: left;
    width: 15%;
  }

  .table_clpp16 .table_head1 {
    text-align: left;
  }

  .table_clpp17 {
    float: left;
    width: 15%;
  }

  .table_clpp17 .table_head1 {
    text-align: left;
  }

  .table_clpp18 {
    float: left;
    width: 15%;
  }
  .table_clpp19 {
    float: left;
    width: 15%;
  }

  .table_clpp20 {
    float: left;
    width: 15%;
  }

</style>