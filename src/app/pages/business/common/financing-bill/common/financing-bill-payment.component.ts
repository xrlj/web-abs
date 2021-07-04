import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-financing-bill-payment',
  templateUrl: './financing-bill-payment.component.html',
  styleUrls: ['./financing-bill-payment.component.less']
})
export class FinancingBillPaymentComponent implements OnInit {

  // 表格
  listOfAllData: any[] = [1]; // 列表数据
  listLoading = false; // 列表加载等待指示器状态
  pageSize = 50; // 每页条数

  constructor() { }

  ngOnInit(): void {
  }

}
