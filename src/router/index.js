import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/api/v1/Signin'
import PrivacyPolicy from '@/components/api/v1/PrivacyPolicy'

// Forgot Password via Login
import EmailVerification from '@/components/api/v1/password/EmailVerification' 
import OTPVerification from '@/components/api/v1/password/OTPVerification' 
import ResetPassword from '@/components/api/v1/password/ResetPassword' 

// Store Return Request Starts
import SearchInvoiceNumber from '@/components/api/v1/store/service_requests/SearchInvoiceNumber'
import SelectCustomerReturnReason from '@/components/api/v1/store/service_requests/SelectCustomerReturnReason'
import SelectInventoryList from '@/components/api/v1/store/service_requests/SelectInventoryList'
import NoGradingInventory from '@/components/api/v1/store/service_requests/NoGradingInventory'
// Store Return Request Ends

// Send for Approval Starts
import ApprovalSend from '@/components/api/v1/store/service_requests/ApprovalSend'
import EditReturnRequest from '@/components/api/v1/store/service_requests/EditReturnRequest'
import ReturnRequestInfo from '@/components/api/v1/store/service_requests/ReturnRequestInfo'
// Send for Approval Ends

// Management Approval Starts
import PendingApproval from '@/components/api/v1/store/service_requests/PendingApproval'
import PendingApprovalsList from '@/components/api/v1/store/service_requests/PendingApprovalsList'

// Management Approval Ends

import ListAdminDistributionCenters from '@/components/admin/distribution_center/ListDistributionCenters'
import NewAdminDistributionCenter from '@/components/admin/distribution_center/NewDistributionCenter'
import EditAdminDistributionCenter from '@/components/admin/distribution_center/EditDistributionCenter'
import ShowAdminDistributionCenter from '@/components/admin/distribution_center/ShowDistributionCenter'

import ListAdminUsers from '@/components/admin/users/ListUsers'
import NewAdminUser from '@/components/admin/users/NewUser'
import EditAdminUser from '@/components/admin/users/EditUser'
import ShowAdminUser from '@/components/admin/users/ShowUser'

import ListAdminRoles from '@/components/admin/roles/ListRoles'
import EditAdminRole from '@/components/admin/roles/EditRole'
import NewAdminRole from '@/components/admin/roles/NewRole'
import ShowAdminRole from '@/components/admin/roles/ShowRole'

import ListAlertConfigurations from '@/components/admin/alert_configurations/ListAlertConfigurations'
import EditAlertConfiguration from '@/components/admin/alert_configurations/EditAlertConfiguration'
import NewAlertConfiguration from '@/components/admin/alert_configurations/NewAlertConfiguration'

import AlertConfigurationUpload from '@/components/admin/alert_configurations_new/AlertConfigurationUpload'

import ListRepairParts from '@/components/admin/repair_parts/ListRepairParts'
import EditRepairPart from '@/components/admin/repair_parts/EditRepairPart'
import NewRepairPart from '@/components/admin/repair_parts/NewRepairPart'

import ListAdminLookupkeys from '@/components/admin/lookup_keys/ListLookupKeys'
import EditAdminLookupkey from '@/components/admin/lookup_keys/EditLookupKey'
import NewAdminLookupKey from '@/components/admin/lookup_keys/NewLookupKey'
import ShowAdminLookupKey from '@/components/admin/lookup_keys/ShowLookupKey'

import ListAdminLookupValues from '@/components/admin/lookup_values/ListLookupValues'
import EditAdminLookupValue from '@/components/admin/lookup_values/EditLookupValue'
import NewAdminLookupValue from '@/components/admin/lookup_values/NewLookupValue'
import ShowAdminLookupValue from '@/components/admin/lookup_values/ShowLookupValue'

import ListAdminClients from '@/components/admin/clients/ListClients'
import EditAdminClient from '@/components/admin/clients/EditClient'
import NewAdminClient from '@/components/admin/clients/NewClient'
import ShowAdminClient from '@/components/admin/clients/ShowClient'

import ListAdminAttributeMasters from '@/components/admin/attribute_masters/ListAttributeMasters'
import EditAdminAttributeMaster from '@/components/admin/attribute_masters/EditAttributeMaster'
import NewAdminAttributeMaster from '@/components/admin/attribute_masters/NewAttributeMaster'
import ShowAdminAttributeMaster from '@/components/admin/attribute_masters/ShowAttributeMaster'

import ListAdminClientAttributeMasters from '@/components/admin/client_attribute_masters/ListClientAttributeMasters'
import EditAdminClientAttributeMaster from '@/components/admin/client_attribute_masters/EditClientAttributeMaster'
import NewAdminClientAttributeMaster from '@/components/admin/client_attribute_masters/NewClientAttributeMaster'
import ShowAdminClientAttributeMaster from '@/components/admin/client_attribute_masters/ShowClientAttributeMaster'

import ListAdminCategories from '@/components/admin/categories/ListCategories'
import EditAdminCategory from '@/components/admin/categories/EditCategory'
import NewAdminCategory from '@/components/admin/categories/NewCategory'
import ShowAdminCategory from '@/components/admin/categories/ShowCategory'

import ListAdminClientCategories from '@/components/admin/client_categories/ListClientCategories'
import EditAdminClientCategory from '@/components/admin/client_categories/EditClientCategory'
import NewAdminClientCategory from '@/components/admin/client_categories/NewClientCategory'
import ShowAdminClientCategory from '@/components/admin/client_categories/ShowClientCategory'



import ListAdminClientSkuMasters from '@/components/admin/client_sku_masters/ListClientSkuMasters'
import EditAdminClientSkuMaster from '@/components/admin/client_sku_masters/EditClientSkuMaster'
import NewAdminClientSkuMaster from '@/components/admin/client_sku_masters/NewClientSkuMaster'
import ShowAdminClientSkuMaster from '@/components/admin/client_sku_masters/ShowClientSkuMaster'

import ListAdminCostValues from '@/components/admin/cost_values/ListCostValues'
import NewAdminCostValue from '@/components/admin/cost_values/NewCostValue'

import ListAdminChannels from '@/components/admin/channels/ListChannels'
import EditAdminChannel from '@/components/admin/channels/EditChannel'
import NewAdminChannel from '@/components/admin/channels/NewChannel'
import ShowAdminChannel from '@/components/admin/channels/ShowChannel'

import CustomerReturn from '@/components/api/v1/store/returns/CustomerReturn'
import InvoiceTable from '@/components/api/v1/store/returns/InvoiceTable'

import PendingPackage from '@/components/api/v1/store/pending_pack/PendingPackage'
import AddBoxItems from '@/components/api/v1/store/pending_pack/AddBoxItems'
import PendingDispatch from '@/components/api/v1/store/pending_pack/PendingDispatch'
import CompleteDispatch from '@/components/api/v1/store/pending_pack/CompleteDispatch'

import QualityControl from '@/components/api/v1/warehouse/quality_control/QualityControl'
import QualityControlList from '@/components/api/v1/warehouse/quality_control/QualityControlList'
import QualityControlDecision from '@/components/api/v1/warehouse/quality_control/QualityControlDecision'
import managementDashboard from '@/components/api/v1/warehouse/dashboards/managementDashboard'
import markdownDashboard from '@/components/api/v1/warehouse/dashboards/markdownDashboard'
import operationsDashboard from '@/components/api/v1/warehouse/dashboards/operationsDashboard'
import sellerDashboard from '@/components/api/v1/warehouse/dashboards/sellerDashboard'
import Stowing from '@/components/api/v1/warehouse/stowings/Stowing'
import StowingList from '@/components/api/v1/warehouse/stowings/StowingList'

import Ewaste from '@/components/api/v1/warehouse/inventory/Ewaste'
import Liquidation from '@/components/api/v1/warehouse/inventory/Liquidation'
import PendingGrading from '@/components/api/v1/warehouse/inventory/PendingGrading'
import Repair from '@/components/api/v1/warehouse/inventory/Repair'
import Restock from '@/components/api/v1/warehouse/inventory/Restock'
import RTV from '@/components/api/v1/warehouse/inventory/RTV'

import Pick from '@/components/api/v1/warehouse/pick/Pick'
import PickList from '@/components/api/v1/warehouse/pick/PickList'
import PickListMultiple from '@/components/api/v1/warehouse/pick/PickListMultiple'

import PublishLots from '@/components/api/v1/warehouse/b2b/PublishLots'
import ManageAuctions from '@/components/api/v1/warehouse/b2b/ManageAuctions'


import Package from '@/components/api/v1/store/testing/Package'
import ListServiceExecutive from '@/components/api/v1/store/executives/ServiceExecutive'

import ExchangeInventory from '@/components/api/v1/exchange/ExchangeInventory'
import ExchangeInventoryDetails from '@/components/api/v1/exchange/ExchangeInventoryDetails'

import NewAdminClientCategoryMapping from '@/components/admin/client_category_mappings/NewClientCategoryMapping'

import ListAdminCostLabels from '@/components/admin/cost_labels/ListCostLabels'
import EditAdminCostLabel from '@/components/admin/cost_labels/EditCostLabel'
import NewAdminCostLabel from '@/components/admin/cost_labels/NewCostLabel'
import ShowAdminCostLabel from '@/components/admin/cost_labels/ShowCostLabel'

