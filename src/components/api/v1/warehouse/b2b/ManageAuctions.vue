<template>
  <div>
    <div class="rigt_navbar" id="content">
      <ul class="breadcrambs display_non">
        <li>B2B</li>
        <li><i class="fa fa-chevron-right"></i></li>
        <li><a href="#">Manage Auctions</a></li>
      </ul>
      <h3 class="main_header display_non">Manage Auctions</h3>
      <div class="row">
        <div class="col-lg-7">
          <ul class="cutome_tabs nav nav-tabs" role="tablist">
            <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#in_progress">In Progress</a></li>
            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#decision_pending">Decision Pending</a></li>
            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#closed_list">Closed List</a></li>
            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#all">All</a></li>
          </ul>
        </div>
        <div class="col-lg-5">
          <button class="qc_p_buttn4" data-toggle="modal" data-target="#myModal">Buyer Intimations</button>
        </div>
      </div>

      <div class="tab-content">
        <div id="in_progress" class="tab-pane active">
          <br>
          <div class="check_table">
            <div class="check_tablw stow_scroll">
              <div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox" id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1">ID</h4></div>
                <div class="table_cols2"><h4 class="table_head1">Bid Number</h4></div>
                <div class="table_cols2"><h4 class="table_head1">Lot Name</h4></div>
                <div class="table_cols2"><h4 class="table_head1">Bid Status</h4></div>
                <div class="table_cols2"><h4 class="table_head1">Floor Price</h4></div>
                <div class="table_cols2"><h4 class="table_head1">Reserve Price</h4></div>
                <div class="table_cols4"><h4 class="table_head1">Start Date</h4></div>
                <div class="table_cols4"><h4 class="table_head1">End Date</h4></div>
                <div class="table_cols1"><h4 class="table_head1">Action</h4></div>
              </div>
              <div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>21</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>613119249</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Lot_Laptop-123</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>In Progress</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>1999.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>2000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>March 31st, 2020 12:54</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>April 5th, 2020 12:54</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2" @click="show_bid_details">View</button></span></h4></div>
              </div>
              <div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>22</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>505663357</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Speaker || Samsung || Functional || Bangalore</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>In Progress</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>15000.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>20000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>March 31st, 2020 12:54</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>March 30th, 2020 11:43</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">View</button></span></h4></div>
              </div>
              <div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>23</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>987553856</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Speaker || Sony || Functional || Bangalore</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>In Progress</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>25000.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>30000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 20th, 2020 11:58</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>March 30th, 2020 11:43</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">View</button></span></h4></div>
              </div>
              <div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>24</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>443640572</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Refrigerator || Whirlpool || Functional || Bangalore</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>In Progress</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>15000.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>25000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 20th, 2020 11:59</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>March 30th, 2020 11:43</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">View</button></span></h4></div>
              </div>
              <div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>25</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>170894672</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Pendrive || Samsung || Functional || Bangalore</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>In Progress</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>10000.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>12000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 20th, 2020 19:56</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 25th, 2020 19:56</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">View</button></span></h4></div>
              </div>
              <div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>26</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>244516301</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Headphone || Mi || Functional || Bangalore</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>In Progress</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>10000.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>12000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 20th, 2020 19:56</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 25th, 2020 19:56</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">View</button></span></h4></div>
              </div>
              <div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>27</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>080292925</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>AC || Panasonic || Functional || Bangalore</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>In Progress</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>10000.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>12000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 20th, 2020 19:56</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 25th, 2020 19:56</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">View</button></span></h4></div>
              </div>
            </div>
          </div>
        </div>

        <div id="decision_pending" class="tab-pane fade">
          <br>
          <div class="check_table">
            <div class="check_tablw stow_scroll">
              <div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1">ID</h4></div>
                <div class="table_cols2"><h4 class="table_head1">Bid Number</h4></div>
                <div class="table_cols2"><h4 class="table_head1">Lot Name</h4></div>
                <div class="table_cols2"><h4 class="table_head1">Bid Status</h4></div>
                <div class="table_cols2"><h4 class="table_head1">Floor Price</h4></div>
                <div class="table_cols2"><h4 class="table_head1">Reserve Price</h4></div>
                <div class="table_cols4"><h4 class="table_head1">Start Date</h4></div>
                <div class="table_cols4"><h4 class="table_head1">End Date</h4></div>
                <div class="table_cols1"><h4 class="table_head1">Action</h4></div>
              </div>
              <div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>11</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>613119249</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Lot_Laptop-123</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>No Bid</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>1999.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>2000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>March 31st, 2020 12:54</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>April 5th, 2020 12:54</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">Close Success</button></span></h4></div>
              </div>
              <div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>12</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>711457054</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Decommission Mixed Lot Desktop,Cameral</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Payment</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>2000.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>15000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 24th, 2020 13:09</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>April 29th, 2020 11:38</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">Close Success</button></span></h4></div>
              </div>
              <div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>13</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>326801575</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Refrigerator Panasonic1 || Panasonic || Functional</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>No Bid</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>2000.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>15000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 24th, 2020 13:09</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>April 29th, 2020 11:38</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">Close Success</button></span></h4></div>
              </div><div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>14</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>013383792</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>HCL 1015 Decommissioned IT assets CPU-450 Monitor</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Payment</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>2000.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>15000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 24th, 2020 13:09</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>April 29th, 2020 11:38</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">Close Success</button></span></h4></div>
              </div><div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>15</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>670156189</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>AC/Split AC || BLUESTAR Brand || Functional</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Confirmation Pending</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>2000.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>15000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 24th, 2020 13:09</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>April 29th, 2020 11:38</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">Close Success</button></span></h4></div>
              </div>
            </div>
          </div>
        </div>

        <div id="closed_list" class="tab-pane fade">
          <br>
          <div class="check_table">
            <div class="check_tablw stow_scroll">
              <div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1">ID</h4></div>
                <div class="table_cols2"><h4 class="table_head1">Bid Number</h4></div>
                <div class="table_cols2"><h4 class="table_head1">Lot Name</h4></div>
                <div class="table_cols2"><h4 class="table_head1">Bid Status</h4></div>
                <div class="table_cols2"><h4 class="table_head1">Floor Price</h4></div>
                <div class="table_cols2"><h4 class="table_head1">Reserve Price</h4></div>
                <div class="table_cols4"><h4 class="table_head1">Start Date</h4></div>
                <div class="table_cols4"><h4 class="table_head1">End Date</h4></div>
                <div class="table_cols1"><h4 class="table_head1">Action</h4></div>
              </div>
              <div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>1</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>613119249</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Lot_Laptop-123</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Closed Success</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>1999.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>2000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>March 31st, 2020 12:54</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>April 5th, 2020 12:54</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">View</button></span></h4></div>
              </div>
              <div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>2</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>309378390</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>21 Decommissioned IT Assets, CPU-13, Monitor</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Closed Success</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>10000.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>45000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 26th, 2020 10:19</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 26th, 2020 10:39</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">View</button></span></h4></div>
              </div><div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>3</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>091042446</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>476 Decommissioned IT Assets -CPU-149,Monior</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Closed Success</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>10000.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>45000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 26th, 2020 10:19</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 26th, 2020 10:39</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">View</button></span></h4></div>
              </div><div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>4</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>198083157</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Hard Disk & Others Multibrand || Mixed || Bangalore</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Closed Success</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>10000.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>45000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 26th, 2020 10:19</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 26th, 2020 10:39</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">View</button></span></h4></div>
              </div><div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>5</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>534616479</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>621 Decommissioned IT_assets</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Closed Success</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>10000.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>45000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 26th, 2020 10:19</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 26th, 2020 10:39</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">View</button></span></h4></div>
              </div>
            </div>
          </div>
        </div>

        <div id="all" class="tab-pane fade">
          <br>
          <div class="check_table">
            <div class="check_tablw stow_scroll">
              <div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1">ID</h4></div>
                <div class="table_cols2"><h4 class="table_head1">Bid Number</h4></div>
                <div class="table_cols2"><h4 class="table_head1">Lot Name</h4></div>
                <div class="table_cols2"><h4 class="table_head1">Bid Status</h4></div>
                <div class="table_cols2"><h4 class="table_head1">Floor Price</h4></div>
                <div class="table_cols2"><h4 class="table_head1">Reserve Price</h4></div>
                <div class="table_cols4"><h4 class="table_head1">Start Date</h4></div>
                <div class="table_cols4"><h4 class="table_head1">End Date</h4></div>
                <div class="table_cols1"><h4 class="table_head1">Action</h4></div>
              </div>
              <div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>21</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>613119249</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Lot_Laptop-123</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>In Progress</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>1999.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>2000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>March 31st, 2020 12:54</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>April 5th, 2020 12:54</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">View</button></span></h4></div>
              </div>
              <div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>22</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>505663357</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Speaker || Samsung || Functional || Bangalore</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>In Progress</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>15000.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>20000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>March 31st, 2020 12:54</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>March 30th, 2020 11:43</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">View</button></span></h4></div>
              </div>
              <div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>23</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>987553856</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Speaker || Sony || Functional || Bangalore</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>In Progress</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>25000.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>30000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 20th, 2020 11:58</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>March 30th, 2020 11:43</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">View</button></span></h4></div>
              </div>
              <div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>24</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>443640572</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Refrigerator || Whirlpool || Functional || Bangalore</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>In Progress</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>15000.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>25000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 20th, 2020 11:59</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>March 30th, 2020 11:43</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">View</button></span></h4></div>
              </div>
              <div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>25</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>170894672</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Pendrive || Samsung || Functional || Bangalore</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>In Progress</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>10000.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>12000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 20th, 2020 19:56</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 25th, 2020 19:56</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">View</button></span></h4></div>
              </div>
              <div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>26</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>244516301</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Headphone || Mi || Functional || Bangalore</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>In Progress</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>10000.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>12000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 20th, 2020 19:56</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 25th, 2020 19:56</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">View</button></span></h4></div>
              </div>
              <div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>27</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>080292925</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>AC || Panasonic || Functional || Bangalore</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>In Progress</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>10000.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>12000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 20th, 2020 19:56</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 25th, 2020 19:56</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">View</button></span></h4></div>
              </div>
              <div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>11</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>613119249</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Lot_Laptop-123</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>No Bid</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>1999.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>2000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>March 31st, 2020 12:54</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>April 5th, 2020 12:54</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">Close Success</button></span></h4></div>
              </div>
              <div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>12</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>711457054</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Decommission Mixed Lot Desktop,Cameral</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Payment</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>2000.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>15000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 24th, 2020 13:09</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>April 29th, 2020 11:38</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">Close Success</button></span></h4></div>
              </div>
              <div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>13</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>326801575</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Refrigerator Panasonic1 || Panasonic || Functional</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>No Bid</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>2000.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>15000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 24th, 2020 13:09</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>April 29th, 2020 11:38</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">Close Success</button></span></h4></div>
              </div><div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>14</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>013383792</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>HCL 1015 Decommissioned IT assets CPU-450 Monitor</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Payment</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>2000.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>15000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 24th, 2020 13:09</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>April 29th, 2020 11:38</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">Close Success</button></span></h4></div>
              </div><div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>15</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>670156189</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>AC/Split AC || BLUESTAR Brand || Functional</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Confirmation Pending</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>2000.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>15000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 24th, 2020 13:09</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>April 29th, 2020 11:38</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">Close Success</button></span></h4></div>
              </div>
              <div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>1</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>613119249</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Lot_Laptop-123</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Closed Success</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>1999.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>2000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>March 31st, 2020 12:54</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>April 5th, 2020 12:54</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">View</button></span></h4></div>
              </div>
              <div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>2</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>309378390</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>21 Decommissioned IT Assets, CPU-13, Monitor</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Closed Success</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>10000.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>45000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 26th, 2020 10:19</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 26th, 2020 10:39</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">View</button></span></h4></div>
              </div><div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>3</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>091042446</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>476 Decommissioned IT Assets -CPU-149,Monior</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Closed Success</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>10000.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>45000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 26th, 2020 10:19</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 26th, 2020 10:39</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">View</button></span></h4></div>
              </div><div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>4</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>198083157</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Hard Disk & Others Multibrand || Mixed || Bangalore</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Closed Success</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>10000.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>45000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 26th, 2020 10:19</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 26th, 2020 10:39</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">View</button></span></h4></div>
              </div><div class="table_colmw table_bordr">
                <div class="table_clpp11">
                  <div class="custom-control custom-checkbox mb-3"><input type="checkbox"  id="customCheck1" name="example1"></input><label  for="customCheck1"></label></div>
                </div>
                <div class="table_cols1"><h4 class="table_head1"><span>5</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>534616479</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>621 Decommissioned IT_assets</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>Closed Success</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>10000.0</span></h4></div>
                <div class="table_cols2"><h4 class="table_head1"><span>45000.0</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 26th, 2020 10:19</span></h4></div>
                <div class="table_cols4"><h4 class="table_head1"><span>February 26th, 2020 10:39</span></h4></div>
                <div class="table_cols1"><h4 class="table_head1"><span><button class="qc_p_buttn2">View</button></span></h4></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
    name: 'ManageAuctions',
    data () {   
      return {
      }
    },
    methods: {
      show_bid_details () {
        this.$router.push('/show_details')
      }
    }
  }
