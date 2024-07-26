<template>
<div>
   <div class="rigt_navbar" id="content">
      <h3 class="main_header display_non" style="text-align: left;">{{heading}}</h3>
      <div class="row">
         <div class="col-lg-7 left-align">
            <div class="form_groupw new_width">
               <div class="row">
                  <div class="form_group1">
                     <i class="fa fa-search" aria-hidden="true"></i>
                     <input class="search_form" v-model="request_number" type="text" v-on:change="searchApproval(request_number)" placeholder="Enter Return Request Number">
                  </div>
               </div>
            </div>
         </div>
         <div class="col-lg-5">
            <button id="approvedButton" class="qc_p_buttn4" :style="isAprroveItem ? { 'backgroundColor': 'blue'} : ''" data-toggle="modal" data-target="#myModal" @click="sendApproval" v-if="this.$store.state.currentUser.roles[0] == 'service_executive'">Approve Item</button>
         </div>
      </div>
      <ul class="cutome_tabs nav nav-tabs" role="tablist">
         <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#home" v-on:click="activatePending">Pending</a></li>
         <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#menu1" v-on:click="activateApproved">Approved</a></li>
      </ul>
      <div class="tab-content">
         <div v-if="pending_active">
            <div id="home" class="tab-pane active">
            <br>
            <div class="check_table">
               <div class="check_tablw">
                  <div class="table_colmw table_bordr">
                     <div class="table_clpp11">
                        
                     </div>
                     <div class="table_clpp12">
                        <h4 class="table_head1">RR Number</h4>
                     </div>
                     <div class="table_clpp13">
                        <h4 class="table_head1">Request Date</h4>
                     </div>
                     <div class="table_clpp14">
                        <div class="dropdown">
                           <button class="custp_dropd" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <h4 class="table_head1">Customer</h4>
                           </button>                           
                        </div>
                     </div>
                     <div class="table_clpp15">
                        <div class="dropdown">
                           <button class="custp_dropd" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <h4 class="table_head1">Return Reason</i></h4>
                           </button>                          
                        </div>
                     </div>
                     
                     <div class="table_clpp17">
                        <div class="dropdown">
                           <button class="custp_dropd" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <h4 class="table_head1">Region </h4>
                           </button>                           
                        </div>
                     </div>
                     
                     <div class="table_clpp20" style="width: 7%;">
                        <h4 class="table_head1">Aging</h4>
                     </div>
                     <div class="table_clpp20" style="width: 6%;">
                        <h4 class="table_head1"></h4>
                     </div>
                  </div>
                  <div class="table_colmw table_bordr">
                    <div v-if="approval_return_requests.length">
                     <div v-for="(return_request,key) in approval_return_requests" v-bind:id="return_request.id" class="table_colmw table_bordr">
                        <div class="table_clpp11">
                        </div>
                        <div class="table_clpp12">
                           <h4 class="table_head1"><span>{{return_request.request_number}}</span></h4>
                        </div>
                        <div class="table_clpp13">
                           <h4 class="table_head1"><span>{{ return_request.created_at  | moment("DD-MM-YYYY") }}</span></h4>
                        </div>
                        <div class="table_clpp16">
                           <h4 class="table_head1">
                              <span>
                                {{return_request.distribution_center.name}}
                              </span>
                           </h4>
                        </div>
                        <div class="table_clpp15">
                           <h4 class="table_head1"><span>{{return_request.customer_return_reason.name}}</span></h4>
                        </div>                        
                        <div class="table_clpp17">
                           <h4 class="table_head1"><span>{{return_request.city}}</span></h4>
                        </div>
                        <div class="table_clpp20" style="width: 9%;">
                           <h4 class="table_head1"><span>{{return_request.aging}} day(s)</span></h4>
                        </div>
                        <div class="table_clpp20" style="width: 6%;">
                          <h4 class="table_head1"><span><a> <img v-on:click="showReturnRequestDetails(return_request.id, 'pending')" src="@/assets/images/icons/info.svg" class="img-responsive" style="width:22%;"></a></span></h4>
                        </div>
                     </div>
                    </div>
                    <div v-else>
                      <div><h4 class="table_head1">No Data Found</h4></div>
                    </div>
                  </div>
                </div>
               </div>
            </div>
            <div class="check_pagnt">
               <nav class="navigation" aria-label="Page navigation example pull-right">
               <paginate
                :page-count=total_pages
                :click-handler="getApprovalRetrunRequests"
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
         
         <!-- Approved Columns -->
         <div id="menu1" class="tab-pane fade" v-if="approved_active">
            <br>
            <div class="check_table">
               <div class="check_tablw">
                  <div class="table_colmw table_bordr">
                     <div class="table_clpp11">
                        <div class="custom-control custom-checkbox mb-3">                           
                        </div>
                     </div>
                     <div class="table_clpp12">
                        <h4 class="table_head1">RR Number</h4>
                     </div>
                     <div class="table_clpp13">
                        <h4 class="table_head1">Request Date</h4>
                     </div>
                     <div class="table_clpp14">
                        <div class="dropdown">
                          <button class="custp_dropd" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <h4 class="table_head1">Customers</i></h4>
                          </button>                           
                        </div>
                     </div>
                     <div class="table_clpp15">
                        <div class="dropdown">
                          <button class="custp_dropd" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <h4 class="table_head1">Return Reason</h4>
                          </button>                           
                        </div>
                     </div>                    
                     <div class="table_clpp17">
                        <div class="dropdown">
                          <button class="custp_dropd" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <h4 class="table_head1">Region </h4>
                          </button>                           
                        </div>
                     </div>
                     <div class="table_clpp20" style="width: 7%;">
                        <h4 class="table_head1">Aging</h4>
                     </div>
                     <div class="table_clpp20" style="width: 6%;">
                        <h4 class="table_head1"></h4>
                     </div>
                  </div>
                  <div class="table_colmw table_bordr">
                     <div v-for="(return_request,key) in approved_return_requests" v-bind:id="return_request.id" class="table_colmw table_bordr">
                        <div class="table_clpp11">
                           <div class="custom-control custom-checkbox mb-3">
                           
                          </div>
                        </div>
                        <div class="table_clpp12">
                           <h4 class="table_head1"><span>{{return_request.request_number}}</span></h4>
                        </div>
                        <div class="table_clpp13">
                           <h4 class="table_head1"><span>{{ return_request.created_at  | moment("DD-MM-YYYY") }}</span></h4>
                        </div>
                        <div class="table_clpp16">
                           <h4 class="table_head1">
                              <span>
                                {{return_request.distribution_center.name}}
                              </span>
                           </h4>
                        </div>
                        <div class="table_clpp15">
                           <h4 class="table_head1"><span>{{return_request.customer_return_reason.name}}</span></h4>
                        </div>
                        <div class="table_clpp17">
                           <h4 class="table_head1"><span>{{return_request.city}}</span></h4>
                        </div>
                        <div class="table_clpp20" style="width: 9%;">
                           <h4 class="table_head1"><span>{{return_request.aging}} day(s)</span></h4>
                        </div>
                        <div class="table_clpp20" style="width: 6%;">
                          <h4 class="table_head1"><span><a> <img v-on:click="showReturnRequestDetails(return_request.id, 'approved')" src="@/assets/images/icons/info.svg" class="img-responsive" style="width:22%;"></a></span></h4>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="check_pagnt">
               <nav class="navigation" aria-label="Page navigation example pull-right">
               <paginate
                :page-count=total_pagescount
                :click-handler="getApprovedRetrunRequests"
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
</template>


