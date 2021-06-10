import { Component, OnInit } from '@angular/core';

// 融资打包
@Component({
  selector: 'app-financing-package',
  templateUrl: './financing-package.component.html',
  styleUrls: ['./financing-package.component.less']
})
export class FinancingPackageComponent implements OnInit {

  // tab
  tabIndex = 0;
  tabTitle = ['待打包', '调整分包'];

  constructor() { }

  ngOnInit(): void {
  }

  search(b: boolean = false) {
  }
}