</script>


<style type="text/css" scoped>
.table_clpp11 {
  float: left;
  width: 2%;
}

.table_clpp11 .custom-control {
  min-height: 0;
  margin: 0 auto !important;
  padding-left: 0;
  float: left;
  display: table;
}
.table_clpp11 .custom-control-label:before {position:absolute;top:0;background-color:#fff;border:1px solid #ccc;}
.table_clpp11 .custom-control-label:after {top:0;}
.table_clpp12 {
  float: left;
  width: 12%;
}

.table_clpp12 .table_head1 {
  text-align: left;
}

.table_clpp13.tbl_center {
  float: left;
  width: 15%;
}

.table_clpp13.tbl_center .table_head1 {
  text-align: left;
}

.table_clpp13 {
  float: left;
  width: 15%;
}

.table_clpp14 {
  float: left;
  width: 15%;
}
.table_clpp14 .custome_tip2 {
  float: none;top: -9px;
  margin-left: 9px;
}
.table_clpp14 .custome_tip2 img {
  max-width: 18px;
  opacity: 0.6;
}


.table_clpp15 {
  float: left;
  width: 25%;
}

.table_clpp15 .table_head1 {
  text-align: left;
}


.table_clpp15.module2_Wdt .table_head1 {
  text-align: left;
}

.table_clpp16 {
  float: left;
  width: 15%;
}

.table_clpp16 .table_head1 {
  text-align: left;
}

.table_clpp17 {
  float: left;
  width: 15%;
}

.table_clpp17 .table_head1 {
  text-align: left;
}

.table_clpp18 {
  float: left;
  width: 15%;
}
.table_clpp19 {
  float: left;
  width: 15%;
}

.table_clpp20 {
  float: left;
  width: 15%;
}

</style>