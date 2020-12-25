import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductManageComponent} from './product-manage/product-manage.component';
import {AgreementTemplateComponent} from './agreement-template/agreement-template.component';


const routes: Routes = [
  {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
  },
  {
    path: 'product-manage',
    component: ProductManageComponent,
    data: {title: '产品管理', isRemove: true}
  },
  {
    path: 'agreement-template',
    component: AgreementTemplateComponent,
    data: {title: '协议模板管理', isRemove: true}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactorRoutingModule { }
