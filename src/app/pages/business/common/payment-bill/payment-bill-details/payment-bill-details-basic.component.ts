import {Component, Input, OnInit} from '@angular/core';

// 付款单详情-基础信息
@Component({
  selector: 'app-payment-bill-details-basic',
  templateUrl: './payment-bill-details-basic.component.html',
  styleUrls: ['./payment-bill-details-basic.component.less']
})
export class PaymentBillDetailsBasicComponent implements OnInit {

  @Input()
  pbData: any; // 付款单详情

  constructor() { }

  ngOnInit(): void {
  }

}
