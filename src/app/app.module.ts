import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {httpInterceptorProviders} from './interceptors';
import {IconsProviderModule} from './icons-provider.module';
import {RouteReuseStrategy, RouterModule} from '@angular/router';
import {SimpleReuseStrategy} from './helpers/simple-reuse-strategy';
import {NzMessageModule} from 'ng-zorro-antd/message';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzNotificationModule} from 'ng-zorro-antd/notification';
import {PdfJsViewerModule} from 'ng2-pdfjs-viewer';
import {ComponentsModule} from './components/components.module';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd/i18n';

registerLocaleData(zh);

@NgModule({
  declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        PdfJsViewerModule, // pdf浏览器模块
        IconsProviderModule,
        NzMessageModule,
        NzNotificationModule,
        NzModalModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NzSpinModule,
        ComponentsModule,
        RouterModule
    ],
  providers: [
    {provide: NZ_I18N, useValue: zh_CN},
    httpInterceptorProviders,
    {provide: RouteReuseStrategy, useClass: SimpleReuseStrategy},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
