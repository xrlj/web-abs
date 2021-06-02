import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MyValidators} from '../../../../helpers/MyValidators';

@Component({
  selector: 'app-payment-bill-search',
  templateUrl: './payment-bill-search.component.html',
  styleUrls: ['./payment-bill-search.component.less']
})
export class PaymentBillSearchComponent implements OnInit {

  searchFormGroup!: FormGroup;
  isCollapse = true
  rowItem = 4; // 24 / 6 = 4 四列

  constructor(private fb: FormBuilder) {
    this.searchFormGroup = this.fb.group({
      supplierName: [null, null],
      subCompanyName: [null, null],
      paymentBillNo: [null, [MyValidators.notChinese]],
      supplierApplyStatus: [null, null],
      subCompanyApplyStatus: [null, null],
      stagingName: [null, null],
      pytBillArea: [null, null],
      pytStatus: [null, null],
      pytType: [null, null],
    });
  }

  ngOnInit(): void {
  }

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
  }

  resetForm(): void {
    this.searchFormGroup.reset();
  }

}
