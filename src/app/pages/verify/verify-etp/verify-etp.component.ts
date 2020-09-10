import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Utils} from '../../../helpers/utils';
import {MyValidators} from '../../../helpers/MyValidators';
import {NzUploadFile} from 'ng-zorro-antd';

@Component({
  selector: 'app-verify-etp',
  templateUrl: './verify-etp.component.html',
  styleUrls: ['./verify-etp.component.less']
})
export class VerifyEtpComponent implements OnInit {

  etpStatus = 0; // 企业认证状态
  validPayNum: number;  // 企业实名认证对公打款验证款
  askPhone = '0755-32805728'; // 保理商咨询热线

  // 准备资料相关
  protocolCheck = false;
  protocolCheckErrorTip = false;

  fileSize = 10240; // 限制文件大小

  // step
  current = -1;
  doneStatus = 'wait';

  // 第一步填写企业信息
  stepOneForm!: FormGroup;
  nexBtnLoading = false;

  // 第三步
  stepThirdForm!: FormGroup;
  registerBtnLoading = false;
  bankFullNameSearchList: string[] = []; // 开户行全称选择列表

  previewImage: string | undefined = '';
  previewVisible = false;
  // 文件列表
  fileList: NzUploadFile[] = [
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }
  ];

  constructor(private utils: Utils, private fb: FormBuilder) {
    const {required, chinese, notChinese, positiveInteger, maxLength, minLength, email, mobile} = MyValidators;
    this.stepOneForm = this.fb.group({
      etpName: [null, [required, maxLength(120)]],
      unifyCode: [null, [required, maxLength(20), notChinese]],
      legalPerson: [null, [required, chinese]],
      legalPersonIdNo: [null, [required, maxLength(18), notChinese]],
      contactName: [null, [required, chinese]],
      contactMobile: [null, [required, mobile, maxLength(11), minLength(11)]],
      email: [null, [required, email]],
      fax: [null, [notChinese]],
      telephone: [null, [required, positiveInteger, maxLength(11)]],
      address: [null, [required, maxLength(200)]],
      registeredAddress: [null, [required, maxLength(200)]]
    });

    this.stepThirdForm = this.fb.group({
      etpBankName: [null, [required, maxLength(80)]],
      bankProvince: [null, [required, maxLength(80)]],
      bankCity: [null, [required, maxLength(80)]],
      bankFullName: [null, [required, maxLength(80)]],
      bankAccountName: [null, [required, maxLength(80), chinese]],
      bankAccountNum: [null, [required, maxLength(80), positiveInteger]],
    });
  }

  ngOnInit(): void {
  }

  protocolChange(event): void {
    this.protocolCheckErrorTip = !event;
  }

  next(): void {
    switch (this.current) {
      case -1:
        if (!this.protocolCheck) {
          this.protocolCheckErrorTip = true;
          return;
        }
        break;
      case 0:
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
    }
    this.current += 1;
  }

  previous() {
    this.current -= 1;
  }

  /**
   * 图片预览
   */
  handlePreview = async (file: NzUploadFile) => {
    if (file && !file.url && !file.preview) {
      file.preview = await this.utils.getBase64(file.originFileObj);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

  etpBankNameSelectChange($event: any) {

  }

  bankProvinceSelectChange($event: any) {

  }

  bankCitySelectChange($event: any) {

  }

  /**
   * 开户行全称输入搜索事件回调。
   */
  onInputBankFullName($event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.bankFullNameSearchList = value ? [value, value + value, value + value + value] : [];
  }
}
