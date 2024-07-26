<template>
<div class="rigt_navbar" id="content" style="overflow-y: auto">
  <ul class="breadcrambs display_non" style="text-align: left">
      <li>Grading</li>
      <li><i class="fa fa-chevron-right"></i></li>
      <li><a href="#">Grading Inventory</a></li>
  </ul>
  <div style="text-align: left">
    <h3 class="main_header display_non">Grading Inventory</h3>
  </div>
        


        <ImageAnnotation v-show="isModalVisible" @close="closeModal" :questionType="misc.questionType" :pageTitle='misc.pageTitle' :capturedImages='misc.capturedImg' :capturedAnnotations ='misc.capturedAnno' :test_annotations= 'present_test.annotations' @update-number="update"/>
        <ImageView v-show="isViewModalVisible" @close="closeViewModal" :imageDisplayed="misc.viewImage" />

        <div class="row" >
            <div class="packing_st1">
              <div class="packing_sw1" style="padding-top:25px !important">

                <div class="slideshow-container radio_style" id = "slideshow">

                <div class="mySlides" id="starting_form">
                         <h3 class="sub_header5" style="margin-bottom: 50px">{{ present_test.test_type }}
                        <div class="custome_ttip"><img src="@/assets/images/info.svg"><div class="tooltips_pop">Documentation and examples</div></div>
                        </h3>

                        <h2 style = "text-align: left !important;" class="sub_header5"> {{ present_test.test }}</h2>
                        
                          <div style = "text-align: left !important;margin-bottom: 40px;" class="row">


                            <ul v-bind:class="{'packing_list':true, 'col-4':(present_test.test_type == 'Packaging'),'col-3':(present_test.test_type != 'Packaging')}" style="display:inline;margin-left: 4px !important;" v-for = "option in present_test.options">
                              <label style="font-size:1vw;margin-right:30px;background-color:#FAFAFA;padding:10px;width:97%;border: 1px solid rgba(112, 122, 122, 0.12); border-radius:4px">
                              <input type="radio"  v-on:click="checkPicture(present_test.test_type)" name="test_option" v-bind:route="option['route']" v-bind:value="option['value']"  v-bind:output="option['output']" v-bind:annotation_label="option['annotation_label']">&nbsp;
                              <label v-bind:for="present_test['test']"> {{ option['value'] }}</label>
                              </label>
                            </ul>
                          </div>

                          <div class="button_grpw1">
                              <button class="button_grop2" style="margin-right:  10px" id="prev-slide-btn" @click="minusSlides()">Back</button>
                              <button class="button_grop2" v-if="present_test.test_type != 'Functional'" id="next-slide-btn" @click="plusSlides()">Next</button>
                              
                              <!-- <button class="button_grop2" id="next-slide-btn" @click="processResult()">Process Result</button> -->
                          </div>
                         
                        <input type="hidden" name="inventory[details][functional_status]" id="inventory_details_functional_status" class="form-control" >
                      </div>


                          <form id="final_form" style="display: none;" @submit.prevent="gradingPage">
                                        <div class="barcode_secw row">
                                          <div class="barcode_sc1 col-6">
                                            <div class="barcode_sc3 col -12" v-if="role != 'warehouse'">
                                                <h4 class="barcode_hd1">Dispositon</h4>
                                                <span class="barcode_hd2" >{{ final_disposition }}</span>
                                            </div>
                                            <div class="barcode_sc3 col-12" v-if="role != 'warehouse'">
                                                <h4 class="barcode_hd1">RR Number</h4>
                                                <span class="barcode_hd3">{{ return_request_number }}</span>
                                            </div>
                                            
                                            
                                            
                                            <div class="barcode_sc3 col-12" v-if="role == 'warehouse'">
                                                <h4 class="barcode_hd1">Dispositon</h4>
                                                <span class="barcode_hd2" >{{ final_disposition }}</span>
                                               
                                            </div>
                                            
                                            <div class="barcode_sc3 col-12">
                                                <h4 class="barcode_hd1">Grade</h4>
                                                <span class="barcode_hd3">{{ final_grade }}</span>
                                            </div>
                                            <div class="barcode_sc3 col-12" v-if="this.warehouse_serial_number != '' ">
                                                <h4 class="barcode_hd1">Serial Number </h4>
                                                <span class="barcode_hd3">{{ warehouse_serial_number }}</span>
                                            </div>
                                            <div class="barcode_sc3 col-12"  v-if="this.warehouse_serial_number == '' ">
                                                <span class="invntry_num">Enter Serial Number <span style="color: red;">*</span> </span>
                                                <input v-model="serial_number" class="search_frm1" type="text" required="true">
                                            </div>
                                            
                                            <div class="barcode_sc3 col-12" v-if="role == 'warehouse'">
                                                <span class="invntry_num">Toat Number<span style="color: red;">*</span></span>
                                                <input class="search_frm1" v-model="toat_number" type="text" required="true">
                                            </div>

                                            <div class="row">
                                              <div class="col-12">
                                                <button class="button_grop2" id="final_submit" type="submit" style="width:215px;z-index: -1">Submit Grading</button>
                                              </div>
                                              
                                            </div>
                                          </div>
                                          <div class="col-6">

                                            <div class="barcode_sc3 col-12" v-if="tag_number != null " >
                                                <h4 class="barcode_hd1">Tag Number</h4>
                                                <span class="barcode_hd3">{{ tag_number }}</span>
                                            </div>
                                            
                                            <div class="row">

                                              <div id="section-to-print" class="col-6" v-if="tag_number != null ">
                                                    <barcode v-bind:value="tag_number">
                                                        
                                                    </barcode>
                                              </div>
                                              
                                              
                                            </div>

                                            <div style="text-align: left">
                                              
                                                <!-- <input type="button" onclick="window.print()" value="print a div!" /> -->
                                                <button class="button_grop2" id="final_submit" v-if="tag_number != null " style="margin-left: 80px" type="button" onclick="window.print()">Print</button>
                                                <!-- <i class="fa fa-print fa-2x" style="cursor: pointer" onclick="window.print()" aria-hidden="true"></i> -->
                                              
                                            </div>
                                            
                                          </div>

                                          
                                           
                                        </div>
                                        
                      </form> 


                   


                   

                    

                </div>  
                               

                    
                </div>
            </div>
            <div class="packing_st2">
              <div class="packing_sw2">
                          <h4 class="sub_header6" style="margin-bottom: 14px !important">Grading Summary</h4>
                          <div style="overflow-y: auto;max-height: 122px;">
                            <ul class="summury_uli" style="margin-top: 7px;" >
                              <li v-for="g_sum in grading_summary" style="line-height: 2px !important;">
                                <p v-if="g_sum.value == 'Yes'||g_sum.value == 'No'">{{g_sum.test}}:&nbsp<b>{{g_sum.value}}</b></p>
                                <p v-else>{{g_sum.test_type}}:&nbsp<b>{{g_sum.value}}</b></p>

                              </li>
                            
                            </ul>
                            
                          </div>
                          
                        </div>
                <div class="packing_sw2">
                    <h4 class="sub_header6" style="margin-bottom: 0px;">Attached Images</h4>
                    <div v-if="misc.capturedImg.length > 0" class="side-img-show" style="margin-top: 10px;">
                      <div v-for="img in misc.capturedImg" class="side-img-div" v-on:click="openViewModal(img)" style="cursor: pointer;">
                        <span class="close_btn" v-on:click="deleteIndividualImage(img)">x</span><img  :src="img.src" class="side-img" style=""><br><p style="margin-top:-20px;margin-bottom: 0px !important;" > {{ img.orientation }}</p>
                      </div>
                      
                    </div>
                </div>

                <!-- <div class="packing_sw2">
                   <h4 class="sub_header6">Attached Images</h4>
                   <div v-if="Object.keys(misc.capturedImg).length > 0 " class="side-img-show">
                     <div v-for="obj in misc.capturedImg" class="side-img-div">
                        <template v-for="img in obj">
                       <img  :src="img['src']" class="side-img" style=""><br><p style="margin-top:-20px;margin-bottom: 0px !important;" > {{ img['orientation'] }}</p>
                       </template>
                     </div>
                     
                   </div>
               </div> -->
            </div>
        </div>
        

    <div class="packing_sw3" v-if = "inward_details != null">
                <div class="custome_tip2"><img src="@/assets/images/info.svg"><div class="tooltip_pop2">Documentation and examples</div></div>
                <h4 class="inward_head1" style="text-align: left;">Inwarding Attributes</h4>
                <div class="inward_colm1" style="width: 42% !important;">
                    <h4 class="inward_head2">Item Description: {{inward_details.item_description}}</h4>
                    <h4 class="inward_head2">Model: Wolf</h4>
                </div>  
                <div class="inward_colm2">
                    <h4 class="inward_head2">Client SKU: {{inward_details.sku}}</h4>
                    <h4 class="inward_head2">Brand: Bosch</h4>
                </div>
                <div class="inward_colm2">
                    <h4 class="inward_head2">Unit Price: Rs {{inward_details.item_price}}</h4>
                    <h4 class="inward_head2">Category: {{inward_details.category_name}}</h4>
                </div>
                <div class="inward_colm2">
                    <h4 class="inward_head2">Inventory ID : SK583959</h4>
                    <h4 class="inward_head2">Serial Number 1: ETE654</h4>
                </div>
            </div>
