import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Utils} from '../../../helpers/utils';
import {MyValidators} from '../../../helpers/MyValidators';
import {NzUploadChangeParam, NzUploadFile} from 'ng-zorro-antd';
import {CommonService} from '../../../helpers/service/common.service';
import {DefaultBusService} from '../../../helpers/event-bus/default-bus.service';
import {VerifyEtpService} from './verify-etp.service';
import {UIHelper} from '../../../helpers/ui-helper';
import {VBankBranchReq} from '../../../helpers/vo/req/v-bank-branch-req';
import {environment} from '../../../../environments/environment';
import {ApiPath} from '../../../api-path';
import {FileUploadHelper} from '../../../helpers/file-upload-helper';
import {VEtpReq} from '../../../helpers/vo/req/v-etp-req';

@Component({
  selector: 'app-verify-etp',
  templateUrl: './verify-etp.component.html',
  styleUrls: ['./verify-etp.component.less']
})
export class VerifyEtpComponent implements OnInit {

  formLabelSpanSize = 9;
  formControlSpanSize = 7;

  // 初始化网络数据
  etpInfo: any;

  @Input()
  etpStatus; // 企业认证状态
  validPayNum: number;  // 企业实名认证对公打款验证款
  askPhone = '0755-32805728'; // 保理商咨询热线

  // 准备资料相关
  protocolCheck = false;
  protocolCheckErrorTip = false;
  protocolCheckErrorTipClass = ''

  fileSize = 10240; // 限制文件大小
  uploadFileUrl = environment.apiUrl.concat(ApiPath.sysfilesystem.sysFiles.uploadFile);

  // step
  current = -1;
  doneStatus = 'wait'; // 'wait' | 'process' | 'finish' | 'error'

  // 第一步填写企业信息
  stepOneForm!: FormGroup;

  // 第二步
  licenseFileList: NzUploadFile[] = [];
  idCardFileList: NzUploadFile[] = [];

  // 第三步
  stepThirdForm!: FormGroup;
  bankNameSelectList: string[] = [];  // 全部银行选择列表
  provinceSelectList: string[] = [];  // 省份选择列表
  citySelectList: string[] = [];  // 城市选择列表
  branchNameSelectList: string[] = []; // 开户行全称选择列表
  branchNameListLoadFlag = false;
  bankLicenseFileList: NzUploadFile[] = [];

  // 图片预览对话框
  previewImage: string | undefined = '';
  previewVisible = false;

