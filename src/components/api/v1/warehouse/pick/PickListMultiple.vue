<template>
<body>

  <div class="modal fade cutomr_modal" id="myModal" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <button type="button" class="close qc_result" data-dismiss="modal">&times;</button>
        <div class="modal-body">
          <h3 class="barc_mod_hed">Toat number : <span> {{available_toats}} </span></h3>
          <div class="modal_sect1 after_stow">
            <ul class="test_resul2">
              <li style="text-align: center;">Total Inventories</li>
              <li style="text-align: center;"><strong> {{inventories.length}} </strong></li>
            </ul>
          </div>
          <div class="modal_sect2">
            <ul class="test_resul2">
              <li>Item Found: <strong> {{ item_count }} </strong></li>
              <li>Not Found: <strong> {{inventories.length - item_count}}  </strong></li>
            </ul>
          </div>
          <div class="pick_button">
            <button class="barcode_bt2 no_bg_butn">Go back</button>
            <button @click="updateInventories" class="barcode_bt2">Complete</button>
        </div>
        </div>
      </div>
    </div>
  </div>

  <div>

    <div class="rigt_navbar" id="content">
      <h3 class="main_header display_non">Item Pickup <button class="qc_p_button bluse_colr" data-toggle="modal" @click="checkToatOrItem($event)" data-target="#myModal">Complete Pickup</button></h3>
      <div class="row">
        <div class="col-lg-6">
          <div class="row">
            <div class="col-lg-5">
              <div class="form_groupw sku_search">
                <div class="row">
                  <h4 class="categ_head2 qh_smallhd1">Tag Number</h4>
                  <div class="form_group1">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <input v-model="tag_number" class="search_form" type="text" placeholder="12345678">
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-5">
              <div class="form_groupw sku_search">
                <div class="row">
                  <h4 class="categ_head2 qh_smallhd1">Toat Number</h4>
                  <div class="form_group1">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <input v-model="toat_number" @change = "addTot" class="search_form" type="text" placeholder="Scan Toat number">
                  </div>
                </div>
              </div>
            </div>
              <div class="col-lg-2" style="margin-top: 40px;">
                <div class="row">
                  <button @click="addItem" class="qc_p_buttn2">Add Item</button>
                </div>
              </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="pp_test_sec">
            <ul class="qc_test_ul4">
              <li>Origin : <span> {{origin}}</span></li>
              <li>Destination : <span> {{destination}} </span></li>
            </ul>
          </div>
        </div>
      </div>

      <div v-if="errors1.includes('invalid_tag_number')">
        <div class="warning_img">
          <div class="warnig_imgw" style="text-align: left; font-size: 14px">
            Please Enter Valid TAG No.
          </div>
        </div>
      </div>

      <div class="pack_colum1">
        <button class="qc_searchb3">Scan Toat</button>
        <div v-for="(toat, index) in toats" class="accordion" id="myAccordion">
          <div class="card">
            <div class="card-header" id="headingOne">
              <div class="table_colmw table_bordr">
                <div class="tbl_colpic1"><h4 class="table_head1">Toat No - {{toat.toat_number}} </h4></div>
                <div class="tbl_colpic2"><h4 class="table_head1"><ul class="remove_butn"><li><a href="#"><i class="fa fa-trash" @click= removeToat(index)></i></a href="#"></li><li><a><i class="fa fa-print"></i></a></li></ul></h4></div>
                <div class="tbl_colpic3"><h4 class="table_head1">Items: {{toat.inventories.length}} </h4> <button type="button" class="btn_Collapse collapsed" data-toggle="collapse" :data-target="`#collapseOne${index}`"><i class="fa fa-caret-down"></i></button></div>
              </div>
            </div>
            <div :id="`collapseOne${index}`" class="collapse" aria-labelledby="headingOne" data-parent="#myAccordion">
              <div class="check_table" v-for="inventory in toat.inventories">
                <div class="check_tablw">
                  <div class="table_colmw table_bordr table_poup">
                    <div class="tbl_colpic1"><h4 class="table_head1"><span> 
                    {{inventory.tag_number}} </span></h4></div>
                    <div class="tbl_colpic2"><h4 class="table_head1"><span> {{inventory.details.aisle ? inventory.details.aisle : "N/A"}} </span></h4></div>
                    <div class="tbl_colpic3"><h4 class="table_head1"><span class="pass_test"> {{inventory.details.packaging_status ? inventory.details.packaging_status : "N/A"}} </span></h4></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pack_colum2">
        <div class="check_table">
          <div class="check_tablw stow_scroll">
              <div class="table_colmw table_bordr">
                <div class="tbl_colpic1"><h4 class="table_head1">Tag Number</h4></div>
                <div class="tbl_colpic2"><h4 class="table_head1">Location</h4></div>
                <div class="tbl_colpic3"><h4 class="table_head1">Status</h4></div>

              </div>
              <div v-for="inventory in inventories" class="table_colmw table_bordr table_poup">
                <div class="tbl_colpic1"><h4 class="table_head1"><span>{{inventory.tag_number ? inventory.tag_number : "N/A"}}</span></h4></div>
                <div class="tbl_colpic2"><h4 class="table_head1"><span>BOM_LOC_A</span></h4></div>

                <div v-if="inventory.details.packaging_status == 'Picked'" class="tbl_colpic3"><h4 class="table_head1"><span class="pass_test">{{inventory.details.packaging_status ? inventory.details.packaging_status : "N/A"}}</span></h4></div>
                <div v-else class="tbl_colpic3"><h4 class="table_head1"><span class="fail_test">{{inventory.details.packaging_status ? inventory.details.packaging_status : "N/A"}}</span></h4></div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div> 
