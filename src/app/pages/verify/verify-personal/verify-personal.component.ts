import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Utils} from '../../../helpers/utils';
import {MyValidators} from '../../../helpers/MyValidators';
import {NzUploadFile} from 'ng-zorro-antd';

@Component({
  selector: 'app-verify-personal',
  templateUrl: './verify-personal.component.html',
  styleUrls: ['./verify-personal.component.less']
})
export class VerifyPersonalComponent implements OnInit {

  askPhone = '0755-32805728'; // 保理商咨询热线
  userStatus = 0; // 会员认证状态
  readyStatus = true;
  protocolCheck = false;


  fileSize = 10240; // 限制文件大小

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

  constructor(private utils: Utils, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      realName: [null, [MyValidators.required, MyValidators.maxLength(80)]],
      idNo: [null, [MyValidators.required, MyValidators.notChinese, MyValidators.maxLength(80)]],
      mobile: [null, [MyValidators.required, MyValidators.mobile]],
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
    this.readyStatus = true;
  }

  next() {
    if (!this.protocolCheck) {
      return;
    }
    this.readyStatus = false;
  }
}
