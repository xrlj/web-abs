import { Component, OnInit } from '@angular/core';
import {UiContractListActionType} from '../../../../helpers/enum/ui-contract-list-action-type';

// 二次转让相关协议文件生成
@Component({
  selector: 'app-second-contract-make',
  templateUrl: './second-contract-make.component.html',
  styleUrls: ['./second-contract-make.component.less']
})
export class SecondContractMakeComponent implements OnInit {

  // tab
  tabIndex = 0;
  tabTitle = ['待生成', '已生成'];

  uiContractListActionType: typeof UiContractListActionType = UiContractListActionType;

  constructor() { }

  ngOnInit(): void {
  }

  search(b: boolean = false) {
  }

}
