import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaymentBillComponent} from './common/payment-bill/payment-bill.component';
import {FinancingBillComponent} from './common/financing-bill/financing-bill.component';
import {BusinessRoutingModule} from './business-routing.module';
import {SignWaitListComponent} from './common/sign-manage/sign-wait-list.component';
import {SignCompleteListComponent} from './common/sign-manage/sign-complete-list.component';
import {SignAllListComponent} from './common/sign-manage/sign-all-list.component';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {PaymentBillSearchComponent} from './common/payment-bill/payment-bill-search.component';
import {PaymentBillListComponent} from './common/payment-bill/payment-bill-list.component';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {FinancingBillListSingleComponent} from './common/financing-bill/financing-bill-single/financing-bill-list-single.component';
import {FinancingBillListMultipleComponent} from './common/financing-bill/financing-bill-multiple/financing-bill-list-multiple.component';
import {FinancingBillListSearchMultipleComponent} from './common/financing-bill/financing-bill-multiple/financing-bill-list-search-multiple.component';
import {FinancingBillListSearchSingleComponent} from './common/financing-bill/financing-bill-single/financing-bill-list-search-single.component';
import {SignListSingleComponent} from './common/sign-manage/sign-single/sign-list-single.component';
import {SignListSearchSingleComponent} from './common/sign-manage/sign-single/sign-list-search-single.component';
import {SignListMultipleComponent} from './common/sign-manage/sign-multiple/sign-list-multiple.component';
import {SignListSearchMultipleComponent} from './common/sign-manage/sign-multiple/sign-list-search-multiple.component';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {PaymentBillDetailsComponent} from './common/payment-bill/payment-bill-details/payment-bill-details.component';
import {PaymentBillDetailsBasicComponent} from './common/payment-bill/payment-bill-details/payment-bill-details-basic.component';
import {PaymentBillDetailsInvoiceComponent} from './common/payment-bill/payment-bill-details/payment-bill-details-invoice.component';
import {PaymentBillDetailsAnnexSubComponent} from './common/payment-bill/payment-bill-details/payment-bill-details-annex-sub.component';
import {PaymentBillDetailsAnnexSupplierComponent} from './common/payment-bill/payment-bill-details/payment-bill-details-annex-supplier.component';
import {PaymentBillDetailsAnnexFactorComponent} from './common/payment-bill/payment-bill-details/payment-bill-details-annex-factor.component';
import {PaymentBillDetailsSupplementComponent} from './common/payment-bill/payment-bill-details/payment-bill-details-supplement.component';
import {ComponentsModule} from '../../components/components.module';
import {NzDescriptionsModule} from 'ng-zorro-antd/descriptions';
import {DirectivesModule} from '../../directives/directives.module';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {PaymentBillDetailsZdComponent} from './common/payment-bill/payment-bill-details/payment-bill-details-zd.component';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {CoreOperateLogComponent} from './common/core-operate-log/core-operate-log.component';
import {FinancingBillSingleDetailsComponent} from './common/financing-bill/financing-bill-single/financing-bill-single-details/financing-bill-single-details.component';
import { FinancingBillContractOneComponent } from './common/financing-bill/common/financing-bill-contract-one.component';
import { FinancingBillContractTwoComponent } from './common/financing-bill/common/financing-bill-contract-two.component';
import { FinancingBillPaymentComponent } from './common/financing-bill/common/financing-bill-payment.component';
import { PaymentBillCheckComponent } from './common/payment-bill/payment-bill-check.component';
import { PaymentBillReviewComponent } from './common/payment-bill/payment-bill-review.component';
import {NzUploadModule} from 'ng-zorro-antd/upload';

/**
 * 主业务模块
 */
@NgModule({
  declarations: [
    PaymentBillComponent,
    FinancingBillComponent,
    SignWaitListComponent,
    SignCompleteListComponent,
    SignAllListComponent,
    PaymentBillSearchComponent,
    PaymentBillListComponent,
    FinancingBillListSingleComponent,
    FinancingBillListMultipleComponent,
    FinancingBillListSearchMultipleComponent,
    FinancingBillListSearchSingleComponent,
    SignListSingleComponent,
    SignListSearchSingleComponent,
    SignListMultipleComponent,
    SignListSearchMultipleComponent,
    PaymentBillDetailsComponent,
    PaymentBillDetailsBasicComponent,
    PaymentBillDetailsInvoiceComponent,
    PaymentBillDetailsAnnexSubComponent,
    PaymentBillDetailsAnnexSupplierComponent,
    PaymentBillDetailsAnnexFactorComponent,
    PaymentBillDetailsSupplementComponent,
    PaymentBillListComponent,
    PaymentBillDetailsZdComponent,
    CoreOperateLogComponent,
    FinancingBillSingleDetailsComponent,
    FinancingBillContractOneComponent,
    FinancingBillContractTwoComponent,
    FinancingBillPaymentComponent,
    PaymentBillCheckComponent,
    PaymentBillReviewComponent
  ],
  exports: [
    PaymentBillSearchComponent,
    PaymentBillListComponent
  ],
    imports: [
        CommonModule,
        BusinessRoutingModule,
        NzCardModule,
        NzTabsModule,
        ReactiveFormsModule,
        NzFormModule,
        NzInputModule,
        NzButtonModule,
        NzIconModule,
        NzSelectModule,
        NzTableModule,
        NzDividerModule,
        FormsModule,
        NzDatePickerModule,
        ComponentsModule,
        NzDescriptionsModule,
        DirectivesModule,
        NzModalModule,
        NzCheckboxModule,
        NzRadioModule,
        NzUploadModule
    ]
})
export class BusinessModule { }
