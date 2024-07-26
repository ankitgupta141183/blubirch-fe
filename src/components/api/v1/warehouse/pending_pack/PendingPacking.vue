<template>
  <div class="rigt_navbar" id="content">
    <div style="text-align: left;">
      <h3 class="main_header display_non">Pending Packaging
        <router-link :to="{ name: 'PendingPackingListStorePack'}">
          <button class="qc_p_buttn2" data-toggle="modal" data-target="#myModal" :disabled="isdisable">Proceed to Packaging
          </button>
        </router-link>
      </h3>
    </div>
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
      <!-- <div class="col-lg-6">
        <div class="pk_test_se2">
          <ul class="qc_test_uli">
            <li>Total Items :<span>10</span></li>
            <li>Packed : <span>10</span></li>
            <li>Not Packed : <span class="failed_qc">1</span></li>
          </ul>
        </div>
      </div> -->
    </div>
    <ul class="cutome_tabs nav nav-tabs" role="tablist">
      <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#home">ITEM</a></li>
      <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#menu1">LOT</a></li>
    </ul>
    <div class="tab-content">
      <div id="home" class="tab-pane active">
        <div class="check_table">
          <div class="check_tablw stow_scroll">
            <div class="table_colmw table_bordr">
              <div class="table_cpck1" style="margin-left: 10px;">
                <div class="custom-control custom-checkbox mb-3"><label class="custom-control-label" for="customCheck1"></label></div>
              </div>
              <div class="table_cpck2" style="width: 210px;">
                <h4 class="table_head1">Toat Number</h4>
              </div>

              <div class="table_cpck4" style="width: 210px;">
                <div class="dropdown">
                  <button class="custp_dropd" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <h4 class="table_head1">Destination Station <i class="fa fa-angle-down"></i></h4>
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <div class="form_group1">
                      <i class="fa fa-search" aria-hidden="true"></i>
                      <input class="search_form" type="text" placeholder="Scan or Enter tag number">
                    </div>
                    <li>
                      <a class="dropdown-item" href="#">
                        <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                        C1-Chroma
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                        B1-Warehouse, Bannerghatta
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                        C1-Chroma
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                        C1-Chroma
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                        C1-Chroma
                      </a>
                    </li>
                  </div>
                </div>
              </div>
              <div class="table_cpck5" style="width: 210px;">
                <h4 class="table_head1">Grading</h4>
              </div>

              <div class="table_cpck6" style="width: 210px;">
                <h4 class="table_head1">Ageing</h4>
              </div>
              <div class="table_cpck7" style="width: 210px;">
                <div class="dropdown">
                  <button class="custp_dropd" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <h4 class="table_head1">Disposition <i class="fa fa-angle-down"></i></h4>
                  </button>
                </div>
              </div>
            </div>
            <div v-for= "(inventory, index) in inventories"class="table_colmw table_bordr" >
              <div class="table_cpck1" style="margin-left: 10px;">
                <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" :id="`customCheck-${index}`" name="example1" @click="addRemoveInventory($event)" :value = "inventory.id"><label class="custom-control-label" :for="`customCheck-${index}`"></label></div>
              </div>
              <div class="table_cpck2" style="width: 210px;">
                <h4 class="table_head1"><span> {{inventory.details.toat_number ? inventory.details.toat_number : "Nil"}} </span></h4>
              </div>



              <div class="table_cpck4" style="text-align: left; width: 210px;">
                <h4 class="table_head1"><span> {{inventory.destination}} <img src="@/assets/images/icons/info-2.svg" class="info_icons"></span></h4>
              </div>

              <div class="table_cpck5" style="width: 210px;">
                <h4 class="table_head1"><span> {{ inventory.details.grade }} </span></h4>
              </div>

              <div class="table_cpck6" style="width: 210px;">
                <h4 class="table_head1"><span>{{ Math.ceil(Math.abs(today_date - new Date(inventory.created_at))/(1000 * 60 * 60 * 24) - 1) }} day(s)</span></h4>
              </div>
              <div class="table_cpck7" style="width: 210px;" >
                <h4 class="table_head1"><span> {{inventory.details.disposition}} </span></h4>
              </div>
            </div>
          </div>
        </div>
        <div class="check_pagnt">
          <nav class="navigation" aria-label="Page navigation example pull-right">
            <paginate
              :page-count=total_pages
              :click-handler="getInventories"
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
      <div id="menu1" class="tab-pane fade">
        <br>
        <p>Coming soon</p>
      </div>
    </div>
  </div>
</template>

<script>

  import $ from 'jquery'
  export default {
    name: 'PendingPacking',
    data () {
      return {
      gate_passes: [],
      origin_stations: [],
      destination_stations: [],
      inventories: [],
      isdisable: true,
      inventoryIds: [],
      page: 1,
      tag_number: '',
      total_pages: 1,
      today_date: new Date(new Date().toJSON().slice(0,10).replace(/-/g,'-'))
    }
    },
    created () {
      this.$store.commit('boxDetails', {boxdetails: []})
      this.$store.commit('boxItems', {boxitems: []})
      this.getInventories()
      this.$store.commit('removeAllInventories', {ids: []})
    },

    methods:{
      getInventories(page){

        let search_param = { 
           params:
           {
              page: page,
              tag_number: this.tag_number
           }
        }

        this.$http.secured.get('/api/v1/warehouse/pending_packaging', !page ? search_param: { params: { page: page}} )
          .then(response => {
            this.inventories = response.data.inventories
            this.total_pages = response.data.meta.total_pages

          })
          .catch(error => {
            this.$toast.error('Error in fetching inventories')
          })
      },
      addRemoveInventory(event){
        if (event.target.checked){
          var inv_id =  event.target.value
          if (this.inventoryIds.length != 0) {
            var exixting_inventory = this.inventories.find( ({ id }) => (id === parseInt(this.inventoryIds[0]) ))
            var current_inventory = this.inventories.find( ({ id }) => (id === parseInt(inv_id) ))
            if (exixting_inventory.client_id != current_inventory.client_id || exixting_inventory.details.status != current_inventory.details.status){
              this.$toast.warning('Please select same destination and disposition')
              event.stopPropagation();
              return
            }
          }
          this.inventoryIds.push(inv_id)
          this.$store.commit('addInventory', {id: inv_id})
          this.isdisable = false
        }else{
          var ind = this.$store.state.inventoryIds.indexOf(event.target.value)
          this.$store.commit('removeInventory', {ind: ind})
          this.isdisable = (this.$store.state.inventoryIds.length == 0)
        }
      },
      searchTn(tag_number){
        this.getInventories()
      },
    }
  }
  
</script>

<style>
.custome_tip2 {
      position: relative;
      display: inline-block;
      float: none;
}
.qc_p_buttn2 {
  width: 262px;
}

</style>