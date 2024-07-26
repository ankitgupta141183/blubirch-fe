<template>
  <body>
    <div>
      <div class="rigt_navbar" id="content">
        <h3 class="main_header display_non">Pending Dispatch
          <button class="qc_p_buttn3" @click="showConsignment">Proceed</button> 
        </h3>
        <div class="row">
          <div class="col-lg-6">
            <div class="form_groupw">
              <div class="row">
                <div class="form_group1">
                  <form @submit.prevent="getGatePasses">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <input class="search_form" v-model="gatepass_number" type="text" placeholder="Search Gate Pass Number">
                  </form>
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
              <div class="table_clds1">
                <div class="custom-control custom-checkbox mb-3">
                	<input type="checkbox" class="custom-control-input" id="customCheck1" name="example1" @click="updateList($event)" value="all" >
                	<label class="custom-control-label" for="customCheck1"></label>
                </div>
              </div>
              <div class="table_clpp12">
                <h4 class="table_head1">Gate Pass</h4>
              </div>
              <div class="table_clpp13">
                <h4 class="table_head1">Origin Station</h4>
              </div>
              <div class="table_clpp14">
                <h4 class="table_head1" style="margin-left: 30px;">Box Count</h4>
              </div>
              <div class="table_clpp15 module2_Wdt">
                <h4 class="table_head1" style="margin-left: 40px;">Item Count</h4>
              </div>
              <div class="table_clpp16">
                <div class="dropdown">
                  <h4 class="table_head1">Ageing</h4>
                </div>
              </div>
            </div>
            <!-- Data Begins -->
            <div class="table_colmw table_bordr">
              <div v-for="(rr_record, index ) in gate_passes"class="table_colmw table_bordr">
                <div class="table_clpp11"><br></div>
                <div class="table_clds1">
                  <div class="custom-control custom-checkbox mb-3">
                  	<input type="checkbox" class="custom-control-input" :id=" `customCheck--${index}` " name="example1" @click= "updateGatePass($event)" :value = "rr_record.gatepass_number">
                  	<label class="custom-control-label" :for="`customCheck--${index}`"></label>
                  </div>
                </div>
                <div>
                  <div class="table_clpp12">
                    <h4 class="table_head1"><span> {{rr_record.gatepass_number}} </span></h4>
                  </div>
                  <div class="table_clpp13">
                    <h4 class="table_head1"><span> {{rr_record.warehouse}} </span></h4>
                  </div>
                  <div class="table_clpp14">
                    <h4 class="table_head1" style="margin-left: 50px;"><span> {{rr_record.box_count ? rr_record.box_count : 0 }}</span></h4>
                  </div>
                  <div class="table_clpp15 module2_Wdt">
                    <h4 class="table_head1" style="margin-left: 40px;"><span> {{rr_record.inventory_count ? rr_record.inventory_count : 0 }} </span></h4>
                  </div>
                  <div class="table_clpp16">
                    <h4 class="table_head1"><span>{{ Math.ceil(Math.abs(today_date - new Date(rr_record.created_at))/(1000 * 60 * 60 * 24) - 1) }} day(s)</span></h4>
                  </div>
                </div>
              </div>
            </div>
            <!-- Data Ends -->
          </div>
        </div>
        <!-- Pagination --> 
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
  </body>
</template>

<script>
	import $ from 'jquery'
	export default{
		name: 'Dispatch',
		data (){
			return {
				selected_gatepass: [],
				gatepass_number: '',
				gate_passes: [],
				total_pages: 1,
				page: 1,
				today_date: new Date(new Date().toJSON().slice(0,10).replace(/-/g,'-'))
			}
		},
		created (){
			this.getGatePasses()
			this.$store.commit('setDispatchGatePasses', {dispatch_gate_passes: []})
		},
		methods:{
			getGatePasses (page){
				this.$http.secured.get('/api/v1/warehouse/warehouse_dispatch', {params: {page: page, "gatepass_number": this.gatepass_number}})
					.then(response=> {
						this.gate_passes = response.data.gate_passes
            this.total_pages = response.data.meta.total_pages
					})
					.catch(error=> this.$toast.error("Error in fetching gate passes"))
			},
			showConsignment (){
				this.$router.push({name: "WarehouseDispatchComplete"})
			},
			updateGatePass(event){
        if (event.target.checked){
          this.selected_gatepass = this.gate_passes.find (x => x.gatepass_number == event.target.value )
          this.$store.commit('addDispatchGatePasses', {obj: this.selected_gatepass})
          this.isdisable = false
        }else{
          this.selected_gatepass = this.gate_passes.find (x => x.gatepass_number == event.target.value )
          var ind = this.$store.state.dispatch_gate_passes.indexOf(this.selected_gatepass)
          this.$store.commit('removeDispatchGatePasses', {ind: ind})
          this.isdisable = (this.$store.state.dispatch_gate_passes.length == 0)
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
          this.$store.commit('setDispatchGatePasses', {dispatch_gate_passes: values})
          this.isdisable = false
          $.each(checkboxes, function (index, value) {
            if (value.type == 'checkbox'){
              value.checked = true;
            }
          })
        } else {
          this.$store.commit('setDispatchGatePasses', {dispatch_gate_passes: []})
          this.isdisable = true
          $.each(checkboxes, function (index, value) {
            if (value.type == 'checkbox'){
              value.checked = false;
            }
          })
        }
      }
		}
	}
	
</script>

<style type="text/css" scoped>
  .table_clpp11 {
    float: left;
    width: 3%;
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