<script>
  export default {
    name: 'PendingApproval',    
    data () {      
      return {
        approval_return_requests: [],
        approved_return_requests: [],
        request_number:'',
        pending_approvals: [],
        heading: 'Pending Approvals',
        pending_active: true,
        selected_rows: [],
        page: 1,
        meta: '',
        total_pages: 1,
        total_pagescount: 1,
        today_date: new Date(new Date().toJSON().slice(0,10).replace(/-/g,'-')),
        isAprroveItem:false,
        approved_active: false,
      }
    },
    created (){
      this.getApprovalRetrunRequests()
      this.getApprovedRetrunRequests()
    },
    computed: {
      selectAll: {
        get: function () {
          this.isAprroveItem = this.selected_rows.length>0?true:false         
          return this.approval_return_requests ? this.selected_rows.length == this.approval_return_requests.length : false;
        },
        set: function (value) {
          var selected_rows = [];
          if (value) {
             this.approval_return_requests.forEach(function (p_approval) {
                selected_rows.push(Number(p_approval.id));
             });
          }
          this.selected_rows = selected_rows;
        }
      }      
    },
    methods:{      
      getApprovalRetrunRequests(page) {
        this.$http.secured.get('/api/v1/store/approvals', {params: {page: page, "request_number":  this.request_number.trim()}})
        .then(response => {    
          this.approval_return_requests = response.data.return_requests 
          this.total_pages = response.data.meta.total_pages
          if (response.data.return_requests.length > 0){
            this.pending_approvals = response.data.return_requests
            this.$store.commit('setApprovalReturnRequests', {approval_return_requests: this.pending_approvals })
          }
        })
        .catch(error => this.$toast.error('Error in fetching pending approval return requests'))
      },
      getApprovedRetrunRequests(page) {
        this.$http.secured.get('/api/v1/store/approvals/approved_requests', {params: {page: page, "request_number": this.request_number}})
        .then(response => {           
          this.approved_return_requests = response.data.return_requests
          this.total_pagescount = response.data.meta.total_pages
          if (response.data.return_requests.length > 0){
            this.pending_approvals = response.data.return_requests
            this.$store.commit('setApprovedReturnRequests', {approved_return_requests: this.pending_approvals })
          }
        })
        .catch(error => this.$toast.error('Error in fetching approved return requests'))
      },
      searchApproval (){
        if(this.pending_active) {
          this.getApprovalRetrunRequests()
        }
        else {
          this.getApprovedRetrunRequests()
        }
      },
      sendApproval (){
        if(this.selected_rows.length > 0){
          let search_param = {
             return_requests: this.selected_rows
          }
          this.$http.secured.post('/api/v1/store/approvals/approve_requests', search_param)
          .then(response => 
            {if(response.status == 200){
            this.getApprovalRetrunRequests()
            this.getApprovedRetrunRequests()
            this.$toast.success('Return request approved successfully');} })
            this.selected_rows = []
            this.isAprroveItem = false
          .catch(error => this.$toast.error('Error while aprroving return requests.'))
        }
        else {
          this.$toast.error('Atleast one RRN should be selected')
        }
      },      
      activatePending (){
        this.heading = "Pending Approvals";
        this.pending_active = true
        this.approved_active = false
        document.getElementById("approvedButton").style.display = 'block'
      },
      activateApproved (){
        this.heading = "Approved Requests";
        this.pending_active = false
        this.approved_active = true
        document.getElementById("approvedButton").style.display = 'none';
      },
      showReturnRequestDetails (return_request_id, status){
        this.$router.push({name: "ReturnRequestInfo", params: { id: return_request_id, status: status }})
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
}
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
  width: 25%;
}

.table_clpp15 .table_head1 {
  text-align: left;
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