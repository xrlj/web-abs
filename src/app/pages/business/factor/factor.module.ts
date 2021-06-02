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
    ]
})
export class FactorModule { }
