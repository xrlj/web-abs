import {Component, OnInit} from '@angular/core';
import {VProductListResp} from '../../../../helpers/vo/resp/v-product-list-resp';
import {AppPath} from '../../../../app-path';
import {ProductService} from './product.service';
import {Utils} from '../../../../helpers/utils';
import {JwtKvEnum} from '../../../../helpers/enum/jwt-kv-enum';
import {UIHelper} from '../../../../helpers/ui-helper';
import {ThemeHelper} from '../../../../helpers/theme-helper';
import {DefaultBusService} from '../../../../helpers/event-bus/default-bus.service';

/**
 * 融资产品管理。
 */
@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.less']
})
export class ProductManageComponent implements OnInit {

  productAddPath = AppPath.productAdd;
  showType = 1; // 1-列表；2-详情

  searchVo: any = {};

  // ====列表
  listOfAllData: VProductListResp[] = [];
  listOfDisplayData: VProductListResp[] = [];
  mapOfCheckedId: { [key: string]: boolean } = {}; // 记录选择
  listLoading = false; // 列表加载等待指示器状态
  // 页码
  pageIndex = 1; // 页码
  pageSize = 10; // 每页条数
  total = 0; // 总条数
  // 选定
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  numberOfChecked = 0;

  productSelectedId: string; // 选定产品id，单挑

  constructor(private productService: ProductService,
              private utils: Utils, public themeHelper: ThemeHelper,
              private uiHelper: UIHelper,
              private defaultBusService: DefaultBusService) {
  }

  ngOnInit(): void {
    this.search();
  }

  search(b: boolean = false) {
    this.searchVo.pageIndex = this.pageIndex;
    this.searchVo.pageSize = this.pageSize;
    this.searchVo.factorId = this.utils.getJwtTokenClaim(JwtKvEnum.EnterpriseId); // 当前登录用户为保理商
    if (b) this.pageIndex = 1;
    this.listLoading = true;
    this.productService.getProductListPage(this.searchVo)
      .ok(data => {
        this.pageIndex = data.pageIndex;
        this.pageSize = data.pageSize;
        this.total = data.total;
        this.listOfAllData = data.list;
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(status => {
        this.listLoading = false;
      });
  }

  /**
   * 表格数据更改时候设定选择信息。保持选择或者取消
   * @param $event 选择事件
   */
  currentPageDataChange($event: VProductListResp[]): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  /**
   * 表格刷新选择信息。
   */
  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData
      .filter(item => !item.disabled)
      .every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.listOfDisplayData.filter(item => !item.disabled).some(item => this.mapOfCheckedId[item.id]) &&
      !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.listOfAllData.filter(item => this.mapOfCheckedId[item.id]).length;
  }

  /**
   * 选择所有。
   * @param value 选择事件
   */
  checkAll(value: boolean): void {
    this.listOfDisplayData.filter(item => !item.disabled).forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }

  startProduct(productId: string, pdtStatus: number) {
    this.updateProductStatus(productId, pdtStatus);
  }

  stopProduct(productId: string, pdtStatus: number) {
    this.uiHelper.modalConfirm('确定停用？')
      .ok(() => {
        this.updateProductStatus(productId, pdtStatus);
      });
  }

  updateProductStatus(productId: string, pdtStatus: number) {
    this.defaultBusService.showLoading(true);
    this.productService.updateProductStatus(productId, pdtStatus)
      .ok(data => {
        if (data) {
          setTimeout(() => {
            this.search();
          }, 100);
        }
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        this.defaultBusService.showLoading(false);
      });
  }

  /**
   * 查看产品详情信息
   * @param id 产品id
   */
  goLookDetails(id: string) {
    this.productSelectedId = id;
    this.showType = 2; // 显示详情ui
  }
}
