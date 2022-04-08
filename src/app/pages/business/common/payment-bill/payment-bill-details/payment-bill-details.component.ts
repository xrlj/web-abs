import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ThemeHelper} from '../../../../../helpers/theme-helper';
import {UserTypeEnum} from '../../../../../helpers/enum/user-type-enum';
import {UIHelper} from '../../../../../helpers/ui-helper';
import {PbillDetailsActionTypeEnum} from '../../../../../helpers/enum/pbill-details-action-type-enum';
import {PaymentBillDetailsInvoiceComponent} from './payment-bill-details-invoice.component';
import {PaymentBillService} from '../payment-bill.service';
import {PbillFromTypeEnum} from '../../../../../helpers/enum/pbill-from-type-enum';

@Component({
  selector: 'app-payment-bill-details',
  templateUrl: './payment-bill-details.component.html',
  styleUrls: ['./payment-bill-details.component.less']
})
export class PaymentBillDetailsComponent implements OnInit {

  userTypeEnum: typeof  UserTypeEnum = UserTypeEnum;
  etpType = this.uiHelper.getCurrentEtpType(); // 企业类型

  // tab
  tabIndex = 0;
  tabTitle = [];

  // 列表进来操作详情类型。
  @Input() actionType: PbillDetailsActionTypeEnum;
  @Input() pbData: any; // 付款单列表项数据

  pbillDetailsActionTypeEnum: typeof  PbillDetailsActionTypeEnum = PbillDetailsActionTypeEnum;
  pbillFromTypeEnum: typeof  PbillFromTypeEnum = PbillFromTypeEnum;

  subRemark: string; // 项目公司提交备注

  @Output() showList = new EventEmitter();

  @ViewChild(PaymentBillDetailsInvoiceComponent)
  private invoiceComponent: PaymentBillDetailsInvoiceComponent;

  invoiceIssueTipText = '是否反馈发票有问题';

  invoiceTitleDesc = `线下与碧桂园确定好已更新好发票，再进行<a id="desc-action-one" (click)="_descActionOne()">发票更新</a>操作`;

  constructor(public themeHelper: ThemeHelper,
              private uiHelper: UIHelper,
              private paymentBillService: PaymentBillService) { }

  ngOnInit(): void {
    if (this.etpType !== this.userTypeEnum.MEMBER && this.etpType !== this.userTypeEnum.SUPPLIER) {
      this.tabTitle = ['付款单', '发票列表', '操作日志'];
    } else {
      this.tabTitle = ['付款单', '发票列表'];
    }

    this.hasInvoiceIssue();
  }

  hasInvoiceIssue() {
    this.paymentBillService.getInvoiceIssueCount(this.pbData.id)
      .ok(data => {
        if (data && data > 0) {
          this.invoiceIssueTipText = `${this.invoiceIssueTipText}: <span style="color: red;">是</span>`;
        }
      });
  }

  tabSwitch() {
  }

  backToList() {
    this.showList.emit();
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
}
