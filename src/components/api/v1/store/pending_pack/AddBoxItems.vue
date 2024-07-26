<template>
  <body>

    <div class="modal fade cutomr_modal" id="myModal" role="dialog">
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
                <li>Total Inventories : <strong>{{return_request.details.total_inventories}}</strong></li>
                <li>Total Boxes : <strong> {{total_boxes}} </strong></li>
              </ul>
            </div>
            <div v-if= "isgrading" class="modal_sect2">
              <ul class="test_resul2">
                <li>Item Found: <strong>{{added_items}}</strong></li>
                <li>Not Packed: <strong>{{return_request.details.total_inventories - added_items}} </strong></li>
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
      <div class="mobile_head">
      <button class="menu_toggle sidebarCollapse"><i class="fa fa-bars"></i></button>
      <h3 class="main_header">INV35643</h3>
      </div>
      <div class="rigt_navbar" id="content">
        <h3 class="main_header display_non">Pending Packaging <button @click="printgatepass($event)" class="qc_p_button" data-target="#myModal">Print Gate-Pass</button></h3>
        <div class="row">
          <div class="col-lg-6">
            <div v-if = "isgrading" class="row">
              <div class="col-lg-5">
                <div class="form_groupw sku_search">
                  <div class="row">
                    <h4 class="categ_head2 qh_smallhd1">TAG Number</h4>
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
                      <input class="search_form" type="text" placeholder="06456" v-model="box_number">
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-2" style="margin-top:30px;">
                <div class="row">
                  <button @click= "addItems"class="qc_searchb3" style="padding: 7px 15px;">Add Item</button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="pp_test_sec">
              <ul class="qc_test_ul4">
                <li>RR Number : <span> {{return_request.request_number}} </span></li>
                <li>Quantity : <span> {{return_request.details.total_inventories}} </span></li>
                <li style="width: 100% !important;">Reason : <span> {{return_request.details.customer_return_reason}} </span></li>
              </ul>
            </div>
          </div>
        </div>
        <div v-if="errors1.includes('invalid_tag')">
          <div class="warning_img">
            <div class="warnig_imgw" style="text-align: left; font-size: 17px">
              Please Enter Valid Tag No.
            </div>
          </div>
        </div>
        <div class="pack_colum1">
          <button class="qc_searchb3" @click="addBox">Add Box</button>
     
          <section v-for="(box, index) in box_records">
            <div class="accordion">
              <div class="card">
                <div class="card-header" id="headingOne">
                  <div class="table_colmw">
                    <div class="tbl_colpic1"><h4 class="table_head1">Box No - <strong>{{box.box_number}}</strong></h4></div>
                    <div class="tbl_colpic2"><h4 class="table_head1"><ul class="remove_butn"><li><a href="#"><i @click= deleteBox(box.id) class="fa fa-trash"></i></a></li></ul></h4></div>
                    <div class="tbl_colpic3"><h4 class="table_head1">Items: <strong> {{box.item_count}} </strong></h4> <button type="button" class="btn_Collapse collapsed" data-toggle="collapse" :data-target="`#collapseOne${index}`"><i class="fa fa-caret-down"></i></button></div>
                  </div>
                </div>
                <div :id="`collapseOne${index}`" class="collapse" aria-labelledby="headingOne">
                  <div class="check_table" v-for= "item in box_items.find( ({box_number}) => box_number === box.box_number ).items">
                    <div class="check_tablw">
                      <div class="table_colmw table_bordr table_poup">
                        <div class="tbl_p_pack4">
                          <h4 class="table_head1">
                            <div class="custom-control custom-checkbox mb-3">
                              <i @click= "removeItem(box.box_number, item.id)" class="fa fa-trash"></i>
                            </div>
                          </h4>
                        </div>
                        <div class="tbl_p_pack1">
                          <h4 class="table_head1">
                            <span>{{item.tag_number}}</span>
                          </h4>
                        </div>
                        <div class="tbl_p_pack2">
                          <h4 class="table_head1">
                            <span> {{item.details.quantity}} </span>
                          </h4>
                        </div>
                        <div class="tbl_p_pack3">
                          <h4 class="table_head1">
                            <span class="pass_test">
                              Picked
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
        <div class="pack_colum2">
          <div class="check_table">
            <div class="check_tablw stow_scroll">
              <div class="table_colmw table_bordr">
                <div class="tbl_colpnd1"><h4 class="table_head1">SKU/TAG Number</h4></div>
                <div class="tbl_colpnd2"><h4 class="table_head1">Item Description</h4></div>
                <div class="tbl_colpnd3"><h4 class="table_head1">Status</h4></div>
                <div class="tbl_colpnd4"><h4 class="table_head1">Box Number</h4></div>
              </div>
              <div v-for="record in records" class="table_colmw table_bordr table_poup">
                <div class="tbl_colpnd1"><h4 class="table_head1"><span>{{isgrading ? record.tag_number : record.details.product_code_sku}}</span></h4></div>
                <div class="tbl_colpnd2">
                  <h4 class="table_head1">
                    <span>
                      {{record.details.item_description}}
                    </span>
                  </h4>
                </div>
                <div v-if="record.details.packaging_status === 'Packed'">
                  <div class="tbl_colpnd3"><h4 class="table_head1"><span class="pass_test">{{record.details.packaging_status}}</span></h4></div>
                </div>
                <div v-else>
                   <div class="tbl_colpnd3"><h4 class="table_head1"><span class="fail_test">{{record.details.packaging_status}}</span></h4></div>
                </div>
                <div class="tbl_colpnd4"><h4 class="table_head1"><span>{{record.box_no}}</span></h4></div>
              </div>
              </div>
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
  import VueBarcode from 'vue-barcode';

  export default {
    name: 'AddBoxItems',
    data () {
      return {
        box_items: this.$store.state.boxitems,
        records: [],
        box_records: this.$store.state.boxes,
        box_number: '',
        return_request: {},
        item_count: 0,
        add_box_count: 0,
        errors1: [],
        tag_number: '',
        gate_pass: '',
        added_items: 0,
        total_boxes: 0,
        isgrading: false
      }
    },
    components: {
      'barcode': VueBarcode
    },

    created(){
      var id = this.$route.params.id
      if (id) {
        this.getReturnRequest(id)

      }else{
        this.return_request = this.$store.state.return_request
        this.isgrading = this.$store.state.return_request.customer_return_reason.grading_required
        this.records = this.return_request.inventories
      }

      if ((this.box_number === '') && (this.$store.state.boxes.length > 0)){
        this.box_number = this.$store.state.boxes[this.$store.state.boxes.length - 1].box_number
      }

    },

    methods: {

      getReturnRequest (id){
        this.$http.secured.get('/api/v1/store/pending_packaging/'+ id )
          .then(response => {
            this.return_request = response.data.return_request
            this.records = response.data.return_request.inventories
            this.isgrading = response.data.return_request.customer_return_reason.grading_required
            this.$store.commit('setInvoiceDetail', {detail: this.return_request})
            this.return_request = this.$store.state.return_request
          })
          .catch(error => {
            this.$toast.error('Error in fetching Return Requests')
          })
      },

      addBox: function () {
        this.$http.secured.post('/api/v1/store/pending_packaging/add_packaging_box', {id: this.return_request.id} )
          .then(response => {
            this.createpackagingbox(response.data.packaging_box)
            var packaging_box = response.data.packaging_box
            this.box_records.push(response.data.packaging_box)
            this.$store.commit('boxDetails', {boxdetails: this.box_records})
            this.box_number = packaging_box.box_number
          })
          .catch(error => {
            this.$toast.error('Error in fetching Return Requests')
          })
      },

      deleteBox(box_id){
        this.$http.secured.delete('/api/v1/store/pending_packaging/delete_packaging_box', {params: {id: box_id}} )
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
          this.errors1.push('invalid_tag')
          return
        }

        var item = this.records.find( ({ tag_number }) => (tag_number.toLowerCase() === this.tag_number.toLowerCase()))

        if (item == undefined) {
          this.errors1.push('invalid_tag')
          return
        }
        else if (item.details.packaging_status === 'Packed'){
          this.$toast.error('Item already Added')
          this.tag_number = ''
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

      removeItem: function(box_num, item_id){
        var box = this.box_items.find( ({box_number}) => box_number === box_num )
        var item = box.items.find( ({id}) => id === item_id )
        var main_box = this.box_records.find( ({box_number}) =>  box_number === box_num)
        item.details.packaging_status = "Not Packed"
        item.box_no = ''
        main_box.item_count -= 1
        var index = box.items.indexOf(item)
        box.items.splice(index, 1)
        this.$store.commit('boxItems', {boxitems: this.box_items})
      },

      printgatepass: function(e){
        if ( this.isgrading && (this.box_items.length == 0 || this.box_items[0].items.length == 0) ){
          this.$toast.warning('Please Add Items')
          this.btnDisable = true
          e.stopPropagation();
        }else if (this.box_records.length > 0){
          this.$http.secured.post('/api/v1/store/pending_packaging/generate_gate_pass')
          .then(response => {
            if(response.status == 200){
              this.gate_pass = response.data.gatepass_number
              var addeditem_count = 0
              $.each(this.box_items, function(index, value){
                addeditem_count += value.items.length
              })

              this.added_items = addeditem_count
              this.total_boxes = this.box_records.length
              $('#myModal').modal('show');
            }

          })
          .catch(error => {
            this.$toast.error('Error in generating Gate Pass')
          })
        }else{
          this.btnDisable = true
          this.$toast.warning('Please Add Box')
          e.stopPropagation();
        }
      },

      createGatePassRecords: function(e){

        if ( this.isgrading && (this.box_items.length == 0 || this.box_items[0].items.length == 0) ){
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

          this.$http.secured.post('/api/v1/store/pending_packaging/create_gatepass_items', {gate_pass: this.gate_pass, id: this.return_request.id, boxes: modified_params} )
          .then(response => {
            if(response.status == 200){
              this.added_items = response.data.total_packed_inventory
              this.total_boxes = response.data.boxes_count
              $('#myModal').modal('hide');
              this.$toast.success('Packaging Completed Successfully');
              this.$router.push('/api/v1/store/pending_pack/pending_dispatch');

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