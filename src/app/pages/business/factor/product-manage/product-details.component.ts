import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DefaultBusService} from '../../../../helpers/event-bus/default-bus.service';
import {ProductService} from './product.service';
import {UIHelper} from '../../../../helpers/ui-helper';

// 详情查看
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.less']
})
export class ProductDetailsComponent implements OnInit {

  @Output() showType = new EventEmitter<number>();

  @Input()
  productId: string;  // 产品id

  tabIndex = 0;
  tabTitle = ['基础信息', '分期信息', '协议模板', '附件管理'];

  productBasicInfo: any; // 产品基础信息详情

  constructor(private defaultBusService: DefaultBusService,
              private productService: ProductService,
              private uiHelper: UIHelper) {
  }

  ngOnInit(): void {
    console.log('>>>productId:', this.productId);
    this.getProductBasicInfo();
  }

  getProductBasicInfo() {
    this.defaultBusService.showLoading(true);
    this.productService.getProductBasicById(this.productId)
      .ok(data => {
        this.productBasicInfo = data;
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        this.defaultBusService.showLoading(false);
      });
  }

  backToList() {
    this.showType.emit(1);
  }

  getTabContent(index) {
  }

  log(value: object[]): void {
    console.log(value);
  }
}
