import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

// 详情查看
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.less']
})
export class ProductDetailsComponent implements OnInit {

  @Output() showType = new EventEmitter<number>();

  productId: string;  // 产品id

  tabIndex = 0;
  tabTitle = ['基础信息', '分期信息', '协议模板', '附件管理'];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    console.log('>>>productId:', this.productId);
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