import NewAdminOrder from '@/components/admin/orders/NewOrder'
import ListAdminOrders from '@/components/admin/orders/ListOrders'

import store from '@/store/index.js'
import Roles from '@/roles.js'
import VueToast from 'vue-toast-notification'

import EditAdminOrder from '@/components/admin/orders/EditOrder'
import ShowAdminOrder from '@/components/admin/orders/ShowOrder'

import NewAdminCustomerReturnReason from '@/components/admin/customer_return_reasons/NewCustomerReturnReason'
import EditAdminCustomerReturnReason from '@/components/admin/customer_return_reasons/EditCustomerReturnReason'
import ShowAdminCustomerReturnReason from '@/components/admin/customer_return_reasons/ShowCustomerReturnReason'
import ListAdminCustomerReturnReasons from '@/components/admin/customer_return_reasons/ListCustomerReturnReasons'


import NewAdminEmailTemplate from '@/components/admin/email_templates/NewEmailTemplate'
import ListAdminEmailTemplates from '@/components/admin/email_templates/ListEmailTemplates'
import ShowAdminEmailTemplate from '@/components/admin/email_templates/ShowEmailTemplates'
import EditAdminEmailTemplate from '@/components/admin/email_templates/EditEmailTemplates'

import ListAdminInvoices from '@/components/admin/invoices/ListInvoices'
import EditAdminInvoice from '@/components/admin/invoices/EditInvoice'
import NewAdminInvoice from '@/components/admin/invoices/NewInvoice'
import ShowAdminInvoice from '@/components/admin/invoices/ShowInvoice'

import NewAdminReminder from '@/components/admin/reminders/NewReminder'
import EditAdminReminder from '@/components/admin/reminders/EditReminder'
import ListAdminReminders from '@/components/admin/reminders/ListReminders'
import ShowAdminReminder from '@/components/admin/reminders/ShowReminder'


import NewAdminMasterFileUpload from '@/components/admin/master_file_uploads/NewMasterFileUpload'
import ListAdminMasterFileUploads from '@/components/admin/master_file_uploads/ListMasterFileUploads'


import ListAdminInvoiceInventoryDetails from '@/components/admin/invoice_inventory_details/ListInvoiceInventoryDetails'
import EditAdminInvoiceInventoryDetail from '@/components/admin/invoice_inventory_details/EditInvoiceInventoryDetail'
import NewAdminInvoiceInventoryDetail from '@/components/admin/invoice_inventory_details/NewInvoiceInventoryDetail'
import ShowAdminInvoiceInventoryDetail from '@/components/admin/invoice_inventory_details/ShowInvoiceInventoryDetail'

import SendAdminApproval from '@/components/api/v1/store/approval/SendForApproval'
import SearchInventory from '@/components/api/v1/warehouse/gradings/SearchInventory'

import ManageEditBoxes from '@/components/api/v1/warehouse/manage/ManageEditBoxes'
import ManageEditAddBoxes from '@/components/api/v1/warehouse/manage/ManageEditAddBoxes'
import ReInwardInventry from '@/components/api/v1/warehouse/inwards/ReInward'
import NewInwardManageBoxes from '@/components/api/v1/warehouse/inwards/NewInwardManageBoxes'
import StnDocumentUpload from '@/components/api/v1/warehouse/inwards/StnDocumentUpload'  
import StnDocumentUploadList from '@/components/api/v1/warehouse/inwards/StnDocumentUploadList'
import StoreMasterUploadList from '@/components/api/v1/manual_process/StoreMasterUploadList'
import StoreMasterUpload from '@/components/api/v1/manual_process/StoreMasterUpload'
import SkuMasterUploadList from '@/components/api/v1/manual_process/SkuMasterUploadList'
import SkuMasterUpload from '@/components/api/v1/manual_process/SkuMasterUpload'
import VendorMasterUploadList from '@/components/api/v1/manual_process/VendorMasterUploadList'
import VendorMasterUpload from '@/components/api/v1/manual_process/VendorMasterUpload'
import Settings from '@/components/api/v1/settings/Settings'
import UserControl from '@/components/api/v1/users/UserControl'
import EditSerialNumber from '@/components/api/v1/serial-number-edit/EditSerialNumber'
import NewUser from '@/components/api/v1/users/NewUser'
import EditUser from '@/components/api/v1/users/EditUser'
import EditItem from '@/components/api/v1/manual_process/EditItem'
import ConfigurationSettings from '@/components/api/v1/putaway/ConfigurationSettings'
import MasterDataUpload from '@/components/api/v1/manual_process/MasterDataUploadList'
import GrnReport from '@/components/api/v1/report/GrnReport'

import InwardForm from '@/components/api/v1/warehouse/inwards/inwardForm'
import InwardSkunumber from '@/components/api/v1/warehouse/inwards/inwardSkunumber'

import ReInwardManageBoxes from '@/components/api/v1/warehouse/inwards/ReInwardManageBoxes'
import CompanyStock from '@/components/api/v1/warehouse/inwards/CompanyStock'

import VariationReport from '@/components/api/v1/warehouse/variation_reports/VariationReport'
import VariationReportList from '@/components/api/v1/warehouse/variation_reports/variationReportList'

import NewAdminRule from '@/components/admin/rule/NewRule'
import NewAdminClientRule from '@/components/admin/rule/NewClientRule'


import ListAdminLogisticsPartners from '@/components/admin/logistics_partners/ListLogisticsPartners'
import NewAdminLogisticsPartner from '@/components/admin/logistics_partners/NewLogisticsPartner'
import EditAdminLogisticsPartner from '@/components/admin/logistics_partners/EditLogisticsPartner'
import ShowAdminLogisticsPartner from '@/components/admin/logistics_partners/ShowLogisticsPartner'

import PendingPacking from '@/components/api/v1/warehouse/pending_pack/PendingPacking'
import PendingPackingList from '@/components/api/v1/warehouse/pending_pack/PendingPackingList'
import PendingPackingMainList from '@/components/api/v1/warehouse/pending_pack/MainList'
import PendingPackingStorePack from '@/components/api/v1/warehouse/pending_pack/StorePack'
import PendingPackingListStorePack from '@/components/api/v1/warehouse/pending_pack/ListStorePack'
import PendingPackingListStorePackMultiple from '@/components/api/v1/warehouse/pending_pack/ListStorePackMultiple'
import PendingPackingSelectionStorePack from '@/components/api/v1/warehouse/pending_pack/SelectionStorePack'
import PendingPackingRejection from '@/components/api/v1/warehouse/pending_pack/Rejection'

import ListAdminQcConfigurations from '@/components/admin/qc_configurations/ListQcConfigurations'
import NewAdminQcConfiguration from '@/components/admin/qc_configurations/NewQcConfiguration'
import EditAdminQcConfiguration from '@/components/admin/qc_configurations/EditQcConfiguration'
import ShowAdminQcConfiguration from '@/components/admin/qc_configurations/ShowQcConfiguration'

import Alert from '@/components/Alert'
//pending-return-request-approval	
import pending_Return_Request_Approval from '@/components/api/v1/warehouse/pending_Return_Request_Approval/pending_Return_Request_Approval'


//Warehouse Dispatch
import WarehouseDispatch from '@/components/api/v1/warehouse/dispatch/Dispatch'
import WarehouseDispatchComplete from '@/components/api/v1/warehouse/dispatch/DispatchComplete'

import RTVOperations from '@/components/api/v1/rtv/RTVOperations'
import RTVPendingBrandApprovalDetails from '@/components/api/v1/rtv/BrandApprovalDetail'
import RTVNew from '@/components/api/v1/rtv-new/RTV'
import RTVModule from '@/components/api/v2/reverse/rtv/rtv'


//Insurance
import InsuranceOperations from '@/components/api/v1/insurance/InsuranceOperations'

//Insurance new module
import InsuranceOperationsNew from '@/components/api/v2/reverse/insurance/InsuranceOperationsNew'
import Insurance from '@/components/api/v2/reverse/insurance/Insurance'

//Pending Issues Resolution
import PendingIssues from '@/components/api/v1/issues/PendingIssues'
// Putaway module
import PutAway from '../components/api/v1/warehouse/put_away/PutAway'

//DMS Project
import DMSOrders from '@/components/api/v1/dms/DMSOrders'
import DMSOrderDetails from '@/components/api/v1/dms/DMSOrderDetails'
import DMSWarranty from '@/components/api/v1/dms/DMSWarranty'
import DMSClaims from '@/components/api/v1/dms/DMSClaims'
import DMSCustomerDetails from '@/components/api/v1/dms/DMSCustomerDetails'
import DMSEditCustomerDetail from '@/components/api/v1/dms/DMSEditCustomerDetail'
import DMSCatalogue from '@/components/api/v1/dms/DMSCatalogue'
import DMSClaimsReport from '@/components/api/v1/dms/DMSClaimsReport'


//Repair
import RepairInitiation from '@/components/api/v1/repair/RepairInitiation';
import Jobsheet from '@/components/api/v1/repair/JobSheet';
import PendingRepairJobSheet from '@/components/api/v1/repair/PendingRepairJobSheet';

