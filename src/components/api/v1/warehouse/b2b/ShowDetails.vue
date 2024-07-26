<template>
  <div>
    <div class="rigt_navbar" id="content">
      <ul class="breadcrambs display_non">
        <li>B2B</li>
        <li><i class="fa fa-chevron-right"></i></li>
        <li>Lot Management</li>
        <li><i class="fa fa-chevron-right"></i></li>
        <li>Publish Inventory</li>
        <li><i class="fa fa-chevron-right"></i></li>
        <li><a href="#">View</a></li>
      </ul>
      <h5 class="detail_header">Lot_Laptop-123</h5>
      <div class="row">
      <div class="col-sm-12 col-lg-12 col-md-12">
        <span class="qc-header">Inventory List</span>
        <hr/>
        <table class="table table-hover">
          <thead class="thead-inverse" style="background-color:#E9E9E9 !important;">
            <tr>  
              <th>Item Type</th>
              <th>SKU</th>
              <th>Grade</th>
              <th>Price</th>
              <th>Disposition</th>
              <th>Channel</th>
              <th>Serial Number</th>
              <th>Inventory Status</th>
              <th>Tag Number</th>
              <th>Service Request</th>
            </tr>
          </thead>
          <tr>
            <td>Laptop</td>
            <td>6b3c5acb35</td>
            <td>Refurbished Very Good</td>
            <td>25000</td>
            <td>Liquidate</td>
            <td>B2B</td>
            <td></td>
            <td>Available to Sell</td>
            <td>397bd2</td>
            <td>SR1040</td>
          </tr>
        </table>
      </div>
    </div>

    <div class="row">  
      <div class="col-md-6">
        <div id="bid_detail">
          <span class="qc-header">Bid Details</span>
          <table class="table table-hover" style="border: 1px solid #EBEBEB; width: 100%; margin-top: 5%;">
            
            <tr>
              <td>BID NAME</td>
              <td>Lot_Laptop-123</td>
            </tr>
            <tr>
              <td>BID NUMBER</td>
              <td>613119249</td>
            </tr>
            <tr>
              <td>BID DESCRIPTION</td>
              <td>Lot_Laptop-123</td>
            </tr>
            <tr>
              <td>MRP</td>
              <td>25000.0</td>
            </tr>
            <tr>
              <td>FLOOR PRICE</td>
              <td>1999.0</td>
            </tr>
            <tr>
              <td>RESERVE PRICE</td>
              <td>2000.0</td>
            </tr>
            <tr>
              <td>BUY NOW PRICE</td>
              <td>13750.0</td>
            </tr>
            <tr>
              <td>INCREMENT SLAB</td>
              <td>499</td>
            </tr>
            <tr>
              <td>START DATE</td>
              <td>March 31st, 2020 12:54</td>
            </tr>
            <tr>
              <td>END DATE</td>
              <td>April 5th, 2020 12:54</td>
            </tr>
            <tr>
              <td>BID STATUS</td>
              <td>In Progress</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="col-md-6">
        <div id="inventory_detail">
          <span class="qc-header">Inventory Details</span>
          <table class="table table-hover" style="border: 1px solid #EBEBEB; width: 100%; margin-top: 5%;">
            <tr>
              <td>GRADE</td>
              <td>Refurbished Very Good</td>
            </tr>
            <tr>
              <td>ITEM TYPE</td>
              <td></td>
            </tr>
            <tr>
              <td>SKU</td>
              <td>adae14a3dd3b6ac5</td>
            </tr>
            <tr>
              <td>SERIAL NUMBER</td>
              <td>340849325</td>
            </tr>
            <tr>
              <td>INVENTORY STATUS</td>
              <td>Available to Sell</td>
            </tr>
            <tr>
              <td>PRICE</td>
              <td>25000</td>
            </tr>
            <tr>
              <td>TAG NUMBER</td>
              <td></td>
            </tr>
            <tr>
              <td>CHANNEL</td>
              <td>B2B</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<style type="text/css" scoped>

  #bid_detail, #inventory_detail {
    margin-right: 30%;
    float: left;
  }

  .detail_header {
    font-weight: 600;
    font-size: 22px;
    line-height: 39px;
    color: #109CF1;
    margin-bottom: 25px;
  }

  .qc-label{
    width: max-content;
    font-size: 11px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 43px;
    top: -11px;
    background-color: white;
    padding-left: 7px;
    padding-right:7px;
    color: #4f4f4f;
  }
  .dp-info-box{

    border: 1px groove rgba(0, 0, 0, 0.37);

    border-radius: 0;
  }

  .qc-header{
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 33px;
    color: #109CF1;
  }

  body{
    background-color: white !important;
  }
  thead , th{
    background-color:#E9E9E9 !important;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    font-size: 10px;
  }

  .dp-info-number{
    text-align: center;
    font-size: 3.7vw;
    color: red;
    margin-top: -10px;
  }
  .dp-info-label{
    text-align: center;
    font-size: 1vw;
    margin-top: -10px;
    color:#4f4f4f;
  }

  .dp-form-control{
    display: block;
    width: 100%;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid white;
    border-bottom: 1px solid #C9C9C9;
    border-radius: 0.1rem;
    -webkit-transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
</style>