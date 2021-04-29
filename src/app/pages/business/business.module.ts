import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaymentBillComponent} from './common/payment-bill/payment-bill.component';
import {FinancingBillComponent} from './common/financing-bill/financing-bill.component';
import {BusinessRoutingModule} from './business-routing.module';
import {PdfJsViewerModule} from 'ng2-pdfjs-viewer';
import { SignWaitListComponent } from './common/sign-wait-list/sign-wait-list.component';
import { SignCompleteListComponent } from './common/sign-complete-list/sign-complete-list.component';
import { SignAllListComponent } from './common/sign-all-list/sign-all-list.component';

/**
 * 主业务模块
 */
@NgModule({
  declarations: [PaymentBillComponent, FinancingBillComponent, SignWaitListComponent, SignCompleteListComponent, SignAllListComponent],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    PdfJsViewerModule
  ]
})
export class BusinessModule { }
