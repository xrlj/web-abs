import { Component, OnInit } from '@angular/core';

// 核心操作日志
@Component({
  selector: 'app-core-operate-log',
  templateUrl: './core-operate-log.component.html',
  styleUrls: ['./core-operate-log.component.less']
})
export class CoreOperateLogComponent implements OnInit {

  // 表格
  listOfDisplayData: any[] = [];
  listOfAllData: any[] = [1, 1, 1]; // 列表数据
  mapOfCheckedId: { [key: string]: boolean } = {}; // 记录选择
  numberOfChecked = 0;
  listLoading = false; // 列表加载等待指示器状态
  pageIndex = 1; // 页码
  pageSize = 10; // 每页条数
  total = 3; // 总条数

  constructor() { }

  ngOnInit(): void {
  }

  search(reset: boolean = false): void {
  }

  currentPageDataChange($event: any[]): void {
    this.listOfDisplayData = $event;
  }

}
