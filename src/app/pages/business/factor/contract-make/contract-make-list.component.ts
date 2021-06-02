import {Component, Input, OnInit} from '@angular/core';
import {UiContractListActionType} from '../../../../helpers/enum/ui-contract-list-action-type';

@Component({
  selector: 'app-contract-make-list',
  templateUrl: './contract-make-list.component.html',
  styleUrls: ['./contract-make-list.component.less']
})
export class ContractMakeListComponent implements OnInit {

  @Input()
  fromViewType: UiContractListActionType;

  uiContractListActionType: typeof UiContractListActionType = UiContractListActionType;

  // 表格
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: any[] = [];
  listOfAllData: any[] = [1, 1, 1]; // 列表数据
  mapOfCheckedId: { [key: string]: boolean } = {}; // 记录选择
  numberOfChecked = 0;
  listLoading = false; // 列表加载等待指示器状态
  pageIndex = 1; // 页码
  pageSize = 10; // 每页条数
  total = 3; // 总条数

  constructor() { }

  ngOnInit(): void {
  }

  search(b: boolean = false) {
  }

  refreshStatus() {
    this.isAllDisplayDataChecked = this.listOfDisplayData
      .filter(item => !item.disabled)
      .every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.listOfDisplayData.filter(item => !item.disabled).some(item => this.mapOfCheckedId[item.id]) &&
      !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.listOfAllData.filter(item => this.mapOfCheckedId[item.id]).length;
  }

  currentPageDataChange($event: any[]): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.filter(item => !item.disabled).forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }
}
