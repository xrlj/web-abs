import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MyValidators} from '../../../../helpers/MyValidators';
import {CommonService} from '../../../../helpers/service/common.service';
import {ProductService} from '../../factor/product-manage/product.service';
import {UIHelper} from '../../../../helpers/ui-helper';
import {UserTypeEnum} from '../../../../helpers/enum/user-type-enum';
import {Subscription} from 'rxjs';
import {DefaultBusService} from '../../../../helpers/event-bus/default-bus.service';

@Component({
  selector: 'app-payment-bill-search',
  templateUrl: './payment-bill-search.component.html',
  styleUrls: ['./payment-bill-search.component.less']
})
export class PaymentBillSearchComponent implements OnInit, OnDestroy {

  // all-付款单查询；check-付款单审核；review-付款单复核；
  @Input()
  paymentBillMenuType: string;

  @Output() searchEmitter = new EventEmitter<any>();  // 查询

  userTypeEnum: typeof  UserTypeEnum = UserTypeEnum;
  etpType = this.uiHelper.getCurrentEtpType(); // 企业类型

  searchFormGroup!: FormGroup;
  isCollapse = this.etpType === this.userTypeEnum.MEMBER || this.etpType === this.userTypeEnum.SUPPLIER ? false : true;

  pbStatusDic = [];
  pbSubStatusDic = [];
  pbSupplierStatusDic = [];

  productStagingList = []; // 保理商产品列表

  pBillStatusSubscribe: Subscription;
  pBillSubStatusSubscribe: Subscription;
  pBillSupplierStatusSubscribe: Subscription;

  constructor(private fb: FormBuilder,
              private commonService: CommonService,
              private productService: ProductService,
              private uiHelper: UIHelper, private defaultBusService: DefaultBusService) {
    this.searchFormGroup = this.fb.group({
      supplierName: [null, null],
      subCompanyName: [null, null],
      paymentBillNo: [null, [MyValidators.notChinese]],
      supplierApplyStatus: [null, null],
      subCompanyApplyStatus: [null, null],
      staging: [null, null],
      contractName: [null, null],
      pytBillArea: [null, null],
      pytStatus: [null, null],
      pytType: [null, null],
    });

    this.pBillStatusSubscribe = this.defaultBusService.pBillStatus$.subscribe(pbStatus => {
      this.searchFormGroup.reset();
      this.searchFormGroup.controls.pytStatus.setValue(pbStatus);
      this.searchClick();
    });
    this.pBillSubStatusSubscribe = this.defaultBusService.pBillSubStatus$.subscribe(subStatus => {
      this.searchFormGroup.reset();
      this.searchFormGroup.controls.subCompanyApplyStatus.setValue(subStatus);
      this.searchClick();
    });
    this.pBillSupplierStatusSubscribe = this.defaultBusService.pBillSupplierStatus$.subscribe(supplierStatus => {
      this.searchFormGroup.reset();
      this.searchFormGroup.controls.supplierApplyStatus.setValue(supplierStatus);
      this.searchClick();
    });
  }

  ngOnInit(): void {
    this.initDicData();
    this.productService.getStagingListAll(this.etpType === this.userTypeEnum.FACTOR ? this.uiHelper.getCurrentEtpId() : null)
      .ok(data => {
        this.productStagingList = data;
      });
  }

  initDicData() {
    this.commonService.getDictValueListByType('payment_bill_status')
      .ok(data => {
        this.pbStatusDic = data;
      });
    this.commonService.getDictValueListByType('sub_status')
      .ok(data => {
        this.pbSubStatusDic = data;
      });
    this.commonService.getDictValueListByType('supplier_status')
      .ok(data => {
        this.pbSupplierStatusDic = data;
      });
  }

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
  }

  resetForm(): void {
    this.searchFormGroup.reset();
    this.searchClick();
  }

  getSearchData() {
    return this.searchFormGroup.value;
  }

  searchClick() {
    this.searchEmitter.emit(this.getSearchData());
  }

  ngOnDestroy(): void {
    if (this.pBillStatusSubscribe) {
      this.pBillStatusSubscribe.unsubscribe();
    }
    if (this.pBillSubStatusSubscribe) {
      this.pBillSubStatusSubscribe.unsubscribe();
    }
    if (this.pBillSupplierStatusSubscribe) {
      this.pBillSupplierStatusSubscribe.unsubscribe();
    }
  }
}
