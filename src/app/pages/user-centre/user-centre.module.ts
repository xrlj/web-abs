import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserCentreComponent} from './user-centre.component';
import {UserCentreRoutingModule} from './user-centre-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QuillModule} from 'ngx-quill';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import { UserTaskImportComponent } from './user-task-import/user-task-import.component';
import { UserTaskExportComponent } from './user-task-export/user-task-export.component';
import { UserCentreBasicComponent } from './user-centre-basic/user-centre-basic.component';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzTableModule} from 'ng-zorro-antd/table';
import {DirectivesModule} from '../../directives/directives.module';

/**
 * 个人账号中心
 */
@NgModule({
  declarations: [UserCentreComponent, UserTaskImportComponent, UserTaskExportComponent, UserCentreBasicComponent],
  imports: [
    CommonModule,
    UserCentreRoutingModule,
    FormsModule,
    QuillModule,
    NzCardModule,
    NzDividerModule,
    NzIconModule,
    NzTabsModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzRadioModule,
    NzMenuModule,
    NzSelectModule,
    NzTableModule,
    DirectivesModule
  ]
})
export class UserCentreModule { }
