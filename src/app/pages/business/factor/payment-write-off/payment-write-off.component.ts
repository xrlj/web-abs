import { Component, OnInit } from '@angular/core';
import {FinancingModelEnum} from '../../../../helpers/enum/financing-model-enum';
import {UIHelper} from '../../../../helpers/ui-helper';

// 付款与核销
@Component({
  selector: 'app-payment-write-off',
  templateUrl: './payment-write-off.component.html',
  styleUrls: ['./payment-write-off.component.less']
})
export class PaymentWriteOffComponent implements OnInit {

  financingModelEnum: typeof FinancingModelEnum = FinancingModelEnum;

  // 融资模式
  financingModel: FinancingModelEnum;

  constructor(private helper: UIHelper) { }

  ngOnInit(): void {
    this.financingModel = this.helper.getFinancingMode();
  }

}
