import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MyValidators} from '../../../../../helpers/MyValidators';
import {AgreementTemplateService} from '../agreement-template.service';
import {ApiPath} from '../../../../../api-path';
import {Api} from '../../../../../helpers/http/api';
import {UIHelper} from '../../../../../helpers/ui-helper';
import {NzFormatEmitEvent} from 'ng-zorro-antd/tree';
import {DefaultBusService} from '../../../../../helpers/event-bus/default-bus.service';
import {environment} from '../../../../../../environments/environment';
import {FileUploadHelper} from '../../../../../helpers/file-upload-helper';
import {NzUploadChangeParam} from 'ng-zorro-antd/upload';
import {HttpUtils} from '../../../../../helpers/http/HttpUtils';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {MediaType} from '../../../../../helpers/http/media-type';

export interface RoleSignSetting {
  role: string,
  roleName: string,
  key: string, // 签署关键字
  signSort: number,
  signXY: SignXY,
  signFlag: boolean
}

export interface SignXY {
  x: string;
  y: string;
}

@Component({
  selector: 'app-agreement-template-details',
  templateUrl: './agreement-template-details.component.html',
  styleUrls: ['./agreement-template-details.component.less']
})
export class AgreementTemplateDetailsComponent implements OnInit {

  // 1-新增；2-编辑；3-查看;4-审核
  @Input() showType = 1;
  // 协议模板信息id
  @Input() id: string;

  @Output() showList = new EventEmitter();

  @ViewChild('bigPdfViewer', {static: true}) public bigPdfViewer;

  uploadFileUrl = environment.apiUrl.concat(ApiPath.sysfilesystem.sysFiles.uploadFile);

  pdfSrc = 'https://seal.hlt-factoring.com/pdf/seal/a3b5c84d70f5479fadf5052dcc2bd6fb.pdf';

  parSearchKey = '';

  cardTitle = '';

  parData: any[];
  parCheckedKeys: any[] = [];

  signTipText = '如果有坐标，将按坐标盖章，否则按关键字盖章';
  templateForm: FormGroup;
  formLabelSpan = 6;
  formControlSpan = 14;

  checkStatus = 1; // 审核状态。1-审核通过；0-审核不通过

  agrTypeBigListAll: any[];
  agrTypeListAll: any[];
  agrSpecifyListAll: any[];

  roleSignSetting: RoleSignSetting[] = []; // 企业角色签章信息
  // private signKeyTextChange = new Subject<RoleSignSetting>();
  private signKeyTextChange = new Subject<string>();

  uploadIcon = 'upload';
  wordTemplateFileInfo: any; // word协议模板文件信息

  constructor(private fb: FormBuilder, private agreementTemplateService: AgreementTemplateService,
              private api: Api, private defaultBusService: DefaultBusService,
              private uiHelper: UIHelper, public fileUploadHelper: FileUploadHelper,
              private httpUtils: HttpUtils) {
    this.templateForm = this.fb.group({
      agrTypeBigId: [null, [MyValidators.required]],
      agrTypeId: [null, [MyValidators.required]],
      agrTypeSpecifyId: [null, [MyValidators.required]],
      agrName: [null, [MyValidators.required]],
      agrVersion: [null, [MyValidators.required]],
      agrTextReadTimeLimit: [null, [MyValidators.positiveInteger]],
      remark: [null, null]
    });
  }

  ngOnInit(): void {
    this.signKeyTextChange.pipe(
      debounceTime(1000), // 等待1s，直到用户停止输入
      distinctUntilChanged()  // 等待，直到内容发生了变化
    ).subscribe(value => {
      console.log(value);
      // TODO 根据关键字获取关键字所在坐标
    });
    this.setCardTitle();
    this.getArgTypes();
    this.setRoleSettingInfo();
    this.getPars();
  }

  getPars() {
    this.agreementTemplateService.getParTreeListAll()
      .ok(data => {
        this.parData = data;
        this.patchSelectTree(this.parData);
        // this.parCheckedKeys = ['531730918432260096'];
      })
      .fail(error => {
      })
      .final(b => {
      });
  }

  private patchSelectTree(treeDataList: any): void {
    if (!treeDataList) {
      return;
    }
    treeDataList.forEach(value => {
      value.key = value.id;
      value.expand = false;
      value.title = `${value.title}-${value.parName}`;
      const children = value.children;
      if (children === null || children === undefined || children.length === 0) {
        value.isLeaf = true;
        value.children = null;
      } else {
        this.patchSelectTree(children);
      }
    });
  }

  setRoleSettingInfo() {
    this.api.post(ApiPath.syscommon.universalDic.getList, {dictType: 'enterprise_type'})
      .ok(data => {
        const id = data[0].id;
        this.api.post(ApiPath.syscommon.universalDicValue.getList, {universalDicId: id})
          .ok(data1 => {
            data1.forEach((etp, index) => {
              const r: RoleSignSetting = {key: '', role: etp.dictValueEnum, roleName: etp.dictLabel, signFlag: false, signSort: 1, signXY: {x: '', y: ''}};
              this.roleSignSetting.push(r);
            });
          })
      })
      .fail(error => {
        console.log(error.msg);
      });
  }

  getArgTypes() {
    this.agreementTemplateService.getArgTypeBigListAll({etpId: this.uiHelper.getCurrentEtpId()})
      .ok(data => {
        this.agrTypeBigListAll = data;
      })
      .fail(error => {
      })
      .final(b => {
      });
  }

