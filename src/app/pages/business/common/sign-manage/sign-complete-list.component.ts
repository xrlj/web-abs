import {Component, OnInit} from '@angular/core';
import {SignStatusEnum} from '../../../../helpers/enum/sign-status-enum';
import {FinancingModelEnum} from '../../../../helpers/enum/financing-model-enum';
import {UIHelper} from '../../../../helpers/ui-helper';

@Component({
  selector: 'app-sign-complete-list',
  templateUrl: './sign-complete-list.component.html',
  styleUrls: ['./sign-complete-list.component.less']
})
export class SignCompleteListComponent implements OnInit {

  signStatusEnum: typeof SignStatusEnum = SignStatusEnum;
  financingModelEnum: typeof FinancingModelEnum = FinancingModelEnum;

  // 融资模式
  financingModel: FinancingModelEnum;

  constructor(private helper: UIHelper) { }

  ngOnInit(): void {
    this.financingModel = this.helper.getFinancingMode();
  }

}
