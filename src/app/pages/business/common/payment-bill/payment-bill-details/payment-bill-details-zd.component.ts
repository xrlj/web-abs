import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-payment-bill-details-zd',
  templateUrl: './payment-bill-details-zd.component.html',
  styleUrls: ['./payment-bill-details-zd.component.less']
})
export class PaymentBillDetailsZdComponent implements OnInit {

  zdRegisterStatus = '0';

  remarkForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.remarkForm = this.formBuilder.group({
      remark: [{value: null, disabled: true}, [Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {
  }

  count = (v: string) => {
    return v.length;
  };
}