  setCardTitle(): void {
    switch (this.showType) {
      case 1:
        this.cardTitle = '新增协议模板';
        break;
      case 2:
        this.cardTitle = '编辑协议模板';
        break;
      case 3:
        this.cardTitle = '协议模板详情';
        break;
      case 4:
        this.cardTitle = '审核协议模板';
        break;
    }
  }

  notEditStyle(b?: boolean): any {
    let style = {};
    if (this.showType === 3) { // 查看不可编辑，其它都可编辑
      if (b) {
        style = {cursor: 'not-allowed'};
      } else {
        style = {'pointer-events': 'none'};
      }
    }
    return style;
  }

  backToList() {
    this.showList.emit();
  }

  agrTypeBigSelect($event: any) {
    this.templateForm.controls.agrTypeId.setValue(null);
    this.agreementTemplateService.getArgTypeListAll(this.uiHelper.getCurrentEtpId(), $event)
      .ok(data => {
        this.agrTypeListAll = data;
      })
      .fail(error => {
      })
      .final(b => {
      });
  }

  agrTypeSelect($event: any) {
    this.templateForm.controls.agrTypeSpecifyId.setValue(null);
    this.agreementTemplateService.getArgTypeSpecifyListAll(this.uiHelper.getCurrentEtpId(), $event)
      .ok(data => {
        this.agrSpecifyListAll = data;
      })
      .fail(error => {
        console.log(error.msg)
      });
  }

  parCheckHandler($event: NzFormatEmitEvent) {
    this.parCheckedKeys = $event.keys;
  }

  reInitData() {
    this.templateForm.reset();
    this.wordTemplateFileInfo = undefined;
  }

  /**
   * 保存数据。
   */
  add() {
    if (this.templateForm.valid) {
      if (this.parCheckedKeys.length === 0) {
        this.uiHelper.msgTipWarning('请选择模板参数域');
        return;
      }
      if (this.roleSignSetting.length === 0) {
        this.uiHelper.msgTipWarning('请设置签署信息');
        return;
      }
      if (!this.wordTemplateFileInfo) {
        this.uiHelper.msgTipWarning('请上传word协议模板文件');
        return;
      }

      // 模板域参数
      const agrTemplateParReqList = [];
      this.parCheckedKeys.forEach(value => {
        const agrTemplatePar: any = {};
        agrTemplatePar.templateParManageId = value;
        agrTemplateParReqList.push(agrTemplatePar);
      });

      // 签章信息
      const agrTemplateSignInfoReqList = [];
      this.roleSignSetting.forEach(value => {
        if (value.signFlag === true) {
          const agrTemplateSignInfo: any = {};
          agrTemplateSignInfo.userType = value.role;
          agrTemplateSignInfo.keyName = value.key;
          agrTemplateSignInfo.posx = value.signXY.x;
          agrTemplateSignInfo.posy = value.signXY.y;
          agrTemplateSignInfo.signSort = value.signSort;
          agrTemplateSignInfoReqList.push(agrTemplateSignInfo);
        }
      });

      const body = this.templateForm.value;
      body.etpId = this.uiHelper.getCurrentEtpId();
      body.agrFileId = this.wordTemplateFileInfo.id;
      body.agrTemplateParReqList = agrTemplateParReqList;
      body.agrTemplateSignInfoReqList = agrTemplateSignInfoReqList;

      this.defaultBusService.showLoading(true);
      this.agreementTemplateService.saveAgrTemplateAll(body)
        .ok(data => {
          console.log(data);
          this.reInitData();
          this.uiHelper.msgTipSuccess('成功');
        })
        .fail(error => {
          this.uiHelper.msgTipError(error.msg);
        })
        .final(b => {
          this.defaultBusService.showLoading(false);
        });
    } else {
      for (const key in this.templateForm.controls) {
        if (this.templateForm.controls.hasOwnProperty(key)) {
          this.templateForm.controls[key].markAsDirty();
          this.templateForm.controls[key].updateValueAndValidity();
        }
      }
    }
  }

  beforeUpload(): any {
    return this.fileUploadHelper.beforeUpload(2, '请上传docx、doc文件', MediaType.DOCX, MediaType.DOC);
  }

  uploadFileHandleChange({file, fileList}: NzUploadChangeParam, isTip?: boolean | false): void {
    this.uploadIcon = 'loading';
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.uploadIcon = 'upload';
      const response = file.response;
      if (!response) {
        if (isTip) {
          this.uiHelper.msgTipError(`${file.name} 文件上传失败`);
        }
        return;
      }

      const success = response.success;
      const code = response.code;
      const msg = response.msg;
      if (success) {
        if (isTip) {
          this.uiHelper.msgTipSuccess(`${file.name} 文件上传成功。`);
        }
        this.wordTemplateFileInfo = response.data;
      } else {
        const b = this.httpUtils.dealError(code, msg);
        if (!b) {
          this.uiHelper.msgTipError(msg);
        }
      }
    }
    if (status === 'error') {
      this.uploadIcon = 'upload';
      if (isTip) {
        this.uiHelper.msgTipError(`${file.name} 文件上传失败`);
      }
    }
  }

  keywordChange(sign: string) {
    this.signKeyTextChange.next(sign);
  }
}
