import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserCentreComponent} from './user-centre.component';
import {UserTaskImportComponent} from './user-task-import/user-task-import.component';
import {UserTaskExportComponent} from './user-task-export/user-task-export.component';

const routes: Routes = [
  {
    path: '',
    component: UserCentreComponent,
    data: {title: '个人中心', isRemove: true}
  },
  {
    path: 'user-task-import',
    component: UserTaskImportComponent,
    data: {title: '我的导入', isRemove: true}
  },
  {
    path: 'user-task-export',
    component: UserTaskExportComponent,
    data: {title: '我的导出', isRemove: true}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCentreRoutingModule { }
