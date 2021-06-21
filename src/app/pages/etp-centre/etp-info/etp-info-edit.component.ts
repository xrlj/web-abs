import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-etp-info-edit',
  templateUrl: './etp-info-edit.component.html',
  styleUrls: ['./etp-info-edit.component.less']
})
export class EtpInfoEditComponent implements OnInit {

  editForm: FormGroup;
  spanLabel = 3;
  spanFormControl = 6;

  @Output() showType = new EventEmitter<number>();

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      etpRegisterAdr: [null, [Validators.required]],
      etpContactAdr: [null, [Validators.required]],
      etpFax: [null, null],
      etpPhoneAdr: [null, [Validators.required]],
      mobile: [null, [Validators.required]],
      linkMan: [null, [Validators.required]],
      linkManMobile: [null, [Validators.required]],
      email: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }


  backToList() {
    this.showType.emit(1);
  }
}
