import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contract-make-search',
  templateUrl: './contract-make-search.component.html',
  styleUrls: ['./contract-make-search.component.less']
})
export class ContractMakeSearchComponent implements OnInit {

  // 分期名称
  stagingName: string;

  constructor() { }

  ngOnInit(): void {
  }

  search() {
  }
}