</body>

</template>


<script>
  import $ from 'jquery'
  export default {
    name: 'PickListMultiple',
    data () {
      return {
        inventories: [],
        toat_number: '',
        toats: this.$store.state.toats,
        selected_ids: this.$store.state.inventoryIds,
        item_count: 0,
        errors1: [],
        tag_number: '',
        origin: '',
        destination: '',
        available_toats: ''
      }
    },

    created(){
      this.getInventories()
      if ((this.toat_number === '') && (this.$store.state.toats.length > 0)){
        this.toat_number = this.$store.state.toats[this.$store.state.toats.length - 1].toat_number
      }
    },
    methods: {

      getInventories (){
        this.$http.secured.get('/api/v1/warehouse/pick_item/get_inventories', {params:{ids: this.selected_ids}} )
          .then(response => {
            this.inventories = response.data.inventories
            this.origin = this.inventories[0].origin
            this.destination = this.inventories[0].destination
            this.setInventoryStatus()
          })
          .catch(error => {
            this.$toast.error('Error in fetching Inventories')
          })
       },

      addTot: function () {
        if (this.$store.state.toats.length > 0 && Array.from(this.toats.values(), v => v['toat_number']).includes(this.toat_number)){
          return
        }
        var h = {}
        h.toat_number = this.toat_number
        h.inventories = []
        this.toats.push(h)
        this.$store.commit('toats', {toats: this.toats})
        this.available_toats = Array.from(this.toats.values(), v => v['toat_number']).join(", ");
      },

      removeToat: function(ind) {
        var inventories = this.toats[ind].inventories
        for(var i=0;i < inventories.length;i++){
          var inv = this.inventories.find( ({ id }) => (id === inventories[i].id))
          inv.details.packaging_status = 'Not Packed'
        }
        this.toats.splice(ind, 1)
        this.$store.commit('toats', {toats: this.toats})
        if (this.$store.state.toats.length > 0){
          this.toat_number = this.$store.state.toats[this.$store.state.toats.length - 1].toat_number
        }else{
          this.toat_number = ''
        }
      },

      addItem: function(){
        if (this.toat_number == ''){
          this.$toast.warning('Please add Toat first')
          return
        }

        if (this.tag_number == '') {
          this.errors1.push('invalid_tag_number')
          return
        }

        var item = this.inventories.find( ({ tag_number }) => (tag_number.toLowerCase() === this.tag_number.toLowerCase()))

        if (item == undefined || item.details.packaging_status == 'Picked') {
          this.errors1.push('invalid_tag_number')
          this.tag_number = ''
          return
        }
        else{
          var current_toat = this.toats.find( ({toat_number}) => toat_number === this.toat_number)
          this.errors1 = []
          item.details.packaging_status = 'Picked'
          this.tag_number = ''
          this.item_count += 1
          current_toat.inventories.push(item)
          this.$store.commit('toats', {toats: this.toats})
        }
      },

      checkToatOrItem: function(e){
        let item_blank = false
        for(var i=0;i<this.toats.length;i++){
          if(this.toats[i].inventories.length == 0){
            item_blank = true
          }
        }

        if (this.toats.length == 0 || item_blank){
          e.stopPropagation();
          this.$toast.warning('Please Add Items')
          return
        }

      },

      setInventoryStatus: function(){
        if (this.toats.length > 0) {
          for(var i=0;i<this.toats.length;i++){
            if(this.toats[i].inventories.length > 0){
              var inventories = this.toats[i].inventories
              for(var i=0;i < inventories.length;i++){
                var inv = this.inventories.find( ({ id }) => (id === inventories[i].id))
                inv.details.packaging_status = 'Picked'
              }
            }
          }          
        }
      },

      updateInventories: function(){
        if (this.toats.length == 0 || this.toats[0].inventories.length == 0){
          $('#myModal').modal('hide');
          this.$toast.warning('Please Add Items')
        }else{
          var modified_params = []
          $.each(this.$store.state.toats, function(index, value){
            var toat = {}
            toat["toat_number"] = value["toat_number"]
            toat["inventories"] = []
            $.each(value["inventories"], function(index, value){
              toat["inventories"].push(value.id)
            })
            modified_params.push(toat)
          })

          this.$http.secured.post('/api/v1/warehouse/pick_item/create_items', {toats: modified_params})
            .then(response => {
              this.$toast.success('Item added successfully')
              $('#myModal').modal('hide');
              this.$router.push('/api/v1/pending_pack')
            })
            .catch(error => this.$toast.error('Error in adding items'))
        }
      }

    }
  }
</script>