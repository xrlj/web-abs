import {Component, OnInit} from '@angular/core';
import {DefaultBusService} from '../../../../helpers/event-bus/default-bus.service';

/**
 * 付款单管理。
 */
@Component({
  selector: 'app-payment-bill',
  templateUrl: './payment-bill.component.html',
  styleUrls: ['./payment-bill.component.less']
})
export class PaymentBillComponent implements OnInit {

  // pdfUri = 'https://seal.hlt-factoring.com/pdf/seal/1629c97a641145b1a748d81288635d34.pdf';
  pdfUri = 'https://seal.hlt-factoring.com/pdf/seal/24251f0beb504cb78b4f56a78a0614a9.pdf';

  constructor(private defaultBusService: DefaultBusService) {
  }

  ngOnInit(): void {
  }

  openPdf() {
    this.defaultBusService.showPdf({url: this.pdfUri, oriName: '保理合同'});
  }
}
