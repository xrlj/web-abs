import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FactorRoutingModule} from './factor-routing.module';
import {ProductManageComponent} from './product-manage/product-manage.component';
import {AgreementTemplateComponent} from './agreement-template/agreement-template.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {ComponentsModule} from '../../../components/components.module';
import { FinancingPackageComponent } from './financing-package/financing-package.component';
import { FirstContractMakeComponent } from './first-contract-make/first-contract-make.component';
import { SecondContractMakeComponent } from './second-contract-make/second-contract-make.component';
import { FirstZdwRegisterComponent } from './first-zdw-register/first-zdw-register.component';
import { SecondZdwRegisterComponent } from './second-zdw-register/second-zdw-register.component';
import { PaymentWriteOffComponent } from './payment-write-off/payment-write-off.component';
import { BasicLedgerComponent } from './basic-ledger/basic-ledger.component';
import { CreditorInventoryComponent } from './creditor-inventory/creditor-inventory.component';


@NgModule({
  declarations: [ProductManageComponent, AgreementTemplateComponent, FinancingPackageComponent, FirstContractMakeComponent, SecondContractMakeComponent, FirstZdwRegisterComponent, SecondZdwRegisterComponent, PaymentWriteOffComponent, BasicLedgerComponent, CreditorInventoryComponent],
    imports: [
        CommonModule,
        FactorRoutingModule,
        PdfViewerModule,
        PdfViewerModule,
        ComponentsModule
    ]
})
export class FactorModule { }
