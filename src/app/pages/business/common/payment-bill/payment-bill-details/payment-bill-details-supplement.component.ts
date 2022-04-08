import {Component, Input, OnInit} from '@angular/core';
import {PbillDetailsActionTypeEnum} from '../../../../../helpers/enum/pbill-details-action-type-enum';
import {PbillFromTypeEnum} from '../../../../../helpers/enum/pbill-from-type-enum';
import {UserTypeEnum} from '../../../../../helpers/enum/user-type-enum';
import {UIHelper} from '../../../../../helpers/ui-helper';

// 付款单详情-业务材料(补充文件)
@Component({
  selector: 'app-payment-bill-details-supplement',
  templateUrl: './payment-bill-details-supplement.component.html',
  styleUrls: ['./payment-bill-details-supplement.component.less']
})
export class PaymentBillDetailsSupplementComponent implements OnInit {

  // 表格
  listOfAllData: any[] = [1, 1, 1]; // 列表数据
  listLoading = false; // 列表加载等待指示器状态
  pageSize = 50; // 每页条数

  // 后台接口返回
  checkOptionsOne = [
    {label: '保理商', value: 'factoring', checked: true},
    {label: '供应商', value: 'supplier'},
    {label: '核心企业', value: 'Core'},
    {label: '项目公司', value: 'subCompany'}
  ];

  @Input() actionType: PbillDetailsActionTypeEnum;
  @Input() pBillId: string; // 付款单id
  @Input() pBillFromType: PbillFromTypeEnum; // 付款单来源类型

  pbillDetailsActionTypeEnum: typeof  PbillDetailsActionTypeEnum = PbillDetailsActionTypeEnum;
  pbillFromTypeEnum: typeof  PbillFromTypeEnum = PbillFromTypeEnum;

  userTypeEnum: typeof  UserTypeEnum = UserTypeEnum;
  etpType = this.uiHelper.getCurrentEtpType(); // 企业类型

  constructor(public uiHelper: UIHelper) { }

  ngOnInit(): void {
    this.listOfAllData = [
      {
        id: 1,
        annexTypeName: '【合同】补充协议',
        annexFiles: [
          {
            fileId: 1,
            fileName: '补充协议.pdf',
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
            fileName: '801S210111040319乌鲁木齐雅安鼎能塑钢门窗有限公司-账户确认函.pdf',
            fileUrl:  'https://seal.hlt-factoring.com/pdf/seal/bde80229e46e47dfa564803e9d29c939.pdf'
          }
        ]
      }
    ];
  }

}
