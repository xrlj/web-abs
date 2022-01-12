import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PaymentBillComponent} from './common/payment-bill/payment-bill.component';
import {FinancingBillComponent} from './common/financing-bill/financing-bill.component';
import {SignWaitListComponent} from './common/sign-manage/sign-wait-list.component';
import {SignCompleteListComponent} from './common/sign-manage/sign-complete-list.component';
import {SignAllListComponent} from './common/sign-manage/sign-all-list.component';
import {PaymentBillCheckComponent} from './common/payment-bill/payment-bill-check.component';
import {PaymentBillReviewComponent} from './common/payment-bill/payment-bill-review.component';


const routes: Routes = [
  {
    path: 'payment-bill',
    component: PaymentBillComponent,
    data: {title: '付款单查询', isRemove: true}
  },
  {
    path: 'payment-bill-check',
    component: PaymentBillCheckComponent,
    data: {title: '付款单审核', isRemove: true}
  },
  {
    path: 'payment-bill-review',
    component: PaymentBillReviewComponent,
    data: {title: '付款单复核', isRemove: true}
  },
  {
    path: 'financing-bill',
    component: FinancingBillComponent,
    data: {title: '融资单管理', isRemove: true}
  },
  {
    path: 'sign-wait-list',
    component: SignWaitListComponent,
    data: {title: '待签章文件', isRemove: true}
  },
  {
    path: 'sign-complete-list',
    component: SignCompleteListComponent,
    data: { title: '已签章文件', isRemove: true}
  },
  {
    path: 'sign-all-list',
    component: SignAllListComponent,
    data: {title: '签章任务列表', isRemove: true}
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
