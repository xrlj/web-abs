import {Component, OnInit} from '@angular/core';

/**
 * 协议模板管理。
 */
@Component({
  selector: 'app-agreement-template',
  templateUrl: './agreement-template.component.html',
  styleUrls: ['./agreement-template.component.less']
})
export class AgreementTemplateComponent implements OnInit {

  // pdfSrc = 'https://seal.hlt-factoring.com/pdf/seal/c81739fae7c24f79a33ab4509668e338.pdf';
  pdfSrc = 'assets/abc.pdf';

  constructor() { }

  ngOnInit(): void {
  }

  open() {
    window.open('#/pdf-show', '_blank', 'noopener');
  }
}
