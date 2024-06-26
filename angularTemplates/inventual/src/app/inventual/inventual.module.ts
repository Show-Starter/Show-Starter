import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './dashboard/header/header.component';
import { MenuComponent } from './dashboard/menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { QuickviewComponent } from './dashboard/quickview/quickview.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { LinechartComponent } from './dashboard/charts/linechart/linechart.component';
import { BarchartComponent } from './dashboard/charts/barchart/barchart.component';
import { SupplierComponent } from './dashboard/supplier/supplier.component';
import { TopsellerComponent } from './dashboard/topseller/topseller.component';
import { TransactionComponent } from './dashboard/transaction/transaction.component'; 
import { PiechartComponent } from './dashboard/charts/piechart/piechart.component';
import { UserComponent } from './dashboard/user/user.component';
import { CopyrightComponent } from './dashboard/copyright/copyright.component';
import { PossaleComponent } from './trading/sale/possale/possale.component';
import { NewsaleComponent } from './trading/sale/newsale/newsale.component';
import { ManagesaleComponent } from './trading/sale/managesale/managesale.component';
import { OrderdiscountComponent } from './trading/sale/popup/orderdiscount/orderdiscount.component';
import { QuickaddcustomerComponent } from './trading/sale/popup/quickaddcustomer/quickaddcustomer.component';
import { MakepaymentComponent } from './trading/sale/popup/makepayment/makepayment.component';
import { PaginationComponent } from './trading/pagination/pagination.component';
import { AddpaymentComponent } from './trading/sale/popup/addpayment/addpayment.component';
import { ViewpaymentComponent } from './trading/sale/popup/viewpayment/viewpayment.component';
import { InvoiceComponent } from './trading/sale/popup/invoice/invoice.component';
import { SalereturnsComponent } from './trading/sale/salereturns/salereturns.component';
import { AddpurchaseComponent } from './trading/purchase/addpurchase/addpurchase.component';
import { CountdownModule } from 'ngx-countdown';
import { ManagepurchaseComponent } from './trading/purchase/managepurchase/managepurchase.component';
import { PurchasereturnsComponent } from './trading/purchase/purchasereturns/purchasereturns.component';
import { SaleinvoiceComponent } from './trading/invoice/saleinvoice/saleinvoice.component';
import { SalesinvoiceComponent } from './trading/invoice/salesinvoice/salesinvoice.component';
import { PurchaseinvoiceComponent } from './trading/invoice/purchaseinvoice/purchaseinvoice.component';
import { ProductlistComponent } from './products/productlist/productlist.component';
import { AddbrandComponent } from './products/addbrand/addbrand.component';
import { AdjustmentComponent } from './products/adjustment/adjustment.component';
import { AddadjustmentComponent } from './products/addadjustment/addadjustment.component';
import { UnitComponent } from './products/unit/unit.component';
import { AddproductComponent } from './products/addproduct/addproduct.component';
import { GeneratebarcodeComponent } from './products/generatebarcode/generatebarcode.component';
import { AddsuplierComponent } from './supplier/addsuplier/addsuplier.component';
import { AddcustomerComponent } from './supplier/addcustomer/addcustomer.component';
import { AddbillerComponent } from './supplier/addbiller/addbiller.component';
import { SupplierlistComponent } from './supplier/supplierlist/supplierlist.component';
import { CustomerlistComponent } from './supplier/customerlist/customerlist.component';
import { BillerlistComponent } from './supplier/billerlist/billerlist.component';
import { AddexpenseComponent } from './expense/addexpense/addexpense.component';
import { CreatepaymentComponent } from './expense/createpayment/createpayment.component';
import { CategoryComponent } from './expense/category/category.component';
import { ExpenselistComponent } from './expense/expenselist/expenselist.component';
import { AdduserComponent } from './usermanagement/adduser/adduser.component';
import { CreateroleComponent } from './usermanagement/createrole/createrole.component';
import { UserlistComponent } from './usermanagement/userlist/userlist.component';

