<template>
    <body>
<div class="">

    <div class="mobile_head">
        <button class="menu_toggle sidebarCollapse"><i class="fa fa-bars"></i></button>
        <h3 class="main_header">INV35643</h3>
    </div>
    <div class="rigt_navbar" id="content">
        <h3 class="main_header display_non">Variation Report </h3>
        <div class="row">
            <div class="col-lg-6">
                <div class="form_groupw">
                    <div class="row">
                        <div class="form_group1">
                            <i class="fa fa-search" aria-hidden="true"></i>
                            <input v-model='tag_number' v-on:change="searchTn(tag_number)" class="search_form" type="text" placeholder="Enter Tag Number to search">
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
                        <div class="tbl_report1"><h4 class="table_head1">Return Request Number</h4></div>
                        <div class="tbl_report2"><h4 class="table_head1">Tag Number</h4></div>
                        <div class="tbl_report3">
                            <div class="dropdown">
                                <button class="custp_dropd" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <h4 class="table_head1">Grade Send <i class="fa fa-angle-down"></i></h4>
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <div class="form_group1">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                        <input class="search_form" type="text" placeholder="Scan or Enter tag number">
                                    </div>
                                    <li><a class="dropdown-item" href="#"><div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>C1-Chroma</a></li>
                                    <li><a class="dropdown-item" href="#"><div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>B1-Warehouse, Bannerghatta</a></li>
                                    <li><a class="dropdown-item" href="#"><div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>C1-Chroma</a></li>
                                    <li><a class="dropdown-item" href="#"><div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>C1-Chroma</a></li>
                                    <li><a class="dropdown-item" href="#"><div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>C1-Chroma</a></li>
                                </div>
                            </div>
                        </div>
            <div class="tbl_report4">
                            <div class="dropdown">
                                <button class="custp_dropd" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <h4 class="table_head1">Grade Received <i class="fa fa-angle-down"></i></h4>
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <div class="form_group1">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                        <input class="search_form" type="text" placeholder="Scan or Enter tag number">
                                    </div>
                                    <li><a class="dropdown-item" href="#"><div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>C1-Chroma</a></li>
                                    <li><a class="dropdown-item" href="#"><div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>B1-Warehouse, Bannerghatta</a></li>
                                    <li><a class="dropdown-item" href="#"><div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>C1-Chroma</a></li>
                                    <li><a class="dropdown-item" href="#"><div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>C1-Chroma</a></li>
                                    <li><a class="dropdown-item" href="#"><div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>C1-Chroma</a></li>
                                </div>
                            </div>
                        </div>
            <div class="tbl_report5">
                            <div class="dropdown">
                                <button class="custp_dropd" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <h4 class="table_head1">Logistic Partner<i class="fa fa-angle-down"></i></h4>
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <div class="form_group1">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                        <input class="search_form" type="text" placeholder="Scan or Enter tag number">
                                    </div>
                                    <li><a class="dropdown-item" href="#"><div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>C1-Chroma</a></li>
                                    <li><a class="dropdown-item" href="#"><div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>B1-Warehouse, Bannerghatta</a></li>
                                    <li><a class="dropdown-item" href="#"><div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>C1-Chroma</a></li>
                                    <li><a class="dropdown-item" href="#"><div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>C1-Chroma</a></li>
                                    <li><a class="dropdown-item" href="#"><div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>C1-Chroma</a></li>
                                </div>
                            </div>
                        </div>
                        <div class="tbl_report6"><h4 class="table_head1">Test Executive</h4></div>
                        <div class="tbl_report7"><h4 class="table_head1"><br></h4></div>
                    </div>
                    <div class="table_colmw table_bordr" v-for="(variation_report, key) in variation_reports" v-bind:id="variation_reports.id">
                        <div class="tbl_report1"><h4 class="table_head1"><span>{{variation_report.details.return_request_number ?  variation_report.details.return_request_number : "NIL" }}</span></h4></div>
                        <div class="tbl_report2"><h4 class="table_head1"><span>{{variation_report.tag_number ?  variation_report.tag_number : "NIL" }}</span></h4></div>
                        <div class="tbl_report3"><h4 class="table_head1"><span>{{variation_report.grade_send ?  variation_report.grade_send : "NIL" }} </span></h4></div>
                        <div class="tbl_report4"><h4 class="table_head1"><span>{{variation_report.grade_received ?  variation_report.grade_received : "NIL" }}</span></h4></div>
                        <div class="tbl_report5"><h4 class="table_head1"><span>{{variation_report.logisticname ?  variation_report.logisticname : "NIL" }}</span></h4></div>
                        <div class="tbl_report6"><h4 class="table_head1"><span>{{variation_report.user_name ?  variation_report.user_name : "NIL" }}</span></h4></div>
                        <div class="tbl_report7"><img src="@/assets/images/icons/info-2.svg" @click="info_clicked(variation_report.id)" class="info_icons"></div>
                    </div>
                </div>
            </div>
            <div class="check_pagnt">
              <nav class="navigation" aria-label="Page navigation example pull-right">
                <paginate
                  :page-count=total_pages
                  :click-handler="getReports"
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

  export default {
    name: 'VariationReportList',
    data () {
      return {
        search_tag_number: '',
        variation_reports:[],
        total_pages:1,
        page:1,
        tag_number: '',
        meta:'',
      }
    },
    created (){
        this.getReports()
    },
    methods: {
       getReports(page){
            let search_param = { 
               params:
               {
                  page: page,
                  tag_number: this.tag_number
               }
            }
           // this.$http.secured.get('/api/v1/warehouse/variation_reports', !page ? search_param: { params: { page: page}})
            this.$http.secured.get('/api/v1/warehouse/variation_reports', !page ? search_param: { params: { page: page}})

            .then(response => {
                if(response.data.inventories.length){
                    this.variation_reports = response.data.inventories,
                    this.total_pages = response.data.meta.total_pages,
                    this.$store.commit('variation_reports', {variation_reports:response.data.inventories})
                }else{this.$toast.error('No report found! ')}
             })
            .catch(error => this.$toast.error('Error in fetching reports'))
       },
      info_clicked(inventory_id) {
          var variationReportById = this.variation_reports.find(x=>x.id == inventory_id);
          this.$store.commit('setVariationReport', {variationreport: variationReportById })
          this.$router.push({name: 'VariationReport'})
      },

      searchTn(tag_number){
        this.getReports()
      },
    }
  }
</script>