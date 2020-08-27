import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserCentreComponent} from './user-centre.component';
import {UserCentreRoutingModule} from './user-centre-routing.module';
import {NzMessageModule, NzModalModule, NzNotificationModule} from 'ng-zorro-antd';

@NgModule({
  declarations: [UserCentreComponent],
  imports: [
    CommonModule,
    UserCentreRoutingModule,
    NzMessageModule,
    NzModalModule,
    NzNotificationModule
  ]
})
export class UserCentreModule { }