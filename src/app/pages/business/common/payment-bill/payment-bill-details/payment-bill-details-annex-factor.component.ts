import { Component, OnInit } from '@angular/core';

// 付款单详情-业务材料（保理商）
@Component({
  selector: 'app-payment-bill-details-annex-factor',
  templateUrl: './payment-bill-details-annex-factor.component.html',
  styleUrls: ['./payment-bill-details-annex-factor.component.less']
})
export class PaymentBillDetailsAnnexFactorComponent implements OnInit {

  // 表格
  listOfAllData: any[] = [1, 1, 1]; // 列表数据
  listLoading = false; // 列表加载等待指示器状态
  pageSize = 50; // 每页条数

  constructor() { }

  ngOnInit(): void {
    this.listOfAllData = [
      {
        id: 1,
        annexTypeName: '中登网查重',
        annexFiles: [
          {
            fileId: 1,
            fileName: '合同.pdf',
            fileUrl:  'https://file2.hlt-factoring.com/data/hlt/2021-05-19/0252e0a2c8e74c80adbe6659458f9ab8.pdf'
          }
        ]
      },
      {
        id: 2,
        annexTypeName: '其它',
        annexFiles: [
          {
            fileId: 1,
            fileName: 'aaa.pdf',
            fileUrl:  'https://file2.hlt-factoring.com/data/hlt/2021-05-19/18bf1c8f90d04a45923a1996e81da4fd.pdf'
          },
          {
            fileId: 1,
            fileName: 'bbbb.pdf',
            fileUrl:  'https://file2.hlt-factoring.com/data/hlt/2021-05-19/18bf1c8f90d04a45923a1996e81da4fd.pdf'
          }
        ]
      }
    ];
  }

  delAnnex(fileId: any) {
    alert('del');
  }
}
