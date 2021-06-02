import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EtpManageComponent} from './etp-manage/etp-manage.component';
import {EtpAccountComponent} from './etp-account/etp-account.component';
import {CustomerRoutingModule} from './customer-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EtpAccountDetailsComponent} from './etp-account/etp-account-details/etp-account-details.component';
import {EtpDetailsComponent} from './etp-manage/etp-details/etp-details.component';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';


@NgModule({
  declarations: [EtpManageComponent, EtpAccountComponent, EtpAccountDetailsComponent, EtpDetailsComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzDividerModule,
    NzRadioModule,
    NzInputModule,
    NzCardModule,
    NzTabsModule,
    NzTableModule,
    NzModalModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule
  ]
})
export class CustomerModule { }
