import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SettingRoutingModule} from './setting-routing.module';
import {UserManageComponent} from './user-manage/user-manage.component';
import {DptManageComponent} from './dpt-manage/dpt-manage.component';
import {RoleManageComponent} from './role-manage/role-manage.component';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzInputModule} from 'ng-zorro-antd/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {NzTreeSelectModule} from 'ng-zorro-antd/tree-select';
import {NzTreeModule} from 'ng-zorro-antd/tree';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzTagModule} from 'ng-zorro-antd/tag';

/**
 * 系统设置
 */
@NgModule({
  declarations: [UserManageComponent, DptManageComponent, RoleManageComponent],
    imports: [
        CommonModule,
        SettingRoutingModule,
        NzCardModule,
        NzButtonModule,
        NzInputModule,
        FormsModule,
        NzTableModule,
        NzDividerModule,
        NzModalModule,
        ReactiveFormsModule,
        NzFormModule,
        NzCheckboxModule,
        NzRadioModule,
        NzIconModule,
        NzInputNumberModule,
        NzTreeSelectModule,
        NzTreeModule,
        NzSelectModule,
        NzTagModule
    ]
})
export class SettingModule { }
