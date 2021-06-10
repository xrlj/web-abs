import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

// 付款与核销详情-单笔融资
@Component({
  selector: 'app-payment-write-off-details-single',
  templateUrl: './payment-write-off-details-single.component.html',
  styleUrls: ['./payment-write-off-details-single.component.less']
})
export class PaymentWriteOffDetailsSingleComponent implements OnInit {

  @Output() showType = new EventEmitter<number>();
  @Input() pdtStagingName = ''; // 分期名称

  searchForm!: FormGroup;

  // 表格
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: any[] = [];
  listOfAllData: any[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // 列表数据
  mapOfCheckedId: { [key: string]: boolean } = {}; // 记录选择
  numberOfChecked = 0;
  listLoading = false; // 列表加载等待指示器状态
  pageIndex = 1; // 页码
  pageSize = 10; // 每页条数
  total = 11; // 总条数

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      paymentBillNo: [null, null],
      supplierName: [null, null]
    });
  }

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

  submitForm() {
  }

  backToList() {
    this.showType.emit(1);
  }

}
