import { Component, OnInit } from '@angular/core';
import {VProductListResp} from '../../../../helpers/vo/resp/v-product-list-resp';
import {Router} from '@angular/router';
import {AppPath} from '../../../../app-path';
import {Api} from '../../../../helpers/http/api';

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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  search(b: boolean = false) {

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

  changShowType(showType: number) {
    this.showType = showType;
  }
}
