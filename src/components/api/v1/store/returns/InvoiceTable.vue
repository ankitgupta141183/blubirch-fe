<template>
  <div>
    <ul class="breadcrambs display_non" style="text-align: left;">
        <li>Grading</li>
        <li><i class="fa fa-chevron-right"></i></li>
        <li><a href="#">Grading Inventory</a></li>
    </ul>
    <h3 class="main_header display_non" style="text-align: left;">Grading Inventory</h3>
    <div class="invoc_table">
        <div class="table_hed_1"><h4 class="table_head1">Invoice Number : <span>{{ queried_invoice['invoice_number'] }}</span></h4></div>
        <div class="table_hed_1"><h4 class="table_head1">Customer Name : <span>{{ queried_invoice['customer_name'] }}</span></h4></div>
        <div class="table_hed_1"><h4 class="table_head1">Total Amount : <span><i class="fa fa-inr"></i>{{ queried_invoice['total_amount'] }}</span></h4></div>
        <div class="table_hed_1"><h4 class="table_head1">Customer Ph. no : <span>{{ queried_invoice["customer_contact"] }}</span></h4></div>
    </div>
    <form @submit.prevent="ProceedForGrading">
    <div class="check_table">
      <div class="check_tablw">
        <div class="table_colmw table_bordr">
          <div class="table_colm1"><h4 class="table_head1">Sl. no</h4></div>
          <div class="table_colm2"><h4 class="table_head1">Item Description</h4></div>
          <div class="table_colm3"><h4 class="table_head1">HSN</h4></div>
          <div class="table_colm4"><h4 class="table_head1">Qty</h4></div>
          <div class="table_colm5"><h4 class="table_head1">Rate</h4></div>
          <div class="table_colm6"><h4 class="table_head1">Amount</h4></div>
          <div class="table_colm7"><h4 class="table_head1"></h4></div>
        </div>
          
        <div v-for="(inventory,key) in queried_invoice.inventory" v-bind:id="inventory.id" class="table_colmw table_bordr">
          <div class="table_colm1"><h4 class="table_head1"><span>{{ key+1 }}</span></h4></div>
          <div class="table_colm2"><h4 class="table_head1"><span>{{ inventory.name }}</span></h4></div>
          <div class="table_colm3"><h4 class="table_head1"><span>{{ inventory.hsn }}</span></h4></div>
          <div class="table_colm4"><h4 class="table_head1"><span>{{ inventory.qty }}</span></h4></div>
          <div class="table_colm5"><h4 class="table_head1"><span><i class="fa fa-inr"></i> {{ inventory.rate }} </span></h4></div>
          <div class="table_colm6"><h4 class="table_head1"><span><i class="fa fa-inr"></i> {{ inventory.amount }} </span></h4></div>
          <div class="table_colm7">
              <div class="checkbox custom-control">
                <label><input type="checkbox" v-model="inventory.status" :id="inventory.status" :checked="inventory.status == true"></label>
              </div>       
          </div>
          <div class="table_colmw" style="margin-top: -10px;">
            <div class="table_colm2">
              <div :id="inventory.id" v-if="inventory.status">
                <select class="search_frm1" v-model="inventory.reason">
                  <option value="">Choose a reason for return</option>
                  <option value="Technical Defect">Technical Defect</option>
                  <option value="Physical Defect"> Physical Defect</option>
                  <option value="Change of Mind">Change of Mind</option>
                  <option value="Delay in Delivery/Installation">Delay in Delivery/Installation</option>
                  <option value="Units with missing Accessories">Units with missing Accessories</option>
                  <option value="Don't like it">Don't like it</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="main_button">Proceeed for Grading</button>
  </form>
  </div>
</template>

