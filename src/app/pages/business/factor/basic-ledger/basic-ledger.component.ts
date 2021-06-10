import {Component, OnInit} from '@angular/core';
import {FinancingModelEnum} from '../../../../helpers/enum/financing-model-enum';
import {UIHelper} from '../../../../helpers/ui-helper';

// 基础台账
@Component({
  selector: 'app-basic-ledger',
  templateUrl: './basic-ledger.component.html',
  styleUrls: ['./basic-ledger.component.less']
})
export class BasicLedgerComponent implements OnInit {

  financingModelEnum: typeof FinancingModelEnum = FinancingModelEnum;

  // 融资模式
  financingModel: FinancingModelEnum;

  constructor(private helper: UIHelper) { }

  ngOnInit(): void {
    this.financingModel = this.helper.getFinancingMode();
  }

}
