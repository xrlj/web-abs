import { Component, OnInit } from '@angular/core';
import {FinancingModelEnum} from '../../../../helpers/enum/financing-model-enum';
import {UIHelper} from '../../../../helpers/ui-helper';

/**
 * 融资单管理
 */
@Component({
  selector: 'app-financing-bill',
  templateUrl: './financing-bill.component.html',
  styleUrls: ['./financing-bill.component.less']
})
export class FinancingBillComponent implements OnInit {

  // tab
  tabIndex = 0;
  tabTitle = ['待审核', '待复核', '全部'];

  financingModelEnum: typeof FinancingModelEnum = FinancingModelEnum;

  // 融资模式
  financingModel: FinancingModelEnum;

  constructor(private helper: UIHelper) { }

  ngOnInit(): void {
    this.financingModel = this.helper.getFinancingMode();
  }

  search(b: boolean = false) {
  }
}
