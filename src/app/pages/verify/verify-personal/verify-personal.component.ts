import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Utils} from '../../../helpers/utils';
import {MyValidators} from '../../../helpers/MyValidators';
import {NzUploadChangeParam, NzUploadFile} from 'ng-zorro-antd';
import {DefaultBusService} from '../../../helpers/event-bus/default-bus.service';
import {CommonService} from '../../../helpers/service/common.service';
import {UserStatusEnum} from '../../../helpers/enum/user-status-enum';
import {VerifyPersonalService} from './verify-personal.service';
import {UIHelper} from '../../../helpers/ui-helper';
import {interval} from 'rxjs';
import {take} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {ApiPath} from '../../../api-path';
import {FileUploadHelper} from '../../../helpers/file-upload-helper';
import {JwtKvEnum} from '../../../helpers/enum/jwt-kv-enum';

@Component({
  selector: 'app-verify-personal',
  templateUrl: './verify-personal.component.html',
  styleUrls: ['./verify-personal.component.less']
})
export class VerifyPersonalComponent implements OnInit {

  userStatusEnum: typeof UserStatusEnum = UserStatusEnum; // 用户状态枚举
  @Input()
  userStatus = 0; // 会员认证状态
  askPhone = '0755-32805728'; // 保理商咨询热线
  protocolCheck = false;
  protocolCheckErrorTip = false;
  protocolCheckErrorTipClass = ''


  current = -1;
  doneStatus = 'wait';
  formLabelSpanSize = 3;
  formControlSpanSize = 7;

  // 第一步填写企业信息
  userForm: FormGroup;

  countDown = false;
  countDownTime = 120; // 这里设置倒计时为120s
  countDownBtnText = '获取验证码'; // 可以控制动态改变的按钮提示信息

  fileSize = 10240; // 限制文件大小
  uploadFileUrl = environment.apiUrl.concat(ApiPath.sysfilesystem.sysFiles.uploadFile);

  idCardPreviewImage: string | undefined = '';
  idCardPreviewVisible = false;
  // 文件列表
  idCardFileList: NzUploadFile[] = [];

  entrustPreviewImage: string | undefined = '';
  entrustPreviewVisible = false;
  entrustFileList: NzUploadFile[] = [];

  constructor(private utils: Utils, private fb: FormBuilder,
              private uiHelper: UIHelper,
              private fileUploadHelper: FileUploadHelper,
              private defaultBusService: DefaultBusService,
              private verifyPersonalService: VerifyPersonalService,
              private commonService: CommonService) {
    this.userForm = this.fb.group({
      realName: [null, [MyValidators.required, MyValidators.maxLength(80)]],
      idNo: [null, [MyValidators.required, MyValidators.notChinese, MyValidators.maxLength(80)]],
      mobile: [null, [MyValidators.required, MyValidators.mobile]],
      authCode: [null, [MyValidators.positiveInteger, MyValidators.maxLength(6)]]
    });
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.commonService.getUserInfoById(this.utils.getJwtTokenClaim(JwtKvEnum.UserId))
      .ok(data => {
        console.log(data);
      });
  }

  /**
   * 图片预览
   */
  handleIdCardPreview = async (file: NzUploadFile) => {
    if (file && !file.url && !file.preview) {
      file.preview = await this.utils.getBase64(file.originFileObj);
    }
    this.idCardPreviewImage = file.url || file.preview;
    this.idCardPreviewVisible = true;
  };

  handleEntrustPreview = async (file: NzUploadFile) => {
    if (file && !file.url && !file.preview) {
      file.preview = await this.utils.getBase64(file.originFileObj);
    }
    this.entrustPreviewImage = file.url || file.preview;
    this.entrustPreviewVisible = true;
  };

  fileUploadChange($event: NzUploadChangeParam, type: number) {
    const result = this.fileUploadHelper.uploadFileHandleChange($event);
    if (result) {
      const file: NzUploadFile = {name: result.oriName, uid: result.id, status: 'done', url: result.url};
      if (type === 1) { // 身份证正方面
        this.idCardFileList[0] = file;
      }
      if (type === 2) { // 委托书
        this.entrustFileList[0] = file;
      }
    }
  }

  previous() {
    this.current--;
  }

