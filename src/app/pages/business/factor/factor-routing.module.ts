import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductManageComponent} from './product-manage/product-manage.component';
import {AgreementTemplateComponent} from './agreement-template/agreement-template.component';
import {BasicLedgerComponent} from './basic-ledger/basic-ledger.component';
import {CreditorInventoryComponent} from './creditor-inventory/creditor-inventory.component';
import {FinancingPackageComponent} from './financing-package/financing-package.component';
import {FirstContractMakeComponent} from './contract-make/first-contract-make.component';
import {SecondContractMakeComponent} from './contract-make/second-contract-make.component';
import {FirstZdwRegisterComponent} from './zdw-register/first-zdw-register.component';
import {SecondZdwRegisterComponent} from './zdw-register/second-zdw-register.component';
import {PaymentWriteOffComponent} from './payment-write-off/payment-write-off.component';
import {ProductAddComponent} from './product-manage/product-add.component';


const routes: Routes = [
  {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
  },
  {
    path: 'product-manage',
    component: ProductManageComponent,
    data: {title: '产品列表', isRemove: true}
  },
  {
    path: 'product-add/:id',
    component: ProductAddComponent,
    data: {title: '产品维护', isRemove: true}
  },
  {
    path: 'agreement-template',
    component: AgreementTemplateComponent,
    data: {title: '协议模板管理', isRemove: true}
  },
  {
    path: 'basic-ledger',
    component: BasicLedgerComponent,
    data: {title: '基础资产台账', isRemove: true}
  },
  {
    path: 'creditor-inventory',
    component: CreditorInventoryComponent,
    data: {title: '合格债权清单', isRemove: true}
  },
  {
    path: 'financing-package',
    component: FinancingPackageComponent,
    data: {title: '融资打包', isRemove: true}
  },
  {
    path: 'first-contract-make',
    component: FirstContractMakeComponent,
    data: {title: '第一次合同生成', isRemove: true}
  },
  {
    path: 'second-contract-make',
    component: SecondContractMakeComponent,
    data: {title: '第二次合同生成', isRemove: true}
  },
  {
    path: 'first-zdw-register',
    component: FirstZdwRegisterComponent,
    data: {title: '第一次中登网登记', isRemove: true}
  },
  {
    path: 'second-zdw-register',
    component: SecondZdwRegisterComponent,
    data: {title: '第二次中登网登记', isRemove: true}
  },
  {
    path: 'payment-write-off',
    component: PaymentWriteOffComponent,
    data: {title: '付款与核销', isRemove: true}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactorRoutingModule { }
