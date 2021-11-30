import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Api} from '../../helpers/http/api';
import {VLoginRespData} from '../../helpers/vo/resp/v-login-resp';
import {ApiPath} from '../../api-path';
import {Constants} from '../../helpers/constants';
import {Utils} from '../../helpers/utils';
import {UIHelper} from '../../helpers/ui-helper';
import {AppPath} from '../../app-path';
import {HttpHeaders} from '@angular/common/http';
import {MyValidationErrors, MyValidators} from '../../helpers/MyValidators';
import {Observable, Observer} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  data: VLoginRespData;

  isLoadingOne = false;

  gzhShowStatus = false;

  verifyCodeImgData: string;
  verifyCodeKey = '';
  verifyCodeLoading = false;

  constructor(private router: Router, private fb: FormBuilder, private api: Api, private utils: Utils, private uiHelper: UIHelper) {
    this.validateForm = this.fb.group({
      username: [null, [MyValidators.required]],
      password: [null, [MyValidators.required]],
      verifyCode: [null, [MyValidators.required, MyValidators.maxLength(4), MyValidators.minLength(4)], [this.verifyCodeAsyncValidator]],
    });
  }

  ngOnInit() {
    this.getVerifyCode();
    this.uiHelper.verifyLoginAndJumpToHome();
  }

  verifyCodeAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<MyValidationErrors | null>) => {
      if (control.value && control.value !== '' && control.value.length === 4) {
        this.verifyCodeLoading = true;
        this.api.get(ApiPath.syscommon.kaptcha.verifyCode, {key: this.verifyCodeKey, code: control.value})
          .ok(data => {
            if (data) {
              observer.next(null);
            }
          })
          .fail(error => {
            observer.next({
              duplicated: {'zh-cn': `${error.msg}`, en: `verify code error!`}
            });
          })
          .final(b => {
            observer.complete();
            this.verifyCodeLoading = false;
            if (!b) {
              this.getVerifyCode();
            }
          });
      }
    });

  submitForm(): void {
    if (this.validateForm.valid) {
      // 开始请求登录
      this.isLoadingOne = true;
      const headers = new HttpHeaders({
        Authorization: 'Basic '.concat(this.utils.base64encoder(this.validateForm.value.username + ':' + this.validateForm.value.password))
      });
      this.api.post(ApiPath.login, null, null, null, null, headers)
        .ok(data => {
          console.log('>>>>>access_token login:', data.access_token);
          localStorage.setItem(Constants.localStorageKey.token, data.access_token);
          this.router.navigateByUrl(AppPath.init);
        }).fail(error => {
        this.uiHelper.msgTipError(error.msg);
      }).final(b => {
        this.isLoadingOne = false;
        if (!b) { // 登录失败处理
          this.getVerifyCode();
        }
      });
    } else {
      for (const key in this.validateForm.controls) {
        if (this.validateForm.controls.hasOwnProperty(key)) {
          this.validateForm.controls[key].markAsDirty();
          this.validateForm.controls[key].updateValueAndValidity();
        }
      }
    }
  }

  clearUsername() {
    this.validateForm.controls.username.setValue(null);
  }

  clearPassword() {
    this.validateForm.controls.password.setValue(null);
  }

  gzhShow(b) {
    this.gzhShowStatus = b;
  }

  getVerifyCode() {
    this.api.get(ApiPath.syscommon.kaptcha.getVerifyCode, {key: this.verifyCodeKey})
      .ok(data => {
        this.verifyCodeImgData = `data:image/jpeg;base64,${data.base64Img}`;
        this.verifyCodeKey = data.key;
        this.validateForm.controls.verifyCode.setValue('');
      });
  }
}
