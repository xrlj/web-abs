import {Component, OnInit, ViewChild} from '@angular/core';
import {PaymentBillSearchComponent} from './payment-bill-search.component';
import {PaymentBillListComponent} from './payment-bill-list.component';

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

  @ViewChild(PaymentBillSearchComponent)
  private searchComponent: PaymentBillSearchComponent;
  @ViewChild(PaymentBillListComponent)
  private listComponent: PaymentBillListComponent;

  constructor() {
  }

  ngOnInit(): void {
  }

  search(searchData: any): void {
    this.listComponent.search(false, searchData)
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
