import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EtpInfoComponent} from './etp-info/etp-info.component';
import {EtpBankCardComponent} from './etp-bank-card/etp-bank-card.component';

const routes: Routes = [
  {
    path: 'etp-info',
    component: EtpInfoComponent,
    data: {
      title: '企业信息',
      isRemove: true
    }
  },
  {
    path: 'etp-bank-card',
    component: EtpBankCardComponent,
    data: {
      title: '银行账户管理',
      isRemove: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtpCentreRoutingModule {
}
