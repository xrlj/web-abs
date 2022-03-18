import {Component, OnInit, ViewChild} from '@angular/core';
import {PaymentBillSearchComponent} from './payment-bill-search.component';
import {PaymentBillListComponent} from './payment-bill-list.component';

@Component({
  selector: 'app-payment-bill-check',
  templateUrl: './payment-bill-check.component.html',
  styleUrls: ['./payment-bill-check.component.less']
})
export class PaymentBillCheckComponent implements OnInit {

  // 1-显示列表界面；2-显示付款单详情页面；
  showType = 1;

  @ViewChild(PaymentBillSearchComponent)
  private searchComponent: PaymentBillSearchComponent;
  @ViewChild(PaymentBillListComponent)
  private listComponent: PaymentBillListComponent;

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