import { AddwarehouseComponent } from './trading/sale/popup/addwarehouse/addwarehouse.component';
import { ProductreportComponent } from './report/productreport/productreport.component';
import { StockreportComponent } from './report/stockreport/stockreport.component';
import { PaymentreportComponent } from './report/paymentreport/paymentreport.component';
import { SalereportComponent } from './report/salereport/salereport.component';
import { PurchasereportComponent } from './report/purchasereport/purchasereport.component';
import { ExpensereportComponent } from './report/expensereport/expensereport.component';
import { DiscountreportComponent } from './report/discountreport/discountreport.component';
import { TaxreportComponent } from './report/taxreport/taxreport.component';
import { SupplierreportComponent } from './report/supplierreport/supplierreport.component';
import { ShippingchargereportComponent } from './report/shippingchargereport/shippingchargereport.component';
import { ProductcategoryComponent } from './products/productcategory/productcategory.component';
import { AdjustmentlistComponent } from './trading/sale/popup/adjustmentlist/adjustmentlist.component';
import { RolepermissionComponent } from './settings/rolepermission/rolepermission.component';
import { PurchaselistinvoiveComponent } from './trading/invoice/purchaselistinvoive/purchaselistinvoive.component';
import { ExpenselistinvoiceComponent } from './trading/invoice/expenselistinvoice/expenselistinvoice.component';
import { ExpenseinvoiceComponent } from './trading/invoice/expenseinvoice/expenseinvoice.component';
import { RolerowtwoComponent } from './settings/rolerowtwo/rolerowtwo.component';
import { RolerowthreeComponent } from './settings/rolerowthree/rolerowthree.component';
import { RolerowfourComponent } from './settings/rolerowfour/rolerowfour.component';
import { RolerowfiveComponent } from './settings/rolerowfive/rolerowfive.component';
import { RolerowsixComponent } from './settings/rolerowsix/rolerowsix.component';
import { RolerowsevenComponent } from './settings/rolerowseven/rolerowseven.component';
import { OrderdiscounttwoComponent } from './trading/sale/popup/orderdiscounttwo/orderdiscounttwo.component';
import { LoginComponent } from './common/login/login.component';
import { RegisterComponent } from './common/register/register.component';
import { ForgotpasswordComponent } from './common/forgotpassword/forgotpassword.component';
import { ProfileComponent } from './common/profile/profile.component';
import { EditprofileComponent } from './trading/sale/popup/editprofile/editprofile.component';
import { MessageComponent } from './common/message/message.component';
import { MessageinboxComponent } from './common/messageinbox/messageinbox.component';
import { MessagesentComponent } from './common/messagesent/messagesent.component';
import { MessagedraftComponent } from './common/messagedraft/messagedraft.component';
import { MessagetrashComponent } from './common/messagetrash/messagetrash.component';
import { NewmessageComponent } from './common/newmessage/newmessage.component';
import { AddtransferComponent } from './transfer/addtransfer/addtransfer.component';
import { TransferlistComponent } from './transfer/transferlist/transferlist.component';
import { HttpClientModule } from '@angular/common/http';
import { SublevelMenuComponent } from './dashboard/menu/sublevel-menu.component';
import { UserreportComponent } from './report/userreport/userreport.component';
import { CustomerreportComponent } from './report/customerreport/customerreport.component';
import { WarehousereportComponent } from './report/warehousereport/warehousereport.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { EventlistComponent } from './events/eventlist/eventlist.component';
import { InvoicelistComponent } from './invoices/invoicelist/invoicelist.component';
import { ItemlistComponent } from './products/itemlist/itemlist.component';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { ItemlistpageComponent } from './products/itemlistpage/itemlistpage.component';
import { AddProductDialogComponent } from './events/add-product-dialog/add-product-dialog.component';
import { CustomMessageDialogComponent } from './custom-message-dialog/custom-message-dialog.component';
import { EditEventComponent } from './events/edit-event/edit-event.component';
import { EditInvoiceComponent } from './invoices/edit-invoice/edit-invoice.component';
import { CreateInvoiceComponent } from './invoices/create-invoice/create-invoice.component';
import { FindEventDialogComponent } from './invoices/find-event-dialog/find-event-dialog.component';





@NgModule({ 
  imports: [
    CommonModule,
    RouterModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatRadioModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatNativeDateModule,
    MatRippleModule,
    MatSortModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatExpansionModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatListModule,
    NgApexchartsModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    CountdownModule,
    HttpClientModule,
  ],
  declarations: [
    HeaderComponent,
    MenuComponent,
    DashboardComponent,
    QuickviewComponent,
    LinechartComponent,
    BarchartComponent,
    SupplierComponent,
    TopsellerComponent,
    TransactionComponent,
    PiechartComponent,
    UserComponent,
    CopyrightComponent,
    PossaleComponent,
    NewsaleComponent,
    ManagesaleComponent,
    OrderdiscountComponent,
    QuickaddcustomerComponent,
    EventlistComponent,
    MakepaymentComponent,
    PaginationComponent,
    AddpaymentComponent,
    ViewpaymentComponent,
    InvoiceComponent,
    SalereturnsComponent,
    AddpurchaseComponent,
    ManagepurchaseComponent,
    PurchasereturnsComponent,
    SaleinvoiceComponent,
    SalesinvoiceComponent,
    PurchaseinvoiceComponent,
    ProductlistComponent,
    AddbrandComponent,
    AdjustmentComponent,
    AddadjustmentComponent,
    UnitComponent,
    AddproductComponent,
    GeneratebarcodeComponent,
    AddsuplierComponent,
    AddcustomerComponent,
    AddbillerComponent,
    SupplierlistComponent,
    CustomerlistComponent,
    BillerlistComponent,
    AddexpenseComponent,
    CreatepaymentComponent,
    CategoryComponent,
    ExpenselistComponent,
    AdduserComponent,
    CreateroleComponent,
    UserlistComponent,
    
    AddwarehouseComponent,
    ProductreportComponent,
    StockreportComponent,
    PaymentreportComponent,
    SalereportComponent,
    PurchasereportComponent,
    ExpensereportComponent,
    DiscountreportComponent,
    TaxreportComponent,
    SupplierreportComponent,
    ShippingchargereportComponent,
    ProductcategoryComponent,
    AdjustmentlistComponent,
    RolepermissionComponent,
    PurchaselistinvoiveComponent,
    ExpenselistinvoiceComponent,
    ExpenseinvoiceComponent,
    RolerowtwoComponent,
    RolerowthreeComponent,
    RolerowfourComponent,
    RolerowfiveComponent,
    RolerowsixComponent,
    RolerowsevenComponent,
    OrderdiscounttwoComponent,
    LoginComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    ProfileComponent,
    EditprofileComponent,
    MessageComponent,
    MessageinboxComponent,
    MessagesentComponent,
    MessagedraftComponent,
    MessagetrashComponent,
    NewmessageComponent,
    AddtransferComponent,
    TransferlistComponent,
    SublevelMenuComponent,
    UserreportComponent,
    CustomerreportComponent,
    WarehousereportComponent,
    EditProductComponent,
    EventlistComponent,
    InvoicelistComponent,
    ItemlistComponent,
    CreateEventComponent,
    ItemlistpageComponent,
    AddProductDialogComponent,
    CustomMessageDialogComponent,
    EditEventComponent,
    EditInvoiceComponent,
    CreateInvoiceComponent,
    FindEventDialogComponent
  ]
})
export class InventualModule { }