//New Repair
import RepairOperations from '@/components/api/v1/newrepair/RepairOperations';
import RepairModule from '@/components/api/v2/reverse/repair/Repair';
import Report from '@/components/api/v1/report/report';


import customerInfo from '@/components/api/v1/pos/invoice-retail/customerInfo';
import OrderPlacement from '@/components/api/v1/pos/orders/OrderPlacement';
import OrderSummary from '@/components/api/v1/pos/orders/OrderSummary';
import MasterItemList from '@/components/api/v1/pos/orders/MasterItemList';
import OrderPlaced from '@/components/api/v1/pos/orders/OrderPlaced';

import posDashBoard from '@/components/api/v1/pos/dashboard/posDashBoard';
import invoiceSummary from '@/components/api/v1/pos/invoice-summary/invoiceSummary';

import retailInvoice from '@/components/api/v1/pos/invoice-retail/retailInvoice';

import bulkInvoice from '@/components/api/v1/pos/invoice-bulk/bulkInvoice';

//POS Responsive Mobile & Web
import GRNInvoiceSelect from '@/components/api/v1/pos/grn/GRNInvoiceSelect'
import GRNBoxInward from '@/components/api/v1/pos/grn/GRNBoxInward'
import GRNItemInward from '@/components/api/v1/pos/grn/GRNItemInward'
import GRNItemInwardDetails from '@/components/api/v1/pos/grn/GRNItemInwardDetails'
import GRNSummary from '@/components/api/v1/pos/grn/GRNSummary'
import GRNBoxSummary from '@/components/api/v1/pos/grn/GRNBoxSummary'
import GRNItemSummary from '@/components/api/v1/pos/grn/GRNItemSummary'

// liquidation
import MailBox from '@/components/api/v1/warehouse/liquidation/MailBox';
import LotCreationPublish from '@/components/api/v1/warehouse/liquidation/LotCreationPublish';
import LotCreation from '@/components/api/v1/warehouse/liquidation/LotCreation';
import LotCreationErrors from '@/components/api/v1/warehouse/liquidation/LotCreationErrors';

import ListVendorMasters from '@/components/admin/vendor_masters/ListVendorMasters'
import NewVendorMaster from '@/components/admin/vendor_masters/NewVendorMaster'
import ImagesList from '@/components/api/v1/warehouse/liquidation/ImagesList'
//
import Dispatch from '@/components/api/v1/dispatch/DispatchList'
//redeploy
import Redeploy from '@/components/api/v2/reverse/redeploy/Redeploy'

//Disposition
import Disposition from '@/components/api/v1/wms/Disposition'

//Reverse-Pickup
import ReversePickupNew from '@/components/api/v1/reverse_pickup/ReversePickupNew'

//FileUploadList
import FileUploadList from '@/components/api/v1/warehouse/file_upload/FileUploadList'

//File
import FileUpload from '@/components/api/v1/warehouse/file_upload/New';

//wms
import WmsDashboard from '@/components/api/v1/wms/Dashboard'

import Quotation from '@/components/api/v1/wms/Quotation'

import WmsChart from '@/components/api/v1/wms/Chart'

import WmsGraph from '@/components/api/v1/wms/Graph'

import ItemInfo from '@/components/api/v1/wms/ItemInfo'

import DocumentNumber from '@/components/api/v1/wms/DocumentNumber'

import InboundDocument from '@/components/api/v1/inbounds/document'

import OutboundDocument from '@/components/api/v1/outbounds/document'

import InboundDocumentIndex from '@/components/api/v1/inbounds/index'

import DocumentError from '@/components/api/v1/inbounds/documentError'

import exceptionalArticles from '@/components/api/v1/wms/exceptionalArticles'

import exceptionalArticlesFileUploadList from '@/components/api/v1/wms/exceptionalArticlesFileUploadList'

import exceptionalArticlesSerialNumber from '@/components/api/v1/wms/exceptionalArticlesSerialNumber'

import expArticlesSerialNumberFileUploadList from '@/components/api/v1/wms/expArticlesSerialNumberFileUploadList'

import Waste from '@/components/api/v1/ewaste/Ewaste'

import EWasteErrors from '@/components/api/v1/ewaste/EWasteErrors'
//Sublocations
import SubLocations from '@/components/api/v1/configuration_settings/SubLocations'

// 3p Claim 
import threePClaim from '@/components/api/v1/3p-claim/threePClaim';

//Alerts
import Alerts from '@/components/api/v1/alert/Alerts';

import PendingDisposition from '@/components/api/v2/reverse/pending-dispositon/Pending-disposition';
// dispatch
import NewDispatch from '@/components/api/v2/reverse/dispatch/Dispatch';
// return approval
import ReturnApproval from '@/components/api/v1/return_approval/ReturnApproval';

// Restock 
import RestockComp from '@/components/api/v2/reverse/restock/RestockComp'
import approveStatus from '@/components/api/v1/approveStatus'
import ApprovalRequest from '@/components/api/v1/ApprovalRequest'
import RejectRequest from '@/components/api/v1/RejectRequest'

// new Liquidation 
import liquidationNew from '@/components/api/v2/reverse/liquidation/liquidationNew'
import CreateLotCompBidd from '@/components/api/v2/reverse/liquidation/CreateLotCompBidd'
import AssignLotToBuyer from '@/components/api/v2/reverse/liquidation/AssignLotToBuyer'
import CreateLotsMOQ from '@/components/api/v2/reverse/liquidation/CreateLotsMOQ'
import PriceGridMoq from '@/components/api/v2/reverse/liquidation/PriceGridMoq'

// brand call log module
import BrandCallLog from '../components/api/v2/reverse/brandCallLog/BrandCallLog'

//new replacement reverse
import Replacement from '@/components/api/v2/reverse/replacement/replacement'
//Issue Resolution

import IssueResolution from '@/components/api/v1/issue_resolution/IssueResolution'
import PendingBoxResolution from '@/components/api/v1/issue_resolution/PendingBoxResolution'
import PendingItemResolution from '@/components/api/v1/issue_resolution/PendingItemResolution'
import RejectedBoxesAndItems from '@/components/api/v1/issue_resolution/RejectedBoxesAndItems'
import ThreePClaimRequests from '@/components/api/v1/issue_resolution/ThreePClaimRequests'
// Dashboard
import dashboardNew from '@/components/api/v1/warehouse/Dashboard/dashboardNew'
import returngeneration from '@/components/api/v1/warehouse/Dashboard/returngeneration'
import returnprocessedvsgeneratedtrend from '@/components/api/v1/warehouse/Dashboard/returnprocessedvsgeneratedtrend'
import ReverseLifecycleTAT from '@/components/api/v1/warehouse/Dashboard/ReverseLifecycleTAT'
import ReturnProcessedvsGenerated from '@/components/api/v1/warehouse/Dashboard/ReturnProcessedvsGenerated'
import PerUnitCost from '@/components/api/v1/warehouse/Dashboard/PerUnitCost'
import returngenerationtrend from '@/components/api/v1/warehouse/Dashboard/returngenerationtrend'
import masterReportCard from '@/components/api/v1/warehouse/Dashboard/masterReportCard'
import nodataavalable from '@/components/api/v1/warehouse/Dashboard/nodataavalable'
// Return Creation
import RetunrCreation from '@/components/api/v1/return-creation/ReturnCreation';
import RCFileUpload from '@/components/api/v1/return-creation/RCFileUpload'
import SalesReturnCreation from '@/components/api/v1/return-creation/SalesReturnCreation'
import LeaseReturnRequest from '@/components/api/v1/return-creation/LeaseReturnRequest'
import InternalReturnRequest from '@/components/api/v1/return-creation/InternalReturnRequest'
import ExchangeReturnRequest from '@/components/api/v1/return-creation/ExchangeReturnRequest'
import warentyClaim from '@/components/api/v1/return-creation/warentyClaim'
import pickupReturnRequest from '@/components/api/v1/return-creation/pickupReturnRequest'
import invitepullback from '@/components/api/v1/return-creation/invitepullback'
// MarkDown
import MarkDown from '../components/api/v2/reverse/markdown/Markdown'
//Saleable
import Saleable from '@/components/api/v2/forward/saleable/Saleable'
import ReservePage from '@/components/api/v2/forward/saleable/ReservePage'

import CapitalAssets from '../components/api/v2/forward/capital_assets/CapitalAssets'
//Demo
import Demo from '@/components/api/v2/forward/demo/Demo'
//PRD
import PRD from '@/components/api/v1/prd/PRD'
import IrrdDetails from '@/components/api/v1/prd/IrrdDetails'

// Physical Inspection
import PhysicalInspection from '@/components/api/v1/warehouse/physical_inspection/PhysicalInspection';
import physicalinspectionApproval from '@/components/api/v1/warehouse/physical_inspection/physicalinspectionApproval';

// Replacement Forward
import ReplacementForward from '@/components/api/v2/forward/replacement/Replacement'
import ReplacementReserve from '@/components/api/v2/forward/replacement/ReplacementReserve'
import Transfer from '@/components/api/v2/forward/transfer/Transfer'
import TransferTablePage from '@/components/api/v2/forward/transfer/TransferTablePage'

