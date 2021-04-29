import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { UserManageComponent } from './user-manage/user-manage.component';
import { DptManageComponent } from './dpt-manage/dpt-manage.component';
import { RoleManageComponent } from './role-manage/role-manage.component';

/**
 * 系统设置
 */
@NgModule({
  declarations: [UserManageComponent, DptManageComponent, RoleManageComponent],
  imports: [
    CommonModule,
    SettingRoutingModule
  ]
})
export class SettingModule { }
