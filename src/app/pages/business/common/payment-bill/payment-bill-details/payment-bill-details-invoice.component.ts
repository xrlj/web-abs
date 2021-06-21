import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-payment-bill-details-invoice',
  templateUrl: './payment-bill-details-invoice.component.html',
  styleUrls: ['./payment-bill-details-invoice.component.less']
})
export class PaymentBillDetailsInvoiceComponent implements OnInit {

  // 表格
  listOfAllData: any[] = [1, 1, 1]; // 列表数据
  listLoading = false; // 列表加载等待指示器状态
  pageIndex = 1; // 页码
  pageSize = 50; // 每页条数

  @Input() statisticsShow = false;

  constructor() { }

  ngOnInit(): void {
  }

  search(b: boolean = false) {
  }
}
