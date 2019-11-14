import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.less']
})
export class AppHeaderComponent implements OnInit {
  constructor() {}

  userTypeName: string;

  ngOnInit() {
    this.userTypeName = '保理商';
  }
}
