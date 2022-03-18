import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MyValidators} from '../../../../helpers/MyValidators';

@Component({
  selector: 'app-payment-bill-search',
  templateUrl: './payment-bill-search.component.html',
  styleUrls: ['./payment-bill-search.component.less']
})
export class PaymentBillSearchComponent implements OnInit {

  // all-付款单查询；check-付款单审核；review-付款单复核；
  @Input()
  paymentBillMenuType: string;

  @Output() searchEmitter = new EventEmitter<any>();  // 查询

  searchFormGroup!: FormGroup;
  isCollapse = true

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
    this.searchClick();
  }

  getSearchData() {
    return this.searchFormGroup.value;
  }

  searchClick() {
    this.searchEmitter.emit(this.getSearchData());
  }
}
