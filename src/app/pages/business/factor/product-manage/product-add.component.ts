import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MyValidators} from '../../../../helpers/MyValidators';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultBusService} from '../../../../helpers/event-bus/default-bus.service';
import {CommonService} from '../../../../helpers/service/common.service';
import {ProductService} from './product.service';
import {Utils} from '../../../../helpers/utils';
import {JwtKvEnum} from '../../../../helpers/enum/jwt-kv-enum';
import {EtpManageService} from '../customer/etp-manage/etp-manage.service';
import {UIHelper} from '../../../../helpers/ui-helper';
import {AppPath} from '../../../../app-path';

// 融资产品新增、编辑
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.less']
})
export class ProductAddComponent implements OnInit {

  index = 0;

  productId: string;  // 产品id

  tabIndex = 0;
  tabTitle = [{name: '基础信息', disable: false},  {name: '分期信息', disable: false}, {name: '协议模板', disable: false}, {name: '附件管理', disable: false}];

  ptBasicInfoForm: FormGroup;

  pdtStatus = []; // 产品状态字典
  paymentBillDbSource = []; // 付款单数据源字典
  paymentBillTransferNum = []; // 付款单转让次数字典
  TWO_TRANSFER: any; // 转让次数，第二次转让对象
  pdtEdNature = []; // 产品额度性质字典
  fpdtType = []; // 产品类型列表
  fpdtTypeABSSelect = false;

  // 当前保理商信息
  factoringEtpName = '';
  factoringEtpId = '';

  // 核心企业
  etpCores: any = [];
  // 资金管理人
  etpSPVs: any = [];
  // 债务加入方
  etpCoreDebts: any = [];
  // 律师事务所
  etpLawOffices: any = [];

  // 产品基础信息对象
  productBasicInfo: any;

