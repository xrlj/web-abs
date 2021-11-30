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
}
