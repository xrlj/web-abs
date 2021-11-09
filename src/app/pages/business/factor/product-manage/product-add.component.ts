import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MyValidators} from '../../../../helpers/MyValidators';
import {ActivatedRoute} from '@angular/router';
import {DefaultBusService} from '../../../../helpers/event-bus/default-bus.service';

// 融资产品新增、编辑
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.less']
})
export class ProductAddComponent implements OnInit {

  index = 0;

  productId: string;  // 产品id

  tabIndex = 0;
  tabTitle = [{name: '基础信息', disable: false},  {name: '分期信息', disable: false}, {name: '协议模板', disable: false}, {name: '附件管理', disable: false}];

  ptBasicInfoForm: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder,
              private defaultBusService: DefaultBusService) {
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
      pbDataSource: [null, null],
      lawOffice: [null, null],
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
    this.setTabsStatus();
  }

  setTabsStatus() {
    this.tabTitle.forEach((value, index1) => {
      if (this.productId && this.productId === '0') { // 新增
        if (index1 === 0) {
          value.disable = false;
        } else {
          value.disable = true;
        }
      } else { // 编辑
        value.disable = false;
      }
    });
  }

  getContent(tabIndex: number) {
  }

  /**
   * 保存产品基础信息。
   */
  saveProductBasicInfo() {
    this.defaultBusService.showLoading(true);
    setTimeout(() => {
      this.productId = '2';
      this.setTabsStatus();
      this.defaultBusService.showLoading(false);
    }, 5000);
  }
}
