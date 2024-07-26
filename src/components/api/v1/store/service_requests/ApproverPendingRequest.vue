<template>
<div>
   <div class="rigt_navbar" id="content">
      <h3 class="main_header display_non">{{heading}}</h3>
      <div class="row">
         <div class="col-lg-7">
            <div class="form_groupw new_width">
               <div class="row">
                  <div class="form_group1">
                     <i class="fa fa-search" aria-hidden="true"></i>
                     <input class="search_form" type="text" placeholder="Enter Return Request Number">
                  </div>
               </div>
            </div>
         </div>
         <div class="col-lg-5">
            <button id="approvedButton" class="qc_p_buttn4" data-toggle="modal" data-target="#myModal" @click="sendApproval" v-if="this.$store.state.role == 'service_executive'">Approve Item</button>
         </div>
      </div>
      <ul class="cutome_tabs nav nav-tabs" role="tablist">
         <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#home" v-on:click="activate1">Pending</a></li>
         <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#menu1" v-on:click="activate2" v-if="this.$store.state.role == 'service_executive'">Approved</a></li>
      </ul>
      <div class="tab-content">
         <div id="home" class="tab-pane active">
            <br>
            <div class="check_table">
               <div class="check_tablw">
                  <div class="table_colmw table_bordr">
                     <div class="table_clpp11">
                        <div class="custom-control custom-checkbox mb-3"><input type="checkbox" id="customCheck1" name="example1"><label  for="customCheck1"></label></div>
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
                              <h4 class="table_head1">Customers </h4>
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
                     
                     <div class="table_clpp20">
                        <h4 class="table_head1">Aging</h4>
                     </div>
                  </div>
                  <div class="table_colmw table_bordr">
                     <div v-for="(inventory,key) in pendingApprovals" v-bind:id="inventory.id" class="table_colmw table_bordr">
                        <div class="table_clpp11">
                          <div class="custom-control custom-checkbox mb-3">
                            <!-- <input type="checkbox"  id="customCheck1" name="example1"> -->
                            <input type="checkbox" :value="inventory.id" v-model="selected_rows" :id="inventory.id" :checked="inventory.status == true">
                            <label  for="customCheck1"></label>
                          </div>
                        </div>
                        <div class="table_clpp12">
                           <h4 class="table_head1"><span>{{inventory['return_request'].number}}</span></h4>
                        </div>
                        <div class="table_clpp13">
                           <h4 class="table_head1"><span>{{request_date}}</span></h4>
                        </div>
                        <div class="table_clpp14">
                           <h4 class="table_head1">
                              <span>
                                {{inventory['return_request'].vendor}}
                              </span>
                           </h4>
                        </div>
                        <div class="table_clpp15">
                           <h4 class="table_head1"><span>{{inventory.reason}}</span></h4>
                        </div>
                        <!-- <div class="table_clpp6">
                           <h4 class="table_head1"><span>Proof Power tools(ppt)</span></h4>
                        </div> -->
                        <div class="table_clpp16">
                           <h4 class="table_head1"><span>{{inventory['return_request'].warehouse}}</span></h4>
                        </div>
                        <!-- <div class="table_clpp8">
                           <h4 class="table_head1"><span>{{inventory['return_request'].vendor_code}}</span></h4>
                        </div>
                        <div class="table_clpp9">
                           <h4 class="table_head1"><span>{{product_code-key*2}}</span></h4>
                        </div> -->
                        <div class="table_clpp17">
                           <h4 class="table_head1"><span>3 day(s)</span></h4>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="check_pagnt">
               <nav class="navigation" aria-label="Page navigation example pull-right">
                  <ul class="pagination">
                     <li class="page-item"><a class="page-link" href="#"><i class="fa fa-angle-double-left"></i></a></li>
                     <li class="page-item"><a class="page-link" href="#"><i class="fa fa-angle-left"></i></a></li>
                     <li class="page-item"><a class="page-link" href="#">1</a></li>
                     <li class="page-item"><a class="page-link" href="#">2</a></li>
                     <li class="page-item"><a class="page-link" href="#">..</a></li>
                     <li class="page-item"><a class="page-link" href="#">9</a></li>
                     <li class="page-item"><a class="page-link" href="#"><i class="fa fa-angle-right"></i></a></li>
                     <li class="page-item"><a class="page-link" href="#"><i class="fa fa-angle-double-right"></i></a></li>
                  </ul>
               </nav>
            </div>
         </div>

         <!-- Approved Columns                       ///   //////////////////-->
         <div id="menu1" class="tab-pane fade">
            <br>
            <div class="check_table stow_scroll">
               <div class="check_tablw">
                  <div class="table_colmw table_bordr">
                     <div class="table_clpp11">
                        <div class="custom-control custom-checkbox mb-3"><label  for="customCheck1"></label></div>
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
                              <h4 class="table_head1">Customers </i></h4>
                           </button>                           
                        </div>
                     </div>
                     <div class="table_clpp15">
                        <div class="dropdown">
                           <button class="custp_dropd" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <h4 class="table_head1">Return Reason </h4>
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
                    <!--  <div class="table_clpp18">
                        <h4 class="table_head1">Customer Code</h4>
                     </div>
                     <div class="table_clpp19">
                        <h4 class="table_head1">Product code/City</h4>
                     </div> -->
                     <div class="table_clpp20">
                        <h4 class="table_head1">Ageing</h4>
                     </div>
                  </div>
                  <div class="table_colmw table_bordr">
                     <div v-for="(inventory,key) in approvedApprovals" v-bind:id="inventory.id" class="table_colmw table_bordr">
                        <div class="table_clpp11">
                           <div class="custom-control custom-checkbox mb-3">
                            <!-- <input type="checkbox"  id="customCheck1" name="example1"> -->
                            
                            <label  for="customCheck1"></label>
                          </div>
                        </div>
                        <div class="table_clpp12">
                           <h4 class="table_head1"><span>{{inventory['return_request'].number}}</span></h4>
                        </div>
                        <div class="table_clpp13">
                           <h4 class="table_head1"><span>{{request_date}}</span></h4>
                        </div>
                        <div class="table_clpp14">
                           <h4 class="table_head1">
                              <span>
                                {{inventory['return_request'].vendor}}
                              </span>
                           </h4>
                        </div>
                        <div class="table_clpp15">
                           <h4 class="table_head1"><span>{{inventory.reason}}</span></h4>
                        </div>
                        <!-- <div class="table_clpp16">
                           <h4 class="table_head1"><span>Proof Power tools(ppt)</span></h4>
                        </div> -->
                        <div class="table_clpp17">
                           <h4 class="table_head1"><span>{{inventory['return_request'].warehouse}}</span></h4>
                        </div>
                        <!-- <div class="table_clpp18">
                           <h4 class="table_head1"><span>{{inventory['return_request'].vendor_code}}</span></h4>
                        </div>
                        <div class="table_clpp19">
                           <h4 class="table_head1"><span>{{product_code-key*2}}</span></h4>
                        </div> -->
                        <div class="table_clpp20">
                           <h4 class="table_head1"><span>3 day(s)</span></h4>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
