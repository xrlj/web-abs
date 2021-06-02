import {Component, EventEmitter, OnInit, Output} from '@angular/core';

// 详情查看
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.less']
})
export class ProductDetailsComponent implements OnInit {

  @Output() showType = new EventEmitter<number>();

  tabIndex = 0;
  tabTitle = ['基础信息', '分期信息', '协议模板', '附件管理'];

  constructor() {
  }

  ngOnInit(): void {
  }

  backToList() {
    this.showType.emit(1);
  }

  getContent(index) {
  }

  log(value: object[]): void {
    console.log(value);
  }
}
