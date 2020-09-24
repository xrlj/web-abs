import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Utils} from '../../../helpers/utils';
import {MyValidators} from '../../../helpers/MyValidators';
import {NzUploadFile} from 'ng-zorro-antd';
import {DefaultBusService} from '../../../helpers/event-bus/default-bus.service';
import {CommonService} from '../../../helpers/service/common.service';

@Component({
  selector: 'app-verify-personal',
  templateUrl: './verify-personal.component.html',
  styleUrls: ['./verify-personal.component.less']
})
export class VerifyPersonalComponent implements OnInit {

  @Input()
  userStatus = 0; // 会员认证状态
  askPhone = '0755-32805728'; // 保理商咨询热线
  protocolCheck = false;
  protocolCheckErrorTip = false;
  protocolCheckErrorTipClass = ''


  fileSize = 10240; // 限制文件大小

  current = -1;
  doneStatus = 'wait';
  formLabelSpanSize = 9;
  formControlSpanSize = 7;

  // 第一步填写企业信息
  userForm: FormGroup;

  idCardPreviewImage: string | undefined = '';
  idCardPreviewVisible = false;
  // 文件列表
  idCardFileList: NzUploadFile[] = [
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }
  ];

  entrustPreviewImage: string | undefined = '';
  entrustPreviewVisible = false;
  entrustFileList: NzUploadFile[] = [
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }
  ];

  constructor(private utils: Utils, private fb: FormBuilder,
              private defaultBusService: DefaultBusService,
              private commonService: CommonService) {
    this.userForm = this.fb.group({
      realName: [null, [MyValidators.required, MyValidators.maxLength(80)]],
      idNo: [null, [MyValidators.required, MyValidators.notChinese, MyValidators.maxLength(80)]],
      mobile: [null, [MyValidators.required, MyValidators.mobile]],
      authCode: [null, [MyValidators.required, MyValidators.positiveInteger, MyValidators.maxLength(6)]]
    });
  }

  ngOnInit(): void {
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
    this.idCardPreviewImage = file.url || file.preview;
    this.idCardPreviewVisible = true;
  };

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
  getVerifyAuthCode() {
    alert('mobile');
  }

  next() {
    this.current++;
  }
}