  constructor(private utils: Utils, private fb: FormBuilder,
              private commonService: CommonService,
              private defaultBusService: DefaultBusService,
              private verifyEtpService: VerifyEtpService,
              private uiHelper: UIHelper,
              private fileUploadHelper: FileUploadHelper) {
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
      telephone: [null, [positiveInteger, maxLength(11)]],
      address: [null, [required, maxLength(200)]],
      registeredAddress: [null, [required, maxLength(200)]]
    });

    this.stepThirdForm = this.fb.group({
      bankName: [null, [required, maxLength(80)]],
      bankProvince: [null, [required, maxLength(80)]],
      bankCity: [null, [required, maxLength(80)]],
      branchName: [null, [required, maxLength(80)]],
      bankAccountName: [null, [required, maxLength(80), chinese]],
      bankAccountNum: [null, [required, maxLength(80), positiveInteger]],
    });
  }

  ngOnInit(): void {
    this.getEtpInfo();
  }

  getEtpInfo(): void {
    this.commonService.getEtpInfoByUser()
      .ok(data => {
        this.etpInfo = data;
        this.patchStepOne();
      }).final(b => {
      if (b) {
        this.getBankNameList();
        this.getProvinceList();
        const province = this.etpInfo.extra.bankCard.province;
        if (province) {
          this.getCityByProvinceList(province);
        }
      }
    });
  }

  getBankNameList(): void {
    this.verifyEtpService.getBankNameList()
      .ok(data => {
        this.bankNameSelectList = data;
      }).fail(error => {
    }).final(b => {
    });
  }

  getProvinceList(): void {
    this.verifyEtpService.getProvinceList()
      .ok(data => {
        this.provinceSelectList = data;
      }).fail(error => {
    }).final(b => {
    });
  }

  getCityByProvinceList(province: string): void {
    this.verifyEtpService.getCityByProvinceList(province)
      .ok(data => {
        this.citySelectList = data;
      });
  }

  getBranchNameTopNumList(branchNameLike: string): void {
    const values = this.stepThirdForm.value;
    if (!values.bankName) {
      this.stepThirdForm.controls.bankName.markAsDirty();
      this.stepThirdForm.controls.bankName.updateValueAndValidity();
      return;
    }
    if (!values.bankProvince) {
      this.stepThirdForm.controls.bankProvince.markAsDirty();
      this.stepThirdForm.controls.bankProvince.updateValueAndValidity();
      return;
    }
    if (!values.bankCity) {
      this.stepThirdForm.controls.bankCity.markAsDirty();
      this.stepThirdForm.controls.bankCity.updateValueAndValidity();
      return;
    }

    // 开始查询获取支行列表
    this.branchNameListLoadFlag = true;
    const vo: VBankBranchReq = {bankName: values.bankName, province: values.bankProvince, city: values.bankCity, branchName: branchNameLike};
    this.verifyEtpService.getBranchNameTopNumList(vo)
      .ok(data => {
        this.branchNameSelectList = data;
      }).final(b => {
      this.branchNameListLoadFlag = false;
    });
  }

  /**
   * 填充第一步内容。
   */
  patchStepOne(): void {
    if (!this.etpInfo) {
      return;
    }
    this.stepOneForm.patchValue(
      {
        etpName: this.etpInfo.etpName,
        unifyCode: this.etpInfo.unifyCode,
        legalPerson: this.etpInfo.legalPerson,
        legalPersonIdNo: this.etpInfo.legalPersonIdNo,
        contactName: this.etpInfo.contactName,
        contactMobile: this.etpInfo.contactMobile,
        email: this.etpInfo.email,
        fax: this.etpInfo.fax,
        telephone: this.etpInfo.telephone,
        address: this.etpInfo.address,
        registeredAddress: this.etpInfo.registeredAddress
      }
    );
  }

  /**
   * 填充第二步内容。
   */
  patchStepTwo(): void {
    if (!this.etpInfo) {
      return;
    }
    const licenseFile: NzUploadFile = {
      name: this.etpInfo.extra.businessLicensePicFile.oriName, uid: this.etpInfo.extra.businessLicensePicFile.id,
      status: 'done', url: this.etpInfo.extra.businessLicensePicFile.url
    };
    if (licenseFile.url !== '') {
      this.licenseFileList[0] = licenseFile;
    }
    const idCardFile: NzUploadFile = {
      name: this.etpInfo.extra.legalPersonIdNoPicFile.oriName, uid: this.etpInfo.extra.legalPersonIdNoPicFile.id,
      status: 'done', url: this.etpInfo.extra.legalPersonIdNoPicFile.url
    };
    if (idCardFile.url !== '') {
      this.idCardFileList[0] = idCardFile;
    }
  }

  /**
   * 填充第三步内容。
   */
  patchStepThird(): void {
    if (!this.etpInfo) {
      return;
    }
    const bankCard = this.etpInfo.extra.bankCard;
    this.stepThirdForm.patchValue({
      bankName: bankCard.etpBankName, bankProvince: bankCard.province,
      bankCity: bankCard.city, branchName: bankCard.etpBranchName, bankAccountName: bankCard.etpBankCardName,
      bankAccountNum: bankCard.etpBankCardNum
    });
    const permitPicFile: NzUploadFile = {
      name: this.etpInfo.extra.permitPicFile.oriName, uid: this.etpInfo.extra.permitPicFile.id,
      status: 'done', url: this.etpInfo.extra.permitPicFile.url
    };
    if (permitPicFile.url !== '') {
      this.bankLicenseFileList[0] = permitPicFile;
    }
  }

  protocolChange(event): void {
    this.protocolCheckErrorTip = !event;
    this.shakeErrorTipLittleTime();
  }

  next(): void {
    switch (this.current) {
      case -1:
        if (!this.protocolCheck) {
          this.protocolCheckErrorTip = true;
          this.shakeErrorTipLittleTime();
          return;
        }
        this.current += 1;
        break;
      case 0: // 第一步
        if (this.stepOneForm.valid) {
          this.current += 1;
          this.patchStepTwo();
        } else {
          for (const key in this.stepOneForm.controls) {
            this.stepOneForm.controls[key].markAsDirty();
            this.stepOneForm.controls[key].updateValueAndValidity();
          }
        }
        break;
      case 1: // 第二步
        if (this.licenseFileList.length === 0) {
          this.uiHelper.msgTipWarning('请上传营业执照图片');
          break;
        }
        if (this.idCardFileList.length === 0) {
          this.uiHelper.msgTipWarning('请上传法人身份证正反面图片');
          break;
        }
        this.current++;
        this.patchStepThird();
        break;
      case 2: // 第三步
        this.submit();
        break;
    }
  }

  submit(): void {
    const stepOneFormValues = this.stepOneForm.value;
    const stepThirdFormValues = this.stepThirdForm.value;
    const body: VEtpReq = {};
    body.etpName = stepOneFormValues.etpName;
    body.unifyCode = stepOneFormValues.unifyCode;
    body.legalPerson = stepOneFormValues.legalPerson;
    body.legalPersonIdNo = stepOneFormValues.legalPersonIdNo;
    body.contactName = stepOneFormValues.contactName;
    body.contactMobile = stepOneFormValues.contactMobile;
    body.email = stepOneFormValues.email;
    body.fax = stepOneFormValues.fax;
    body.telephone = stepOneFormValues.telephone;
    body.address = stepOneFormValues.address;
    body.registeredAddress = stepOneFormValues.registeredAddress;

    if (this.licenseFileList.length > 0) {
      body.businessLicensePicFileId = this.licenseFileList[0].uid;
    }
    if (this.idCardFileList.length > 0) {
      body.legalPersonIdNoPicFileId = this.idCardFileList[0].uid;
    }

    body.bankCardInfo.etpBankName = stepThirdFormValues.bankName;
    body.bankCardInfo.province = stepThirdFormValues.bankProvince;
    body.bankCardInfo.city = stepThirdFormValues.bankCity;
    body.bankCardInfo.etpBranchName = stepThirdFormValues.branchName;
    body.bankCardInfo.etpBankCardName = stepThirdFormValues.bankAccountName;
    body.bankCardInfo.etpBankCardNum = stepOneFormValues.bankAccountNum;

    if (this.bankLicenseFileList.length > 0) {
      body.bankCardInfo.permitPicFileId = this.bankLicenseFileList[0].uid;
    }
    console.log(body);

    this.defaultBusService.showLoading(true);
    this.verifyEtpService.saveOrUpdate(body)
      .ok(data => {
        console.log(data);
        this.doneStatus = 'finish';
        this.current += 1;
      }).error(error => {
        this.uiHelper.msgTipError(error.msg);
      }).final(b => {
        this.defaultBusService.showLoading(false);
      });
  }

  previous() {
    this.current -= 1;
  }

  /**
   * 图片缩略图预览
   */
  handlePreview = async (file: NzUploadFile) => {
    if (file && !file.url && !file.preview) {
      file.preview = await this.utils.getBase64(file.originFileObj);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

  /**
   * 选择开户行回调。
   */
  bankNameSelectChange($event: any) {
  }

  /**
   * 选择省份回调。
   */
  bankProvinceSelectChange($event: any) {
    this.stepThirdForm.patchValue({bankCity: undefined});
    if (!$event) {
      return;
    }
    // 选择省份后，查询出其下面所有城市。
    this.getCityByProvinceList($event);
  }

  /**
   * 选择城市回调。
   */
  bankCitySelectChange($event: any) {
  }

  /**
   * 开户行全称输入搜索事件回调。
   */
  onInputBankFullName($event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (this.branchNameListLoadFlag) {
      return;
    }
    this.getBranchNameTopNumList(value);
  }

  private shakeErrorTipLittleTime(): void {
    this.protocolCheckErrorTipClass = 'shake shake-horizontal shake-constant'
    setTimeout(() => {
      this.protocolCheckErrorTipClass = ''
    }, 400);
  }

  fileUploadChange($event: NzUploadChangeParam, type: number) {
    const result = this.fileUploadHelper.uploadFileHandleChange($event);
    if (result) {
      const file: NzUploadFile = {name: result.oriName, uid: result.id, status: 'done', url: result.url};
      if (type === 1) { // 营业执照
        this.licenseFileList[0] = file;
      }
      if (type === 2) { // 身份证
        this.idCardFileList[0] = file;
      }
      if (type === 3) { // 开户许可证
        this.bankLicenseFileList[0] = file;
      }
    }
  }
}
