<template>
<body>

<div class="modal fade cutomr_modal" id="myModal" role="dialog">
    <div class="modal-dialog">
        <div v-if="modal_inventory" class="modal-content">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <div class="modal-body" style=" text-align: center;">
                <h3 class="barc_mod_hed">Tag : <span> {{tag_number}} </span></h3>
                <barcode v-bind:value="tag_number">
                
                </barcode>
                <button class="barcode_btn">Print Barcode</button>
                <button class="barcode_bt2">Continue</button>
            </div>
        </div>
    </div>
</div>

<div>

    <div class="rigt_navbar over_scrol" id="content">
        <h3 class="main_header exchnge_b disply_none">Inward Inventory</h3>
        <div class="form_groupw sku_search">
            <div class="row">
                <h4 class="categ_head2">SKU Number</h4>
                <div class="form_group1">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <input v-model="entered_sku_number" v-on:change="getInventories(entered_sku_number)" class="search_form" type="text" placeholder="Search SKU Number">
                </div>
            </div>
        </div>
        <div class="exchng_cont"> 
             <div class="row padding-left-bottom-10">
                  <h4 class="categ_head2 disply_none">Item Specifics</h4>
                <h4 class="categ_head2 disply_blck">Specifications</h4></div>  
            <div class="row" >
                <div class="model_drop1 col-md-4" v-for="(attr, index) in client_inward_data.client_category.attrs" :key="index">
                    <div v-if="attr.type=='text'">
                        <input class="search_frm1" :required="attr.is_sku_attr" :type="attr.type" :placeholder="attr.name" v-model="attr.value" :id=index />
                    </div>
                    <div v-else-if="attr.type=='select'">
                        <select class="search_frm1" v-model="attr.param_name">
                            <option v-for="(value, index) in attr.values" :value="index">{{value}}</option>
                        </select>
                    </div>
                    <div v-else-if="attr.type=='radio'">
                        <label :for=index class="d-flex">{{attr.name}}</label>
                        <input class="search_frm1" :required="attr.is_sku_attr" :type="attr.type" v-model="attr.value" :id=index />
                    </div>
                     <div v-else-if="attr.type=='checkbox'">
                       <label :for=index class="d-flex">{{attr.name}}</label>
                        <input class="search_frm1" :required="attr.is_sku_attr" :type="attr.type" v-model="attr.value" :id=index />
                    </div>
                     <div v-else-if="attr.type=='color'">
                        <input class="search_frm1" :required="attr.is_sku_attr" :type="attr.type" v-model="attr.value" :id=index />
                    </div>
                    <div v-else-if="attr.type=='date'">
                        <input class="search_frm1" :required="attr.is_sku_attr" :type="attr.type" v-model="attr.value" :id=index />
                    </div>
                    
                </div>
                
            </div>
            <div class="exchng_wrap">
                <button class="inward_butn disply_none" @click="inwardItem" data-toggle="modal" data-target="#myModal">Inward Item</button>
            </div>  
        </div>    
    </div>
	<button class="mobile_but1" data-toggle="modal" data-target="#myModal">Proceed to Grading</button>
</div>
</body>
</template>


<script>
import { mapState } from 'vuex'
import $ from 'jquery'
import VueBarcode from 'vue-barcode';

export default {
  name: 'ReturnRequest',
  computed: mapState([
    'sku_number'
    ]),
  data () {
    return {
      entered_sku_number: '',
      modal_inventory: false,
      client_inward_data: '',
      client_id: '',
      tag_number: '',
    }
  },

  components: {
    'barcode': VueBarcode
  },

  created () {
      this.getDataFromStore()
  },
  methods: {
    getDataFromStore(){
        this.client_inward_data = this.$store.state.client_sku_master
        this.entered_sku_number = this.$store.state.sku_code
        this.client_id = this.$store.state.client_sku_master.client_category.client_id
    },

    getInventories (sku_number) {
      this.modal_inventory = false
      let search_param = {
        params:{
        sku_code:sku_number
        }
      }
      this.$http.secured.get('/api/v1/warehouse/inward/get_sku_details', search_param)
      .then(response => { if(response.data.client_sku_master) {
        this.client_inward_data = response.data.client_sku_master
        this.client_id = response.data.client_sku_master.client_category.client_id
        this.$store.commit('setInwardSKU', {sku_code: this.entered_sku_number, client_sku_master: this.client_inward_data})
        }
        else{
          this.$store.commit('setInwardSKU', {sku_code: this.sku_number, client_sku_master: {}}),
          this.$toast.error('Please check SKU No. entered')
        }
      })
      .catch(error => this.$toast.error('Error in fetching inventories'))
    },

    inwardItem () {
      let attr_data = this.client_inward_data.client_category.attrs.map(function(cl){
          return {"name":cl.value}
      })

      let update_param = {
            client_id: this.client_id,
            attrs: attr_data.filter(x => x.name !=undefined),
            sku_number: this.entered_sku_number
      }
      this.$http.secured.post('/api/v1/warehouse/inward/create_inventory', update_param)
      .then(response => { if(response.status==200){
          this.$toast.success('Inventory inwarded successfully! ')
          this.tag_number = response.data.inventory.tag_number
          this.modal_inventory = true
       }
      })
      .catch(error => this.$toast.error('Error in creating inward inventory'))
    },
  }
}
</script>