  startVerify() {
    if (!this.protocolCheck) {
      this.protocolCheckErrorTip = true;
      this.shakeErrorTipLittleTime();
      return;
    }
    this.current++;
  }

  protocolCheckModelChange($event: any) {
    this.protocolCheck = $event;
    this.protocolCheckErrorTip = !$event;
    this.shakeErrorTipLittleTime();
  }

  private shakeErrorTipLittleTime(): void {
    this.protocolCheckErrorTipClass = 'shake shake-horizontal shake-constant'
    setTimeout(() => {
      this.protocolCheckErrorTipClass = ''
    }, 400);
  }

  /**
   * 获取手机短信验证码。
   */
  getVerifyAuthCode(): void {
    if (this.userForm.valid) {
      this.defaultBusService.showLoading(true);
      this.userForm.patchValue({authCode: null});
      const values = this.userForm.value;
      this.verifyPersonalService.verifyPersonal({mobile: values.mobile, name: values.realName, idno: values.idNo})
        .ok(data => {
          console.log(data);
          if (data) {
            // 获取身份验证码
            this.getSmsCode(values.mobile, 120);
          }
        })
        .fail(error => {
          this.uiHelper.msgTipError(error.msg);
        })
        .final(b => {
          if (!b) {
            this.defaultBusService.showLoading(false);
          }
        });
    } else {
      for (const key in this.userForm.controls) {
        this.userForm.controls[key].markAsDirty();
        this.userForm.controls[key].updateValueAndValidity();
      }
    }
  }

  getSmsCode(mobileNum: string, _effectiveTime: number): void {
    this.commonService.authenticationSmsCode(mobileNum, _effectiveTime)
      .ok(data => {
        console.log(data);
        if (true) {
          this.sendMessage();
        }
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        this.defaultBusService.showLoading(false);
      });
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
      },
      error => {
      },
      () => {
        this.countDownBtnText = '重新发送';
        this.countDown = false;
      });
  }

  next(): void {
    if (this.current === 0) {
      this.submitVerifyInfo();
    } else {
      this.current++;
    }
  }

  submitVerifyInfo(): void {
    if (this.userForm.valid) {
      const values = this.userForm.value;
      if (!values.authCode) {
        this.uiHelper.msgTipWarning('请输入短信验证码');
        return;
      }
      if (this.idCardFileList.length === 0) {
        this.uiHelper.msgTipWarning('请上传身份证正反面图片');
        return;
      }
      if (this.entrustFileList.length === 0) {
        this.uiHelper.msgTipWarning('请上传委托书');
        return;
      }
      this.defaultBusService.showLoading(true);
      this.commonService.verifyAuthCode(values.mobile, values.authCode)
        .ok(data => {
          if (data) {
            this.submitVerifyPersonalInfo(values);
          } else {
            this.uiHelper.msgTipError('短信验证码校验错误');
          }
        })
        .fail(error => {
          this.uiHelper.msgTipError(error.msg);
        })
        .final(b => {
          if (!b) {
            this.defaultBusService.showLoading(false);
          }
        });
    } else {
      for (const key in this.userForm.controls) {
        this.userForm.controls[key].markAsDirty();
        this.userForm.controls[key].updateValueAndValidity();
      }
    }
  }

  submitVerifyPersonalInfo(values: any): void {
    this.verifyPersonalService.verifyPersonal({mobile: values.mobile, name: values.realName, idno: values.idNo})
      .ok(data => {
        if (data) { // 校验企业信息成功
          this.submitVerifyInfoNow(values);
        }
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        if (!b) {
          this.defaultBusService.showLoading(false);
        }
      });
  }

  submitVerifyInfoNow(values: any): void {
    const body = {
      id: this.utils.getJwtTokenClaim(JwtKvEnum.UserId), realName: values.realName, idNo: values.idNo, mobile: values.mobile,
      idNoFileId: this.idCardFileList[0].uid, powerOfAttorneyFileId: this.entrustFileList[0].uid
    };
    this.verifyPersonalService.saveVerifyCheckInfo(body)
      .ok(data => {
        if (data) {
          this.uiHelper.msgTipSuccess('提交信息成功');
          this.current++;
        } else {
          this.uiHelper.msgTipError('提交信息失败');
        }
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        this.defaultBusService.showLoading(false);
      });
  }
}
