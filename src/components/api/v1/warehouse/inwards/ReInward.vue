<template>
<body>
    <div class="mobile_head">
        <button class="menu_toggle sidebarCollapse"><i class="fa fa-bars"></i></button>
        <h3 class="main_header">INV35643</h3>
    </div>
    <div class="rigt_navbar" id="content">
        <h3 class="main_header display_non">Re-Inward<button v-on:click="navigateToManageBoxes" class="qc_p_buttn3" style="background-color:#0357d0" data-toggle="modal" data-target="#myModal">
            <img src="@/assets/images/icons/button.svg"> Gate Pass</button></h3>
        <div class="row">
            <div class="col-lg-6">
                <div class="form_groupw">
                    <div class="row">
                        <div class="form_group1">
                            <i class="fa fa-search" aria-hidden="true"></i>
                            <input class="search_form" type="text" v-on:change="searchByTagNumber(search_tag_number)" v-model="search_tag_number" placeholder="Enter Gate Pass Number">
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
                        <div class="table_inwd1"><h4 class="table_head1">Gate Pass Number</h4></div>
                        <div class="table_inwd2">
                                    <h4 class="table_head1">Receipt Date</h4>
                        </div>
                        <div class="table_inwd3">
                            <div class="dropdown">
                                <button class="custp_dropd" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <h4 class="table_head1">Vendor <i class="fa fa-angle-down"></i></h4>
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <div class="form_group1">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                        <input class="search_form" type="text" placeholder="Scan or Enter Vendor Name">
                                    </div>
                                    <li><a class="dropdown-item" href="#"><div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>C1-Chroma</a></li>
                                    <li><a class="dropdown-item" href="#"><div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>B1-Warehouse, Bannerghatta</a></li>
                                    <li><a class="dropdown-item" href="#"><div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>C1-Chroma</a></li>
                                    <li><a class="dropdown-item" href="#"><div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>C1-Chroma</a></li>
                                    <li><a class="dropdown-item" href="#"><div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>C1-Chroma</a></li>
                                </div>
                            </div>
                        </div>
                        <div class="table_inwd4"><h4 class="table_head1">Received Box</h4></div>
                        <div class="table_inwd5">
                                    <h4 class="table_head1">Trasporter Name</h4>
                        </div>
                        <div class="table_inwd7">
                            <div class="dropdown">
                                <button class="custp_dropd" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <h4 class="table_head1">Warehouse <i class="fa fa-angle-down"></i></h4>
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <div class="form_group1">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                        <input class="search_form" type="text" placeholder="Scan or Enter Warehouse Name">
                                    </div>
                                    <li><a class="dropdown-item" href="#"><div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>C1-Chroma</a></li>
                                    <li><a class="dropdown-item" href="#"><div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>B1-Warehouse, Bannerghatta</a></li>
                                    <li><a class="dropdown-item" href="#"><div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>C1-Chroma</a></li>
                                    <li><a class="dropdown-item" href="#"><div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>C1-Chroma</a></li>
                                    <li><a class="dropdown-item" href="#"><div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>C1-Chroma</a></li>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="table_colmw table_bordr" v-for="(reinward_boxe, key) in gate_passes" v-bind:id="reinward_boxe.id">
                    <router-link :to="{ name: 'ReInwardManageBoxes'}" >
                      <div @click="navigateToManageBoxes(reinward_boxe.gatepass_number)">                      
                        <div class="table_inwd1">
                            <h4 class="table_head1"><span>{{reinward_boxe.gatepass_number ? reinward_boxe.gatepass_number : "NIL" }}</span></h4>
                        </div>
                        <div class="table_inwd2">
                            <h4 class="table_head1"><span>{{reinward_boxe.receipt_date ? reinward_boxe.receipt_date : "NIL" }}</span></h4></div>
                        <div class="table_inwd3"><h4 class="table_head1"><span>{{reinward_boxe.vendor_name ?  reinward_boxe.vendor_name : "NIL" }}</span></h4></div>
                        <div class="table_inwd4"><h4 class="table_head1"><span>{{reinward_boxe.received_boxes ? reinward_boxe.received_boxes : "NIL" }}</span></h4></div>
                        <div class="table_inwd5"><h4 class="table_head1"><span>{{reinward_boxe.transporter_name ? reinward_boxe.transporter_name : "NIL" }}</span></h4></div>
                        <div class="table_inwd7"><h4 class="table_head1"><span>{{reinward_boxe.warehouse }}</span></h4></div>                   
                      </div>
                    </router-link>
                    </div>
                </div>
                </div>
                <div class="check_pagnt">
                    <nav class="navigation" aria-label="Page navigation example pull-right">
                        <paginate
                            :page-count=total_pages
                            :click-handler="getGatePassList"
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
</body>
</template>


<script>

  export default {
    name: 'WarehouseReInward',
    data () {
      return {
        search_tag_number: '',
        gate_passes:[],
        total_pages:1,
        page:1,
        meta:'',
      }
    },
    created (){
        this.getGatePassList()
    },
    methods: {
       getGatePassList(page){
            let search_param = { 
               params:
               {
                  page:page
               }
            }
            this.$http.secured.get('/api/v1/warehouse/gate_passes/fetch_gate_passes', !page ? search_param: { params: { page: page}})
            .then(response => {
                if(response.data.gate_passes.length){
                    this.gate_passes = response.data.gate_passes,
                    this.total_pages = response.data.meta.total_pages,
                    this.$store.commit('setGatePasses', {gate_passes:response.data.gate_passes})
                }else{this.$toast.error('No Gate passes found! ')}
             })
            .catch(error => this.$toast.error('Error in fetching Gate Pass'))
       },
      navigateToManageBoxes(gatepass_number) {
          this.$router.push({name: 'ReInwardManageBoxes',params: { gatepass_number: gatepass_number }})
      },
      searchByTagNumber (tagNumber) {
          var filtered_gatepass = this.$store.state.gate_passes.filter(function(elem){
                if(elem.gatepass_number == tagNumber) return elem;
            });
           this.gate_passes = filtered_gatepass
      }
    }
  }
</script>