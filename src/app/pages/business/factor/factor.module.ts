import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FactorRoutingModule} from './factor-routing.module';
import {ProductManageComponent} from './product-manage/product-manage.component';
import {AgreementTemplateComponent} from './agreement-template/agreement-template.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {ComponentsModule} from '../../../components/components.module';
import {FinancingPackageComponent} from './financing-package/financing-package.component';
import {FirstContractMakeComponent} from './contract-make/first-contract-make.component';
import {SecondContractMakeComponent} from './contract-make/second-contract-make.component';
import {FirstZdwRegisterComponent} from './zdw-register/first-zdw-register.component';
import {SecondZdwRegisterComponent} from './zdw-register/second-zdw-register.component';
import {PaymentWriteOffComponent} from './payment-write-off/payment-write-off.component';
import {BasicLedgerComponent} from './basic-ledger/basic-ledger.component';
import {CreditorInventoryComponent} from './creditor-inventory/creditor-inventory.component';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzInputModule} from 'ng-zorro-antd/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {ProductAddComponent} from './product-manage/product-add.component';
import {ProductDetailsComponent} from './product-manage/product-details.component';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzDescriptionsModule} from 'ng-zorro-antd/descriptions';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {NzTransferModule} from 'ng-zorro-antd/transfer';
import {NzStepsModule} from 'ng-zorro-antd/steps';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {ProductStagingListComponent} from './product-manage/product-staging-list/product-staging-list.component';
import {ProductAgreementListComponent} from './product-manage/product-agreement-list/product-agreement-list.component';
import {ProductAnnexListComponent} from './product-manage/product-annex-list/product-annex-list.component';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {BusinessModule} from '../business.module';
import { ContractMakeListComponent } from './contract-make/contract-make-list.component';
import { ContractMakeSearchComponent } from './contract-make/contract-make-search.component';
import { FirstZdwRegisterDetailsComponent } from './zdw-register/first-zdw-register-details.component';
import { SecondZdwRegisterDetailsComponent } from './zdw-register/second-zdw-register-details.component';
import { PaymentWriteOffSingleComponent } from './payment-write-off/payment-write-off-single/payment-write-off-single.component';
import { PaymentWriteOffDetailsSingleComponent } from './payment-write-off/payment-write-off-single/payment-write-off-details-single.component';
import { BasicLedgerSingleComponent } from './basic-ledger/basic-ledger-single/basic-ledger-single.component';
import { BasicLedgerDetailsSingleComponent } from './basic-ledger/basic-ledger-single/basic-ledger-details-single.component';
import { BasicLedgerMultipleComponent } from './basic-ledger/basic-ledger-multiple/basic-ledger-multiple.component';
import { BasicLedgerDetailsMultipleComponent } from './basic-ledger/basic-ledger-multiple/basic-ledger-details-multiple.component';
import { PaymentWriteOffMultipleComponent } from './payment-write-off/payment-write-off-multiple/payment-write-off-multiple.component';
import { PaymentWriteOffDetailsMultipleComponent } from './payment-write-off/payment-write-off-multiple/payment-write-off-details-multiple.component';
import { CreditorInventorySingleComponent } from './creditor-inventory/creditor-inventory-single/creditor-inventory-single.component';
import { CreditorInventoryMultipleComponent } from './creditor-inventory/creditor-inventory-multiple/creditor-inventory-multiple.component';
import { CreditorInventoryDetailsSingleComponent } from './creditor-inventory/creditor-inventory-single/creditor-inventory-details-single.component';
import { CreditorInventoryDetailsMultipleComponent } from './creditor-inventory/creditor-inventory-multiple/creditor-inventory-details-multiple.component';
import { AgreementTemplateSearchComponent } from './agreement-template/agreement-template-search.component';
import { AgreementTemplateDetailsComponent } from './agreement-template/agreement-template-details/agreement-template-details.component';
import {DirectivesModule} from '../../../directives/directives.module';
import {PdfJsViewerModule} from 'ng2-pdfjs-viewer';
import {NzTreeModule} from 'ng-zorro-antd/tree';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzUploadModule} from 'ng-zorro-antd/upload';
import { RefactoringListComponent } from './refactoring-list/refactoring-list.component';
import {NzTagModule} from 'ng-zorro-antd/tag';


@NgModule({
  declarations: [
    ProductManageComponent,
    AgreementTemplateComponent,
    FinancingPackageComponent,
    FirstContractMakeComponent,
    SecondContractMakeComponent,
    FirstZdwRegisterComponent,
    SecondZdwRegisterComponent,
    PaymentWriteOffComponent,
    BasicLedgerComponent,
    CreditorInventoryComponent,
    ProductAddComponent,
    ProductDetailsComponent,
    ProductStagingListComponent,
    ProductAgreementListComponent,
    ProductAnnexListComponent,
    ContractMakeListComponent,
    ContractMakeSearchComponent,
    FirstZdwRegisterDetailsComponent,
    SecondZdwRegisterDetailsComponent,
    PaymentWriteOffSingleComponent,
    PaymentWriteOffDetailsSingleComponent,
    BasicLedgerSingleComponent,
    BasicLedgerDetailsSingleComponent,
    BasicLedgerMultipleComponent,
    BasicLedgerDetailsMultipleComponent,
    PaymentWriteOffMultipleComponent,
    PaymentWriteOffDetailsMultipleComponent,
    CreditorInventorySingleComponent,
    CreditorInventoryMultipleComponent,
    CreditorInventoryDetailsSingleComponent,
    CreditorInventoryDetailsMultipleComponent,
    AgreementTemplateSearchComponent,
    AgreementTemplateDetailsComponent,
    RefactoringListComponent,
  ],
    imports: [
        CommonModule,
        FactorRoutingModule,
        PdfViewerModule,
        PdfViewerModule,
        ComponentsModule,
        NzCardModule,
        NzInputModule,
        FormsModule,
        NzButtonModule,
        NzIconModule,
        NzGridModule,
        NzTableModule,
        NzDividerModule,
        NzTabsModule,
        NzDescriptionsModule,
        NzBadgeModule,
        NzCheckboxModule,
        NzRadioModule,
        NzTransferModule,
        NzStepsModule,
        ReactiveFormsModule,
        NzFormModule,
        NzSelectModule,
        NzDatePickerModule,
        NzModalModule,
        BusinessModule,
        DirectivesModule,
        PdfJsViewerModule,
        NzTreeModule,
        NzInputNumberModule,
        NzToolTipModule,
        NzUploadModule,
        NzTagModule,
    ]
})
export class FactorModule { }
