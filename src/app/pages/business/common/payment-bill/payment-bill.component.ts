import {Component, OnInit, ViewChild} from '@angular/core';
import {PaymentBillSearchComponent} from './payment-bill-search.component';
import {PaymentBillListComponent} from './payment-bill-list.component';
import {PaymentBillDetailsComponent} from './payment-bill-details/payment-bill-details.component';
import {Router} from '@angular/router';
import {DefaultBusService} from '../../../../helpers/event-bus/default-bus.service';
import {PbillDetailsActionTypeEnum} from '../../../../helpers/enum/pbill-details-action-type-enum';

/**
 * 付款单管理。
 */
@Component({
  selector: 'app-payment-bill',
  templateUrl: './payment-bill.component.html',
  styleUrls: ['./payment-bill.component.less']
})
export class PaymentBillComponent implements OnInit {

  @ViewChild(PaymentBillSearchComponent)
  public searchComponent: PaymentBillSearchComponent;
  @ViewChild(PaymentBillListComponent)
  private listComponent: PaymentBillListComponent;
  @ViewChild(PaymentBillDetailsComponent)
  private detailsComponent: PaymentBillDetailsComponent;

  searchData: any;
  listItemData: any;

  constructor(private router: Router, private defaultBusService: DefaultBusService) {
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
    const pbillNo = $event.pbillNo;
    const actionType: PbillDetailsActionTypeEnum = $event.actionType;
    this.router.navigate(['pages/business/payment-bill-details', $event.id, actionType]).then(() => {
      let tabTitle = '';
      switch (actionType) {
        case PbillDetailsActionTypeEnum.LOOK:
          tabTitle = `付款单查看_${pbillNo}`
          break;
        case PbillDetailsActionTypeEnum.CHECK:
          tabTitle = `付款单审核_${pbillNo}`
          break;
        case PbillDetailsActionTypeEnum.CHECK_AGAIN:
          tabTitle = `付款单复核_${pbillNo}`
          break;
        case PbillDetailsActionTypeEnum.EDIT:
          tabTitle = `付款单编辑_${pbillNo}`
          break;
        case PbillDetailsActionTypeEnum.SUBMIT_SRC:
          tabTitle = `提交付款单资料_${pbillNo}`
          break;
      }
      this.defaultBusService.updateTabTile(tabTitle);
    })
  }
}
