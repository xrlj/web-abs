import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MyValidators} from '../../../../helpers/MyValidators';
import {ActivatedRoute} from '@angular/router';

// 融资产品添加编辑
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.less']
})
export class ProductAddComponent implements OnInit {

  index = 0;

  productId: string;  // 产品id

  tabIndex = 0;
  tabTitle = [];

  ptBasicInfoForm: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    this.ptBasicInfoForm = this.fb.group({
      ptName: [null, [MyValidators.required, MyValidators.maxLength(80)]],
      ptCode: [null, [MyValidators.required,MyValidators. maxLength(40)]],
      ptComment: [null, null],
      ptStatus: [null, [MyValidators.required]],
      ptType: [null, [MyValidators.required]],
      ptPeriodsNum: [null, null],
      ptFactor: [null, [MyValidators.required]],
      ptSPV: [null, null],
      ptCore: [null, null],
      ptCoreDebt: [null, null],
      ptQuota: [null, null],
      ptContractQuota: [null, null],
      ptPaymentBillQuota: [null, null],
      ptQuotaNature: [null, null],
      ptQuotaDeadline: [null, null],
      ptBuyDiscount: [null, [MyValidators.required, MyValidators.decimal]],
      ptYearRate: [null, null],
      ptCostPeriod: [null, null],
      ptSellDiscount: [null, null],
      ptIssuanceAmount: [null, null],
      ptGraceDeadline: [null, null]
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    console.log('>>>productId:', this.productId);
    if (this.productId && this.productId === '0') {
      this.tabTitle = ['基础信息'];
    } else {
      this.tabTitle = ['基础信息', '分期信息', '协议模板', '附件管理'];
    }
  }

  onIndexChange(event: number): void {
    this.index = event;
  }

  getContent(tabIndex: number) {
  }

  saveTabInfo() {

  }
}
