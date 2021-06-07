import {Component, Input, OnInit} from '@angular/core';
import {SignStatusEnum} from '../../../../../helpers/enum/sign-status-enum';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-sign-list-search-single',
  templateUrl: './sign-list-search-single.component.html',
  styleUrls: ['./sign-list-search-single.component.less']
})
export class SignListSearchSingleComponent implements OnInit {

  // 签署状态
  @Input()
  signStatus: SignStatusEnum;
  signStatusEnum: typeof SignStatusEnum = SignStatusEnum;

  signNoForm!: FormGroup; // 待签章查询表单
  signYesForm!: FormGroup; // 已签章查询表单
  signAllForm!: FormGroup; // 签章任务列表查询查询表单

  isCollapse = true

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    if (this.signStatus === SignStatusEnum.SIGN_NO) {
      this.signNoForm = this.fb.group({
        formLayout: ['inline'],
        paymentBillNo: [null, null],
        fbNo: [null, null],
        signFileName: [null, null],
        signFileTypeName: [null, null]
      });
    } else if (this.signStatus === SignStatusEnum.SIGN_YES) {
      this.signYesForm = this.fb.group({
        formLayout: ['inline'],
        paymentBillNo: [null, null],
        fbNo: [null, null],
        signFileName: [null, null],
        signFileTypeName: [null, null],
        signDate: [null, null]
      });
    } else {
      this.signAllForm = this.fb.group({
        paymentBillNo: [null, null],
        fbNo: [null, null],
        signFileName: [null, null],
        signFileTypeName: [null, null],
        supplierName: [null, null],
        subCompanyName: [null, null],
        supplierSignStatus: [null, null],
        subCompanySignStatus: [null, null],
        coreCompanySignStatus: [null, null]
      });
    }
  }

  /**
   * 表单提交。
   */
  submitForm() {
  }

  resetForm(): void {
    switch (this.signStatus) {
      case SignStatusEnum.SIGN_NO:
        this.signNoForm.reset();
        break;
      case SignStatusEnum.SIGN_YES:
        this.signYesForm.reset();
        break;
      default:
        this.signAllForm.reset();
    }
  }

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
  }
}