</div>

</template>


<script src="JsBarcode.all.min.js"></script>

<script>
import json from  "./Grading_Tests.json"
import VueBarcode from 'vue-barcode';
import mson from  "./result.json"
import gson from "./grade.json"
import dson from "./disposition.json"
import $ from 'jquery'
import ImageAnnotation from './ImageAnnotation'
import ImageView from './ImageView'
import { mapState } from 'vuex'
import Roles from '@/roles.js'

export default {
  
  data () {
    return {
    slideIndex: 1,
    category: [],
    grade_rules: [],
    role:"superadmin",
    enter_id: this.$store.state.selected_inventory.client_category_id,
    inventory_id: this.$store.state.selected_inventory.id,
    grading_type:this.$store.state.grading_type,
    grading_summary: [],
    inward_details:"",
    toat_number: "",
    input_invoice_number: "",
    warehouse_serial_number:"",
    test_rule_id:"",
    grading_rule_id:"",
    categories: {},
    present_test: {},
    precedence: {},
    grade_precedence:{},
    test_type: '',
    annotation_required_labels:[],
    test: '',
    route: '',
    output: '',
    annotation_label: '',
    previous_route:'Ref_1',
    router_history:[],
    serial_number:'',
    deletedImages:[],
    checkedRadio : '',
    final_grading_result: {},//mson,
    processed_grading_result: {},
    present_grading_result: {},
    created_inventory_id : "",
    disposition: {},
    final_disposition:{},
    isModalVisible: false,
    isViewModalVisible: false,
    return_request_number:"",
    tag_number:"",
    grade_array: [],
    final_grade: "", 
    misc:{
      pageTitle: "",
      questionType: false,
      capturedImg: [],
      capturedAnno: [],
      viewImage: {}
    }

    }
  },
  components: {
    ImageAnnotation,
    ImageView,
    'barcode': VueBarcode
  },
  computed: mapState([
    'currentUser', 'signedIn'
  ]),
  created() {


    if (this.$store.state.currentUser.roles.includes(Roles.warehouseUser) === true){
      this.role = "warehouse"

      this.$http.secured.get('/api/v1/warehouse/warehouse_grading/category_rules', { params: {id: this.enter_id,inventory_id: this.inventory_id, grading_type: this.grading_type}})
          .then(response => {//this.category = response.data['rules']
                              this.inward_details = response.data["inventory_details"]
                              this.category = response.data["test_rule"]["tests"]
                              this.precedence = response.data["test_rule"]["tests"]
                              this.present_test = this.category['Ref_1']
                              this.test_rule_id = response.data["test_rule_id"]
                              this.grading_rule_id = response.data["grading_rule_id"]
                              console.log(this.final_grading_result) 
                                })
          .catch(error => this.$toast.error('Error in fetching category'))

    }
    else{

      this.$http.secured.get('/api/v1/store/returns/customer_returns/category_rules', { params: {id: this.enter_id,inventory_id: this.inventory_id , grading_type:"Store" }})
          .then(response => {//this.category = response.data['rules']
                              this.inward_details = response.data["inventory_details"]
                              this.category = response.data["test_rule"]["tests"]
                              this.precedence = response.data["test_rule"]["tests"]
                              this.present_test = this.category['Ref_1']
                              this.previous_route = 'Ref_1'
                              
                              this.test_rule_id = response.data["test_rule_id"]
                              this.grading_rule_id = response.data["grading_rule_id"]
                              console.log(this.final_grading_result) 
                                })
          .catch(error => this.$toast.error('Error in fetching category'))

    }
    
  },
  computed:{

  },
  mounted() {
    this.showSlides(this.slideIndex)
    },
  methods: {

  update(value){

        this.misc.capturedAnno=value;
        
    },

  openViewModal(img){
    this.isViewModalVisible = true
    this.misc.viewImage = img
    console.log(img)
    anno.destroy()
    
  },

  minusSlides() {

    var item
    if (this.router_history.length == 1){
      this.previous_route = "Ref_1"
    }
      item = this.router_history.pop()

    var pg = this.grading_summary.pop()
    
    
    var item_name=[]
    var names
    for (names in item){
      item_name.push(names) 
      
    }

    this.present_test = this.category[item_name[1]]
    
    var temp
    var temp1
    var popped
    for (var i = 0;i<item[item_name[1]].length;i++){
      temp = item[item_name[1]]
      if (Array.isArray(this.final_grading_result[temp[i]])){

        if(this.final_grading_result[temp[i]].length == 1 || item["annotationPresent"]){
          for (var j=0; j< this.final_grading_result[temp[i]].length ; j++){
            temp1 =this.final_grading_result[temp[i]]
           this.deletedImages = [...new Set(temp1[j].annotations.map(item => item.src))]

           this.deleteImages(this.deletedImages)


          }
          delete this.final_grading_result[temp[i]]
        }
        else{
          popped = this.final_grading_result[temp[i]].pop()
        }

      }else{
        delete this.final_grading_result[temp[i]]
      }
      
    }
        
    },

  deleteIndividualImage(img){
    event.stopPropagation();
    var removalIndices = []
    this.misc.capturedImg = this.misc.capturedImg.filter(function( obj ) {
        return !(img.src == obj.src)
    })

    for (const item in this.final_grading_result){
      for (var i =0 ;i < this.final_grading_result[item].length ; i++){

        this.final_grading_result[item][i].annotations = this.final_grading_result[item][i].annotations.filter(function( obj ) {
            return !(img.src == obj.src)
        })
        


      }

      if (this.annotation_required_labels.includes(item)){
        this.final_grading_result[item] = this.final_grading_result[item].filter(function( obj ) {
            return (obj.annotations.length > 0)
        })        
        
      }
      
    }

    this.deleteImages([img.src])

  },

  deleteImages(arr){
    
    this.misc.capturedImg = this.misc.capturedImg.filter(function( obj ) {
        return !arr.includes(obj.src);
    })

    if (this.$store.state.currentUser.roles.includes(Roles.warehouseUser) == true){
      this.$http.secured.post('/api/v1/warehouse/warehouse_grading/delete_images',  { url: arr })
          .then(response => {                      
                            })
          .catch(error => this.$toast.error('Error in deletion of images'))

    }
    else{

      this.$http.secured.post('/api/v1/store/returns/customer_returns/delete_images',  { url: arr })
          .then(response => {                      
                            })
          .catch(error => this.$toast.error('Error in deletion of images'))

    }
    


  },
  checkPicture(test_type){
    
    
    if (this.present_test['picture']){
      this.isModalVisible = true
      this.misc.pageTitle = this.test_type
      if (this.present_test["picture_labels"] != "") {
        if ( this.present_test["picture_labels"].length > 0){
          this.misc.questionType = true
        }
      }


    }
    if (test_type == "Functional"){
      this.plusSlides()
    }

  },

  plusSlides() {
     this.checkedRadio = $(`input[name=test_option]:checked`)
     
     this.route = this.checkedRadio[0].attributes["route"].nodeValue
     
     this.output = this.checkedRadio[0].attributes["output"].nodeValue
     this.annotation_label =this.checkedRadio[0].attributes["annotation_label"].nodeValue

     
     this.test = this.present_test['test'].split('_').join(' ') 
     this.test_type = this.present_test['test_type'].split('_').join(' ') 

  
        var ele = document.getElementsByName("test_option");
           for(var i=0;i<ele.length;i++)
              ele[i].checked = false;
        this.nextRoute()
      
  },
  nextRoute (){
    var annotationPresent = false
    var final_grading_keys = []
    var anno_grading_result = {}
    this.present_grading_result["test"] = this.test
     this.present_grading_result["value"] = this.checkedRadio.val()
     this.present_grading_result["output"] = this.output
     this.present_grading_result["annotations"] = []
     if (this.present_test['picture']){
      this.present_grading_result["annotations"] = this.misc.capturedAnno

      if (this.annotation_label != ""){
        annotationPresent = true
        this.annotation_required_labels.push(this.annotation_label)
        if (this.final_grading_result[this.annotation_label] == null){
          this.final_grading_result[this.annotation_label] = []
          final_grading_keys.push(this.annotation_label)
        }


       
       for (var i = 0 ; i < this.misc.capturedAnno.length ; i++ ){
       
        anno_grading_result["test"] = ""
        anno_grading_result["output"] = this.misc.capturedAnno[i].text
        anno_grading_result["value"] = this.misc.capturedAnno[i].text
        anno_grading_result["annotations"]=[this.misc.capturedAnno[i]]
        
        this.final_grading_result[this.annotation_label].push(anno_grading_result)
        anno_grading_result = {}
       }

       

      }
      
     }

    //  if (this.test_type != '' && this.test != ''){
      if (this.final_grading_result[this.test_type] == null){
        this.final_grading_result[this.test_type] = []
        
      }
      var key =this.previous_route
      this.previous_route = this.route
      var item = {}
      final_grading_keys.push(this.test_type)
      item["annotationPresent"] = annotationPresent
      this.present_grading_result["test_type"] = this.present_test.test_type
      item[key] = final_grading_keys
      this.router_history.push(item)
      this.grading_summary.push(this.present_grading_result)
      this.final_grading_result[this.test_type].push(this.present_grading_result)
   


    if (this.route == "End"){
     console.log("finally reached here")
     console.log(this.final_grading_result)

     if (this.$store.state.currentUser.roles.includes(Roles.warehouseUser) == true){
      this.$http.secured.post('/api/v1/warehouse/warehouse_grading/generate_rr',  { selected_inventory: this.$store.state.selected_inventory, final_grading_result:this.final_grading_result, grading_type: this.grading_type })
          .then(response => {  
                             this.warehouse_serial_number = response.data["serial_number"]
                             this.return_request_number = response.data["rr_number"]
                             this.tag_number = response.data["tag_number"]
                             this.final_grade = response.data["grade"]
                             this.final_disposition = response.data["disposition"]
                             this.processed_grading_result = response.data["processed_grading_result"]
                             this.created_inventory_id = response.data["created_inventory_id"]
                             document.getElementById("starting_form").style.display = "none"
                             document.getElementById("next-slide-btn").style.display = "none"
                             document.getElementById("prev-slide-btn").style.display = "none"
                                 
                             document.getElementById("final_form").style.display = "block"

                             
                            })
          .catch(error => this.$toast.error('Error in fetching rr_number'))

     }
     else{
      this.$http.secured.post('/api/v1/store/returns/customer_returns/generate_rr',  { invoice_id:this.$store.state.invoice.id,  selected_inventory: this.$store.state.selected_inventory, customer_return_reason_id: this.$store.state.customer_return_reason.id ,final_grading_result:this.final_grading_result, invoice_number: this.$store.state.invoice.invoice_number, customer_return_reason: this.$store.state.customer_return_reason.name , grading_type: "Store"})
          .then(response => {  
                             this.return_request_number = response.data["rr_number"]
                             this.tag_number = response.data["tag_number"]
                             this.final_grade = response.data["grade"]
                             this.final_disposition = response.data["disposition"]
                             this.processed_grading_result = response.data["processed_grading_result"]
                             this.created_inventory_id = response.data["created_inventory_id"]
                             document.getElementById("starting_form").style.display = "none"
                             document.getElementById("next-slide-btn").style.display = "none"
                             document.getElementById("prev-slide-btn").style.display = "none"
                                 
                             document.getElementById("final_form").style.display = "block"

                             
                            })
          .catch(error => this.$toast.error('Error in fetching rr_number'))

     }

     

     //this.processResult();

     
    }
    else if (this.isModalVisible == false){
      console.log("somewhere")
      console.log(this.final_grading_result)
      this.present_grading_result = {}
      this.test = ""
      this.test_type = ""
      this.output = ""
      this.annotation_label = ""
      this.misc.capturedAnno = []
     this.present_test = this.category[this.route]
     
     
    }
  },

  gradingPage(){
    

    if (this.$store.state.currentUser.roles.includes(Roles.warehouseUser) === true){
      
      this.$http.secured.post('/api/v1/warehouse/warehouse_grading/finalize_grading',  {toat_number:this.toat_number , serial_number:this.serial_number, inventory_id: this.$store.state.selected_inventory.id,final_grading_result:this.final_grading_result , processed_grading_result: this.processed_grading_result , grade: this.final_grade , disposition: this.final_disposition , grading_type: this.grading_type })
          .then(response => {  
                             this.$toast.success('Grading Finalized')
                             this.$router.push({ name: 'SearchInventory'})                             
                            })
          .catch(error => this.$toast.error('Error in fetching rr_number'))

    }
    else{

      this.$http.secured.post('/api/v1/store/returns/customer_returns/finalize_grading',  {serial_number:this.serial_number,  inventory_id: this.created_inventory_id })
          .then(response => {  
                             this.$toast.success('Grading Finalized')
                             this.$router.push({ name: 'SearchInvoiceNumber'})                             
                            })
          .catch(error => this.$toast.error('Error in fetching rr_number'))


    }

    

  },
  closeModal() {
    document.getElementById('video-outer-div').style.display = "block"      
    document.getElementById('captured-image').style.display = "none"
    this.isModalVisible = false
    
    this.misc.questionType = false
    //this.nextRoute()   
  },
  closeViewModal() {
    this.isViewModalVisible = false;
  },
  showSlides(n) {
      var i;
      var slides = document.getElementsByClassName("mySlides")
      if (n > slides.length) {this.slideIndex = 1}    
      if (n < 1) {this.slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {         
          slides[i].style.display = "none"        
      }
      if (n<=slides.length){
        slides[this.slideIndex-1].style.display = "block"
      }
      else{
        $("#next-slide-btn").prop('disabled', true)
        document.getElementById("slideshow").style.display="none"
        document.getElementById("slide-final-form").style.display ="flex"
      }
    }


  }
  
}

</script>

<style  type="text/css"  scoped>

  .slideshow-container {
    position: relative;
    margin: auto;
  }
   .mySlides {display: none}


   .side-img-show{
     
      width:100%;
      overflow-x: auto;
      white-space: nowrap;
      text-align: center;
      position: relative;
     
   }

   .side-img-div{
      display: inline-block;        
      border: 1px solid #C2CFE0;
      border-radius: 10px;
      margin-left: 8px;
      padding: 4px 0px 0px 7px;
   }

   .side-img{
    display: inline-block;
    width: 92px;
    /* border: solid 1px blue; */
    margin-right: 7px;
    display: flex;
   }
   .close_btn{
    float: right;
    background-color: red;
    font-size: 14px;
    width: 17px;
    border-radius: 75%;
    color: white;
    margin-right: -10px;
    margin-top: -7px;
    
   }

   .close_btn:hover {
  background-color: #dc3545;
}

   .packing_sw2 {
       float: left;
       width: 100%;
       padding: 0px 20px 5px;
       min-height: 170px;
       margin: 0 0;
       margin-bottom: 31px;
       position: relative;
       background: #FFFFFF;
       -webkit-box-shadow: 0px 1px 16px rgba(0, 0, 0, 0.09);
       box-shadow: 0px 1px 16px rgba(0, 0, 0, 0.09);
       border-radius: 5px;
   }
   
   @media print {
    .side_navbar * {
     visibility: hidden;
    }
     
     
      div * {
       visibility: hidden;
     }
     #section-to-print, #section-to-print * {
       visibility: visible;
     }
     #section-to-print {
       position: absolute;
       left: 0;
       top: 0;
     }
   }

   .barcode_sc3 {
    text-align: left;
       float: left;
       width: 100%;
       padding: 5px 0 20px;
   }

   .button_grpw1 {
       display: contents;
       margin-top: 30px;
       -webkit-transform: translateX(-50%);
       transform: translateX(-50%);
   }
   
</style>
