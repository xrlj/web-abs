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
import {VBankCardReq} from '../../../helpers/vo/req/v-bank-card-req';
import {Router} from '@angular/router';
import {AppPath} from '../../../app-path';
import {JwtKvEnum} from '../../../helpers/enum/jwt-kv-enum';
import {EnterpriseStatusEnum} from '../../../helpers/enum/enterprise-status-enum';

@Component({
  selector: 'app-verify-etp',
  templateUrl: './verify-etp.component.html',
  styleUrls: ['./verify-etp.component.less']
})
export class VerifyEtpComponent implements OnInit {

  formLabelSpanSize = 9;
  formControlSpanSize = 7;
  enterpriseStatusEnum: typeof  EnterpriseStatusEnum = EnterpriseStatusEnum; // 企业状态枚举

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
              private uiHelper: UIHelper, private router: Router,
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
    if (this.etpStatus === EnterpriseStatusEnum.CHECK_WAIT
      || this.etpStatus === EnterpriseStatusEnum.CHECK_FAILURE) {
      this.getEtpInfo();
    }
  }

  getEtpInfo(): void {
    const userId = this.utils.getJwtTokenClaim(JwtKvEnum.UserId);
    this.commonService.getEtpInfoByUser(userId)
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
    if (!this.etpInfo.extra.bankCard) {
      return;
    }
    const bankCard = this.etpInfo.extra.bankCard;
    this.stepThirdForm.patchValue({
      bankName: bankCard.etpBankName,
      bankProvince: bankCard.province,
      bankCity: bankCard.city,
      branchName: bankCard.etpBranchName,
      bankAccountName: bankCard.etpBankCardName,
      bankAccountNum: bankCard.etpBankCardNum
    });
    const permitPicFile: NzUploadFile = {
      name: bankCard.extra.permitPicFile.oriName, uid: bankCard.extra.permitPicFile.id,
      status: 'done', url: bankCard.extra.permitPicFile.url
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
          const stepOneValues = this.stepOneForm.value;
          this.defaultBusService.showLoading(true);
          this.verifyEtpService.verifyEnterprise({
            name: stepOneValues.etpName,
            codeUSC: stepOneValues.unifyCode,
            legalName: stepOneValues.legalPerson,
            legalIdno: stepOneValues.legalPersonIdNo
          }).ok(data => {
            if (data && data.serviceId) {
              this.current += 1;
              this.patchStepTwo();
            } else {
              this.uiHelper.msgTipError('企业信息有误');
            }
          }).fail(error => {
            this.uiHelper.msgTipError(error.msg);
          }).final(b => {
            this.defaultBusService.showLoading(false);
          });
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
        if (this.stepThirdForm.valid) {
          if (this.bankLicenseFileList.length === 0) {
            this.uiHelper.msgTipWarning('请上传开户许可证图片');
            break;
          }
          this.submit();
        } else {
          for (const key in this.stepThirdForm.controls) {
            this.stepThirdForm.controls[key].markAsDirty();
            this.stepThirdForm.controls[key].updateValueAndValidity();
          }
        }
        break;
    }
  }

  submit(): void {
    const stepOneFormValues = this.stepOneForm.value;
    const stepThirdFormValues = this.stepThirdForm.value;
    const etpReq: VEtpReq = {};
    const vBankCardReq: VBankCardReq = {};
    etpReq.id = this.etpInfo.id;
    etpReq.etpName = stepOneFormValues.etpName;
    etpReq.unifyCode = stepOneFormValues.unifyCode;
    etpReq.legalPerson = stepOneFormValues.legalPerson;
    etpReq.legalPersonIdNo = stepOneFormValues.legalPersonIdNo;
    etpReq.contactName = stepOneFormValues.contactName;
    etpReq.contactMobile = stepOneFormValues.contactMobile;
    etpReq.email = stepOneFormValues.email;
    etpReq.fax = stepOneFormValues.fax;
    etpReq.telephone = stepOneFormValues.telephone;
    etpReq.address = stepOneFormValues.address;
    etpReq.registeredAddress = stepOneFormValues.registeredAddress;

    if (this.licenseFileList.length > 0) {
      etpReq.businessLicensePicFileId = this.licenseFileList[0].uid;
    }
    if (this.idCardFileList.length > 0) {
      etpReq.legalPersonIdNoPicFileId = this.idCardFileList[0].uid;
    }

    // 银行卡信息
    vBankCardReq.id = this.etpInfo.extra.bankCard.id;
    vBankCardReq.etpBankName = stepThirdFormValues.bankName;
    vBankCardReq.province = stepThirdFormValues.bankProvince;
    vBankCardReq.city = stepThirdFormValues.bankCity;
    vBankCardReq.etpBranchName = stepThirdFormValues.branchName;
    vBankCardReq.etpBankCardName = stepThirdFormValues.bankAccountName;
    vBankCardReq.etpBankCardNum = stepThirdFormValues.bankAccountNum;

    if (this.bankLicenseFileList.length > 0) {
      vBankCardReq.permitPicFileId = this.bankLicenseFileList[0].uid;
    }
    etpReq.bankCardInfo = vBankCardReq;
    console.log(etpReq);

    this.defaultBusService.showLoading(true);
    this.verifyEtpService.saveOrUpdate(etpReq)
      .ok(data => {
        console.log(data);
        this.doneStatus = 'finish';
        this.current += 1;
      }).fail(error => {
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
    this.stepThirdForm.patchValue({bankProvince: undefined, bankCity: undefined, branchName: undefined});
  }

  /**
   * 选择省份回调。
   */
  bankProvinceSelectChange($event: any) {
    this.stepThirdForm.patchValue({bankCity: undefined, branchName: undefined});
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
    this.stepThirdForm.patchValue({branchName: undefined});
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

  /**
   * 刷新认证状态。
   */
  refreshStatus(): void {
    this.router.navigateByUrl(AppPath.init);
  }

  /**
   * 验证对公打款金额。
   */
  payAuth(): void {
    if (!this.validPayNum) {
      this.uiHelper.msgTipWarning('请输入验证金额');
      return;
    }
    this.defaultBusService.showLoading(true);
    this.verifyEtpService.checkPayMoney(this.validPayNum, this.utils.getJwtTokenClaim(JwtKvEnum.EnterpriseId))
      .ok(data => {
        if (data.errCode === 0) {
          this.uiHelper.msgTipSuccess(data.msg);
        } else {
          this.uiHelper.msgTipSuccess(data.msg);
        }
        this.router.navigateByUrl(AppPath.init);
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        this.defaultBusService.showLoading(false);
      });
  }
}
