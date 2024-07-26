<template>
  <body>

    <div class="">
      <div class="mobile_head">
        <button class="menu_toggle sidebarCollapse"><i class="fa fa-bars"></i></button>
        <h3 class="main_header">INV35643</h3>
      </div>
      <div class="rigt_navbar" id="content">
        <h3 class="main_header display_non">Pending Packaging </h3>
        <div class="row">
          <div class="col-lg-6">
            <div class="form_groupw">
              <div class="row">
                <div class="form_group1">
                  <i class="fa fa-search" aria-hidden="true"></i>
                  <input v-model="rr_number" v-on:change="searchReturnRequest(rr_number)" class="search_form" type="text" placeholder="Enter Return Request Number">
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
              <div class="table_cpck1"><br></div>
              <div class="table_cpck2"><h4 class="table_head1">Invoice Number</h4></div>
              <div class="table_cpck3"><h4 class="table_head1">Return Request Number</h4></div>
              <div class="table_cpck4">
                <div class="dropdown">
                  <button class="custp_dropd" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <h4 class="table_head1">Destination Station <i class="fa fa-angle-down"></i></h4>
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <div class="form_group1">
                      <i class="fa fa-search" aria-hidden="true"></i>
                      <input class="search_form" type="text" placeholder="Enter Destination Station">
                    </div>
                    <li v-for= "(destination_station, index) in destination_stations"><a class="dropdown-item" href="#"><div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" :id=" `customCheck1--${index}` " name="example1"><label class="custom-control-label" :for="`customCheck1--${index}`"></label></div>{{destination_station}}</a></li>
                  </div>
                </div>
              </div>
              <div class="table_cpck5 module2_Wdt"><h4 class="table_head1">Quantity</h4></div>
              <div class="table_cpck7">
                <div class="dropdown">
                  <button class="custp_dropd" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <h4 class="table_head1">Return Reason <i class="fa fa-angle-down"></i></h4>
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <div class="form_group1">
                      <i class="fa fa-search" aria-hidden="true"></i>
                      <input class="search_form" type="text" placeholder="Enter Return Reason">
                    </div>
                    <li v-for="(return_reason, index) in return_reasons"><a class="dropdown-item" href="#"><div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" :id=" `customCheck--${index}` " name="example1"><label class="custom-control-label" :for="`customCheck--${index}`"></label></div>{{return_reason}}</a></li>
                  </div>
                </div>
              </div>
            </div>
            <div v-for="return_request in return_requests"class="table_colmw table_bordr">
              <router-link :to="{ name: 'AddBoxItems'}" >
                <div @click="addToId(return_request.id)">
                  <div class="table_cpck1"><br></div>
                  <div class="table_cpck2"><h4 class="table_head1"><span> {{return_request.details.invoice_number}} </span></h4></div>
                  <div class="table_cpck3"><h4 class="table_head1"><span> {{return_request.request_number}} </span></h4></div>
                  <div class="table_cpck4">
                    
                    <div v-if="return_request.client.details.warehouse_code">
                      <h4 class="table_head1"><span>{{ return_request.client.details.warehouse_code }}</span></h4>
                    </div>
                    <div v-else>
                      <h4 class="table_head1"><span>NA</span></h4>
                    </div>
                  </div>
                  <div class="table_cpck5 module2_Wdt">
                    <div v-if="return_request.details.total_inventories">
                      <h4 class="table_head1" style="margin-left: 20px; "><span>{{return_request.details.total_inventories}}</span></h4>
                    </div>
                    <div v-else>
                      <h4 class="table_head1"><span>0</span></h4>
                    </div>
                  </div>
                  <div class="table_cpck7"><h4 class="table_head1"><span> {{return_request.details.customer_return_reason}} </span></h4></div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div class="check_pagnt">
          <nav class="navigation" aria-label="Page navigation example pull-right">
            <paginate
              :page-count=total_pages
              :click-handler="getPackagingReturnRequests"
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
  export default {
    name: 'PendingPackage',
    data () {
      return {
        rr_number: '',
        return_requests: [],
        destination_stations: [],
        return_reasons: [],
        page: 1,
        total_pages: 1
      }
    },

    created() {
      this.$store.commit('setInvoiceDetail', {detail: {}})
      this.$store.commit('boxDetails', {boxdetails: []})
      this.$store.commit('boxItems', {boxitems: []})
      this.getPackagingReturnRequests()
    },

    methods: {
      getPackagingReturnRequests (page) {
        let search_param = { 
           params:
           {
              page:page,
              request_number: this.rr_number
           }
        }
        this.$http.secured.get('/api/v1/store/pending_packaging', !page ? search_param: { params: { page: page}})
          .then(response => {
            if(response.data.return_requests.length > 0){
              this.return_requests = response.data.return_requests
              this.destination_stations = [...new Set(this.return_requests.map(item => item.client.details.warehouse_code))];
              this.return_reasons = [...new Set(this.return_requests.map(item => item.details.customer_return_reason))];
              this.total_pages = response.data.meta.total_pages
            }
            else{
              this.$toast.error('Invalid RR Number')  
            }
          })
          .catch(error => {
            this.$toast.error('Error in fetching Return Requests')
          })
      },

      searchReturnRequest(rrn_number){
        this.getPackagingReturnRequests()
      },

      addToId(id){
        this.$router.push({name: 'AddBoxItems', params: { id: id }})
      }
    }
  }

</script>