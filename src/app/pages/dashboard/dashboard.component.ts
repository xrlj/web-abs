import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  // 公告分页
  pageIndex = 1;
  pageSize = 3;
  total = 10

  constructor() {}

  ngOnInit() {
    // alert('aaa')
  }
}
