import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PaymentBillService} from './payment-bill.service';
import {Utils} from '../../../../helpers/utils';
import {UIHelper} from '../../../../helpers/ui-helper';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MyValidators} from '../../../../helpers/MyValidators';
import {ProductService} from '../../factor/product-manage/product.service';
import {DatePipe} from '@angular/common';
import {dateTimeToStr1, getCurrentTime} from '../../../../helpers/time-utils';

@Component({
  selector: 'app-payment-bill-list',
  templateUrl: './payment-bill-list.component.html',
  styleUrls: ['./payment-bill-list.component.less']
})
export class PaymentBillListComponent implements OnInit {

  // 0-付款单管理; 1-融资打包，待打包；2-融资打包，调整分包
  @Input()
  fromViewType: number;

  // all-付款单查询；check-付款单审核；review-付款单复核；
  @Input()
  paymentBillMenuType: string;

  // 表格
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: any[] = [];
  listOfAllData: any[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]; // 列表数据
  mapOfCheckedId: { [key: string]: boolean } = {}; // 记录选择
  numberOfChecked = 0;
  listLoading = false; // 列表加载等待指示器状态
  pageIndex = 1; // 页码
  pageSize = 10; // 每页条数
  total = 20; // 总条数

  @Output() detailsLook = new EventEmitter();

  // 接口获取付款单相关
  isShowApiPBillModal = false;
  isApiPBillModalOkLoading = false;
  apiPBillModalForm: FormGroup;
  productList = []; // 保理商产品列表
  productStagingList = []; // 产品分期列表

  constructor(private paymentBillService: PaymentBillService,
              private utils: Utils, private uiHelper: UIHelper,
              private fb: FormBuilder,
              private productService: ProductService) {

    this.apiPBillModalForm = this.fb.group({
      product: [null, [MyValidators.required]],
      productStaging: [null, [MyValidators.required]],
      pBillDateTime: [null, [MyValidators.required]]
    });
  }

  ngOnInit(): void {
  }

  search(reset: boolean = false): void {
  }

  refreshStatus() {
    this.isAllDisplayDataChecked = this.listOfDisplayData
      .filter(item => !item.disabled)
      .every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.listOfDisplayData.filter(item => !item.disabled).some(item => this.mapOfCheckedId[item.id]) &&
      !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.listOfAllData.filter(item => this.mapOfCheckedId[item.id]).length;
  }

  currentPageDataChange($event: any[]): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.filter(item => !item.disabled).forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }

  details(data: any) {
    this.detailsLook.emit(data);
  }

  /**
   * 审核付款单
   * @param id 付款单id
   */
  checkPaymentBill(id) {
  }

  /**
   * 复核付款单
   * @param id 付款单id
   */
  reviewPaymentBill(id) {
  }

  getPaymentBillFromApi() {
    this.isShowApiPBillModal = true;

    this.productService.getProductListAll(this.uiHelper.getCurrentEtpId())
      .ok(data => {
        this.productList = data;
        this.productList = this.productList.filter(value => value.pdtStatus === 1); // 过滤，只要已经启用的
      });
  }

  handleApiPBillModalCancel() {
    this.isShowApiPBillModal = false;
    this.apiPBillModalForm.reset();
  }

  handleApiPBillModalOk() {
    if (this.apiPBillModalForm.valid) {
      const pBillDateTime = this.apiPBillModalForm.value.pBillDateTime;
      console.log('pbillTime start:', dateTimeToStr1(pBillDateTime[0]));
      console.log('pbillTime end:', dateTimeToStr1(pBillDateTime[1]));
      const par: any = {};
      par.coreId = '481389268183285760';
      par.unifyCode = '91440606338202486K';
      par.factorId = '480609425531338752';
      par.lasttime = '2021-10-02 17:01:53';
      // par.endtime = '2021-12-03 17:01:53';
      par.uuid = '413DF899-BE51-4842-AF84-82BF3808ECAF';
      par.isall = 'true';
      par.productId = this.apiPBillModalForm.value.product;
      par.productStagingId = this.apiPBillModalForm.value.productStaging;
      this.isApiPBillModalOkLoading = true;
      this.paymentBillService.getPaymentBillFromApi(this.utils.base64encoder(JSON.stringify(par)))
        .ok(data => {
          console.log(data);
        })
        .fail(error => {
          this.uiHelper.msgTipError(error.msg);
        })
        .final(b => {
          this.isApiPBillModalOkLoading = false;
        });
    } else {
      this.uiHelper.formGroupValid(this.apiPBillModalForm);
    }
  }

  /**
   * 选择产品回调
   * @param $event 产品id
   */
  productSelect($event: any) {
    if (!$event) return;
    this.apiPBillModalForm.patchValue({productStaging: null});
    this.productService.getProductStagingListAll($event)
      .ok(data => {
        console.log(data);
        this.productStagingList = data;
      });
  }

  pBillDateTimeOnChange(result: Date[]) {
    console.log('onChange: ', result);
  }
}
