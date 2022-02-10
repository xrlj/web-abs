import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {UIHelper} from '../../../helpers/ui-helper';
import {UserManageService} from '../../setting/user-manage/user-manage.service';
import {DefaultBusService} from '../../../helpers/event-bus/default-bus.service';
import {Router} from '@angular/router';
import {MyValidators} from '../../../helpers/MyValidators';
import {VUserPwdReq} from '../../../helpers/vo/req/v-user-pwd-req';

@Component({
  selector: 'app-user-centre-basic',
  templateUrl: './user-centre-basic.component.html',
  styleUrls: ['./user-centre-basic.component.less']
})
export class UserCentreBasicComponent implements OnInit {

  modifyPwdForm: FormGroup;
  labelSpan = 2;
  controlSpan = 0;

  basicForm: FormGroup;

  constructor(private fb: FormBuilder, private uiHelper: UIHelper,
              private userManageService: UserManageService, private defaultBusService: DefaultBusService,
              private router: Router) {
    const { required, maxLength, minLength, email, mobile } = MyValidators;

    // 更改密码表单
    this.modifyPwdForm = this.fb.group({
      oldPassword: [null, [required]],
      password: [null, [this.notOldPwd]],
      confirm: [null, [this.updatePwdConfirmValidator]]
    });

    this.basicForm = this.fb.group({
      realName: [null, [required]],
      sex: ['1', null], // 性别选择。1-男；2-女；0-保密
      email: [null, [email, required]],
      mobile: [null, [required, mobile]],
    });
  }

  ngOnInit() {
  }

  log(args: any[]): void {
    console.log(args);
  }

  closeTisTab() {
    this.defaultBusService.closeTabUrl(this.router.url);
  }

  /**
   * 修改密码-新密码不能和旧密码一样校验
   */
  notOldPwd = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value === this.modifyPwdForm.controls.oldPassword.value) {
      return { notOld: true, error: true };
    }
    return {};
  }

  /**
   * 修改密码-校验密码
   */
  updatePwdValidateConfirmPassword(): void {
    setTimeout(() => this.modifyPwdForm.controls.confirm.updateValueAndValidity());
  }

  /**
   * 修改密码-确认前后密码是否一致。
   */
  updatePwdConfirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.modifyPwdForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  /**
   * 确定更新密码操作。
   */
  updateUserPwdHandleOk(): void {
    if (this.modifyPwdForm.valid) { // 前端通过所有输入校验
      const value = this.modifyPwdForm.value;
      const  vUserPwdReq: VUserPwdReq = {
        userId: '',
        oldPassword: value.oldPassword,
        password: value.password,
        confirmPassword: value.confirm
      };
      this.userManageService.updateUserPassword(vUserPwdReq)
        .ok(data => {
          if (data) {
            this.uiHelper.msgTipSuccess('更改用户密码成功');
          } else {
            this.uiHelper.msgTipError('更改用户密码失败');
          }
        }).fail(error => {
        this.uiHelper.msgTipError(error.msg);
      }).final(() => {
      });
    } else {
      for (const key in this.modifyPwdForm.controls) {
        this.modifyPwdForm.controls[key].markAsDirty();
        this.modifyPwdForm.controls[key].updateValueAndValidity();
      }
    }
  }

}
