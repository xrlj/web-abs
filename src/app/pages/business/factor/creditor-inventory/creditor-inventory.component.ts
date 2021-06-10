import { Component, OnInit } from '@angular/core';
import {UIHelper} from '../../../../helpers/ui-helper';
import {FinancingModelEnum} from '../../../../helpers/enum/financing-model-enum';

// 合格应收款债权清单列表
@Component({
  selector: 'app-creditor-inventory',
  templateUrl: './creditor-inventory.component.html',
  styleUrls: ['./creditor-inventory.component.less']
})
export class CreditorInventoryComponent implements OnInit {

  financingModelEnum: typeof FinancingModelEnum = FinancingModelEnum;

  // 融资模式
  financingModel: FinancingModelEnum;

  constructor(private helper: UIHelper) { }

  ngOnInit(): void {
    this.financingModel = this.helper.getFinancingMode();
  }

}
