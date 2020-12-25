import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactorRoutingModule } from './factor-routing.module';
import { ProductManageComponent } from './product-manage/product-manage.component';
import { AgreementTemplateComponent } from './agreement-template/agreement-template.component';


@NgModule({
  declarations: [ProductManageComponent, AgreementTemplateComponent],
  imports: [
    CommonModule,
    FactorRoutingModule
  ]
})
export class FactorModule { }
