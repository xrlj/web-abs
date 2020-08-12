import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NzAvatarModule, NzBadgeModule, NzButtonModule, NzDividerModule, NzDrawerModule, NzDropDownModule, NzIconModule, NzMenuModule, NzRadioModule, NzSpinModule, NzTabsModule} from 'ng-zorro-antd';
import {ThemeRoutingModule} from './theme-routing.module';
import {AppAsideComponent, AppBodyComponent, AppFooterComponent, AppHeaderComponent} from './components';
import {BlankComponent, DefaultComponent} from './layouts';
import {FormsModule} from '@angular/forms';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';

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
    NzCheckboxModule
  ]
})
export class ThemeModule {}
