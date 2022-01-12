import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-bill-review',
  templateUrl: './payment-bill-review.component.html',
  styleUrls: ['./payment-bill-review.component.less']
})
export class PaymentBillReviewComponent implements OnInit {

  // 1-显示列表界面；2-显示付款单详情页面；
  showType = 1;

  constructor() { }

  ngOnInit(): void {
  }

  details($event: any) {
    this.showType = 2;
  }

  showList() {
    this.showType = 1;
  }

}
