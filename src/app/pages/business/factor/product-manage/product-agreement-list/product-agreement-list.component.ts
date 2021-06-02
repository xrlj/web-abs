import { Component, OnInit } from '@angular/core';

// 产品底层协议设置列表
@Component({
  selector: 'app-product-agreement-list',
  templateUrl: './product-agreement-list.component.html',
  styleUrls: ['./product-agreement-list.component.less']
})
export class ProductAgreementListComponent implements OnInit {

  // ====协议模板列表
  listAgreementOfAllData: any[] = [1];
  listAgreementLoading = false; // 列表加载等待指示器状态

  // 后台接口返回
  checkOptionsOne = [
    {label: '保理商', value: 'Apple', checked: true, disabled: true},
    {label: '供应商', value: 'Apple', disabled: true},
    {label: '核心企业', value: 'Pear', disabled: true},
    {label: '项目公司', value: 'Orange', disabled: true}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
