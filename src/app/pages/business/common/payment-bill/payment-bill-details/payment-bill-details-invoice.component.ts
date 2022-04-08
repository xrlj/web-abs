import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PbillDetailsActionTypeEnum} from '../../../../../helpers/enum/pbill-details-action-type-enum';
import {UserTypeEnum} from '../../../../../helpers/enum/user-type-enum';
import {UIHelper} from '../../../../../helpers/ui-helper';
import {PaymentBillService} from '../payment-bill.service';
import {Utils} from '../../../../../helpers/utils';
import {JwtKvEnum} from '../../../../../helpers/enum/jwt-kv-enum';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MyValidators} from '../../../../../helpers/MyValidators';
import {error} from 'protractor';
import {DATE_TIME_FORMAT1, DATE_TIME_FORMAT2, dateTimeToStr1} from '../../../../../helpers/time-utils';
import {PbillFromTypeEnum} from '../../../../../helpers/enum/pbill-from-type-enum';

@Component({
  selector: 'app-payment-bill-details-invoice',
  templateUrl: './payment-bill-details-invoice.component.html',
  styleUrls: ['./payment-bill-details-invoice.component.less']
})
export class PaymentBillDetailsInvoiceComponent implements OnInit {

  // 表格
  listOfAllData: any[] = []; // 列表数据
  listLoading = false; // 列表加载等待指示器状态
  pageIndex = 1; // 页码
  pageSize = 10; // 每页条数
  total = 0;

  @Input() isShowPageChange = false; // 显示位置

  @Input() statisticsShow = false;
  @Input() actionType: PbillDetailsActionTypeEnum;
  @Input() pBillId: string; // 付款单id
  @Input() pBillFromType: PbillFromTypeEnum; // 付款单来源类型

  @Output() moreInvoice = new EventEmitter();

  userTypeEnum: typeof  UserTypeEnum = UserTypeEnum;
  etpType = this.uiHelper.getCurrentEtpType(); // 企业类型

  pbillDetailsActionTypeEnum: typeof  PbillDetailsActionTypeEnum = PbillDetailsActionTypeEnum;
  pbillFromTypeEnum: typeof  PbillFromTypeEnum = PbillFromTypeEnum;

  invoiceListAll = [];
  invoiceNum = 0; // 发票总数
  fpTaxAmountTotal = 0; // 票面总额
  transferableAmountTotal = 0; // 可转让总金额
  transferAmountTotal = 0; // 本次转让总金额

  isShowFeedBackModal = false;
  isFeedBackModalOkLoading = false;
  feedBackContent: string;

  isShowIssueListModal = false;
  listOfIssueAllData = [];
  listIssueLoading = false;
  issueListPageIndex = 1;
  issueListPageSize = 10;
  issueListTotal = 0;

  // 编辑或新增发票
  editType = 1; // 1-新增；2-编辑
  isShowEditModal = false;
  isEditModalOkLoading = false;
  editModalFormGroup: FormGroup;

  spanLabel = 7;
  spanFormControl = 16;

  selectedItemData: any; // 选定发票信息

  // 申请更换发票信息
  isShowApplyReplaceModal = false;
  isApplyReplaceModalOkLoading = false;
  applyReplaceFormGroup: FormGroup;

  constructor(public uiHelper: UIHelper,
              private fb: FormBuilder,
              private service: PaymentBillService,
              private utils: Utils) {
    this.editModalFormGroup = this.fb.group({
      fpCode: [null, [MyValidators.required]],
      fpNumber: [null, [MyValidators.required]],
      fpName: [null, [MyValidators.required]],
      fpTaxAmount: [null, [MyValidators.required]],
      fpAmount: [null, [MyValidators.required]],
      transferableAmount: [null, [MyValidators.required]],
      transferAmount: [null, [MyValidators.required]],
      transferRemainAmount: [null, [MyValidators.required]],
      fpDate: [null, [MyValidators.required]],
      fpCheckCode: [null, null]
    });
    this.applyReplaceFormGroup = this.fb.group({
      fpCode: [null, [MyValidators.required]],
      fpNumber: [null, [MyValidators.required]],
      replaceInvoiceReason: [null, [MyValidators.required]],
    });
  }

  ngOnInit(): void {
    this.search(true);
    this.getInvoiceStatics();
  }

  getInvoiceStatics() {
    this.service.getInvoiceListAllByPbId(this.pBillId)
      .ok(data => {
        if (data && data.length > 0) {
          this.invoiceListAll = data;
        }
      })
      .final(b => {
        if (b) {
          this.invoiceNum = this.invoiceListAll.length;
          // Math.imul()
          this.invoiceListAll.forEach(value => {
            this.fpTaxAmountTotal = this.fpTaxAmountTotal + value.fpTaxAmount;
            this.transferableAmountTotal = this.transferableAmountTotal + value.transferableAmount;
            this.transferAmountTotal = this.transferAmountTotal + value.transferAmount;
          })
        }
      });
  }

