import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-etp-info',
  templateUrl: './etp-info.component.html',
  styleUrls: ['./etp-info.component.less']
})
export class EtpInfoComponent implements OnInit {

  // 1-企业信息展示页面；2-企业信息编辑页面
  showType = 1;

  constructor() { }

  ngOnInit(): void {
  }

  titleClick(event) {
    this.showType = 2;
  }
}
