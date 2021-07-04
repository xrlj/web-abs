import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

// 单笔融资，融资单列表
@Component({
  selector: 'app-financing-bill-list-single',
  templateUrl: './financing-bill-list-single.component.html',
  styleUrls: ['./financing-bill-list-single.component.less']
})
export class FinancingBillListSingleComponent implements OnInit {

  // 0-审核；1-复核；2-已复核
  @Input()
  fromViewType: number;

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

  @Output() showDetails = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  search(reset: boolean = false): void {
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

  showDetailsClick() {
    this.showDetails.emit();
  }
}
