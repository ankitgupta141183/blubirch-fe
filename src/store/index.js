import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

 export const store = new Vuex.Store({
  state: {
    currentUser: {},
    current_warehouse: '',
    signedIn: false,
    authorization: null,
    role: null,
    invoice: {},
    customer_return_reason: {},
    selected_inventory: {},
    return_requests: [],
    approval_return_requests: [],
    approved_return_requests: [],
    inventoryIds: [],
    no_grading: {},
    warehouse_grading: false,
    toats: [],
    variationreport:{},
    dispatch_gate_passes: [],
  },
  getters: {
    isAdmin (state) {
      return state.currentUser && state.currentUser.role === 'admin'
    },
    isManager (state) {
      return state.currentUser && state.currentUser.role === 'manager'
    },
    currentUserId (state) {
      return state.currentUser && state.currentUser.id
    }
  },
  mutations: {
    setLotIds(state, { lotIds,action, floor_price, mrp }){
      state.lotIds = lotIds
      state.action = action
      state.floor_price = floor_price
      state.mrp = mrp
    },
    setLotIds(state, { lotIds,action,inventoryId }){
      state.lotIds = lotIds
      state.action = action
      state.inventoryId = inventoryId
    },
    setSelectedLot(state, { lot,action }){
      state.lot    = lot
      state.action = action
    },
    transferSelectedLot(state, { disposition, locationId, status, dispo_type }){
      state.disposition = disposition
      state.locationId = locationId
      state.status = status
      state.dispo_type = dispo_type
    },
    setPrdDetails(state,{action,items,tab_name}){
      state.action = action
      state.items = items
      state.tab_name = tab_name
    },
    setMessage(state, { responseMessage,action }){
      state.responseMessage = responseMessage
      state.action = action
    },

    showMessage(state,{alert_type,alert_message}){
      state.alert_type = alert_type
      state.alert_message = alert_message
    },
    setCurrentWarehouse(state, {distribution_id}){
      state.current_warehouse = distribution_id
    },

    unsetSelectedLot(state){
      state.lotIds = []
      state.lot    = {}
      state.action = null
      state.floor_price = null
      state.mrp = null
    },
    setCurrentUser (state, { currentUser, authorization }) {
      state.currentUser = currentUser
      state.signedIn = true
      state.authorization = authorization
    },
    unsetCurrentUser (state) {
      state.currentUser = {}
      state.signedIn = false
      state.authorization = null
      state.role = null
      state.invoice = {}
      state.customer_return_reason = {}
      state.client_category_id = null
      state.return_requests = []
      state.approval_return_requests = []
      state.approved_return_requests = []
      state.no_grading = {}
    },
    clearReturnRequestInfo (state) {      
      state.invoice = {}
      state.customer_return_reason = {}
      state.client_category_id = null
      state.return_requests = []
      state.approval_return_requests = []
      state.approved_return_requests = []
      state.no_grading = {}
    },
    refresh (state, signedIn, authorization) {
      state.signedIn = true
      state.authorization = authorization
    },
    setbulkRrnrecords(state, {record}){
      state.selected_rrn = record
    },
    addrrnrecord(state, {obj}){
      state.selected_rrn.push(obj)
    },
    removerrnrecord(state, {ind}){
      state.selected_rrn.splice(ind, 1)
    },

    setInvoiceDetail(state, {detail}){
      state.return_request = detail
    },

    boxDetails(state, {boxdetails}){
      state.boxes = boxdetails
    },

    boxItems(state, {boxitems}){
      state.boxitems = boxitems
    },
    setInvoice(state, { invoice, customer_return_reason, selected_inventory }) {
      state.invoice = invoice
      state.customer_return_reason = customer_return_reason
      state.selected_inventory = selected_inventory
    },
    setWarehouseGrading(state, { selected_inventory , warehouse_grading , grading_type}) {
      
      state.selected_inventory = selected_inventory
      state.warehouse_grading = warehouse_grading
      state.grading_type = grading_type
    },
    setReturnRequests(state, { return_requests }) {
      state.return_requests = return_requests
    },
    setApprovalReturnRequests(state, { approval_return_requests }) {
      state.approval_return_requests = approval_return_requests
    },
    setApprovedReturnRequests(state, { approved_return_requests }) {
      state.approved_return_requests = approved_return_requests
    },
    setQc(state, {toat_number, tag_number, inventories, stowed_ids}) {
      state.toat_number = toat_number
      state.tag_number = tag_number
      state.inventories = inventories
      state.stowed_ids = stowed_ids
    },
    setGrading(state,{functional_status, physical_status, packaging_status}){
      state.functional_status = functional_status
      state.physical_status = physical_status
      state.packaging_status = packaging_status
    },
    setNoGrading(state,{no_grading}){
      state.no_grading = no_grading
    }, 
    setVariationReport(state,{variationreport}){
      state.variationreport = variationreport
    }, 
    setWareHouseDetails(state,{return_reason, inventories, return_request, box_details,selected_gatepass}){
      state.return_reason = return_reason
      state.inventories = inventories
      state.return_request = return_request
      state.box_details = box_details
      state.selected_gatepass = selected_gatepass
    },    
    setGatePasses(state,{gate_passes}){
      state.gate_passes = gate_passes
    },
    addInventory(state, {id}){
      state.inventoryIds.push(id)
    },
    removeInventory(state, {ind}){
      state.inventoryIds.splice(ind, 1)
    },
    removeAllInventories(state, {inventories}){
      state.inventoryIds = []
    },
    setInwardSKU(state, {sku_code, client_sku_master}){
      state.sku_code = sku_code
      state.client_sku_master = client_sku_master
    },
    toats(state, {toats}){
      state.toats = toats
    },
    setDispatchGatePasses(state, {dispatch_gate_passes}){
      state.dispatch_gate_passes = dispatch_gate_passes
    },
    addDispatchGatePasses(state, {obj}){
      state.dispatch_gate_passes.push(obj)
    },
    removeDispatchGatePasses(state, {ind}){
      state.dispatch_gate_passes.splice(ind, 1)
    },
    setSelectedTagJobSheet(state,{tag}){
      state.tag = tag
    },
    setImageurl(state,{url}){
      state.url = url
    },
    setselectedJobSheetId(state,{selectedRepairJobSheetId}){
      state.selectedRepairJobSheetId = selectedRepairJobSheetId
    },
    setSelectedClaim(state, { selected_claim}){
      state.selected_claim = selected_claim
    },
    setCustomerDetail(state,{customer_detail}){
      state.customer_detail = customer_detail
    },
    setClaim(state,{warranty_claim}){
      state.warranty_claim = warranty_claim
    },
    chartType(state, {chart_type}){
      state.chart_type = chart_type
    },
    setOrder(state,{order}){
      state.order = order
    },
    setVerificationEmail(state,{email}){
      state.email = email
    },
    setOTP(state,{otp}){
      state.otp = otp
    },
    setPasswordToken(state,{password_token}){
      state.password_token = password_token
    },

    setUserId(state, {user_id}){
      state.user_id = user_id
    },
    setVendorType(state, {vendor_type}){
      state.vendor_type = vendor_type
    },
    setSubLotQuantity(state, { action, subLotQuantity,subLotsPossible }){
      state.action = action
      state.subLotQuantity = subLotQuantity
      state.subLotsPossible = subLotsPossible
    },
  },
  plugins: [createPersistedState()]
})

 export default store