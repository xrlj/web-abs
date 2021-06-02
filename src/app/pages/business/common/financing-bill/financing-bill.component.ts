import { Component, OnInit } from '@angular/core';

/**
 * 融资单管理
 */
@Component({
  selector: 'app-financing-bill',
  templateUrl: './financing-bill.component.html',
  styleUrls: ['./financing-bill.component.less']
})
export class FinancingBillComponent implements OnInit {

  // tab
  tabIndex = 0;
  tabTitle = ['待审核', '待复核', '全部'];

  constructor() { }

  ngOnInit(): void {
  }

  search(b: boolean = false) {
  }
}
