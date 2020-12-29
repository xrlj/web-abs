import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomBtnComponent} from './custom-btn/custom-btn.component';
import {CustomLoadingComponent} from './custom-loading/custom-loading.component';
import {NzSpinModule} from 'ng-zorro-antd';
import {CustomPdfShowComponent} from './custom-pdf-show/custom-pdf-show.component';
import {PdfJsViewerModule} from 'ng2-pdfjs-viewer';

/**
 * 自定义组件模块。适用于全系统。记得exports，导出去，否则外部无法调用。
 */
@NgModule({
  declarations: [CustomBtnComponent, CustomLoadingComponent, CustomPdfShowComponent],
  imports: [
    CommonModule,
    NzSpinModule,
    PdfJsViewerModule
  ],
  exports: [
    CustomBtnComponent,
    CustomLoadingComponent,
    CustomPdfShowComponent
  ]
})
export class ComponentsModule {
}
