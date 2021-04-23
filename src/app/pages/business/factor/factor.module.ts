import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FactorRoutingModule} from './factor-routing.module';
import {ProductManageComponent} from './product-manage/product-manage.component';
import {AgreementTemplateComponent} from './agreement-template/agreement-template.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {ComponentsModule} from '../../../components/components.module';


@NgModule({
  declarations: [ProductManageComponent, AgreementTemplateComponent],
    imports: [
        CommonModule,
        FactorRoutingModule,
        PdfViewerModule,
        PdfViewerModule,
        ComponentsModule
    ]
})
export class FactorModule { }
