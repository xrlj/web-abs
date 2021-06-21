import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MyValidators} from '../../../helpers/MyValidators';

@Component({
  selector: 'app-etp-bank-card-edit',
  templateUrl: './etp-bank-card-edit.component.html',
  styleUrls: ['./etp-bank-card-edit.component.less']
})
export class EtpBankCardEditComponent implements OnInit {

  @Input()
  bankCardInfo?: any;

  editForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      bankName: [null, [MyValidators.required]],
      branchName: [null, [MyValidators.required]],
      bankAccountName: [null, [MyValidators.required]],
      bankNo: [null, [MyValidators.required]]
    });
  }

  ngOnInit(): void {
  }

}
