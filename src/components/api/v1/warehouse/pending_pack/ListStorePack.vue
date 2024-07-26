<template>
  <div>
    <div class="modal fade cutomr_modal" id="myModal1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <button type="button" class="close qc_result" data-dismiss="modal">&times;</button>
          <div class="modal-body">
            <h3 class="barc_mod_hed">Gate Pass : <span> {{gate_pass}} </span></h3>
            <div id="section-to-print" style=" text-align: center;">
              <barcode v-bind:value="gate_pass">
              
              </barcode>
              <a><i class="fa fa-print"></i></a>
            </div>
            <div class="modal_sect1 after_stow">
              <ul class="test_resul2">
                <li>Total Inventories : <strong>{{ inventories.length }}</strong></li>
                <li>Total Boxes : <strong> {{total_boxes}} </strong></li>
              </ul>
            </div>
            <div class="modal_sect2">
              <ul class="test_resul2">
                <li>Item Found: <strong>{{added_items}}</strong></li>
                <li>Not Packed: <strong>{{inventories.length - added_items}} </strong></li>
              </ul>
            </div>
            <div class="pick_button">
              <button @click= "resetData()" class="barcode_bt2 no_bg_butn" data-dismiss="modal">Go back</button>
              <button @click= "createGatePassRecords($event)" class="barcode_bt2">Complete</button>
            </div>
          </div>
        </div> 
      </div>
    </div>

    <div class="">
      <div class="rigt_navbar" id="content">
        <div style="text-align: left;">
          <h3 class="main_header display_non">Pending Packaging <button @click="printgatepass($event)" class="qc_p_button butn_font13" data-target="#myModal1">Print Gate-Pass</button></h3>
        </div>
      <div class="row">
        <div class="col-lg-6">
          <div class="row">
            <div class="col-lg-5">
              <div class="form_groupw sku_search">
                <div class="row">
                  <h4 class="categ_head2 qh_smallhd1">Tag Number</h4>
                  <div class="form_group1">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <input v-model="tag_number" class="search_form" type="text" placeholder="Scan Tag Number">
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-5">
              <div class="form_groupw sku_search">
                <div class="row">
                  <h4 class="categ_head2 qh_smallhd1">Box Number</h4>
                  <div class="form_group1">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <input v-model="box_number" class="search_form" type="text" placeholder="Box number">
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-2">
              <div class="row">
                <button class="qc_search_b width_94px bluse_colr" @click= "addItems" >Add Item</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-1"></div>
        <div class="col-lg-5">
          <div class="qc_test_sec">
            <ul class="qc_test_ul3 font_siz_16">
              <li>Origin : <span> {{inventories[0].origin}} </span></li>
              <li>Destination : <span> {{inventories[0].destination}} </span></li>
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
      <div class="pack_colum1 font_siz_16">
        <button class="qc_searchb3 bluse_colr" @click="addBox">Add Box</button>

        <div v-for="(box, index) in box_records" class="accordion" id="myAccordion">
          <div class="card">
            <div class="card-header" id="headingOne">
              <div class="table_colmw table_bordr">
                <div class="tbl_colpic1">
                  <h4 class="table_head1"> Box No - {{box.box_number}} </h4>
                </div>
                <div class="tbl_colpic2">
                  <h4 class="table_head1">
                    <ul class="remove_butn">
                      <li>
                        <a href="#">
                          <i @click= deleteBox(box.id) class="fa fa-trash"></i></a href="#">
                      </li>
                    </ul>
                  </h4>
                </div>
                <div class="tbl_colpic3">
                  <h4 class="table_head1">Items: {{box.item_count}}</h4>
                  <button type="button" class="btn_Collapse collapsed" data-toggle="collapse" :data-target="`#collapseOne${index}`"><i class="fa fa-caret-down"></i></button>
                </div>
              </div>
            </div>
            <div :id="`collapseOne${index}`" class="collapse" aria-labelledby="headingOne">
              <div class="check_table" v-for= "item in box_items.find( ({box_number}) => box_number === box.box_number ).items">
                <div class="check_tablw">
                  <div class="table_colmw table_bordr table_poup">
                    <div class="tbl_colpic1">
                      <h4 class="table_head1"><span> {{item.tag_number}} </span></h4>
                    </div>
                    <div class="tbl_colpic2">
                      <h4 class="table_head1"><span>BOM_LOC_A</span></h4>
                    </div>
                    <div class="tbl_colpic3">
                      <h4 class="table_head1"><span class="pass_test">Packed</span></h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pack_colum2 font_siz_14 newpadin_alg">
        <div class="check_table">
          <div class="check_tablw stow_scroll no_backrnd">
            <div class="table_colmw table_bordr">
              <div class="tbl_pening1">
                <h4 class="table_head1">Tag Number</h4>
              </div>
              <div class="tbl_pening2">
                <h4 class="table_head1">Item Description</h4>
              </div>
              <div class="tbl_pening3">
                <h4 class="table_head1">Status</h4>
              </div>
              <div class="tbl_pening4">
                <h4 class="table_head1">Box Number</h4>
              </div>
            </div>
            <div v-for="inventory in inventories" class="table_colmw table_bordr table_poup">
              <div class="tbl_pening1">
                <h4 class="table_head1"><span> {{inventory.tag_number ? inventory.tag_number : "N/A"}} </span></h4>
              </div>
              <div class="tbl_pening2">
                <h4 class="table_head1"><span> {{ inventory.details.item_description ? inventory.details.item_description : "N/A"}} </span></h4>
              </div>
              <div class="tbl_pening3">
                <h4 v-if="inventory.details.packaging_status == 'Packed'" class="table_head1"><span class="pass_test"> {{inventory.details.packaging_status ? inventory.details.packaging_status : "N/A"}} </span></h4>
                <h4 v-else class="table_head1"><span class="fail_test"> {{inventory.details.packaging_status ? inventory.details.packaging_status : "N/A"}} </span></h4>
              </div>
              <div class="tbl_pening4">
                <h4 class="table_head1"><span> {{inventory.box_no}} </span></h4>
              </div>
              <!--<div class="collapse_f">
                <div class="remark_colm">
                    <div class="model_drop1">
                        <select class="search_frm1">
                            <option value="volvo">Choose a remark</option>
                            <option value="saab">Saab</option>
                            <option value="mercedes">Mercedes</option>
                            <option value="audi">Audi</option>
                        </select>
                    </div>
                </div>
                <div class="remark_colm">
                    <div class="group_butons">
                        <button class="button1_fail">Fail</button>
                        <button class="button1_pass">Pass</button>
                    </div>
                </div>
                </div>-->
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import VueBarcode from 'vue-barcode';

  export default {
    name: 'ListStorePack',
    data () {
      return {
        box_items: this.$store.state.boxitems,
        inventories: [],
        box_records: this.$store.state.boxes,
        box_number: '',
        return_request: {},
        selected_ids: this.$store.state.inventoryIds,
        item_count: 0,
        add_box_count: 0,
        errors1: [],
        tag_number: '',
        gate_pass: '',
        added_items: 0,
        total_boxes: 0
      }
    },
    components: {
      'barcode': VueBarcode
    },

    created(){
      this.getInventories()

      if ((this.box_number === '') && (this.$store.state.boxes.length > 0)){
        this.box_number = this.$store.state.boxes[this.$store.state.boxes.length - 1].box_number
      }

    },

    methods: {

      getInventories (){
        this.$http.secured.get('/api/v1/warehouse/pending_packaging/get_inventories', {params:{ids: this.selected_ids}} )
          .then(response => {
            this.inventories = response.data.inventories
          })
          .catch(error => {
            this.$toast.error('Error in fetching Inventories')
          })
       },

      addBox: function () {
        this.$http.secured.post('/api/v1/warehouse/pending_packaging/create_box', {id: this.inventories[0].id} )
          .then(response => {
            this.createpackagingbox(response.data.packaging_box)
            var packaging_box = response.data.packaging_box
            this.box_records.push(response.data.packaging_box)
            this.$store.commit('boxDetails', {boxdetails: this.box_records})
            this.box_number = packaging_box.box_number
          })
          .catch(error => {
            this.$toast.error('Error in Creating Box')
          })
      },

      deleteBox(box_id){
        this.$http.secured.delete('/api/v1/warehouse/pending_packaging/delete_packaging_box', {params: {id: box_id}} )
          .then(response => {
            var box = this.box_records.find( ({ id }) => (id === box_id ))
            this.deleteBoxItems(box)
            var index = this.box_records.indexOf(box)
            this.box_records.splice(index, 1)
            this.$store.commit('boxDetails', {boxdetails: this.box_records})
            this.box_number = ""
          })
          .catch(error => {
            this.$toast.error('Error in Deleting Box')
          })
      },

      createpackagingbox(box){
        var hash = {}
        hash.box_number = box.box_number
        hash.items = []
        this.box_items.push(hash)
        this.$store.commit('boxItems', {boxitems: this.box_items})
      },

      deleteBoxItems(box){
        var box_item = this.box_items.find( ({box_number}) => (box_number === box.box_number))
        for(var i=0;i < box_item.items.length;i++){
          var inv = this.inventories.find( ({ id }) => (id === box_item.items[i].id))
          inv.details.packaging_status = 'Not Packed'
          inv.box_no = ''
        }
        var index = this.box_items.indexOf(box_item)
        this.box_items.splice(index, 1)
        this.$store.commit('boxItems', {boxitems: this.box_items})
      },

      addItems: function(){
        if (this.box_number == ''){
          this.$toast.warning('Please add box first')
          return
        }

        if (this.tag_number == '') {
          this.errors1.push('invalid_tag_number')
          return
        }

        var item = this.inventories.find( ({ tag_number }) => (tag_number.toLowerCase() === this.tag_number.toLowerCase()))
        if (item == undefined) {
          this.errors1.push('invalid_tag_number')
          return
        }
        else
        {
          var current_box = this.box_items.find( ({box_number}) => box_number === this.box_number)
          var main_box = this.box_records.find( ({box_number}) =>  box_number === this.box_number)
          main_box.item_count += 1
          this.errors1 = []
          item.details.packaging_status = 'Packed'
          item.box_no = this.box_number
          this.tag_number = ''
          this.item_count += 1
          current_box.items.push(item)
          this.$store.commit('boxItems', {boxitems: this.box_items})
        }
      },

    //   removeItem: function(box_num, item_id){
    //     var box = this.box_items.find( ({box_number}) => box_number === box_num )
    //     var item = box.items.find( ({id}) => id === item_id )
    //     var main_box = this.box_records.find( ({box_number}) =>  box_number === box_num)
    //     item.details.status = "Not Packed"
    //     item.box_no = ''
    //     main_box.item_count -= 1
    //     var index = box.items.indexOf(item)
    //     box.items.splice(index, 1)
    //     this.$store.commit('boxItems', {boxitems: this.box_items})
    //   },

      printgatepass: function(e){
        if (this.box_records.length == 0) {
          this.btnDisable = true
          this.$toast.warning('Please Add Box')
          e.stopPropagation();
        }
        else if ( this.box_items.length == 0 || this.box_items[0].items.length == 0) {
          this.$toast.warning('Please Add Items')
          this.btnDisable = true
          e.stopPropagation();
        }else {
          this.$http.secured.post('/api/v1/warehouse/pending_packaging/generate_gate_pass')
          .then(response => {
            if(response.status == 200){
              this.gate_pass = response.data.gatepass_number
              var addeditem_count = 0
              $.each(this.box_items, function(index, value){
                addeditem_count += value.items.length
              })

              this.added_items = addeditem_count
              this.total_boxes = this.box_records.length
              $('#myModal1').modal('show');
            }

          })
          .catch(error => {
            this.$toast.error('Error in generating Gate Pass')
          })
        }
      },

      createGatePassRecords: function(e){

        if ( this.box_items.length == 0 || this.box_items[0].items.length == 0 ){
          this.$toast.warning('Please Add Items')
        }else{
          var modified_params = []
          $.each(this.$store.state.boxitems, function(index, value){
            var box = {}
            box["box_number"] = value["box_number"]
            box["items"] = []
            $.each(value["items"], function(index, value){
              var item = {}
              item["inventory_id"] = value["id"]
              box["items"].push(item)
            })
            modified_params.push(box)
          })

          this.$http.secured.post('/api/v1/warehouse/pending_packaging/create_items', {gate_pass: this.gate_pass, distribution_center_id: this.box_items[0].items[0].distribution_center_id, boxes: modified_params} )
          .then(response => {
            if(response.status == 200){
              this.added_items = response.data.total_packed_inventory
              this.total_boxes = response.data.boxes_count
              $('#myModal1').modal('hide');
              this.$toast.success('Packaging Completed Successfully');
              this.$router.push('/api/v1/pending_pack');

            }

          })
          .catch(error => {
            this.$toast.error('Error in creating Gate Pass Items')
          })
        }
      },

      resetData: function(){
        this.box_records = []
        this.box_items = []
        this.box_number = ''
        this.$store.commit('boxDetails', {boxdetails: []})
        this.$store.commit('boxItems', {boxitems: []})
      }

    }
  }
</script>