import {Component, Input, OnInit} from '@angular/core';
import {PbillDetailsActionTypeEnum} from '../../../../../helpers/enum/pbill-details-action-type-enum';
import {PaymentBillService} from '../payment-bill.service';
import {UserTypeEnum} from '../../../../../helpers/enum/user-type-enum';
import {UIHelper} from '../../../../../helpers/ui-helper';

// 付款单详情-业务材料（项目公司）
@Component({
  selector: 'app-payment-bill-details-annex-supplier',
  templateUrl: './payment-bill-details-annex-supplier.component.html',
  styleUrls: ['./payment-bill-details-annex-supplier.component.less']
})
export class PaymentBillDetailsAnnexSupplierComponent implements OnInit {

  @Input() actionType: PbillDetailsActionTypeEnum;
  @Input() pBillId: string; // 付款单id
  @Input() productId: string; // 付款单关联产品id

  userTypeEnum: typeof  UserTypeEnum = UserTypeEnum;
  etpType = this.uiHelper.getCurrentEtpType(); // 企业类型
  pbillDetailsActionTypeEnum: typeof  PbillDetailsActionTypeEnum = PbillDetailsActionTypeEnum;

  // 表格
  listOfAllData: any[] = []; // 列表数据
  listLoading = false; // 列表加载等待指示器状态
  pageSize = 100; // 每页条数

  constructor(private paymentBillService: PaymentBillService,
              private uiHelper: UIHelper) { }

  ngOnInit(): void {
    this.getUploadAnnexList();

    /*this.listOfAllData = [
      {
        id: 1,
        annexTypeName: '合同的封面及其签章页（若有补充协议，亦请同样上传）',
        annexFiles: [
          {
            fileName: '合同.pdf',
            fileUrl:  'https://file2.hlt-factoring.com/data/hlt/2021-05-19/0252e0a2c8e74c80adbe6659458f9ab8.pdf'
          }
        ]
      },
      {
        id: 2,
        annexTypeName: '发票',
        annexFiles: [
          {
            fileName: '发票1.pdf',
            fileUrl:  'https://file2.hlt-factoring.com/data/hlt/2021-05-19/18bf1c8f90d04a45923a1996e81da4fd.pdf'
          },
          {
            fileName: '发票2.pdf',
            fileUrl:  'https://file2.hlt-factoring.com/data/hlt/2021-05-19/18bf1c8f90d04a45923a1996e81da4fd.pdf'
          },
          {
            fileName: '发票3.pdf',
            fileUrl:  'https://file2.hlt-factoring.com/data/hlt/2021-05-19/18bf1c8f90d04a45923a1996e81da4fd.pdf'
          }
        ]
      },
      {
        id: 3,
        annexTypeName: '业务资质证书',
        annexFiles: [
          {
            fileName: '上传的资质 - 副本,jpg.pdf',
            fileUrl:  'https://file2.hlt-factoring.com/data/hlt/2021-05-19/58859695410e49d6bac99a9fa3615c39.pdf'
          }
        ]
      }
    ];*/
  }

  getUploadAnnexList() {
    this.paymentBillService.getUploadAnnexList(this.productId, this.userTypeEnum.SUPPLIER)
      .ok(data => {
        if (data && data.length > 0) {
          data.forEach(value => {
            value.annexFiles = [
              {
                fileName: '发票1.pdf',
                fileUrl:  'https://file2.hlt-factoring.com/data/hlt/2021-05-19/18bf1c8f90d04a45923a1996e81da4fd.pdf'
              },
              {
                fileName: '发票2.pdf',
                fileUrl:  'https://file2.hlt-factoring.com/data/hlt/2021-05-19/18bf1c8f90d04a45923a1996e81da4fd.pdf'
              },
              {
                fileName: '发票3.pdf',
                fileUrl:  'https://file2.hlt-factoring.com/data/hlt/2021-05-19/18bf1c8f90d04a45923a1996e81da4fd.pdf'
              }
            ];
          });
          this.listOfAllData = data;
        }
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
  }

}
