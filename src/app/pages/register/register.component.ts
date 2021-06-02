import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {interval} from 'rxjs';
import {RegisterService} from './register.service';
import {UIHelper} from '../../helpers/ui-helper';
import {MyValidators} from '../../helpers/MyValidators';
import {AppPath} from '../../app-path';
import {Constants} from '../../helpers/constants';
import {DefaultBusService} from '../../helpers/event-bus/default-bus.service';

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
  countDown = false;
  countDownTime = 60; // 这里设置倒计时为60S
  countDownBtnText = '发送短信验证码'; // 可以控制动态改变的按钮提示信息

  // 第一步手机验证表单
  captchaBtnLoading = false;
  stepOneForm!: FormGroup;
  nexBtnLoading = false;

  // 第二步手机验证表单
  stepTwoForm!: FormGroup;
  registerBtnLoading = false;

  constructor(private uiHelper: UIHelper, private fb: FormBuilder,
              private route: ActivatedRoute, private router: Router,
              private registerService: RegisterService, private defaultBusService: DefaultBusService) {
    const {required, maxLength, minLength, email, mobile} = MyValidators;
    this.stepOneForm = this.fb.group({
      etpName: [{value: null, disabled: true}, [required]], //  this.stepOneForm.controls.etpName.disable({onlySelf: true}); // 动态变不可用
      userTypeName: [{value: '', disabled: true}, [required]],
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

    this.defaultBusService.showLoading(true);
    this.registerService.getEtpInfoByInvitationCode(this.registerInvitationCode)
      .ok(data => {
        this.etpInfo = data;
        this.stepOneForm.patchValue({etpName: data.etpName, userTypeName: data.userTypeName});
      }).fail(error => {
        this.uiHelper.msgTipError(error.msg);
        const errorCode = error.code;
        if (errorCode === 1003) { // 邀请码已经注册使用
          this.router.navigate([AppPath.login]);
        }
    }).final(() => {
      this.defaultBusService.showLoading(false);
    });
  }

  next(): void {
    if (this.stepOneForm.valid && this.etpInfo.etpName) {
      this.nexBtnLoading = true;
      const values = this.stepOneForm.value;
      this.registerService.verifyAuthCode(values.phoneNumber, values.captcha)
        .ok(data => {
          if (data) {
            this.current += 1;
          }
        }).fail(error => {
          this.uiHelper.msgTipError(error.msg);
      }).final(() => {
        this.nexBtnLoading = false;
      });
    } else {
      for (const key in this.stepOneForm.controls) {
        this.stepOneForm.controls[key].markAsDirty();
        this.stepOneForm.controls[key].updateValueAndValidity();
      }
    }
  }

  registerNow(): void {
    if (this.stepTwoForm.valid) {
      this.registerBtnLoading = true;
      const valueOne = this.stepOneForm.value;
      const valueTwo = this.stepTwoForm.value;
      const body = {
        invitationCode: this.registerInvitationCode,
        username: valueTwo.userName,
        password: valueTwo.password,
        mobile: valueOne.phoneNumber,
        email: valueTwo.email,
        clientid: Constants.appInfo.clientId,
        clientDeviceType: 'BROWSER'
      };
      this.registerService.registerByInvitationCode(body)
        .ok(data => {
          console.log(data);
          this.current += 1;
          this.doneStatus = 'finish';
        })
        .fail(error => {
          this.uiHelper.msgTipError(error.msg);
        })
        .final(() => {
          this.registerBtnLoading = false;
        });
    } else {
      for (const key in this.stepTwoForm.controls) {
        this.stepTwoForm.controls[key].markAsDirty();
        this.stepTwoForm.controls[key].updateValueAndValidity();
      }
    }
  }

  goLogin(): void {
    this.router.navigate([AppPath.login]);
  }

  /**
   * 发送短信获取手机验证码。
   */
  getCaptcha(e: MouseEvent): void {
    if (this.stepOneForm.controls.phoneNumber.value && this.stepOneForm.controls.etpName.value) {
      this.captchaBtnLoading = true;
      this.registerService.getAuthCode(this.stepOneForm.controls.phoneNumber.value)
        .ok(data => {
          if (data) {
            this.sendMessage();   // 调用下面的按钮倒计时的方法
          } else {
            this.uiHelper.msgTipError('获取短信验证码失败');
            this.captchaBtnLoading = false;
          }
        }).fail(error => {
          this.uiHelper.msgTipError(error.msg);
          this.captchaBtnLoading = false;
        }).final(() => {
          // this.captchaBtnLoading = false;
        });
    } else {
      this.stepOneForm.controls['phoneNumber'].markAsDirty();           // 点击获取验证码要以输入了手机号为前提
      this.stepOneForm.controls['phoneNumber'].updateValueAndValidity();
    }
  }

  /**
   * 发送了短信验证码后触发本方法，开始倒计时
   */
  sendMessage() {
    const numbers = interval(1000);
    const takeFourNumbers = numbers.pipe(take(this.countDownTime));
    takeFourNumbers.subscribe(
      x => {
        this.countDownBtnText = '验证码已发送(' + (this.countDownTime - x) + 's)';
        this.countDown = true;
        this.captchaBtnLoading = false;
      },
      error => {
      },
      () => {
        this.countDownBtnText = '重新发送';
        this.countDown = false;
        this.captchaBtnLoading = false;
      });
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {error: true, required: true};
    } else if (control.value !== this.stepTwoForm.controls.password.value) {
      return {confirm: true, error: true};
    }
    return {};
  };

  validateConfirmPassword(): void {
    setTimeout(() => this.stepTwoForm.controls.confirm.updateValueAndValidity());
  }

}
