<template>
  <div>
    <h3 class="main_header exchnge_b">Exchange</h3>
      <div class="exchng_head">
        <h4 class="excng_head1">
          <span>Category :</span>
          <span v-if="$route.params.category == 'Refrigerator'">Electronics & Appliances > Kitchen Appliances > Refrigerator</span>
          <span v-if="$route.params.category == 'Television'">Electronics & Appliances > Home Appliances > Television </span>
          <span v-if="$route.params.category == 'Microwave'">Electronics & Appliances > Kitchen appliances > Microwave </span>
          <span v-if="$route.params.category == 'Washing Machine'">Electronics & Appliances > Home Appliances > Washing Machine </span> &nbsp;
          <router-link  :to="{ name: 'ExchangeInventory'}">
            Change Category
          </router-link>
        </h4>
      </div>
      
    <form @submit.prevent="ProceedForGrading">
      <div class="exchng_cont">
        <div class="exchng_wrap">
          <h4 class="categ_head1">SKU</h4>
          <div class="model_drop1">
            <input class="search_frm1" type="text" placeholder="Enter UPN/EAN/ISBN">
          </div>
        </div>
        <div class="exchng_wrap">
          <h4 class="categ_head2">Item Specifications</h4>
          
          <div v-for="attr in selectedCategory1.attrs">

            <div class="model_drop1">
              <multiselect v-model="attr.name" :options='attr.values.split(",")' :searchable="true" :close-on-select="false" :show-labels="true"  :placeholder="attr.name" v-if='attr.type == "select" '></multiselect>

              <input class="search_frm1" :type= 'attr.type' :name="attr.name" :placeholder = "attr.name" v-else= 'attr.type != "select" ' >
              
            </div>
          </div>
        </div>

        <div class="exchng_wrap">
          <h4 class="categ_head1">Additional Features</h4>
          <ul class="aditon_frtur">
            <li v-for="(feature,key) in features[$route.params.category]">
              <!-- <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="customCheck1" name="example1">
                <label class="custom-control-label" for="customCheck1">{{feature}}</label>
              </div> -->
              <div class="checkbox custom-control mb-3">
                <input type="checkbox" v-model="checkstatus[key]" :value="feature">
                <label>{{feature}}</label>
              </div>  
            </li>          
          </ul>
        </div>

        <h4 class="categ_head1">Additional Remarks</h4>
        <textarea class="form_textar" type="text" placeholder=""></textarea>
      </div>
      <button class="main_button">Proceeed to Grading</button>
    </form>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'  
export default {
  name: 'SearchInvoiceExchange',
  props: ['selectedCategory1'],
  components: {
   Multiselect
  },
  data () {
    return {
      hello: "",
      checkstatus: [],
      specifications: {"Refrigerator": {"Number of Doors": ["Double Door", "Single Door"], "Capacity": ["190 Litres", "210 Litres", "350 Litres", "500 Litres"], "Colour": ["Red", "White", "Grey"], "Voltage": ["230 Volts", "250 Volts"], "Defrost System": ["Direct Cool", "Automatic", "Manual"], "Freezer Capacity": ["27.2 Litres", "25 Litres"], "Brand": ["LG", "Samsung", "Whirlpool", "Godrej"], "Model": ""},
                      "Television": {"Inches": ["32", "24", "40", "80", "81", "49"], "Item Weight": ["11 Kg", "15 Kg", "10 Kg", "8 Kg"], "Display Technology": ["LCD", "LED"], "Resolution": ["1080p", "720p"], "Operating System": ["Android", "Tizen", "Not Smart"], "Audio Wattage": ["40 Watts", "20 Watts"], "Brand": ["LG", "Samsung", "Philips", "MI", "BPL", "Micromax", "Sanyo", "Panasonic"], "Model": ""},
                      "Washing Machine": {"Capacity": ["6", "6.5", "7", "7.5"], "Form Factor": ["Top Loading", "Front Loading"], "Color": ["White", "Sliver", "Grey"], "Control Console": ["Semi Automatic", "Fully Automatic"], "Brand": ["Whirlpool", "Mitashi", "Samsung", "IFB", "Bosch", "Onida", "Koryo", "Micromaz"], "Model": ""}
                      },
      features: {"Refrigerator": ["Door Locks and Alarms", "Shelves", "Drawers", "LED Displays", "Hidden Icemakers"],
                 "Television": ["Picture Quality", "Wireless Connectivity", "Streaming Video Services", "Streaming Audio Services", "Remote Control and App Functions"],
                 "Washing Machine": ["Air Dry Function", "Smart Rinse", "Memory Wash"]}
    }
  },
  methods: {
    ProceedForGrading (){
      this.$router.replace("/package/"+this.$route.params.category)
    }
  }
}
</script>