</template>


<script>
import customer_return_reasons_json from  "@/assets/customer_return_reason.json"
  export default {
    name: 'ApproverPendingRequest',    
    data () {      
      return {
        approved_approvals: customer_return_reasons_json["return_reasons"],
        pending_approvals: customer_return_reasons_json["return_reasons"],
        request_date: '',
        heading: '',
        act: '',
        selected_rows: [],
        updateElement: {}
      }
    },
    created (){
      this.$store.commit('setCustomerReturnReasons', {customer_return_reasons: customer_return_reasons_json})
      const today = new Date();
      const date = (today.getDate()-3)+'-'+(today.getMonth()+1)+'-'+today.getFullYear();      
      this.request_date = date;
      if(this.act === false)
        this.heading = "Pending Requests";
      else
        this.heading = "Pending Approvals";
    },
    computed: {
      approvedApprovals() {
       return this.approved_approvals.filter((approval) => {
          return ((approval.return_request.approved === true))
        })
      },
      pendingApprovals() {
       return this.approved_approvals.filter((approval) => {
          return ((approval.return_request.pending_approval === true) && (approval.return_request.approved === false))
        })
      }
    },
    methods:{
      sendApproval (){
        this.$toast.success('Approvals have been successfully sent');
        for(let i=0;i<this.selected_rows.length;i++)
         {
          this.updateElement = this.$store.state.customer_return_reasons.return_reasons.find(x => x.id === this.selected_rows[i])
          this.updateElement.return_request.approved = true
          this.$store.commit('setCustomerReturnReasons', {customer_return_reasons: this.$store.state.customer_return_reasons})
          console.log(this.updateElement)
         }
      },
      activate1 (){
        this.heading = "Pending Approvals";
        document.getElementById("approvedButton").style.display = 'block'
      },
      activate2 (){
        this.heading = "Approved Requests";
        document.getElementById("approvedButton").style.display = 'none';
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