<script>
export default {
  name: 'InvoiceTable',
  data () {
    return {
      checked: false,
      email: '',
      password: '',
      error: '',
      invoice_no: '',
      queried_invoice: '',
      invoice_data: [
                  { 
                    "id": 1,
                    "invoice_number": "a123",
                    "product_category": "Refrigerator",
                    "customer_name": "Sergio",
                    "customer_contact": "+91 9945 354 133",
                     "total_amount": 58995,
                      "inventory": [{ "id"  : 1,
                                      "name" : "Samsung Frost-free G2 Refrigerator 270L 5 STAR Ivory 2",
                                      "hsn" : 85183045,
                                      "qty" : 2,
                                      "rate" : 21999,
                                      "amount": 43998,
                                      "boolean":false,
                                      "reason":""
                                    },
                                    { "id"  : 2,
                                      "name" : "Vguard Vg 400 Voltage Stabilizer",
                                      "hsn" : 87889042,
                                      "qty" : 3,
                                      "rate" : 4999,
                                      "amount": 14997,
                                      "boolean":false,
                                      "reason":""
                                    },
                                  ]
                  },
                  { 
                    "id": 2,
                    "invoice_number": "b123",
                    "product_category": "Television",
                    "customer_name": "Aman",
                    "customer_contact": "+91 9945 354 456",
                     "total_amount": 164481,
                      "inventory": [{ "id"  : 1,
                                      "name" : "Amazon Fire TV Stick Alexa Built In Player",
                                      "hsn" : 85662455,
                                      "qty" : 11,
                                      "rate" : 5999,
                                      "amount": 65989,
                                      "boolean":false,
                                      "reason":""
                                    },
                                    { "id"  : 2,
                                      "name" : "Mi (32 inches) 4C PRO HD Ready Android LED TV",
                                      "hsn" : 85183006,
                                      "qty" : 2,
                                      "rate" : 37000,
                                      "amount": 74000,
                                      "boolean":false,
                                      "reason":""
                                    },
                                    { "id"  : 3,
                                      "name" : "Vguard Vg 400 Voltage Stabilizer",
                                      "hsn" : 81773256,
                                      "qty" : 5,
                                      "rate" : 2799,
                                      "amount": 13995,
                                      "boolean":false,
                                      "reason":""
                                    },
                                    { "id"  : 4,
                                      "name" : "Google Chromecast 3 Media Streaming Device",
                                      "hsn" : 85183008,
                                      "qty" : 3,
                                      "rate" : 3499,
                                      "amount": 10497,
                                      "boolean":false,
                                      "reason":""
                                    }
                                  ]
                  },
                  { 
                    "id": 3,
                    "invoice_number": "c123",
                    "product_category": "Washing Machine",
                    "customer_name": "Adam",
                    "customer_contact": "+91 9945 786 981",
                     "total_amount": 200490,
                      "inventory": [{ "id"  : 1,
                                      "name" : "Magna Automatic Voltage Stabilizer",
                                      "hsn" : 85784236,
                                      "qty" : 2,
                                      "rate" : 3999,
                                      "amount": 7998,
                                      "boolean":false,
                                      "reason":""
                                    },
                                    { "id"  : 2,
                                      "name" : "LG Automatic A20 Washing Machine 8Kg 4 Star 100 Yellow Fully Automatic Top Loading Wash rinse and dry Tumble",
                                      "hsn" : 85143002,
                                      "qty" : 5,
                                      "rate" : 21999,
                                      "amount": 109995,
                                      "boolean":false,
                                      "reason":""
                                    },
                                    { "id"  : 3,
                                      "name" : "LG 6Kg Washer Dryer STS-VCM",
                                      "hsn" : 85183011,
                                      "qty" : 3,
                                      "rate" : 27499,
                                      "amount": 82497,
                                      "boolean":false,
                                      "reason":""
                                    }
                                  ]
                  }
                ]
    }
  },
  created () {
    this.invoice_no = this.$route.params.id;
    for (var i = 0; i < this.invoice_data.length ; i++ ){
      if (this.invoice_data[i].invoice_number == this.invoice_no) {
        this.queried_invoice = this.invoice_data[i]
        return
      }
    }
  },
  methods: {
    ProceedForGrading (){
      //this.$router.replace("/package/"+this.queried_invoice["product_category"])
    }
  }
}
</script>
