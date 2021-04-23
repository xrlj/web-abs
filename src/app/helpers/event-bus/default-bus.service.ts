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

  // private pdfShowSign = new Subject<VPdfShow>();
  // pdfShowSign$ = this.pdfShowSign.asObservable();

  // 是否显示加载等待对话框
  showLoading(isLoading: boolean) {
    this.loadingSpin.next(isLoading);
  }

  // 打开pdf预览
  showPdf(vPdfShow: VPdfShow): void {
    this.pdfShow.next(vPdfShow);
  }

  // showPdfSign(vPdfShow: VPdfShow): void {
  //   this.pdfShowSign.next(vPdfShow);
  // }
}
