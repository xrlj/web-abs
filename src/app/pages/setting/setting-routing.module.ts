import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserManageComponent} from './user-manage/user-manage.component';
import {RoleManageComponent} from './role-manage/role-manage.component';
import {DptManageComponent} from './dpt-manage/dpt-manage.component';

const routes: Routes = [
  {
    path: 'user-manage',
    component: UserManageComponent,
    data: {
      title: '子账号管理',
      isRemove: true
    }
  },
  {
    path: 'role-manage',
    component: RoleManageComponent,
    data: {
      title: '角色管理',
      isRemove: true
    }
  },
  {
    path: 'dpt-manage',
    component: DptManageComponent,
    data: {
      title: '部门管理',
      isRemove: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
