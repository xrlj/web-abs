import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentBillComponent } from './common/payment-bill/payment-bill.component';
import { FinancingBillComponent } from './common/financing-bill/financing-bill.component';
import {BusinessRoutingModule} from './business-routing.module';
import {PdfJsViewerModule} from 'ng2-pdfjs-viewer';
import {ComponentsModule} from '../../components/components.module';



@NgModule({
  declarations: [PaymentBillComponent, FinancingBillComponent],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    PdfJsViewerModule
  ]
})
export class BusinessModule { }