  search(b: boolean = false) {
    if (b) this.pageIndex = 1;

    const body: any = {};
    body.pbillId = this.pBillId;
    body.pageIndex = this.pageIndex;
    body.pageSize = this.pageSize;

    this.listLoading = true;
    this.service.getInvoiceListPage(body)
      .ok(data => {
        this.pageIndex = data.pageIndex;
        this.pageSize = data.pageSize;
        this.total = data.total;
        this.listOfAllData = data.list;
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(success => {
        this.listLoading = false;
      });
  }

  /**
   * 编辑发票
   */
  editInvoice(itemData: any) {
    this.selectedItemData = itemData;
    this.editType = 2;
    this.isShowEditModal = true;
    this.editModalFormGroup.patchValue(itemData);
  }

  currentPageDataChange($event: any[]): void {
    this.listOfAllData = $event;
  }

  lookMoreInvoice() {
    this.moreInvoice.next();
  }

  handleFeedBackModalCancel() {
    this.isShowFeedBackModal = false;
    this.feedBackContent = null;
  }

  handleFeedBackModalOk() {
    if (!this.feedBackContent) {
      this.uiHelper.msgTipWarning('请输入反馈内容');
      return;
    }
    this.isFeedBackModalOkLoading = true;
    const body: any = {};
    body.paymentBillId = this.pBillId;
    body.userType = this.uiHelper.getCurrentEtpType();
    body.etpFullName = this.uiHelper.getCurrentEtpName();
    body.userName = this.utils.getJwtTokenClaim(JwtKvEnum.Username);
    body.content = this.feedBackContent;
    this.service.saveInvoiceIssue(body)
      .ok(data => {
        this.uiHelper.msgTipSuccess('反馈成功');
        this.handleFeedBackModalCancel();
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        this.isFeedBackModalOkLoading = false;
      });
  }

  handleIssueListModalCancel() {
    this.isShowIssueListModal = false;
    this.listOfIssueAllData = [];
    this.listIssueLoading = false;
    this.issueListPageIndex = 1;
  }

  searchIssue(b: boolean = false) {
    if (b) this.issueListPageIndex = 1;

    const body: any = {};
    body.pageIndex = this.issueListPageIndex;
    body.pageSize = this.issueListPageSize;
    body.paymentBillId = this.pBillId;

    this.listIssueLoading = true;
    this.service.getInvoiceIssueListPage(body)
      .ok(data => {
        this.issueListPageIndex = data.pageIndex;
        this.issueListPageSize = data.pageSize;
        this.issueListTotal = data.total;
        this.listOfIssueAllData = data.list;
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        this.listIssueLoading = false;
      });
  }

  handleEditModalCancel() {
    this.editType = 1;
    this.isShowEditModal = false;
    this.isEditModalOkLoading = false;
    this.editModalFormGroup.reset();
  }

  handleEditModalOk() {
    const body = this.editModalFormGroup.value;
    body.paymentBillId = this.pBillId;
    body.fpDate = dateTimeToStr1(body.fpDate, DATE_TIME_FORMAT2);
    this.isEditModalOkLoading = true;
    if (this.editType === 1) { // 新增发票
    } else { // 编辑发票
      this.service.updateInvoice(this.selectedItemData.id, body)
        .ok(data => {
          this.handleEditModalCancel();
          this.search(true);
        })
        .fail(error => {
          this.uiHelper.msgTipError(error.msg);
        })
        .final(b => {
          this.isEditModalOkLoading = false;
        });
    }

  }

  transferableAmountChange($event: number) {
    const fpTaxAmount: number = this.editModalFormGroup.value.fpTaxAmount;
    const transferAmount: number = this.editModalFormGroup.value.transferAmount;
    this.editModalFormGroup.controls.transferRemainAmount.patchValue(($event - transferAmount).toFixed(2));
  }

  transferAmountChange($event: number) {
    const transferableAmount: number = this.editModalFormGroup.value.transferableAmount;
    this.editModalFormGroup.controls.transferRemainAmount.patchValue((transferableAmount - $event).toFixed(2));
  }

  /**
   * 校验发票真伪
   */
  verify(data: any) {
    this.uiHelper.modalConfirm('将请求付费接口查验发票真伪，确定？', '发票真伪查验')
      .ok(() => {});
  }

  /**
   * 申请核心企业更换发票信息
   */
  applyNewInvoiceFromCoreApi(data: any) {
    this.selectedItemData = data;
    this.isShowApplyReplaceModal = true;
    this.applyReplaceFormGroup.patchValue(this.selectedItemData);
  }

  handleApplyReplaceModalCancel() {
    this.isShowApplyReplaceModal = false;
    this.isApplyReplaceModalOkLoading = false;
    this.applyReplaceFormGroup.reset();
  }

  handleApplyReplaceModalOk() {

  }

  delInvoice(id: string) {
    this.uiHelper.modalDel('确定要删除该条发票信息？', '删除发票')
      .ok(() => {});
  }
}
