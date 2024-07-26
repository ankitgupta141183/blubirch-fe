<template>
  <div class="rigt_navbar" id="content">
    <div style="text-align: left;">
      <h3 class="main_header display_non">Item Pickup <router-link :to="{ name: 'PickListMultiple'}"><button class="qc_p_buttn2" style="padding: 4px 25px; width:200px;" :disabled="isdisable">Proceed</button></router-link></h3>
    </div>
    <div class="row">
      <div class="col-lg-6">
        <div class="form_groupw">
          <div class="row">
            <div class="form_group1">
              <i class="fa fa-search" aria-hidden="true"></i>
              <input v-model='tag_number' v-on:change="searchIn(tag_number)" class="search_form" type="text" placeholder="Enter Tag Number to search">
            </div>
          </div>
        </div>
      </div>
    </div>
    <ul class="cutome_tabs nav nav-tabs" role="tablist">
      <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#home">ITEM</a></li>
    </ul>
    <div class="tab-content">
      <div id="home" class="tab-pane active">
        <div class="check_table">
          <div class="check_tablw">
            <div class="table_colmw table_bordr" style="margin-left: 10px;">
              <div class="table_cpck1" style="width: 2%;">
                <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"><label  for="customCheck1"></label></div>
              </div>
              <div class="table_cpck2" style="width: 16%;">
                <h4 class="table_head1">Tag Number</h4>
              </div>
              <div class="table_cpck3" style="width: 16%;">
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
                  </div>
                </div>
              </div>
              <div class="table_cpck4" style="width: 16%;">
                <h4 class="table_head1">Grade</h4>
              </div>

              <div class="table_cpck5" style="width: 16%;">
                <h4 class="table_head1">Aisle Location</h4>
              </div>
              <div class="table_cpck6" style="width: 16%;">
                <h4 class="table_head1">Ageing</h4>
              </div>
              <div class="table_cpck7" style="width: 16%;">
                <div class="dropdown">
                  <button class="custp_dropd" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <h4 class="table_head1">Resolution <i class="fa fa-angle-down"></i></h4>
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
                  </div>
                </div>
              </div>
            </div>
            <div v-for="(inventory, index) in inventories" class="table_colmw table_bordr" style="margin-left: 10px;">
              <div class="table_cpck1" style="width: 2%">
                <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  :id="`customCheck-${index}`" name="example1" @click="addRemoveInventory($event)" :value = "inventory.id"><label  :for="`customCheck-${index}`"></label></div>
              </div>
              <div class="table_cpck2" style="width: 16%">
                <h4 class="table_head1"><span>{{inventory.tag_number ? inventory.tag_number : "Nil"}}</span></h4>
              </div>
              <div class="table_cpck3" style="text-align: left; width: 16%">
                <h4 class="table_head1"><span >{{inventory.destination}} <span class="custome_tip2"><img src="@/assets/images/icons/info-2.svg" class="info_icons custome_tip2"><span class="tooltip_pop2">{{ inventory.origin_station}}</span></span></span></h4>              </div>
              <div class="table_cpck4" style="width: 16%">
                <h4 class="table_head1"><span> {{ inventory.details.grade }} </span></h4>
              </div>
              <div class="table_cpck5" style="width: 16%">
                <h4 class="table_head1"><span>{{ inventory.details.location ? inventory.details.location : "N/A" }}</span></h4>
              </div>
              <div class="table_cpck6" style="width: 16%">
                <h4 class="table_head1"><span>{{ Math.ceil(Math.abs(today_date - new Date(inventory.created_at))/(1000 * 60 * 60 * 24) - 1) }} day(s)</span></h4>
              </div>
              <div class="table_cpck7" style="width: 16%">
                <h4 class="table_head1"><span>{{inventory.details.disposition}}</span></h4>
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
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: 'Pick',
    data () {
      return {
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
      this.$store.commit('toats', {toats: []})
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

        this.$http.secured.get('/api/v1/warehouse/pick_item', !page ? search_param: { params: { page: page}} )
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
          var id =  event.target.value
          this.inventoryIds.push(id)
          this.$store.commit('addInventory', {id: id})
          this.isdisable = false
        }else{
          var ind = this.$store.state.inventoryIds.indexOf(event.target.value)
          this.$store.commit('removeInventory', {ind: ind})
          this.isdisable = (this.$store.state.inventoryIds.length == 0)
        }
      },
      searchIn(tag_number){
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
</style>