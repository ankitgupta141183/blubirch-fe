<template>
  <body>
    <div>
      <div class="mobile_head">
        <button class="menu_toggle sidebarCollapse"><i class="fa fa-bars"></i></button>
        <h3 class="main_header">INV35643</h3>
      </div>
      <div class="rigt_navbar" id="content">
        <div>
          <h3 class="main_header display_non">Send for Approval</h3>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <div class="row">
              <div class="form_groupw">
                <div class="form_group1">
                  <form @submit.prevent="getReturnRequests">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <input class="search_form" type="text" v-model="request_number" placeholder="Search Return Request Number">
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <button class="qc_p_button send_approve" data-toggle="modal" data-target="#myModal" href="javascript:void(0)" v-on:click="sendApproval" style="background-color: #0357D0;">Send for Approval</button>
          </div>
        </div>
        <div class="check_table">
          <div class="check_tablw stow_scroll">
            <div class="table_colmw table_bordr">
              <div class="table_csnd1">
                <h4 class="table_head1"><br></h4>
              </div>
              <div class="table_csnd2">
                <h4 class="table_head1">Return Request Number</h4>
              </div>
              <div class="table_csnd3">
                <h4 class="table_head1" style="padding-left: 8px !important;">Ship to</h4>
              </div>
              <div class="table_csnd4">
                <h4 class="table_head1">Quantity</h4>
              </div>
              <div class="table_csnd5">
                <h4 class="table_head1">Return reason</h4>
              </div>
              <div class="table_csnd7">
                <h4 class="table_head1"><br></h4>
              </div>
            </div>
            <div class="table_colmw table_bordr table_poup">
              <div v-if="return_requests.length">
                <div v-for="(return_request,key) in return_requests" v-bind:id="return_request.id" class="table_colmw table_bordr">
                  <div class="table_csnd1">
                    <h4 class="table_head1">
                      <span>
                        <div class="custom-control custom-checkbox mb-3">
                          <input type="checkbox" :value="return_request.id" v-model="selected_rows" :id="return_request.id">
                        </div>
                      </span>
                    </h4>
                  </div>
                  <div class="table_csnd2">
                    <h4 class="table_head1"><span>{{return_request.request_number}}</span></h4>
                  </div>
                  <div class="table_csnd3">
                    <h4 class="table_head1"><span>{{return_request.client.name}}</span></h4>
                  </div>
                  <div class="table_csnd4">
                    <h4 class="table_head1"><span>{{return_request.details["total_inventories"]}}</span></h4>
                  </div>
                  <div class="table_csnd5">
                    <h4 class="table_head1"><span>{{return_request.customer_return_reason.name}}</span></h4>
                  </div>
                  <div class="table_csnd7">
                    <h4 class="table_head1"><span><a> <img v-on:click="showReturnRequestDetails(return_request.id)" src="@/assets/images/icons/info.svg" class="img-responsive"></a></span></h4>
                  </div>
                </div>
              </div>
              <div v-else>
                <div>
                  <h4 class="table_head1">No Data Found</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="check_pagnt">
          <nav class="navigation" aria-label="Page navigation example pull-right">
            <paginate
              :page-count=total_pages
              :click-handler="getReturnRequests"
              :prev-text="'Prev'"
              :next-text="'Next'"
              :container-class="'pagination_custom'"
              :prev-class="'page-item'"
              :first-last-button=true
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
    name: 'ApprovalSend',
    data () {
      return {
        return_requests: [],
        selected_rows: [],
        request_number: '',
        page: 1,
        total_pages: 1
      }
    },
    created() {
      this.getReturnRequests()
    },
    methods:{
      getReturnRequests (page){
        this.$http.secured.get('/api/v1/store/pending_approvals', {params: {page: page, "request_number": this.request_number}})
        .then(response => {
          this.return_requests = response.data.return_requests 
          this.total_pages = response.data.meta.total_pages
          this.$store.commit('setReturnRequests', {return_requests: this.return_requests })
        })
        .catch(error => this.$toast.error('Error in fetching return requests'))
      },
      sendApproval (){
        if (!this.selected_rows.length){
          this.$toast.error('At least one return request should be selected')
        }
        else {
          this.$http.secured.post('/api/v1/store/pending_approvals/approve_request',{"return_requests": this.selected_rows })
            .then(response => {
              this.getReturnRequests()
              this.$toast.success('Approval has been sent for RR number')
            })
            .catch(error => this.$toast.error('Error in sending request'))
        }
      },
      showReturnRequestDetails (return_request_id){
        this.$router.push({name: "EditReturnRequest", params: { id: return_request_id }})
      }
    }
  }
</script>   