// Rental

import Rental from "@/components/api/v2/forward/rental/Rental"
import RentalReserve from "@/components/api/v2/forward/rental/RentalReserve"

// Cannibalization
import Cannibalization from '@/components/api/v2/reverse/cannibalization/Cannibalization'

// upload file comm bidding file
import LotFileuploadComm from '@/components/api/v2/reverse/liquidation/LotFileuploadComm'
// forward and reverse Disposition
import rfDisposition from '@/components/api/v2/wms/rfDisposition'
// forward disposition
import forwardDisposition from '@/components/api/v2/forward/wms-forward/forwardDisposition'
// reverse disposition
import reverseDisposition from '@/components/api/v2/reverse/wms-reverse/reverseDisposition'
// inward tracking
import inwardTracking from '@/components/api/v1/inward/inward_tracking'
// Production module
import Production from '@/components/api/v2/forward/production/Production'
Vue.use(Router)

function guardMyroute(to, from, next)
{ 

 const userRoles = store.state.currentUser.roles ? store.state.currentUser.roles : []
 const allowedRoles = to.meta.role

 const result = allowedRoles.some(item => userRoles.includes(item))
 
 if (result || userRoles.includes('central_admin')){
  next()
 }
 else{
  Vue.$toast.open('Not Authorized to access this page')  
 }
 
}

