import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-user-task-export',
  templateUrl: './user-task-export.component.html',
  styleUrls: ['./user-task-export.component.less']
})
export class UserTaskExportComponent implements OnInit {

  searchFormGroup!: FormGroup;

  // 表格
  listOfDisplayData: any[] = [];
  listOfAllData: any[] = [1, 1, 1]; // 列表数据
  listLoading = false; // 列表加载等待指示器状态
  pageIndex = 1; // 页码
  pageSize = 10; // 每页条数
  total = 10; // 总条数

  constructor(private fb: FormBuilder) {
    this.searchFormGroup = this.fb.group({
      taskType: [null, null],
      taskStatus: [null, null]
    });
  }

  ngOnInit(): void {
  }

  resetForm() {
    this.searchFormGroup.reset();
  }

  search(b: boolean = false) {

  }

  currentPageDataChange($event: any[]): void {
    this.listOfDisplayData = $event;
  }

}
