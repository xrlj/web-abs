import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Utils} from '../../../helpers/utils';
import {MyValidators} from '../../../helpers/MyValidators';
import {NzUploadFile} from 'ng-zorro-antd';

function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@Component({
  selector: 'app-verify-etp',
  templateUrl: './verify-etp.component.html',
  styleUrls: ['./verify-etp.component.less']
})
export class VerifyEtpComponent implements OnInit {

  fileSize = 10240; // 限制文件大小

  // step
  current = 2;
  doneStatus = 'wait';

  // 第一步填写企业信息
  stepOneForm!: FormGroup;
  nexBtnLoading = false;

  // 第三步
  stepThirdForm!: FormGroup;
  registerBtnLoading = false;

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

  constructor(private utils: Utils, private fb: FormBuilder,) {
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
      bankProvince: [null, [required, maxLength(80)]]
    });
  }

  ngOnInit(): void {
  }

  next(): void {
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
      file.preview = await getBase64(file.originFileObj);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

  etpBankNameSelectChange($event: any) {

  }

  bankProvinceSelectChange($event: any) {

  }
}
