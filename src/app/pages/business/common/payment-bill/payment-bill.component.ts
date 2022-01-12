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

  // 1-显示列表界面；2-显示付款单详情页面；
  showType = 1;

  constructor() {
  }

  ngOnInit(): void {
  }

  search(reset: boolean = false): void {
  }

  /**
   * 付款单详情查看
   * @param $event 所在行数据
   */
  details($event: any) {
    this.showType = 2;
  }

  showList() {
    this.showType = 1;
  }
}
