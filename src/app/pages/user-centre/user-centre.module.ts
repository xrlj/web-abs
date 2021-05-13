import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserCentreComponent} from './user-centre.component';
import {UserCentreRoutingModule} from './user-centre-routing.module';
import {FormsModule} from '@angular/forms';
import {QuillModule} from 'ngx-quill';

/**
 * 个人账号中心
 */
@NgModule({
  declarations: [UserCentreComponent],
  imports: [
    CommonModule,
    UserCentreRoutingModule,
    FormsModule,
    QuillModule
  ]
})
export class UserCentreModule { }
