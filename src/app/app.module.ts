import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {CustomBtnComponent} from './components/custom-btn/custom-btn.component';
import {httpInterceptorProviders} from './interceptors';
import {IconsProviderModule} from './icons-provider.module';
import {RouteReuseStrategy} from '@angular/router';
import {SimpleReuseStrategy} from './helpers/simple-reuse-strategy';
import {NzMessageModule} from 'ng-zorro-antd/message';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzNotificationModule} from 'ng-zorro-antd/notification';

registerLocaleData(zh);

@NgModule({
  declarations: [AppComponent, CustomBtnComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NzMessageModule,
    NzNotificationModule,
    NzModalModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: NZ_I18N, useValue: zh_CN},
    httpInterceptorProviders,
    {provide: RouteReuseStrategy, useClass: SimpleReuseStrategy},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  exports: [
    CustomBtnComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
