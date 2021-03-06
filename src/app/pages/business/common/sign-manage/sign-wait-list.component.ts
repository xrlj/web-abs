import {Component, OnInit} from '@angular/core';
import {SignStatusEnum} from '../../../../helpers/enum/sign-status-enum';
import {FinancingModelEnum} from '../../../../helpers/enum/financing-model-enum';
import {UIHelper} from '../../../../helpers/ui-helper';

@Component({
  selector: 'app-sign-wait-list',
  templateUrl: './sign-wait-list.component.html',
  styleUrls: ['./sign-wait-list.component.less']
})
export class SignWaitListComponent implements OnInit {

  signStatusEnum: typeof SignStatusEnum = SignStatusEnum;
  financingModelEnum: typeof FinancingModelEnum = FinancingModelEnum;

  // 融资模式
  financingModel: FinancingModelEnum;

  constructor(private helper: UIHelper) { }

  ngOnInit(): void {
    this.financingModel = this.helper.getFinancingMode();
  }

}
