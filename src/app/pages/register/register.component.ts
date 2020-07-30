import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {NzSafeAny} from 'ng-zorro-antd';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap, take} from 'rxjs/operators';
import {interval, Observable} from 'rxjs';
import {RegisterService} from './register.service';
import {UIHelper} from '../../helpers/ui-helper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  // 注册邀请码
  registerInvitationCode = '';
  // 注册邀请码获取的企业信息
  etpInfo: any;

  // step
  current = 0;
  doneStatus = 'wait';
  isDisabled = true;
  countDown = false;
  countDownTime = 60; // 这里设置倒计时为60S
  countDownBtnText = '发送短信验证码'; // 可以控制动态改变的按钮提示信息

  // 第一步手机验证表单
  stepOneForm!: FormGroup;

  // 第二步手机验证表单
  stepTwoForm!: FormGroup;

  constructor(private uiHelper: UIHelper, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private registerService: RegisterService) {
    const { required, maxLength, minLength, email, mobile } = MyValidators;
    this.stepOneForm = this.fb.group({
      etpName: [{value: '', disabled: true}, [required]], //  this.stepOneForm.controls.etpName.disable({onlySelf: true}); // 动态变不可用
      enterpriseTypeName: [{value: '', disabled: true}, [required]],
      phoneNumber: ['', [required, mobile]],
      captcha: ['', [required]]
    });

    this.stepTwoForm = this.fb.group({
      userName: ['', [required, minLength(3), maxLength(12)]],
      email: ['', [required, email]],
      password: ['', [required]],
      confirm: ['', [this.confirmValidator]]
    });
  }

  ngOnInit(): void {
    this.registerInvitationCode = this.route.snapshot.params['code'];

    this.registerService.getEtpInfoByInvitationCode(this.registerInvitationCode)
      .ok(data => {
        this.etpInfo = data;
        this.stepOneForm.patchValue({etpName: data.etpName, enterpriseTypeName: data.enterpriseTypeName});
      }).fail(error => {
        this.uiHelper.msgTipError(error.msg);
    }).final(() => {});
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  registerNow(): void {
    this.current += 1;
    this.changeContent();
    this.doneStatus = 'finish';
  }

  goLogin(): void {
    console.log('done');
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        break;
      }
      case 1: {
        break;
      }
      case 2: {
        break;
      }
      default: {
      }
    }
  }

  /**
   * 发送短信获取手机验证码。
   */
  getCaptcha(e: MouseEvent): void {
    this.stepOneForm.controls['phoneNumber'].markAsDirty();           // 点击获取验证码要以输入了手机号为前提
    this.stepOneForm.controls['phoneNumber'].updateValueAndValidity();
    /*this.userProvider.doSendSMS ({ phone: this.stepOneForm.controls.phoneNumber.value }).subscribe(res =>{   // 如果手机号验证通过
      if (res) {
        this.notice.success('短信验证码已发送！');
        this.sendMessage();   // 调用下面的按钮倒计时的方法

      }
    });*/
    this.sendMessage();
  }

  /**
   * 发送了短信验证码后触发本方法，开始倒计时
   */
  sendMessage() {
    const numbers = interval(1000);
    const takeFourNumbers = numbers.pipe(take(this.countDownTime));
    takeFourNumbers.subscribe(
      x => {
        this.countDownBtnText = '验证码已发送(' + (this.countDownTime-x) + 's)';
        this.countDown = true;
      },
      error => {},
      () => {
        this.countDownBtnText = '重新发送';
        this.countDown = false;
      });
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.stepTwoForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  validateConfirmPassword(): void {
    setTimeout(() => this.stepTwoForm.controls.confirm.updateValueAndValidity());
  }

}

// current locale is key of the MyErrorsOptions
export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<string, NzSafeAny>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

export class MyValidators extends Validators {

  static minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return { minlength: { 'zh-cn': `最小长度为 ${minLength}`, en: `MinLength is ${minLength}` } };
    };
  }

  static maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return { maxlength: { 'zh-cn': `最大长度为 ${maxLength}`, en: `MaxLength is ${maxLength}` } };
    };
  }

  static mobile(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return isMobile(value) ? null : { mobile: { 'zh-cn': `手机号码格式不正确`, en: `Mobile phone number is not valid` } };
  }
}

function isEmptyInputValue(value: NzSafeAny): boolean {
  return value == null || value.length === 0;
}

function isMobile(value: string): boolean {
  return typeof value === 'string' && /(^1\d{10}$)/.test(value);
}
