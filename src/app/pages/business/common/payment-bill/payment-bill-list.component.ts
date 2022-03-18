import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PaymentBillService} from './payment-bill.service';
import {Utils} from '../../../../helpers/utils';
import {UIHelper} from '../../../../helpers/ui-helper';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MyValidators} from '../../../../helpers/MyValidators';
import {ProductService} from '../../factor/product-manage/product.service';
import {dateTimeToStr1} from '../../../../helpers/time-utils';
import {CommonService} from '../../../../helpers/service/common.service';
import {NzUploadChangeParam, NzUploadFile} from 'ng-zorro-antd/upload';
import {FileUploadHelper} from '../../../../helpers/file-upload-helper';
import {environment} from '../../../../../environments/environment';
import {ApiPath} from '../../../../api-path';
import {Observable, Observer} from 'rxjs';

@Component({
  selector: 'app-payment-bill-list',
  templateUrl: './payment-bill-list.component.html',
  styleUrls: ['./payment-bill-list.component.less']
})
export class PaymentBillListComponent implements OnInit {

  uploadFileUrl = environment.apiUrl.concat(ApiPath.sysfilesystem.sysFiles.uploadFile);

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
  listOfAllData: any[] = []; // 列表数据
  mapOfCheckedId: { [key: string]: boolean } = {}; // 记录选择
  numberOfChecked = 0;
  listLoading = false; // 列表加载等待指示器状态
  pageIndex = 1; // 页码
  pageSize = 10; // 每页条数
  total = 0; // 总条数

  @Output() detailsLook = new EventEmitter();

  // 接口获取付款单相关
  isShowApiPBillModal = false;
  isApiPBillModalOkLoading = false;
  apiPBillModalForm: FormGroup;
  productList = []; // 保理商产品列表
  productStagingList = []; // 产品分期列表
  productSelected: any; // 最终选定的产品
  productStagingSelected: any; // 最终选定的产品分期

  isShowExcelPBillModal = false;
  isExcelPBillModalOkLoading = false;
  excelPBillModalForm: FormGroup;

  excelPBillFileList: NzUploadFile[] = [];

  constructor(private paymentBillService: PaymentBillService,
              private utils: Utils, private uiHelper: UIHelper,
              private fb: FormBuilder, private commonService: CommonService,
              private productService: ProductService,
              private fileUploadHelper: FileUploadHelper) {

    this.apiPBillModalForm = this.fb.group({
      product: [null, [MyValidators.required]],
      productStaging: [null, [MyValidators.required]],
      pBillDateTime: [null, [MyValidators.required]]
    });

    this.excelPBillModalForm = this.fb.group({
      product: [null, [MyValidators.required]],
      productStaging: [null, [MyValidators.required]]
    });
  }

  ngOnInit(): void {
    this.search();
  }

  search(reset: boolean = false, searchData?: any): void {
    if (reset) this.pageIndex = 1;

    // 搜索条件
    const body: any = searchData ? searchData : {};
    body.pageIndex = this.pageIndex;
    body.pageSize = this.pageSize;
    body.etpId = this.uiHelper.getCurrentEtpId();
    body.etpType = this.uiHelper.getCurrentEtpType();
    body.listType = this.paymentBillMenuType;
    if (this.paymentBillMenuType === 'check') {
      body.pytStatus = 3;
    }
    if (this.paymentBillMenuType === 'review') {
      body.pytStatus = 6;
    }

    this.listLoading = true;
    this.paymentBillService.getPaymentBillListPage(body)
      .ok(data => {
        this.listOfAllData = data.list;
        this.pageIndex = data.pageIndex;
        this.total = data.total;
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        this.listLoading = false;
      });
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
        this.productList = this.productList.filter(value => value.pdtStatus === 1 && value.paymentBillDbSource === 2); // 过滤，只要已经启用的,且是需要接口导入付款单的
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
      debugger;
      par.coreId = this.productSelected.extra.coreId;
      par.factorId = this.productSelected.extra.factorId;
      par.lasttime = '2021-10-02 17:01:53';
      par.endtime = '2021-10-15 17:01:53';
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
    this.productSelected = this.productList.find(value => value.id === $event);
    this.apiPBillModalForm.patchValue({productStaging: null});
    this.productService.getProductStagingListAll($event)
      .ok(data => {
        this.productStagingList = data;
      });
  }

  pBillDateTimeOnChange(result: Date[]) {
    console.log('onChange: ', result);
  }

  productStagingSelect($event: any) {
    this.productStagingSelected = this.productStagingList.find(value => value.id === $event);
  }

  /**
   * 下载付款单导入模板
   */
  downloadTemplate() {
    window.open('/assets/file/付款单导入模板.xlsx');
  }

  importPBillData() {
    this.isShowExcelPBillModal = true;
    this.productService.getProductListAll(this.uiHelper.getCurrentEtpId())
      .ok(data => {
        this.productList = data;
        this.productList = this.productList.filter(value => value.pdtStatus === 1); // 过滤，只要已经启用的
      });
  }

  handleExcelPBillModalCancel() {
    this.isShowExcelPBillModal = false;
    this.excelPBillModalForm.reset();
    this.excelPBillFileList = [];
  }

  handleExcelPBillModalOk() {
    if (this.excelPBillModalForm.valid) {
      if (!this.excelPBillFileList || this.excelPBillFileList.length === 0) {
        this.uiHelper.msgTipWarning('请上传付款单Excel文件');
        return;
      }

      const par: any = {};
      par.coreId = this.productSelected.extra.coreId;
      par.factorId = this.productSelected.extra.factorId;
      par.productId = this.productSelected.id;
      par.productStagingId = this.productStagingSelected.id;
      par.productStagingName = this.productStagingSelected.pdtStagingName;
      par.fileUrl = this.excelPBillFileList[0].url;

      this.isExcelPBillModalOkLoading = true;
      this.paymentBillService.importPaymentBillByExcel(par)
        .ok(data => {
          if (data) {
            this.uiHelper.msgTipSuccess('导入成功');
            this.handleExcelPBillModalCancel();
            setTimeout(() => {
              this.search(true);
            }, 100);
          }
        }).fail(error => {
        this.uiHelper.msgTipError(error.msg);
      }).final(b => {
        this.isExcelPBillModalOkLoading = false;
      });
    } else {
      this.uiHelper.formGroupValid(this.excelPBillModalForm);
    }
  }

  uploadExcelFileChange($event: NzUploadChangeParam) {

    const result = this.fileUploadHelper.uploadFileHandleChange($event);
    if (result) {
      const file: NzUploadFile = {name: result.oriName, uid: result.id, status: 'done', url: result.url};
      this.excelPBillFileList = [];
      this.excelPBillFileList[0] = file;
    }
  }

  beforeUploadExcelFile = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isExcel = file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      if (!isExcel) {
        this.uiHelper.msgTipWarning('请上传Excel格式文件');
        observer.complete();
        return;
      }
      observer.next(isExcel);
      observer.complete();
    });
}
