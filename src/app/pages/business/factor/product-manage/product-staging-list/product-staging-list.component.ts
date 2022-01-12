import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MyValidators} from '../../../../../helpers/MyValidators';
import {CommonService} from '../../../../../helpers/service/common.service';
import {Utils} from '../../../../../helpers/utils';
import {ProductService} from '../product.service';
import {JwtKvEnum} from '../../../../../helpers/enum/jwt-kv-enum';
import {DefaultBusService} from '../../../../../helpers/event-bus/default-bus.service';
import {UIHelper} from '../../../../../helpers/ui-helper';
import {ThemeHelper} from '../../../../../helpers/theme-helper';

// 产品分期列表
@Component({
  selector: 'app-product-staging-list',
  templateUrl: './product-staging-list.component.html',
  styleUrls: ['./product-staging-list.component.less']
})
export class ProductStagingListComponent implements OnInit {

  @Input()
  showType: number; // 1-编辑；2-查看
  @Input()
  productId: string; // 产品id
  @Input()
  buyDiscount: string; // 产品买入折扣，从产品信息带过默认为分期买入折扣

  // ====产品分期列表
  listOfAllData: any[] = [];
  listLoading = false; // 列表加载等待指示器状态
  pageIndex = 1; // 页码
  pageSize = 10; // 每页条数
  total = 0; // 总条数

  // 新增编辑对话框
  addOrEditForm: FormGroup;
  isShowAddOrEditModal = false;
  modalType = 1; // 1-新增；2-编辑
  isModalOkLoading = false;
  formLabelSpan = 6;
  formControlSpan = 14;

  pdtStagingStatuses = []; // 分期状态字典值

  selectedId: string; // 选中记录id
  detailsInfo: any;

  constructor(private fb: FormBuilder,
              private commonService: CommonService,
              private utils: Utils, private uiHelper: UIHelper,
              private productService: ProductService,
              private defaultBusService: DefaultBusService,
              public themeHelper: ThemeHelper) {
    this.addOrEditForm = this.fb.group({
      pdtStagingName: [null, [MyValidators.required, MyValidators.maxLength(80)]],
      pdtStagingStatus: [null, [MyValidators.required]],
      buyDiscount: [null, [MyValidators.required, MyValidators.decimal]],
      foundDate: [null, null],
      selloutDiscount: [null, [MyValidators.decimal]],
      expiryDate: [null, null],
      pdtStagingDesc: [null, [MyValidators.maxLength(200), MyValidators.minLength(5)]],
    });
  }

  ngOnInit(): void {
    // 获取分期状态字典
    this.commonService.getDictValueListByType('pdt_staging_status').ok(data => {
      this.pdtStagingStatuses = data
    });

    this.getListPage();
  }

  getListPage() {
    this.listLoading = true;
    this.productService.getProductStagingListPage({pageIndex: this.pageIndex, pageSize: this.pageSize, productId: this.productId})
      .ok(data => {
        this.listOfAllData = data.list;
        this.pageIndex = data.pageIndex;
        this.pageSize = data.pageSize;
        this.total = data.total;
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        this.listLoading = false;
      });
  }

  /**
   * 新增分期
   */
  add() {
    this.isShowAddOrEditModal = true;
    this.modalType = 1;
    this.addOrEditForm.controls.pdtStagingStatus.setValue(this.pdtStagingStatuses[0]?.dictValue);
    this.addOrEditForm.controls.pdtStagingStatus.disable({onlySelf: true}); // 设置不可编辑
    // 设置买入折扣
    if (this.buyDiscount) this.addOrEditForm.controls.buyDiscount.setValue(this.buyDiscount);
  }

  /**
   * 编辑
   */
  edit(id: string) {
    this.defaultBusService.showLoading(true);
    this.productService.getProductStagingInfo(id)
      .ok(data => {
        this.isShowAddOrEditModal = true;
        this.modalType = 2;
        this.selectedId = id;
        data.buyDiscount = data.buyDiscount?.toString();
        data.selloutDiscount = data.selloutDiscount?.toString();
        this.detailsInfo = data;
        this.addOrEditForm.patchValue(data);
        this.addOrEditForm.controls.pdtStagingStatus.disable({onlySelf: true}); // 设置不可编辑
      })
      .fail(e => {
        this.uiHelper.msgTipError(e.msg);
      }).final(b => {
        this.defaultBusService.showLoading(false);
    });
  }

  handleCancel() {
    this.isShowAddOrEditModal = false;
    this.addOrEditForm.reset();
  }

  handleOk(modalType: number) {
    if (this.addOrEditForm.valid) {
      const body = this.addOrEditForm.value;
      body.creatorId = this.utils.getJwtTokenClaim(JwtKvEnum.UserId);
      body.productId = this.productId;
      this.defaultBusService.showLoading(true);
      if (modalType === 1) {
        body.pdtStagingStatus = this.pdtStagingStatuses[0]?.dictValue;
        this.productService.addProductStaging(body)
          .ok(data => {
            console.log('>>>>新增分期id：', data);
            this.handleCancel();
            this.getListPage();
          })
          .fail(error => {
            this.uiHelper.msgTipError(error.msg);
          })
          .final(b => {
            this.defaultBusService.showLoading(false);
          });
      } else {
        body.id = this.selectedId;
        body.pdtStagingStatus = this.detailsInfo.pdtStagingStatus;
        this.productService.updateProductStaging(body)
          .ok(data => {
            this.uiHelper.msgTipSuccess('更新成功');
            this.handleCancel();
            this.getListPage();
          })
          .fail(error => {
            this.uiHelper.msgTipError(error.msg);
          })
          .final(b => {
            this.defaultBusService.showLoading(false);
          });
      }
    } else {
      this.uiHelper.formGroupValid(this.addOrEditForm);
    }
  }

  delProductStaging(...ids: string[]) {
    if (!ids || ids.length === 0) return;
    this.uiHelper.modalDel('确定删除分期？')
      .ok(() => {
        this.defaultBusService.showLoading(true);
        // @ts-ignore
        this.productService.delProductStaging(ids)
          .ok(data => {
            this.getListPage();
          })
          .fail(error => {
            this.uiHelper.msgTipError(error.msg);
          })
          .final(b => {
            this.defaultBusService.showLoading(false);
          });
      });
  }

  notEditStyle(b?: boolean): any {
    let style = {};
    if (this.showType === 2) { // 查看不可编辑，其它都可编辑
      if (b) {
        style = {cursor: 'not-allowed'};
      } else {
        style = {'pointer-events': 'none'};
      }
    }
    return style;
  }
}
