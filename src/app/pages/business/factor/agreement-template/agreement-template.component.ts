import {Component, OnInit} from '@angular/core';

/**
 * 协议模板管理。
 */
@Component({
  selector: 'app-agreement-template',
  templateUrl: './agreement-template.component.html',
  styleUrls: ['./agreement-template.component.less']
})
export class AgreementTemplateComponent implements OnInit {

  showType = 1; // 1-显示列表；2-显示详情、新增、编辑页面

  // 表格
  listOfAllData: any[] = [1, 1, 1]; // 列表数据
  listLoading = false; // 列表加载等待指示器状态
  pageIndex = 1; // 页码
  pageSize = 10; // 每页条数
  total = 3; // 总条数

  constructor() { }

  ngOnInit(): void {
  }

  search(b: boolean = false) {
  }

  currentPageDataChange($event: any[]): void {
    this.listOfAllData = $event;
  }

  showDetails(data?: any) {
    this.showType = 2;
  }
}
