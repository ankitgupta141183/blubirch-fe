<template>
  <div class="rigt_navbar" id="content">
    <h3 class="main_header display_non">Pending Packaging</h3>
    <div class="row">
      <div class="col-lg-6">
        <div class="form_groupw">
          <div class="row">
            <div class="form_group1">
              <i class="fa fa-search" aria-hidden="true"></i>
              <input class="search_form" type="text" placeholder="Enter Lot Name to search.">
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="pk_test_se2">
          <ul class="qc_test_ul2">
            <li>Total Lots :<span>10</span></li>
            <li>Packed : <span>10</span></li>
            <li>Not Packed : <span>0</span></li>
            <li>Not Packed : <span class="failed_qc">0</span></li>
          </ul>
        </div>
      </div>
    </div>
    <ul class="cutome_tabs nav nav-tabs" role="tablist">
      <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#home">ITEM</a></li>
      <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#menu1">LOT</a></li>
    </ul>
    <div class="tab-content">
      <div id="home" class="tab-pane active">
        <div class="check_table">
          <div class="check_tablw table_font12px">
            <div class="table_colmw table_bordr">
              <div class="table_pend1">
                <h4 class="table_head1">Lot Name</h4>
              </div>
              <div class="table_pend2">
                <div class="dropdown">
                  <button class="custp_dropd" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <h4 class="table_head1">Origin Station <i class="fa fa-angle-down"></i></h4>
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
                    <li>
                      <a class="dropdown-item" href="#">
                        <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                        C1-Chroma
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                        C1-Chroma
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                        C1-Chroma
                      </a>
                    </li>
                  </div>
                </div>
              </div>
              <div class="table_pend3">
                <div class="dropdown">
                  <button class="custp_dropd" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <h4 class="table_head1">City <i class="fa fa-angle-down"></i></h4>
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
                    <li>
                      <a class="dropdown-item" href="#">
                        <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                        C1-Chroma
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                        C1-Chroma
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                        C1-Chroma
                      </a>
                    </li>
                  </div>
                </div>
              </div>
              <div class="table_pend4">
                <h4 class="table_head1">Toat Number</h4>
              </div>
              <div class="table_pend5">
                <h4 class="table_head1">Total No. Items</h4>
              </div>
              <div class="table_pend6">
                <div class="dropdown">
                  <button class="custp_dropd" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <h4 class="table_head1">Pick Status <i class="fa fa-angle-down"></i></h4>
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
                    <li>
                      <a class="dropdown-item" href="#">
                        <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                        C1-Chroma
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                        C1-Chroma
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                        C1-Chroma
                      </a>
                    </li>
                  </div>
                </div>
              </div>
              <div class="table_pend7">
                <div class="dropdown">
                  <button class="custp_dropd" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <h4 class="table_head1">Pack Status <i class="fa fa-angle-down"></i></h4>
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
                    <li>
                      <a class="dropdown-item" href="#">
                        <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                        C1-Chroma
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        <div class="custom-control custom-checkbox mb-3"><input type="checkbox" class="custom-control-input" id="customCheck5" name="example1"><label class="custom-control-label" for="customCheck5"></label></div>
                        C1-Chroma
                      </a>
                    </li>
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
            <div class="table_colmw table_bordr">
              <div class="table_pend1">
                <h4 class="table_head1"><span>AC || Panasonic || Functional || Bangalore || 3 || 2102</span></h4>
              </div>
              <div class="table_pend2">
                <h4 class="table_head1"><span>Sapan Jain</span></h4>
              </div>
              <div class="table_pend3">
                <h4 class="table_head1"><span>Bengaluru</span></h4>
              </div>
              <div class="table_pend4">
                <h4 class="table_head1"><span>DB_5432, DB_5433, DB_5432</span></h4>
              </div>
              <div class="table_pend5">
                <h4 class="table_head1"><span>100</span></h4>
              </div>
              <div class="table_pend6">
                <h4 class="table_head1"><span class="pass_test">Packed</span></h4>
              </div>
              <div class="table_pend7">
                <h4 class="table_head1"><span class="fail_color">Not Packed</span></h4>
              </div>
            </div>
            <div class="table_colmw table_bordr">
              <div class="table_pend1">
                <h4 class="table_head1"><span>AC || Panasonic || Functional || Bangalore || 3 || 2102</span></h4>
              </div>
              <div class="table_pend2">
                <h4 class="table_head1"><span>Sapan Jain</span></h4>
              </div>
              <div class="table_pend3">
                <h4 class="table_head1"><span>Bengaluru</span></h4>
              </div>
              <div class="table_pend4">
                <h4 class="table_head1"><span>DB_5432, DB_5433, DB_5432</span></h4>
              </div>
              <div class="table_pend5">
                <h4 class="table_head1"><span>100</span></h4>
              </div>
              <div class="table_pend6">
                <h4 class="table_head1"><span class="pass_test">Packed</span></h4>
              </div>
              <div class="table_pend7">
                <h4 class="table_head1"><span class="fail_color">Not Packed</span></h4>
              </div>
            </div>
            <div class="table_colmw table_bordr">
              <div class="table_pend1">
                <h4 class="table_head1"><span>AC || Panasonic || Functional || Bangalore || 3 || 2102</span></h4>
              </div>
              <div class="table_pend2">
                <h4 class="table_head1"><span>Sapan Jain</span></h4>
              </div>
              <div class="table_pend3">
                <h4 class="table_head1"><span>Bengaluru</span></h4>
              </div>
              <div class="table_pend4">
                <h4 class="table_head1"><span>DB_5432, DB_5433, DB_5432</span></h4>
              </div>
              <div class="table_pend5">
                <h4 class="table_head1"><span>100</span></h4>
              </div>
              <div class="table_pend6">
                <h4 class="table_head1"><span class="pass_test">Packed</span></h4>
              </div>
              <div class="table_pend7">
                <h4 class="table_head1"><span class="fail_color">Not Packed</span></h4>
              </div>
            </div>
            <div class="table_colmw table_bordr">
              <div class="table_pend1">
                <h4 class="table_head1"><span>AC || Panasonic || Functional || Bangalore || 3 || 2102</span></h4>
              </div>
              <div class="table_pend2">
                <h4 class="table_head1"><span>Sapan Jain</span></h4>
              </div>
              <div class="table_pend3">
                <h4 class="table_head1"><span>Bengaluru</span></h4>
              </div>
              <div class="table_pend4">
                <h4 class="table_head1"><span>DB_5432, DB_5433, DB_5432</span></h4>
              </div>
              <div class="table_pend5">
                <h4 class="table_head1"><span>100</span></h4>
              </div>
              <div class="table_pend6">
                <h4 class="table_head1"><span class="pass_test">Packed</span></h4>
              </div>
              <div class="table_pend7">
                <h4 class="table_head1"><span class="fail_color">Not Packed</span></h4>
              </div>
            </div>
            <div class="table_colmw table_bordr">
              <div class="table_pend1">
                <h4 class="table_head1"><span>AC || Panasonic || Functional || Bangalore || 3 || 2102</span></h4>
              </div>
              <div class="table_pend2">
                <h4 class="table_head1"><span>Sapan Jain</span></h4>
              </div>
              <div class="table_pend3">
                <h4 class="table_head1"><span>Bengaluru</span></h4>
              </div>
              <div class="table_pend4">
                <h4 class="table_head1"><span>DB_5432, DB_5433, DB_5432</span></h4>
              </div>
              <div class="table_pend5">
                <h4 class="table_head1"><span>100</span></h4>
              </div>
              <div class="table_pend6">
                <h4 class="table_head1"><span class="pass_test">Packed</span></h4>
              </div>
              <div class="table_pend7">
                <h4 class="table_head1"><span class="fail_color">Not Packed</span></h4>
              </div>
            </div>
          </div>
        </div>
        <div class="check_pagnt">
          <nav class="navigation" aria-label="Page navigation example pull-right">
            <ul class="pagination">
              <li class="page-item"><a class="page-link" href="#"><i class="fa fa-angle-double-left"></i></a></li>
              <li class="page-item"><a class="page-link" href="#"><i class="fa fa-angle-left"></i></a></li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">..</a></li>
              <li class="page-item"><a class="page-link" href="#">9</a></li>
              <li class="page-item"><a class="page-link" href="#"><i class="fa fa-angle-right"></i></a></li>
              <li class="page-item"><a class="page-link" href="#"><i class="fa fa-angle-double-right"></i></a></li>
            </ul>
          </nav>
        </div>
      </div>
      <div id="menu1" class="tab-pane fade">
        <br>
        <p>Coming soon</p>
      </div>
    </div>
  </div>
</template>