import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-financing-bill-contract-two',
  templateUrl: './financing-bill-contract-two.component.html',
  styleUrls: ['./financing-bill-contract-two.component.less']
})
export class FinancingBillContractTwoComponent implements OnInit {

  // 表格
  listOfAllData: any[] = [1, 1, 1]; // 列表数据
  listLoading = false; // 列表加载等待指示器状态
  pageSize = 50; // 每页条数

  constructor() { }

  ngOnInit(): void {
    this.listOfAllData = [
      {
        id: 1,
        fileTypeName: '应收账款转让通知书及回执（适用于保理商向碧桂园下属公司&碧桂园地产出具-转让予计划管理人）',
        fileName: '应收账款转让通知书及回执（适用于保理商向碧桂园下属公司&碧桂园地产出具-转让予计划管理人）-BGY202003-BL-000119S',
        fileUrl:  'https://seal.hlt-factoring.com/pdf/seal/2ecf545185d14c41a18b2e0197493a7f.pdf'
      }
    ];
  }

}
