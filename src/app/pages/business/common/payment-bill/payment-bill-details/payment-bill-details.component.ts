import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ThemeHelper} from '../../../../../helpers/theme-helper';

@Component({
  selector: 'app-payment-bill-details',
  templateUrl: './payment-bill-details.component.html',
  styleUrls: ['./payment-bill-details.component.less']
})
export class PaymentBillDetailsComponent implements OnInit {

  // tab
  tabIndex = 0;
  tabTitle = ['付款单', '操作日志'];

  // 1-付款详情查看；2-付款单编辑
  actionType = 1;

  @Output() showList = new EventEmitter();

  constructor(public themeHelper: ThemeHelper) { }

  ngOnInit(): void {
  }

  tabSwitch() {
  }

  backToList() {
    this.showList.emit();
  }

  /**
   * 发票问题反馈信息查看
   */
  invoiceFeedbackInfo() {
    alert('查看发票问题反馈');
  }

  /**
   * 保理商上传补充文件。
   */
  uploadSupplementAnnex() {

  }

  exportAnnexs() {
    alert('导出付款单');
  }
}
