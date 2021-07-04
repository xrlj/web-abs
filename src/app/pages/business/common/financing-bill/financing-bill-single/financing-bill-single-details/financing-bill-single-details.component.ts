import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ThemeHelper} from '../../../../../../helpers/theme-helper';

@Component({
  selector: 'app-financing-bill-single-details',
  templateUrl: './financing-bill-single-details.component.html',
  styleUrls: ['./financing-bill-single-details.component.less']
})
export class FinancingBillSingleDetailsComponent implements OnInit {

  @Output() showList = new EventEmitter();

  // tab
  tabIndex = 0;
  tabTitle = ['融资单', '操作日志'];

  constructor(public themeHelper: ThemeHelper) { }

  ngOnInit(): void {
  }

  tabSwitch() {
  }

  backToList() {
    this.showList.emit();
  }

  exportAnnexs() {
    alert('导出付款单');
  }

}
