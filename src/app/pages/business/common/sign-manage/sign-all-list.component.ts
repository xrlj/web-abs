import {Component, OnInit} from '@angular/core';
import {SignStatusEnum} from '../../../../helpers/enum/sign-status-enum';
import {FinancingModelEnum} from '../../../../helpers/enum/financing-model-enum';

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

  constructor() { }

  ngOnInit(): void {
    this.financingModel = FinancingModelEnum.FINANCING_SINGLE;
  }

}
