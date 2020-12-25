import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentBillComponent } from './common/payment-bill/payment-bill.component';
import { FinancingBillComponent } from './common/financing-bill/financing-bill.component';
import {BusinessRoutingModule} from './business-routing.module';



@NgModule({
  declarations: [PaymentBillComponent, FinancingBillComponent],
  imports: [
    CommonModule,
    BusinessRoutingModule
  ]
})
export class BusinessModule { }
