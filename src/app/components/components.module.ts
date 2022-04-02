import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomBtnComponent} from './custom-btn/custom-btn.component';
import {CustomLoadingComponent} from './custom-loading/custom-loading.component';
import {CustomPdfShowComponent} from './custom-pdf-show/custom-pdf-show.component';
import {PdfJsViewerModule} from 'ng2-pdfjs-viewer';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {PdfShowComponent} from './pdf-show/pdf-show.component';
import {RouterModule} from '@angular/router';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzSliderModule} from 'ng-zorro-antd/slider';
import {FormsModule} from '@angular/forms';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzInputModule} from 'ng-zorro-antd/input';
import {CustomTitleComponent} from './custom-title/custom-title.component';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {DirectivesModule} from '../directives/directives.module';
import {HtmlPipe} from '../helpers/pipe/html-pipe';

/**
 * 自定义组件模块。适用于全系统。记得exports，导出去，否则外部无法调用。
 */
@NgModule({
  declarations: [
    CustomBtnComponent,
    CustomLoadingComponent,
    CustomPdfShowComponent,
    PdfShowComponent,
    CustomTitleComponent,
    HtmlPipe
  ],
  imports: [
    CommonModule,
    NzSpinModule,
    PdfJsViewerModule,
    RouterModule,
    NzSliderModule,
    NzButtonModule,
    FormsModule,
    PdfViewerModule,
    NzIconModule,
    NzInputModule,
    NzDividerModule,
    DirectivesModule,
  ],
  exports: [
    CustomBtnComponent,
    CustomLoadingComponent,
    CustomPdfShowComponent,
    PdfShowComponent,
    CustomTitleComponent
  ]
})
export class ComponentsModule {
}
