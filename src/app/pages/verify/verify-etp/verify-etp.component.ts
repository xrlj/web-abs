import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Utils} from '../../../helpers/utils';
import {MyValidators} from '../../../helpers/MyValidators';

@Component({
  selector: 'app-verify-etp',
  templateUrl: './verify-etp.component.html',
  styleUrls: ['./verify-etp.component.less']
})
export class VerifyEtpComponent implements OnInit {

  // step
  current = 0;
  doneStatus = 'wait';

  // 第一步填写企业信息
  stepOneForm!: FormGroup;
  nexBtnLoading = false;

  // 第二步手机验证表单
  stepTwoForm!: FormGroup;
  registerBtnLoading = false;

  constructor(private utils: Utils, private fb: FormBuilder,) {
    const {required, maxLength, minLength, email, mobile} = MyValidators;
    this.stepOneForm = this.fb.group({
      etpName: [null, [required]],
      unifyCode: [null, [required]],
      legalPerson: [null, [required]],
      legalPersonIdNo: [null, [required]],
      contactName: [null, [required]],
      contactMobile: [null, [required, mobile]],
      email: [null, [required, email]],
      fax: [null, null],
      telephone: [null, [required]],
      address: [null, [required]],
      registeredAddress: [null, [required]]
    });
  }

  ngOnInit(): void {
  }

  next(): void {
    this.current += 1;
  }

  previous() {
    this.current -= 1;
  }
}
