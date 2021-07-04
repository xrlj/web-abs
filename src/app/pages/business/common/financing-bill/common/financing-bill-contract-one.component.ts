import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-financing-bill-contract-one',
  templateUrl: './financing-bill-contract-one.component.html',
  styleUrls: ['./financing-bill-contract-one.component.less']
})
export class FinancingBillContractOneComponent implements OnInit {

  // 表格
  listOfAllData: any[] = [1, 1, 1]; // 列表数据
  listLoading = false; // 列表加载等待指示器状态
  pageSize = 50; // 每页条数

  constructor() { }

  ngOnInit(): void {
    this.listOfAllData = [
      {
        id: 1,
        fileTypeName: '《付款确认书》（核心企业向供应商出具）',
        fileName: '《付款确认书》（核心企业向供应商出具）-1111-BL-000001',
        fileUrl:  'https://polycn.hlt-factoring.com/data/hlt/2021-06-25/4f04cddf63be4d63959a6792ce08b23d.pdf'
      },
      {
        id: 2,
        fileTypeName: '公开型无追索权国内保理合同',
        fileName: '公开型无追索权国内保理合同-0014322021060003-BL-014',
        fileUrl:  'https://polycn-seal.hlt-factoring.com/pdf/seal/76d919672de547368cb70cd77a34f602.pdf'
      },
      {
        id: 3,
        fileTypeName: '应收账款转让通知书（供应商、保理商）',
        fileName: '应收账款转让通知书（供应商、保理商）-0014322021060003-BL-014',
        fileUrl:  'https://polycn-seal.hlt-factoring.com/pdf/seal/28cbafdd15f640a5a841c3dffecc574e.pdf'
      },
      {
        id: 4,
        fileTypeName: '应收账款转让通知书回执（核心企业）',
        fileName: '应收账款转让通知书回执（核心企业）-0014322021060003-BL-014',
        fileUrl:  'https://polycn.hlt-factoring.com/data/hlt/2021-06-25/2e81997fc34a4732b6526b93c5e7daae.pdf'
      },
      {
        id: 5,
        fileTypeName: '应收账款转让通知书回执（项目公司）',
        fileName: '应收账款转让通知书回执（项目公司）-0014322021060003-BL-014',
        fileUrl:  'https://polycn.hlt-factoring.com/data/hlt/2021-06-25/7ac5c4f5f630464f818246b8a27c1909.pdf'
      },
    ];
  }

}
