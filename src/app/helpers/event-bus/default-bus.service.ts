import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {VPdfShow} from '../vo/v-pdf-show';

/**
 * 整个应用的事件总线。父组件与子孙组件整个组件家族双向通讯。
 */
@Injectable({
  providedIn: 'root'
})
export class DefaultBusService {

  // 监测是否显示对话框。
  private loadingSpin = new Subject<boolean>();
  loadingSpin$ = this.loadingSpin.asObservable();

  // 监测是否显示pdf文件浏览器。
  private pdfShow = new Subject<VPdfShow>();
  pdfShow$ = this.pdfShow.asObservable();

  // 关闭body上的快捷tab
  private closeTab = new Subject<string>();
  closeTab$ = this.closeTab.asObservable();
  // 更改body上快捷tab的标题
  private updateTabTitle = new Subject<string>();
  updateTabTitle$ = this.updateTabTitle.asObservable();

  // ===========业务组件之间传参 start

  // 付款单状态
  private pBillStatus = new Subject<number>();
  pBillStatus$ = this.pBillStatus.asObservable();

  // 付款单供应商状态
  private pBillSupplierStatus = new Subject<number>();
  pBillSupplierStatus$ = this.pBillSupplierStatus.asObservable();

  // 付款单项目公司状态
  private pBillSubStatus = new Subject<number>();
  pBillSubStatus$ = this.pBillSubStatus.asObservable();

  // 刷新付款单列表
  private refreshPBillList = new Subject<number>();
  refreshPBillList$ = this.refreshPBillList.asObservable();

  // ===========业务组件之间传参 end

  // 是否显示加载等待对话框
  showLoading(isLoading: boolean) {
    this.loadingSpin.next(isLoading);
  }

  // 打开pdf预览
  showPdf(vPdfShow: VPdfShow): void {
    this.pdfShow.next(vPdfShow);
  }

  // 关闭快捷tab
  closeTabUrl(url: string) {
    this.closeTab.next(url);
  }
  // 更改快捷tab上的tab标题
  updateTabTile(title: string) {
    this.updateTabTitle.next(title);
  }

  // 付款单主状态跳转查询
  goSearchPBillByStatus(status: number) {
    this.pBillStatus.next(status);
  }

  // 付款单供应商状态跳转查询
  goSearchPBillBySupplierStatus(status: number) {
    this.pBillSupplierStatus.next(status);
  }

  // 付款单项目公司状态跳转查询
  goSearchPBillBySubStatus(status: number) {
    this.pBillSubStatus.next(status);
  }

  refreshPBillListAction() {
    this.refreshPBillList.next();
  }
}
