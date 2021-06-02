import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MyValidators} from '../../../../../helpers/MyValidators';

@Component({
  selector: 'app-financing-bill-list-search-single',
  templateUrl: './financing-bill-list-search-single.component.html',
  styleUrls: ['./financing-bill-list-search-single.component.less']
})
export class FinancingBillListSearchSingleComponent implements OnInit {

  searchFormGroup!: FormGroup;
  isCollapse = true
  rowItem = 4; // 24 / 4 = 6 四列

  constructor(private fb: FormBuilder) {
    this.searchFormGroup = this.fb.group({
      paymentBillNo: [null, [MyValidators.notChinese]],
      supplierName: [null, null],
      fbStatus: [null, null],
      fbNo: [null, null],
      stagingName: [null, null],
      fbType: [null, null],
      fbAmount: [null, null],
      fbAmountEnd: [null, null]
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
