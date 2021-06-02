import { Component, OnInit } from '@angular/core';
import {UiContractListActionType} from '../../../../helpers/enum/ui-contract-list-action-type';

// 第一次转让协议文件生成
@Component({
  selector: 'app-first-contract-make',
  templateUrl: './first-contract-make.component.html',
  styleUrls: ['./first-contract-make.component.less']
})
export class FirstContractMakeComponent implements OnInit {

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