  constructor(private route: ActivatedRoute, private fb: FormBuilder,
              private defaultBusService: DefaultBusService,
              private commonService: CommonService,
              private productService: ProductService,
              private etpManageService: EtpManageService,
              public utils: Utils, private uiHelper: UIHelper,
              private router: Router) {
    this.ptBasicInfoForm = this.fb.group({
      ptName: [null, [MyValidators.required, MyValidators.maxLength(80)]],
      ptCode: [null, [MyValidators.required,MyValidators. maxLength(40)]],
      ptComment: [null, [MyValidators.maxLength(255)]],
      ptStatus: [null, [MyValidators.required]],
      ptType: [null, [MyValidators.required]],
      ptPeriodsNum: [null, [MyValidators.positiveInteger]],
      ptFactor: [{value: null, disabled: true}, [MyValidators.required]],
      ptSPV: [null, null],
      ptCore: [null, [MyValidators.required]],
      ptCoreDebt: [null, null],
      lawOffice: [null, null],
      ptQuota: [null, [MyValidators.decimal, MyValidators.maxLength(15)]],
      ptContractQuota: [null, [MyValidators.decimal, MyValidators.maxLength(15)]],
      ptPaymentBillQuota: [null, [MyValidators.decimal, MyValidators.maxLength(15)]],
      ptQuotaNature: [null, null],
      ptQuotaDeadline: [null, [MyValidators.decimal, MyValidators.positiveInteger, MyValidators.maxLength(1)]],
      ptBuyDiscount: [null, [MyValidators.decimal]],
      ptYearRate: [null, [MyValidators.decimal]],
      ptCostPeriod: [null, [MyValidators.positiveInteger]],
      ptSellDiscount: [null, [MyValidators.decimal]],
      ptIssuanceAmount: [null, [MyValidators.decimal]],
      ptGraceDeadline: [null, [MyValidators.positiveInteger]],
      pbDataSource: [null, [MyValidators.required]],
      pbSellNum: [null, [MyValidators.required]]
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    console.log('>>>productId:', this.productId);
    this.setTabsStatus();

    // 初始化产品状态字典
    this.commonService.getDictValueListByType('pdt_status').ok(data => this.pdtStatus = data);
    // 产品类别
    this.productService.getFpdtTypeListAll().ok(data => this.fpdtType = data);
    // 数据源
    this.commonService.getDictValueListByType('payment_bill_db_source').ok(data => this.paymentBillDbSource = data);
    // 转让次数
    this.commonService.getDictValueListByType('payment_bill_transfer_num').ok(data => this.paymentBillTransferNum = data);
    // 产品额度性质
    this.commonService.getDictValueListByType('product_ed_nature').ok(data => this.pdtEdNature = data);

    // 保理商
    this.factoringEtpName = this.utils.getJwtTokenClaim(JwtKvEnum.EnterpriseName);
    this.factoringEtpId = this.utils.getJwtTokenClaim(JwtKvEnum.EnterpriseId);
    this.ptBasicInfoForm.patchValue({ptFactor: this.factoringEtpId});

    // 核心企业
    this.etpManageService.getAllByEtp({pageIndex: 1, pageSize: 100, holderEtpId: this.factoringEtpId, userType: 2}).ok(data => this.etpCores = data.list);
    // SVP
    this.etpManageService.getAllByEtp({pageIndex: 1, pageSize: 100, holderEtpId: this.factoringEtpId, userType: 7}).ok(data => this.etpSPVs = data.list);
    // 债务加入方
    this.etpManageService.getAllByEtp({pageIndex: 1, pageSize: 100, holderEtpId: this.factoringEtpId, userType: 5}).ok(data => this.etpCoreDebts = data.list);
    // 律师事务所
    this.etpManageService.getAllByEtp({pageIndex: 1, pageSize: 100, holderEtpId: this.factoringEtpId, userType: 6}).ok(data => this.etpLawOffices = data.list);

    if (this.productId && this.productId !== '0') {
      this.defaultBusService.showLoading(true);
      this.productService.getProductBasicById(this.productId)
        .ok(data => {
            this.productBasicInfo = data;
        })
        .fail(error => {
          this.uiHelper.msgTipError(error.msg);
        })
        .final(b => {
          this.defaultBusService.showLoading(false);
        });
    }

  }

  setTabsStatus() {
    this.tabTitle.forEach((value, index1) => {
      if (this.productId && this.productId === '0') { // 新增
        if (index1 === 0) {
          value.disable = false;
        } else {
          value.disable = true;
        }
      } else { // 编辑
        value.disable = false;
      }
    });
  }

  getContent(tabIndex: number) {
  }

  /**
   * 保存或者更新产品基础信息。
   * 1-新增；2-更新
   */
  saveProductBasicInfo(addOrUpdate: number = 1) {

    if (this.ptBasicInfoForm.valid) {

      // 组装请求body数据
      const value = this.ptBasicInfoForm.value;
      const body: any = {}
      if (addOrUpdate === 2) body.id = this.productId;
      body.pdtName = value.ptName;
      body.pdtCode = value.ptCode;
      body.pdtStatus = value.ptStatus;
      body.fpdtTypeId = value.ptType;
      body.pdtPeriodsNum = value.ptPeriodsNum;
      body.pdtDesc = value.ptComment;
      body.factorId = this.factoringEtpId;
      body.coreId = value.ptCore;
      body.coreDebtorId = value.ptCoreDebt;
      body.spvId = value.ptSPV;
      body.lawId = value.lawOffice;
      body.totalFinancingMoney = value.ptQuota;
      body.totalReceivableMoney = value.ptPaymentBillQuota;
      body.totalContractMoney = value.ptContractQuota;
      body.pdtQuotaTimeLimit = value.ptQuotaDeadline;
      body.pdtEdNature = value.ptQuotaNature;
      body.buyDiscount = value.ptBuyDiscount;
      body.selloutDiscount = value.ptSellDiscount;
      body.yearRate = value.ptYearRate;
      body.issuanceAmount = value.ptIssuanceAmount;
      body.useTimeLimit = value.ptCostPeriod;
      body.graceTimeLimit = value.ptGraceDeadline;
      body.paymentBillDbSource = value.pbDataSource;
      body.paymentBillTransferNum = value.pbSellNum;
      body.creatorId = this.utils.getJwtTokenClaim(JwtKvEnum.UserId);

      // 发起请求
      this.defaultBusService.showLoading(true);
      if (addOrUpdate === 1) { // 新增请求
        this.productService.addProductBasicInfo(body)
          .ok(data => {
            if (data && data !== '0') {
              this.uiHelper.msgTipSuccess('保存成功');
              this.productId = data;
              this.defaultBusService.closeTabUrl(this.router.url);
              this.router.navigate([`${AppPath.productAdd}/${this.productId}`]);
            } else {
              this.uiHelper.msgTipError('保存失败')
            }
          })
          .fail(error => error.msg)
          .final(b => this.defaultBusService.showLoading(false));
      } else { // 更新请求

      }
    } else {
      for (const key in this.ptBasicInfoForm.controls) {
        this.ptBasicInfoForm.controls[key].markAsDirty();
        this.ptBasicInfoForm.controls[key].updateValueAndValidity();
      }
    }
  }

  ptTypeChange($event: any) {
    if ($event) {
      const abs = this.fpdtType.find(item => item.id === $event);
      if (abs.pdtTypeName === 'ABS') {
        this.fpdtTypeABSSelect = true;
        this.TWO_TRANSFER = this.paymentBillTransferNum.find(item => item.dictValueEnum === 'TWO_TRANSFER');
        this.ptBasicInfoForm.patchValue({pbSellNum: this.TWO_TRANSFER.dictValue});
      } else {
        this.fpdtTypeABSSelect = false;
        this.ptBasicInfoForm.patchValue({pbSellNum: null});
      }
    } else {
      this.fpdtTypeABSSelect = false;
      this.ptBasicInfoForm.patchValue({pbSellNum: null});
    }
  }

  closeTab() {
    this.defaultBusService.closeTabUrl(this.router.url);
  }
}