export default new Router({
  mode: 'history',
  routes: [
  	{
  	  path: '/admin/list_master_vendors',
  	  name: 'ListVendorMasters',
  	  component: ListVendorMasters,
  	  beforeEnter : guardMyroute,
  	  meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.centralAdmin, Roles.siteAdmin] }
  	},
  	{
  	  path: '/admin/upload_master_vendors',
  	  name: 'NewVendorMaster',
  	  component: NewVendorMaster ,
  	  beforeEnter : guardMyroute,
  	  meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.centralAdmin, Roles.siteAdmin] }
  	},
  	{
			path: '/api/v1/warehouse/liquidation/images_list',
			name: 'ImagesList',
			component: ImagesList,
			beforeEnter : guardMyroute,
			meta: { role: [ Roles.superAdmin, Roles.defaultUser, Roles.centralAdmin, Roles.siteAdmin] }
  	},
    {
      path: '/api/v1/exchange/exchange_inventory',
      name: 'ExchangeInventory',
      component: ExchangeInventory,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/api/v1/exchange/exchange_inventory_details',
      name: 'ExchangeInventoryDetails',
      component: ExchangeInventoryDetails,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/rules/new',
      name: 'NewAdminRule',
      component: NewAdminRule,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/rules/new_client',
      name: 'NewAdminClientRule',
      component: NewAdminClientRule,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/users',
      name: 'ListAdminUsers',
      component: ListAdminUsers,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/users/new',
      name: 'NewAdminUser',
      component: NewAdminUser,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/users/:id/edit',
      name: 'EditAdminUser',
      component: EditAdminUser,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/users/:id',
      name: 'ShowAdminUser',
      component: ShowAdminUser,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/channels',
      name: 'ListAdminChannels',
      component: ListAdminChannels,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/channels/:id/edit',
      name: 'EditAdminChannel',
      component: EditAdminChannel,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/channels/new',
      name: 'NewAdminChannel',
      component: NewAdminChannel,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/channels/:id',
      name: 'ShowAdminChannel',
      component: ShowAdminChannel,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },  
    {
      path: '/admin/client_sku_masters',
      name: 'ListAdminClientSkuMasters',
      component: ListAdminClientSkuMasters,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/client_sku_masters/:id/edit',
      name: 'EditAdminClientSkuMaster',
      component: EditAdminClientSkuMaster,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/client_sku_masters/new',
      name: 'NewAdminClientSkuMaster',
      component: NewAdminClientSkuMaster,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/client_sku_masters/:id',
      name: 'ShowAdminClientSkuMaster',
      component: ShowAdminClientSkuMaster,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/client_categories',
      name: 'ListAdminClientCategories',
      component: ListAdminClientCategories,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/client_categories/:id/edit',
      name: 'EditAdminClientCategory',
      component: EditAdminClientCategory,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/client_categories/new',
      name: 'NewAdminClientCategory',
      component: NewAdminClientCategory,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/client_categories/:id',
      name: 'ShowAdminClientCategory',
      component: ShowAdminClientCategory,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/categories',
      name: 'ListAdminCategories',
      component: ListAdminCategories,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/categories/:id/edit',
      name: 'EditAdminCategory',
      component: EditAdminCategory,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/categories/new',
      name: 'NewAdminCategory',
      component: NewAdminCategory,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/categories/:id',
      name: 'ShowAdminCategory',
      component: ShowAdminCategory,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/attribute_masters',
      name: 'ListAdminAttributeMasters',
      component: ListAdminAttributeMasters,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/attribute_masters/:id/edit',
      name: 'EditAdminAttributeMaster',
      component: EditAdminAttributeMaster,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/attribute_masters/new',
      name: 'NewAdminAttributeMaster',
      component: NewAdminAttributeMaster,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/attribute_masters/:id',
      name: 'ShowAdminAttributeMaster',
      component: ShowAdminAttributeMaster,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/client_attribute_masters',
      name: 'ListAdminClientAttributeMasters',
      component: ListAdminClientAttributeMasters,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/client_attribute_masters/:id/edit',
      name: 'EditAdminClientAttributeMaster',
      component: EditAdminClientAttributeMaster,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/client_attribute_masters/new',
      name: 'NewAdminClientAttributeMaster',
      component: NewAdminClientAttributeMaster,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/client_attribute_masters/:id',
      name: 'ShowAdminClientAttributeMaster',
      component: ShowAdminClientAttributeMaster,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },   
    {
      path: '/admin/distribution_centers',
      name: 'ListAdminDistributionCenters',
      component: ListAdminDistributionCenters,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },   
    {
      path: '/admin/distribution_center/new',
      name: 'NewAdminDistributionCenter',
      component: NewAdminDistributionCenter,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/distribution_center/:id/edit',
      name: 'EditAdminDistributionCenter',
      component: EditAdminDistributionCenter,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/distribution_center/:id',
      name: 'ShowAdminDistributionCenter',
      component: ShowAdminDistributionCenter,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/privacy_policy',
      name: 'PrivacyPolicy',
      component: PrivacyPolicy
    },
    {
      path: '/',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/email_verification',
      name: 'EmailVerification',
      component: EmailVerification
    },
    {
      path: '/otp_verification',
      name: 'OTPVerification',
      component: OTPVerification
    },
    {
      path: '/reset_password',
      name: 'ResetPassword',
      component: ResetPassword
    },
    {
      path: '/admin/alert_configurations',
      name: 'ListAlertConfigurations',
      component: ListAlertConfigurations,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/alert_configuration_upload',
      name: 'AlertConfigurationUpload',
      component: AlertConfigurationUpload,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/alert_configurations/:id/edit',
      name: 'EditAlertConfiguration',
      component: EditAlertConfiguration,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/alert_configurations/new',
      name: 'NewAlertConfiguration',
      component: NewAlertConfiguration,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/repair_parts',
      name: 'ListRepairParts',
      component: ListRepairParts,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/repair_parts/:id/edit',
      name: 'EditRepairPart',
      component: EditRepairPart,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/repair_parts/new',
      name: 'NewRepairPart',
      component: NewRepairPart,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },

    {
      path: '/admin/roles',
      name: 'ListAdminRoles',
      component: ListAdminRoles,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/roles/:id/edit',
      name: 'EditAdminRole',
      component: EditAdminRole,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/roles/new',
      name: 'NewAdminRole',
      component: NewAdminRole,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/roles/:id',
      name: 'ShowAdminRole',
      component: ShowAdminRole,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },

    {
      path: '/admin/lookup_keys',
      name: 'ListAdminLookupkeys',
      component: ListAdminLookupkeys,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/lookup_keys/:id/edit',
      name: 'EditAdminLookupkey',
      component: EditAdminLookupkey,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/lookup_keys/new',
      name: 'NewAdminLookupKey',
      component: NewAdminLookupKey,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/lookup_keys/:id',
      name: 'ShowAdminLookupKey',
      component: ShowAdminLookupKey,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/lookup_values',
      name: 'ListAdminLookupValues',
      component: ListAdminLookupValues,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/lookup_values/:id/edit',
      name: 'EditAdminLookupValue',
      component: EditAdminLookupValue,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/lookup_values/new',
      name: 'NewAdminLookupValue',
      component: NewAdminLookupValue,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/lookup_values/:id',
      name: 'ShowAdminLookupValue',
      component: ShowAdminLookupValue,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/clients',
      name: 'ListAdminClients',
      component: ListAdminClients,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/clients/:id/edit',
      name: 'EditAdminClient',
      component: EditAdminClient,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/clients/new',
      name: 'NewAdminClient',
      component: NewAdminClient,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/clients/:id',
      name: 'ShowAdminClient',
      component: ShowAdminClient,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/client_category_mappings/new',
      name: 'NewAdminClientCategoryMapping',
      component: NewAdminClientCategoryMapping,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/cost_values',
      name: 'ListAdminCostValues',
      component: ListAdminCostValues,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/cost_values/new',
      name: 'NewAdminCostValue',
      component: NewAdminCostValue,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/api/v1/store/returns/customer_returns',
      name: 'CustomerReturn',
      component: CustomerReturn,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.defaultUser] }
    },
    {
      path: '/store/pending_pack/pending_package',
      name: 'PendingPackage',
      component: PendingPackage,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.defaultUser] }
    },
    {
      path: '/api/v1/store/pending_pack/add_box_items',
      name: 'AddBoxItems',
      component: AddBoxItems,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.defaultUser] }
    },
    {
      path: '/api/v1/store/pending_pack/pending_dispatch',
      name: 'PendingDispatch',
      component: PendingDispatch,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.defaultUser] }
    },
    {
      path: '/api/v1/store/pending_pack/complete_dispatch',
      name: 'CompleteDispatch',
      component: CompleteDispatch,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.defaultUser] }
    },
    {
      path: '/store/service_requests/SelectInventoryList',
      name: 'SelectInventoryList',
      component: SelectInventoryList,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.defaultUser] }
    },

    {
      path: '/itemGrading',
      name: 'Package',
      component: Package,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin] }
    },
    {
      path: '/api/v1/store/executives/service_executive',
      name: 'ListServiceExecutive',
      component: ListServiceExecutive,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.defaultUser] }
    },
    {
      path: '/invoice_table/:id',
      name: 'InvoiceTable',
      component: InvoiceTable,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.defaultUser] }
    },
    {
      path: '/admin/cost_labels',
      name: 'ListAdminCostLabels',
      component: ListAdminCostLabels,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/cost_labels/new',
      name: 'NewAdminCostLabel',
      component: NewAdminCostLabel,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/cost_labels/:id/edit',
      name: 'EditAdminCostLabel',
      component: EditAdminCostLabel,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/cost_labels/:id',
      name: 'ShowAdminCostLabel',
      component: ShowAdminCostLabel,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/orders',
      name: 'ListAdminOrders',
      component: ListAdminOrders,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/orders/new',
      name: 'NewAdminOrder',
      component: NewAdminOrder,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/orders/:id/edit',
      name: 'EditAdminOrder',
      component: EditAdminOrder,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
  },
  {
      path: '/admin/orders/:id',
      name: 'ShowAdminOrder',
      component: ShowAdminOrder,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
  },
  
    {
      path: '/admin/master_file_uploads',
      name: 'ListAdminMasterFileUploads',
      component: ListAdminMasterFileUploads,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.defaultUser] }
    },
    {
      path: '/admin/master_file_uploads/new',
      name: 'NewAdminMasterFileUpload',
      component: NewAdminMasterFileUpload,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.defaultUser] }
    },
    {
      path: '/admin/customer_return_reasons',
      name: 'ListAdminCustomerReturnReasons',
      component: ListAdminCustomerReturnReasons,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/customer_return_reasons/new',
      name: 'NewAdminCustomerReturnReasons',
      component: NewAdminCustomerReturnReason,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
    },
    {
      path: '/admin/customer_return_reasons/:id/edit',
      name: 'EditAdminCustomerReturnReason',
      component: EditAdminCustomerReturnReason,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
  },
  {
      path: '/admin/customer_return_reasons/:id',
      name: 'ShowAdminCustomerReturnReason',
      component: ShowAdminCustomerReturnReason,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
  },
  {
    path: '/admin/email_templates',
    name: 'ListAdminEmailTemplates',
    component: ListAdminEmailTemplates,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
  },
  {
    path: '/admin/email_templates/new',
    name: 'NewAdminEmailTemplate',
    component: NewAdminEmailTemplate,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
  },
  {
    path: '/admin/email_templates/:id/edit',
    name: 'EditAdminEmailTemplate',
    component: EditAdminEmailTemplate,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
  },
  {
    path: '/admin/email_templates/:id',
    name: 'ShowAdminEmailTemplate',
    component: ShowAdminEmailTemplate,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
  },
  {
    path: '/admin/invoices',
    name: 'ListAdminInvoices',
    component: ListAdminInvoices,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
  },
  {
    path: '/admin/invoices/new',
    name: 'NewAdminInvoice',
    component: NewAdminInvoice,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
  },
  {
    path: '/admin/invoices/:id/edit',
    name: 'EditAdminInvoice',
    component: EditAdminInvoice,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
  },
  {
    path: '/admin/invoices/:id',
    name: 'ShowAdminInvoice',
    component: ShowAdminInvoice,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
  },
  {
    path: '/admin/reminders',
    name: 'ListAdminReminders',
    component: ListAdminReminders,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
  },
  {
    path: '/admin/reminders/new',
    name: 'NewAdminReminder',
    component: NewAdminReminder,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
  },
  {
    path: '/admin/reminder/:id/edit',
    name: 'EditAdminReminder',
    component: EditAdminReminder,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
  },
  {
    path: '/admin/reminder/:id',
    name: 'ShowAdminReminder',
    component: ShowAdminReminder,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
  },
  {
    path: '/admin/invoice_inventory_details',
    name: 'ListAdminInvoiceInventoryDetails',
    component: ListAdminInvoiceInventoryDetails,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
  },
  {
    path: '/admin/invoice_inventory_details/new',
    name: 'NewAdminInvoiceInventoryDetail',
    component: NewAdminInvoiceInventoryDetail,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
  },
  {
    path: '/admin/invoice_inventory_details/:id',
    name: 'ShowAdminInvoiceInventoryDetail',
    component: ShowAdminInvoiceInventoryDetail,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
  },
  {
    path: '/admin/invoice_inventory_details/:id/edit',
    name: 'EditAdminInvoiceInventoryDetail',
    component: EditAdminInvoiceInventoryDetail,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
  },
  {
    path: '/admin/logistics_partners',
    name: 'ListAdminLogisticsPartners',
    component: ListAdminLogisticsPartners,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
  },
  {
    path: '/admin/logistics_partners/new',
    name: 'NewAdminLogisticsPartner',
    component: NewAdminLogisticsPartner,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
  },
  {
    path: '/admin/logistics_partners/:id/edit',
    name: 'EditAdminLogisticsPartner',
    component: EditAdminLogisticsPartner,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
  },
  {
    path: '/admin/logistics_partners/:id',
    name: 'ShowAdminLogisticsPartner',
    component: ShowAdminLogisticsPartner,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
  },
  {
    path: '/admin/qc_configurations',
    name: 'ListAdminQcConfigurations',
    component: ListAdminQcConfigurations,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
  },
  {
    path: '/admin/qc_configurations/new',
    name: 'NewAdminQcConfiguration',
    component: NewAdminQcConfiguration,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
  },
  {
    path: '/admin/qc_configurations/:id/edit',
    name: 'EditAdminQcConfiguration',
    component: EditAdminQcConfiguration,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
  },
  {
    path: '/admin/qc_configurations/:id',
    name: 'ShowAdminQcConfiguration',
    component: ShowAdminQcConfiguration,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
  },
  {	
    path: '/api/v1/warehouse/pending_Return_Request_Approval',	
    name: 'pending_Return_Request_Approval',	
    component: pending_Return_Request_Approval,	
    beforeEnter : guardMyroute,	
    meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }	
  },
  {
    path: '/store/service_requests/SelectCustomerReturnReason',
    name: 'SelectCustomerReturnReason',
    component: SelectCustomerReturnReason,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser] }
  },
  {
    path: '/store/service_requests/no_grading',
    name: 'NoGradingInventory',
    component: NoGradingInventory,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser] }
  },
  {
    path: '/api/v1/store/service_requests/send_approval',
    name: 'SendAdminApproval',
    component: SendAdminApproval,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser] }
  },
  {
    path: '/api/v1/warehouse/grading/searchinventory',
    name: 'SearchInventory',
    component: SearchInventory,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin] }
  },
  {
    path: '/store/return_request',
    name: 'SearchInvoiceNumber',
    component: SearchInvoiceNumber,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser] }
  },  
  {
    path: '/store/service_requests/approvals',
    name: 'ApprovalSend',
    component: ApprovalSend,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser] }
  },
  {
    path: '/management/approveRequest',
    name: 'PendingApproval',
    component: PendingApproval,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser] }
    },

  {
    path: '/store/service_requests/pending_approvals_list',
    name: 'PendingApprovalsList',
    component: PendingApprovalsList,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser] }
  },
  {
    path: '/api/v1/warehouse/manage/manage-edit-boxes',
    name: 'ManageEditBoxes',
    component: ManageEditBoxes,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin] }
  },
  {
    path: '/api/v1/warehouse/manage/manage-edit-add-boxes',
    name: 'ManageEditAddBoxes',
    component: ManageEditAddBoxes,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin] }
  },
  {
    path: '/api/v1/warehouse/reinward',
    name: 'ReInwardInventry',
    component: ReInwardInventry,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin] }
  },
  {
    path: '/api/v1/warehouse/newinwardmanageboxes',
    name: 'NewInwardManageBoxes',
    component: NewInwardManageBoxes,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin] }
  },
  {
    path: '/api/v1/warehouse/stn-document-upload',
    name: 'StnDocumentUpload',
    component: StnDocumentUpload,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin, Roles.centralAdmin] }
  },
  {
    path: '/api/v1/manual_process/store-master-upload-list',
    name: 'StoreMasterUploadList',
    component: StoreMasterUploadList,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin, Roles.centralAdmin] }
  },
  {
    path: '/api/v1/manual_process/sku-master-upload-list',
    name: 'SkuMasterUploadList',
    component: SkuMasterUploadList,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin, Roles.centralAdmin] }
  },
  {
      path: '/api/v1/configuration_settings/sub-locations',
    	name: 'SubLocations',
    	component: SubLocations,
    	beforeEnter : guardMyroute,
    	meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin, Roles.centralAdmin] }
    },
  {
    path: '/api/v1/warehouse/sku-master-upload',
    name: 'SkuMasterUpload',
    component: SkuMasterUpload,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin, Roles.centralAdmin] }
  },
  {
    path: '/api/v1/manual_process/vendor-master-upload-list',
    name: 'VendorMasterUploadList',
    component: VendorMasterUploadList,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin, Roles.centralAdmin] }
  },
  {
    path: '/api/v1/warehouse/vendor-master-upload',
    name: 'VendorMasterUpload',
    component: VendorMasterUpload,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin, Roles.centralAdmin] }
  },
  {
    path: '/api/v1/warehouse/store-master-upload',
    name: 'StoreMasterUpload',
    component: StoreMasterUpload,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin, Roles.centralAdmin] }
  },
  {
      path: '/api/v1/configuration-settings',
      name: 'ConfigurationSettings',
      component: ConfigurationSettings,
      beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.centralAdmin] }
    },
  {
    path: '/api/v1/warehouse/stn-document-upload-list',
    name: 'StnDocumentUploadList',
    component: StnDocumentUploadList,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin, Roles.centralAdmin] }
  },
  {
    path: '/api/v1/settings',
    name: 'Settings',
    component: Settings,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin, Roles.centralAdmin] }
  },
  {
    path: '/api/v1/user-control',
    name: 'UserControl',
    component: UserControl,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin, Roles.centralAdmin] }
  },
  {
    path: '/api/v1/serialnumberedit',
    name: 'EditSerialNumber',
    component: EditSerialNumber,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin, Roles.centralAdmin] }
  },
  {
    path: '/api/v1/editItem',
    name: 'EditItem',
    component: EditItem,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin, Roles.centralAdmin] }
  },
  {
    path: '/api/v1/master_data_upload',
    name: 'MasterDataUpload',
    component: MasterDataUpload,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin, Roles.centralAdmin] }
  },
  {
    path: '/api/v1/grn_report',
    name: 'GrnReport',
    component: GrnReport,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin, Roles.centralAdmin] }
  },
  {
    path: '/api/v1/user-control/new',
    name: 'NewUser',
    component: NewUser,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin, Roles.centralAdmin] }
  },
  {
    path: '/api/v1/user-control/edit',
    name: 'EditUser',
    component: EditUser,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin, Roles.centralAdmin] }
  },
  {
    path: '/api/v1/warehouse/inwardForm',
    name: 'InwardForm',
    component: InwardForm,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin, Roles.centralAdmin] }
  },
  {
    path: '/api/v1/warehouse/inwardskunumber',
    name: 'InwardSkunumber',
    component: InwardSkunumber,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin, Roles.centralAdmin] }
  },
  {
    path: '/api/v1/warehouse/reinwardmanageboxes',
    name: 'ReInwardManageBoxes',
    component: ReInwardManageBoxes,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin] }
  },
  {
    path: '/api/v1/warehouse/inventory/pending_grading',
    name: 'PendingGrading',
    component: PendingGrading,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser] }
  },
  {
    path: '/api/v1/warehouse/inventory/rtv',
    name: 'RTV',
    component: RTV,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser] }
  },
  {
    path: '/api/v1/warehouse/inventory/restock',
    name: 'Restock',
    component: Restock,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser] }
  },
  {
    path: '/api/v1/warehouse/inventory/ewaste',
    name: 'Ewaste',
    component: Ewaste,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser] }
  },
  {
    path: '/api/v1/warehouse/inventory/liquidation',
    name: 'Liquidation',
    component: Liquidation,
    beforeEnter : guardMyroute,
    meta: { role:  [ Roles.defaultUser, Roles.siteAdmin, Roles.centralAdmin] }
  },
  {
    path: '/api/v1/warehouse/inventory/repair',
    name: 'Repair',
    component: Repair,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser] }
  },
  {
    path: '/store/service_requests/editReturnRequest/:id',
    name: 'EditReturnRequest',
    component: EditReturnRequest,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser] }
  },
  {
    path: '/store/service_requests/returnRequestInfo/:id',
    name: 'ReturnRequestInfo',
    component: ReturnRequestInfo,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.serviceExecutive, Roles.defaultUser] }
  },
  {
    path: '/api/v1/warehouse/b2b/publish_lots',
    name: 'PublishLots',
    component: PublishLots,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser] }
  },
  {
    path: '/api/v1/warehouse/b2b/manage_auctions',
    name: 'ManageAuctions',
    component: ManageAuctions,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser] }
  },
  {
    path: '/api/v1/warehouse/quality_control',
    name: 'QualityControl',
    component: QualityControl,
  },
  {
    path: '/api/v1/warehouse/quality_control_list',
    name: 'QualityControlList',
    component: QualityControlList,
  },
  {
    path: '/api/v1/warehouse/quality_control_decision',
    name: 'QualityControlDecision',
    component: QualityControlDecision,
  },
  {
    path: '/api/v1/warehouse/dashboard/markdownDashboard',
    name: 'markdownDashboard',
    component: markdownDashboard,
  },
  {
    path: '/api/v1/warehouse/dashboard/sellerDashboard',
    name: 'sellerDashboard',
    component: sellerDashboard,
  },
  {
    path: '/api/v1/warehouse/dashboard/managementDashboard',
    name: 'managementDashboard',
    component: managementDashboard,
  },
  {
    path: '/api/v1/warehouse/dashboard/operationsDashboard',
    name: 'operationsDashboard',
    component: operationsDashboard,
  },
  {
    path: '/api/v1/warehouse/stowing',
    name: 'Stowing',
    component: Stowing,
  },
  {
    path: '/api/v1/warehouse/pick',
    name: 'Pick',
    component: Pick,
  },
  {
    path: '/api/v1/warehouse/picklist',
    name: 'PickList',
    component: PickList,
  },
  {
    path: '/api/v1/warehouse/pick_list_multiple',
    name: 'PickListMultiple',
    component: PickListMultiple,
  },
  {
    path: '/api/v1/pending_pack',
    name: 'PendingPacking',
    component: PendingPacking,
    meta: { role: [Roles.superAdmin, Roles.defaultUser] }
  },
  {
    path: '/api/v1/pending_pack/list',
    name: 'PendingPackingList',
    component: PendingPackingList,
    meta: { role: [Roles.superAdmin, Roles.defaultUser] }
  },
  {
    path: '/api/v1/pending_pack/list_store_pack',
    name: 'PendingPackingListStorePack',
    component: PendingPackingListStorePack,
    meta: { role: [Roles.superAdmin, Roles.defaultUser] }
  },
  {
    path: '/api/v1/pending_pack/selection_store_pack',
    name: 'PendingPackingSelectionStorePack',
    component: PendingPackingSelectionStorePack,
    meta: { role: [Roles.superAdmin, Roles.defaultUser] }
  },
  {
    path: '/api/v1/pending_pack/rejection',
    name: 'PendingPackingRejection',
    component: PendingPackingRejection,
    meta: { role: [Roles.superAdmin, Roles.defaultUser] }
  },
  {
    path: '/api/v1/pending_pack/list_store_pack_multiple',
    name: 'PendingPackingListStorePackMultiple',
    component: PendingPackingListStorePackMultiple,
    meta: { role: [Roles.superAdmin, Roles.defaultUser] }
  },
  {
    path: '/api/v1/pending_pack/main_list',
    name: 'PendingPackingMainList',
    component: PendingPackingMainList,
    meta: { role: [Roles.superAdmin, Roles.defaultUser] }
  },
  {
    path: '/api/v1/pending_pack/store_pack',
    name: 'PendingPackingStorePack',
    component: PendingPackingStorePack,
    meta: { role: [Roles.superAdmin, Roles.defaultUser] }
  },
  {
    path: '/api/v1/warehouse/stowing-list',
    name: 'StowingList',
    component: StowingList,
  },
  {
    path: '/alert',
    name: 'Alert',
    component: Alert,
    meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
  },
  {
    path: '/api/v1/warehouse/variation-report',
    name: 'VariationReport',
    component: VariationReport,
    meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
  },
  {
    path: '/api/v1/warehouse/variation-report-list',
    name: 'VariationReportList',
    component: VariationReportList,
    meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
  },
  {
  path: '/admin/reports/variation-report-list',
  name: 'VariationReportList',
  component: VariationReportList,
  meta: { role: [Roles.superAdmin, Roles.centralAdmin, Roles.siteAdmin] }
  },
  {
    path: '/api/v1/warehouse/dispatch',
    name: 'WarehouseDispatch',
    component: WarehouseDispatch,
    beforeEnter : guardMyroute,
      meta: { role: [Roles.superAdmin, Roles.defaultUser] }
    },
    {
      path: '/api/v1/warehouse/dispatch_complete',
      name: 'WarehouseDispatchComplete',
    component: WarehouseDispatchComplete,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser] }
  },
  {
    path: '/rtv-operations',
    name: 'RTVOperations',
    component: RTVOperations
  },
  {
    path: '/rtv',
    name: 'RTVNew',
    component: RTVNew
  },
  {
  	path: '/insurance-operations',
    name: 'InsuranceOperations',
    component: InsuranceOperations
  },
  {
    path: '/api/v2/reverse/insurance',
    name: 'InsuranceOperationsNew',
    component: InsuranceOperationsNew
  },
  {
    path: '/insurance',
    name: 'Insurance',
    component: Insurance
  },
  {
    path: '/pending_issues',
    name: 'PendingIssues',
    component: PendingIssues
  },
  {
    path: '/rtv-pending-brand-approval-details',
    name: 'RTVPendingBrandApprovalDetails',
    component: RTVPendingBrandApprovalDetails
  },  
  {
    path: '/dms/orders',
    name: 'DMSOrders',
    component: DMSOrders,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.dealerUser] }
  },
  {
    path: '/dms/order_details',
    name: 'DMSOrderDetails',
    component: DMSOrderDetails,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.dealerUser] }
  },
  {
    path: '/dms/warranty',
    name: 'DMSWarranty',
    component: DMSWarranty
  },
  {
    path: '/dms/claims',
    name: 'DMSClaims',
    component: DMSClaims
  },
  {
    path: '/dms/claims_report',
    name: 'DMSClaimsReport',
    component: DMSClaimsReport
  },
  {
    path: '/dms/customer_details',
    name: 'DMSCustomerDetails',
    component: DMSCustomerDetails
  },
  {
    path: '/dms/edit_customer_detail',
    name: 'DMSEditCustomerDetail',
    component: DMSEditCustomerDetail
  },
  {
    path: '/dms/catalogue',
    name: 'DMSCatalogue',
    component: DMSCatalogue
  },
  {
    path: '/repair',
    name: 'RepairOperations',
    component: RepairOperations
  },

  {
  path: '/jobsheet',
  name: 'Jobsheet',
  component: Jobsheet
  },
  {
    path: '/pending-repair-jobsheet',
    name: 'PendingRepairJobSheet',
    component: PendingRepairJobSheet
  },
  {
    path: '/api/v1/warehouse/company_stock',
    name: 'CompanyStock',
    component: CompanyStock,
  },
  {
    path: '/pos/customerInfo',
    name: 'customerInfo',
    component: customerInfo,
  },
  {
    path: '/pos/order-placement',
    name: 'OrderPlacement',
    component: OrderPlacement,
  },
  {
    path: '/pos/order-summary',
    name: 'OrderSummary',
    component: OrderSummary,
  },
  {
    path: '/pos/master-itemlist',
    name: 'MasterItemList',
    component: MasterItemList,
  },  

  {
    path: '/pos/dashboard',
    name: 'posDashBoard',
    component: posDashBoard,
  }, 

  {
    path: '/pos/invoicesummary',
    name: 'invoiceSummary',
    component: invoiceSummary,
  },
  
  {
    path: '/pos/retail-invoice',
    name: 'retailInvoice',
    component: retailInvoice,
  },

  {
    path: '/pos/bulk-invoice',
    name: 'bulkInvoice',
    component: bulkInvoice,
  },
  {
    path: '/pos/order-placed',
    name: 'OrderPlaced',
    component: OrderPlaced,
  },
  {
    path: '/pos/grn/invoice',
    name: 'GRNInvoiceSelect',
    component: GRNInvoiceSelect
  },
  {
    path: '/pos/grn/box_inward',
    name: 'GRNBoxInward',
    component: GRNBoxInward
  },
  {
    path: '/pos/grn/item_inward',
    name: 'GRNItemInward',
    component: GRNItemInward
  },
  {
    path: '/pos/grn/item_inward_details',
    name: 'GRNItemInwardDetails',
    component: GRNItemInwardDetails
  },
  {
    path: '/pos/grn/summary',
    name: 'GRNSummary',
    component: GRNSummary
  },
  {
    path: '/pos/grn/box_summary',
    name: 'GRNBoxSummary',
    component: GRNBoxSummary
  },
  {
    path: '/pos/grn/item_summary',
    name: 'GRNItemSummary',
    component: GRNItemSummary
  },
