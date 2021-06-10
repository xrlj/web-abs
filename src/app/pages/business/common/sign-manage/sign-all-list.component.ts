import {Component, OnInit} from '@angular/core';
import {SignStatusEnum} from '../../../../helpers/enum/sign-status-enum';
import {FinancingModelEnum} from '../../../../helpers/enum/financing-model-enum';
import {UIHelper} from '../../../../helpers/ui-helper';

@Component({
  selector: 'app-sign-all-list',
  templateUrl: './sign-all-list.component.html',
  styleUrls: ['./sign-all-list.component.less']
})
export class SignAllListComponent implements OnInit {

  signStatusEnum: typeof SignStatusEnum = SignStatusEnum;
  financingModelEnum: typeof FinancingModelEnum = FinancingModelEnum;

  // 融资模式
  financingModel: FinancingModelEnum;

  constructor(private helper: UIHelper) { }

  ngOnInit(): void {
    this.financingModel = this.helper.getFinancingMode();
  }

}
