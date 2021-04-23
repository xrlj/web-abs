import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PaymentBillComponent} from './common/payment-bill/payment-bill.component';
import {FinancingBillComponent} from './common/financing-bill/financing-bill.component';


const routes: Routes = [
  {
    path: 'payment-bill',
    component: PaymentBillComponent,
    data: {title: '付款单管理', isRemove: true}
  },
  {
    path: 'financing-bill',
    component: FinancingBillComponent,
    data: {title: '融资单管理', isRemove: true}
  },
  {
    path: 'factor',
    loadChildren: () => import('./factor/factor.module').then(m => m.FactorModule)
  },
  {
    path: 'core',
    loadChildren: () => import('./core/core.module').then(m => m.CoreModule)
  },
  {
    path: 'member',
    loadChildren: () => import('./member/member.module').then(m => m.MemberModule)
  },
  {
    path: 'supplier',
    loadChildren: () => import('./supplier/supplier.module').then(m => m.SupplierModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