//   {
//   	path: '/replacement',
//     name: 'Replacement',
//     component: Replacement
//  },
  {
    path: '/api/v1/warehouse/liquidation/lot_creation',
    name: 'LotCreation',
    component: LotCreation,
    beforeEnter : guardMyroute,
    meta: { role: [ Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin, Roles.centralAdmin] }
    },
{
    path: '/api/v1/warehouse/liquidation/mail_box',
    name: 'MailBox',
    component: MailBox,
    beforeEnter : guardMyroute,
    meta: { role: [ Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin, Roles.centralAdmin] }
    },

    {
    path: '/api/v1/warehouse/liquidation/lot_creation_publish',
    name: 'LotCreationPublish',
    component: LotCreationPublish,
    beforeEnter : guardMyroute,
    meta: { role: [ Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin, Roles.centralAdmin] }
    },

    {
      path: '/api/v1/warehouse/liquidation/file_upload',
      name: 'LotCreationErrors',
      component: LotCreationErrors,
      beforeEnter : guardMyroute,
      meta: { role: [ Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin, Roles.centralAdmin] }
      },
   {
      path: '/Dispatch',
      name: 'Dispatch',
      component: Dispatch 
   },
   {
    path: '/api/v2/reverse/redeploy',
    name: 'Redeploy', 
    component: Redeploy,
    beforeEnter : guardMyroute,
    meta: { role: [ Roles.defaultUser, Roles.siteAdmin, Roles.centralAdmin] }  
  },
  {
    path: '/api/v1/disposition',
    name: 'Disposition',
    component: Disposition
  },
  {
    path: '/api/v1/wms-dashboard',
    name: 'WmsDashboard',
    component: WmsDashboard
  },
  {
    path: '/api/v1/quotation',
    name: 'Quotation',
    component: Quotation
  },
  {
    path: '/api/v1/wms-chart',
    name: 'WmsChart',
    component: WmsChart
  },

  {
    path: '/api/v1/dashboards-graphs',
    name: 'WmsGraph',
    component: WmsGraph
  },

  {
    path: '/api/v1/item-info',
    name: 'ItemInfo',
    component: ItemInfo
  },
  {
    path: '/api/v1/document-number',
    name: 'DocumentNumber',
    component: DocumentNumber
  },
  {
    path: '/api/v1/inbounds/document',
    name: 'InboundDocument',
    component: InboundDocument
  },
  {
    path: '/api/v1/outbounds/document',
    name: 'OutboundDocument',
    component: OutboundDocument
  },
  {
    path: '/api/v1/inbounds/index',
    name: 'InboundDocumentIndex',
    component: InboundDocumentIndex
  },
  {
    path: '/api/v1/inbounds/documentError',
    name: 'DocumentError',
    component: DocumentError
  },
  {
    path: '/api/v1/exceptionalArticles',
    name: 'exceptionalArticles',
    component: exceptionalArticles
  },
  {
    path: '/api/v1/exceptionalArticlesFileUploadList',
    name: 'exceptionalArticlesFileUploadList',
    component: exceptionalArticlesFileUploadList
  },
  {
    path: '/api/v1/expArticlesSerialNumberFileUploadList',
    name: 'expArticlesSerialNumberFileUploadList',
    component: expArticlesSerialNumberFileUploadList
  },
  {
    path: '/api/v1/exceptionalArticlesSerialNumber',
    name: 'exceptionalArticlesSerialNumber',
    component: exceptionalArticlesSerialNumber
  },
  {
    path: '/api/v1/e-waste',
    name: 'Waste',
    component: Waste
  },
  {
    path: '/api/v1/reports',
    name: 'Report',
    component: Report
  },
  {
    path: '/api/v1/warehouse/ewaste/file_upload',
    name: 'EWasteErrors',
    component: EWasteErrors,
    beforeEnter : guardMyroute,
    meta: { role: [ Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin, Roles.centralAdmin] }
    },
  {
    path: '/alerts',
    name: 'Alerts',
    component: Alerts
  },
  {
    path: '/api/v2/reverse/pending_disposition',
    name: 'PendingDisposition',
    component: PendingDisposition
  },    
  {
    path: '/api/v1/warehouse/file_upload_list',
    name: 'FileUploadList',
    component: FileUploadList,
    beforeEnter : guardMyroute,
    meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin, Roles.centralAdmin] }
   },
  { 
    path: '/file_upload/new',
    name: 'FileUpload',
    component: FileUpload
  },
  {
    path: '/api/v1/inbounds/document',
    name: 'InboundDocument',
    component: InboundDocument
  },
 
  {
    path: '/api/v2/reverse/restock',
    name: 'RestockComp',
    component: RestockComp
  },
  {
    path: '/api/v1/warehouse/put_away',
    name: 'PutAway',
    component: PutAway
  },

  {
    path: '/api/v2/reverse/rtv',
    name: 'RTVModule',
    component: RTVModule
  },

  {
    path:'/api/v1/3p-claim',
    name:'threePClaim',
    component:threePClaim
  },

  {
    path:'/status',
    name:'approveStatus',
    component: approveStatus
  },
  {
    path:'/approve',
    name:'ApprovalRequest',
    component:ApprovalRequest
  },
  {
    path:'/reject',
    name:'RejectRequest',
    component:RejectRequest
  },
  {
    path: '/api/v2/reverse/repair',
    name: 'RepairModule',
    component: RepairModule
  },
  {
    path: '/v1/warehouse/liquidationNew',
    name: 'liquidationNew',
    component: liquidationNew
  },
  {
    path:'/v1/warehouse/liquidation',
    name:'CreateLotCompBidd',
    component: CreateLotCompBidd
  },
  {
    path: '/v1/warehouse/liquidation/assign-lot',
    name:'AssignLotToBuyer',
    component: AssignLotToBuyer
  },
  {
    path: '/api/v2/reverse/Brand-call-log',
    name: 'BrandCallLog',
    component: BrandCallLog
  },
  // Dispatch module
    {
      path: '/api/v2/reverse/dispatch',
      name: 'NewDispatch',
      component: NewDispatch,
    },
  // new replacement module
  {
  	path: '/api/v2/reverse/replacement',
    name: 'Replacement',
    component: Replacement
 },
  {
  	path: '/api/v1/issue-resolution',
  	name: 'IssueResolution',
  	component: IssueResolution,
  	beforeEnter : guardMyroute,
  	meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin, Roles.centralAdmin] }
    },
  {
  	path: '/api/v1/issue_resolution/pending-box-resolution',
  	name: 'PendingBoxResolution',
  	component: PendingBoxResolution,
  	beforeEnter : guardMyroute,
  	meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin, Roles.centralAdmin] }
  },
  {
  	path: '/api/v1/issue_resolution/pending-item-resolution',
  	name: 'PendingItemResolution',
  	component: PendingItemResolution,
  	beforeEnter : guardMyroute,
  	meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin, Roles.centralAdmin] }
  },
  {
  	path: '/api/v1/issue_resolution/rejected-boxes-and-item',
  	name: 'RejectedBoxResolution',
  	component: RejectedBoxesAndItems,
  	beforeEnter : guardMyroute,
  	meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin, Roles.centralAdmin] }
  },
  {
  	path: '/api/v1/issue_resolution/3p-claim-requests',
  	name: 'ThreePClaimRequests',
  	component: ThreePClaimRequests,
  	beforeEnter : guardMyroute,
  	meta: { role: [Roles.superAdmin, Roles.defaultUser, Roles.siteAdmin, Roles.centralAdmin] }
  },
  // dashboard
  {
    path: '/api/v2/warehouse/dashboard',
    name: 'dashboardNew',
    component: dashboardNew
  },
  {
    path: '/api/v2/warehouse/dashboard/return_generation',
    name: 'returngeneration',
    component: returngeneration
  },
  {
    path: '/api/v2/warehouse/dashboard/return_processed_vs_generated_trend',
    name: 'returnprocessedvsgeneratedtrend',
    component: returnprocessedvsgeneratedtrend
  },
  {
    path: '/api/v2/warehouse/dashboard/reverse_lifecycle_TAT',
    name: 'ReverseLifecycleTAT',
    component: ReverseLifecycleTAT
  },
  {
    path: '/api/v2/warehouse/dashboard/Return_Processed_vs_Generated',
    name: 'ReturnProcessedvsGenerated',
    component: ReturnProcessedvsGenerated
  },
  {
    path: '/api/v2/warehouse/dashboard/Per_Unit_Cost',
    name: 'PerUnitCost',
    component: PerUnitCost
  },
  {
    path: '/api/v2/warehouse/dashboard/return_generation_trend',
    name: 'returngenerationtrend',
    component: returngenerationtrend
    },
  {
    path: '/api/v2/warehouse/dashboard/master_Report_Card',
    name: 'masterReportCard',
    component: masterReportCard
  },
  {
    path: '/api/v2/warehouse/dashboard/dashboard_preview',
    name: 'nodataavalable',
    component: nodataavalable
    },
  // Return Creation
  {
    path: '/api/v1/return-creation',
    name:'RetunrCreation',
    component: RetunrCreation
  },
  {
    path:'/api/v2/return-creation/file_upload',
    name:'RCFileUpload',
    component: RCFileUpload
  },
  {
    path:'/api/v2/return-creation/sales_return_request',
    name:'SalesReturnCreation',
    component: SalesReturnCreation
  },
  {
    path:'/api/v2/return-creation/lease_return_request',
    name:'LeaseReturnRequest',
    component: LeaseReturnRequest
  },
  {
    path:'/api/v2/return-creation/internal_return_request',
    name:'InternalReturnRequest',
    component: InternalReturnRequest
  },
  {
    path:'/api/v2/return-creation/exchange_return_request',
    name:'ExchangeReturnRequest',
    component: ExchangeReturnRequest
  },
  {
    path:'/api/v2/return-creation/warenty_claim',
    name:'warentyClaim',
    component: warentyClaim
  },
  {
    path:'/api/v2/return-creation/pickupReturnRequest',
    name:'pickupReturnRequest',
    component: pickupReturnRequest
  },
  {
    path:'/api/v2/return-creation/invitepullback',
    name:'invitepullback',
    component: invitepullback
  },
  // return approval
  {
    path: '/return-approval',
    name: 'ReturnApproval',
    component: ReturnApproval 
 },
  // markdown
  {
    path: '/api/v1/markdown',
    name: 'MarkDown',
    component: MarkDown
  },
  {
    path: '/api/v1/warehouse/reverse_pickup',
    name: 'ReversePickupNew',
    component: ReversePickupNew
  },
  {
    path: '/api/v2/liquidation/create_lot',
    name: 'CreateLotsMOQ',
    component: CreateLotsMOQ
  },
  {
    path: '/api/v1/warehouse/liquidationNew/PriceGridMoq',
    name: 'PriceGridMoq',
    component: PriceGridMoq
  },
  //Salable
  {
    path: '/api/v2/forward/saleable',
    name: 'Saleable',
    component: Saleable
  },
  {
    path: '/api/v2/forward/reserve',
    name: 'ReservePage',
    component: ReservePage
  },
  // capital assets
  {
  	path: '/api/v2/forward/capital-assets',
  	name: 'CapitalAssets',
  	component: CapitalAssets
  },
  // Physical Inspection
  {
    path: '/api/v1/warehouse/physical_inspection',
    name: 'PhysicalInspection',
    component: PhysicalInspection
  },
  {
    path: '/api/v1/warehouse/physical_inspection/Approval',
    name: 'physicalinspectionApproval',
    component: physicalinspectionApproval
  },
  {
    path: '/api/v2/forward/replacement',
    name: 'ReplacementForward',
    component: ReplacementForward
  },
  {
    path: '/api/v2/forward/replacement-reserve',
    name: 'ReplacementReserve',
    component: ReplacementReserve
  },
  //transfer TransferTablePage
  {
    path: '/api/v2/forward/transfer',
    name: 'Transfer',
    component: Transfer
  },
  {
    path: '/api/v2/forward/transferTable',
    name: 'TransferTablePage',
    component: TransferTablePage
  },
  // Demo
  {
  	path: '/api/v2/forward/demo',
  	name: 'Demo',
  	component: Demo
  },
  // Rental 
  {
  	path: '/api/v2/forward/rental',
  	name: 'Rental',
  	component: Rental
  },
  {
  	path: '/api/v2/forward/rental/rentalReserve',
  	name: 'RentalReserve',
  	component: RentalReserve
  },
  {
    path:'/api/v1/cannibalization',
    name: 'Cannibalization',
    component: Cannibalization
  },
  {
    path: '/api/v2/lot-file-upload',
    name: 'LotFileuploadComm',
    component: LotFileuploadComm
  },
  {
    path: '/api/v1/prd/PRD',
    name: 'PRD',
    component: PRD
  },
  {
    path:'/api/v1/prd/IrrdDetails',
    name: 'IrrdDetails',
    component: IrrdDetails
  },
  {
    path:'/api/v2/Disposition',
    name: 'rfDisposition',
    component: rfDisposition
  },
  {
    path:'/api/v2/forward/disposition',
    name: 'forwardDisposition',
    component: forwardDisposition
  },
  {
    path:'/api/v2/reverse/disposition',
    name: 'reverseDisposition',
    component: reverseDisposition
  },
  {
  	path: '/api/v2/inward/inward_tracking',
  	name: 'inwardTracking',
  	component: inwardTracking
  },
  {
    path: '/api/v2/forward/production',
    name: 'Production',
    component: Production
  },
  
  ]
})
