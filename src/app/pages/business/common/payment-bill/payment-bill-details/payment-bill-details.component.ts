import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ThemeHelper} from '../../../../../helpers/theme-helper';
import {UserTypeEnum} from '../../../../../helpers/enum/user-type-enum';
import {UIHelper} from '../../../../../helpers/ui-helper';
import {PbillDetailsActionTypeEnum} from '../../../../../helpers/enum/pbill-details-action-type-enum';
import {PaymentBillDetailsInvoiceComponent} from './payment-bill-details-invoice.component';
import {PaymentBillService} from '../payment-bill.service';
import {PbillFromTypeEnum} from '../../../../../helpers/enum/pbill-from-type-enum';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultBusService} from '../../../../../helpers/event-bus/default-bus.service';
import {PaymentBillDetailsAnnexSubComponent} from './payment-bill-details-annex-sub.component';
import {PaymentBillDetailsAnnexSupplierComponent} from './payment-bill-details-annex-supplier.component';

@Component({
  selector: 'app-payment-bill-details',
  templateUrl: './payment-bill-details.component.html',
  styleUrls: ['./payment-bill-details.component.less']
})
export class PaymentBillDetailsComponent implements OnInit {

  userTypeEnum: typeof UserTypeEnum = UserTypeEnum;
  etpType = this.uiHelper.getCurrentEtpType(); // 企业类型

  // tab
  tabIndex = 0;
  tabTitle = [];

  // 数据。
  actionType: PbillDetailsActionTypeEnum;
  pbData!: any; // 付款单列表项数据
  pbillFromType: PbillFromTypeEnum;
  pbId: string; // 付款单id

  pbillDetailsActionTypeEnum: typeof PbillDetailsActionTypeEnum = PbillDetailsActionTypeEnum;
  pbillFromTypeEnum: typeof PbillFromTypeEnum = PbillFromTypeEnum;

  submitRemark: string; // 提交资料备注,项目公司、供应商等提交资料

  @ViewChild(PaymentBillDetailsInvoiceComponent)
  private invoiceComponent: PaymentBillDetailsInvoiceComponent;
  @ViewChild(PaymentBillDetailsAnnexSubComponent)
  private annexSubComponent: PaymentBillDetailsAnnexSubComponent;
  @ViewChild(PaymentBillDetailsAnnexSupplierComponent)
  private annexSupplierComponent: PaymentBillDetailsAnnexSupplierComponent;

  invoiceIssueTipText = '是否反馈发票有问题';

  invoiceTitleDesc = `线下与碧桂园确定好已更新好发票，再进行<a id="desc-action-one" (click)="_descActionOne()">发票更新</a>操作`;

  constructor(public themeHelper: ThemeHelper, private router: Router,
              private uiHelper: UIHelper, private route: ActivatedRoute,
              private paymentBillService: PaymentBillService,
              private defaultBusService: DefaultBusService) {
  }

  ngOnInit(): void {
    if (this.etpType !== this.userTypeEnum.MEMBER && this.etpType !== this.userTypeEnum.SUPPLIER) {
      this.tabTitle = ['付款单', '发票列表', '操作日志'];
    } else {
      this.tabTitle = ['付款单', '发票列表'];
    }
    // 获取跳转参数
    this.pbId = this.route.snapshot.paramMap.get('id');
    this.actionType = +this.route.snapshot.paramMap.get('actionType'); // actionType字符串转数字
    this.getPBDetailsInfo(this.pbId);
  }

  getPBDetailsInfo(pbId: string) {
    this.paymentBillService.getPaymentBillDetails(pbId)
      .ok(data => {
        this.pbData = data;
        this.pbillFromType = this.pbData.paymentBillDbSource;
        if (this.pbData.hasInvoiceIssue) {
          this.invoiceIssueTipText = `${this.invoiceIssueTipText}: <span style="color: red;">是</span>`;
        }
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      });
  }

  tabSwitch() {
  }

  close() {
    this.defaultBusService.closeTabUrl(this.router.url);
  }

  /**
   * 保理商上传补充文件。
   */
  uploadSupplementAnnex() {

  }

  exportAnnexs() {
    alert('导出付款单');
  }

  setCardTitle() {
    let titleName = '';
    switch (this.actionType) {
      case PbillDetailsActionTypeEnum.LOOK:
        titleName = '付款单详情';
        break;
      case PbillDetailsActionTypeEnum.EDIT:
        titleName = '编辑付款单';
        break;
      case PbillDetailsActionTypeEnum.SUBMIT_SRC:
        titleName = '提交付款单审核资料';
        break;
      case PbillDetailsActionTypeEnum.CHECK:
        titleName = '审核付款单';
        break;
      case PbillDetailsActionTypeEnum.CHECK_AGAIN:
        titleName = '复核付款单';
        break;
    }
    return titleName;
  }

  /**
   * 新增发票
   */
  invoiceAdd() {
    this.invoiceComponent.isShowEditModal = true;
  }

  updatePBInvoiceInfoFromApi() {
    this.uiHelper.modalConfirm('该操作将会重新从碧桂园获取数据。会覆盖掉以前的发票信息。您确定要继续进行操作吗？', '发票更新')
      .ok(() => {
        alert('aa');
      });
  }

  /**
   * 提交付款单资料
   */
  submitMaterial() {
    let must = null;
    if (this.uiHelper.getCurrentEtpType() === this.userTypeEnum.MEMBER) {
      must = this.annexSubComponent.listOfAllData.filter(value => value.uploadStatus)
    }
    if (this.uiHelper.getCurrentEtpType() === this.userTypeEnum.SUPPLIER) {
      must = this.annexSupplierComponent.listOfAllData.filter(value => value.uploadStatus)
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < must.length; i++) {
      const v = must[i];
      if (v.annexFiles && v.annexFiles.length > 0) {
        continue;
      }
      this.uiHelper.msgTipWarning(`缺少必传附件：${v.annexTypeName}`);
      return;
    }

    this.uiHelper.modalConfirm('确定提交保理商审核？')
      .ok(() => {
        // 构造请求参数
        const body: any = {id: this.pbId};
        if (this.uiHelper.getCurrentEtpType() === this.userTypeEnum.MEMBER) {
          body.subRemark = this.submitRemark;
        }
        if (this.uiHelper.getCurrentEtpType() === this.userTypeEnum.SUPPLIER) {
          body.supplierRemark = this.submitRemark;
        }

        this.defaultBusService.showLoading(true);
        this.paymentBillService.submitMaterial(this.uiHelper.getCurrentEtpType(), body)
          .ok(data => {
            if (data) {
              // 关闭
              this.defaultBusService.closeTabUrl(this.router.url);
              this.defaultBusService.refreshPBillListAction();
            }
          })
          .fail(error => {
            this.uiHelper.msgTipError(error.msg)
          })
          .final(b => {
            this.defaultBusService.showLoading(false);
          });
      });
  }
}
