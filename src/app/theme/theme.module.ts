import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThemeRoutingModule} from './theme-routing.module';
import {AppAsideComponent, AppBodyComponent, AppFooterComponent, AppHeaderComponent} from './components';
import {BlankComponent, DefaultComponent} from './layouts';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {ComponentsModule} from '../components/components.module';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';

const COMPONENTS = [
  DefaultComponent,
  AppHeaderComponent,
  AppBodyComponent,
  AppAsideComponent,
  AppFooterComponent,
  BlankComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    ThemeRoutingModule,
    NzDrawerModule,
    FormsModule,
    NzButtonModule,
    NzSpinModule,
    NzMenuModule,
    NzIconModule,
    NzTabsModule,
    NzDropDownModule,
    NzBadgeModule,
    NzAvatarModule,
    NzDividerModule,
    NzRadioModule,
    NzCheckboxModule,
    ComponentsModule,
    NzSelectModule,
    NzModalModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule
  ]
})
export class ThemeModule {}
