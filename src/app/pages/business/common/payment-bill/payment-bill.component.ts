import {Component, OnInit} from '@angular/core';

/**
 * 付款单管理。
 */
@Component({
  selector: 'app-payment-bill',
  templateUrl: './payment-bill.component.html',
  styleUrls: ['./payment-bill.component.less']
})
export class PaymentBillComponent implements OnInit {

  // tab
  tabIndex = 0;
  tabTitle = ['待审核', '待复核', '已复核', '全部'];

  constructor() {
  }

  ngOnInit(): void {
  }

  search(reset: boolean = false): void {
  }
}
