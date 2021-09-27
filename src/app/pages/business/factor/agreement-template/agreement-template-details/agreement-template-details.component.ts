import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MyValidators} from '../../../../../helpers/MyValidators';
import {AgreementTemplateService} from '../agreement-template.service';
import {ApiPath} from '../../../../../api-path';
import {Api} from '../../../../../helpers/http/api';
import {UIHelper} from '../../../../../helpers/ui-helper';

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

  pdfSrc = 'https://seal.hlt-factoring.com/pdf/seal/a3b5c84d70f5479fadf5052dcc2bd6fb.pdf';

  parSearchKey = '';

  cardTitle = '';

  parData: any[];

  signTipText = '如果有坐标，将按坐标盖章，否则按关键字盖章';
  templateForm: FormGroup;
  formLabelSpan = 6;
  formControlSpan = 14;

  checkStatus = 1; // 审核状态。1-审核通过；0-审核不通过

  agrTypeBigListAll: any[];
  agrTypeListAll: any[];
  agrSpecifyListAll: any[];

  roleSignSetting: any[] = []; // 企业角色签章信息

  constructor(private fb: FormBuilder, private agreementTemplateService: AgreementTemplateService,
              private api: Api, private uiHelper: UIHelper) {
    this.templateForm = this.fb.group({
      agrBigType: [null, [MyValidators.required]],
      agrType: [null, [MyValidators.required]],
      agrSpecify: [null, [MyValidators.required]],
      agrName: [null, [MyValidators.required]],
      agrVersion: [null, [MyValidators.required]],
      agrTextReadTimeLimit: [null, [MyValidators.positiveInteger]],
      remark: [null, null]
    });
  }

  ngOnInit(): void {
    this.setCardTitle();
    this.getArgTypes();
    this.setRoleSettingInfo();
    this.getPars();
  }

  getPars() {
    this.agreementTemplateService.getParTreeListAll()
      .ok(data => {
        this.parData = data;
        this.uiHelper.patchSelectTree(this.parData);
        console.log(this.parData);
      })
      .fail(error => {})
      .final(b => {});
  }

  setRoleSettingInfo() {
    this.api.post(ApiPath.syscommon.universalDic.getList, {dictType: 'enterprise_type'})
      .ok(data => {
        const id = data[0].id;
        this.api.post(ApiPath.syscommon.universalDicValue.getList, {universalDicId: id})
          .ok(data1 => {
            data1.forEach((etp, index) => {
              const r: RoleSignSetting = {key: '', role: etp.dictValueEnum, roleName: etp.dictLabel, signFlag: false, signSort: 1, signXY: {x: '', y: ''}};
              this.roleSignSetting[index] = r;
            });
          })
      })
      .fail(error => {
        console.log(error.msg);
      });
  }

  getArgTypes() {
    this.agreementTemplateService.getArgTypeBigListAll({})
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
    this.templateForm.controls.agrType.setValue(null);
    this.agreementTemplateService.getArgTypeListAll($event)
      .ok(data => {
        this.agrTypeListAll = data;
      })
      .fail(error => {
      })
      .final(b => {
      });
  }

  agrTypeSelect($event: any) {
    this.templateForm.controls.agrSpecify.setValue(null);
    this.agreementTemplateService.getArgTypeSpecifyListAll($event)
      .ok(data => {
        this.agrSpecifyListAll = data;
      })
      .fail(error => {
        console.log(error.msg)
      });
  }
}
