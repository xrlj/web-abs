import {Component, Input, OnInit} from '@angular/core';
import {VCustomerEtpResp} from '../../../../helpers/vo/resp/v-customer-etp-resp';

@Component({
  selector: 'app-payment-bill-list',
  templateUrl: './payment-bill-list.component.html',
  styleUrls: ['./payment-bill-list.component.less']
})
export class PaymentBillListComponent implements OnInit {

  // 0-付款单列表; 1-融资打包，待打包；2-融资打包，调整分包
  @Input()
  fromViewType: number;

  // 表格
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: any[] = [];
  listOfAllData: any[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]; // 列表数据
  mapOfCheckedId: { [key: string]: boolean } = {}; // 记录选择
  numberOfChecked = 0;
  listLoading = false; // 列表加载等待指示器状态
  pageIndex = 1; // 页码
  pageSize = 10; // 每页条数
  total = 20; // 总条数

  constructor() {
  }

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
}
