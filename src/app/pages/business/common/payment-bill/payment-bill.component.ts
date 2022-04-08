import {Component, OnInit, ViewChild} from '@angular/core';
import {PaymentBillSearchComponent} from './payment-bill-search.component';
import {PaymentBillListComponent} from './payment-bill-list.component';
import {PaymentBillDetailsComponent} from './payment-bill-details/payment-bill-details.component';

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
  @ViewChild(PaymentBillDetailsComponent)
  private detailsComponent: PaymentBillDetailsComponent;

  searchData: any;
  listItemData: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  search(searchData: any): void {
    this.searchData = searchData;
    this.listComponent.search(true, searchData)
  }

  /**
   * 付款单详情
   * @param $event 所在行数据
   */
  detailsOperate($event: any) {
    this.listItemData = $event;
    this.showType = 2;
  }

  showList() {
    this.showType = 1;
    this.listComponent.search(false, this.searchData);
  }
}
