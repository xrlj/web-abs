import {Component, Input, OnInit} from '@angular/core';
import {PbillDetailsActionTypeEnum} from '../../../../../helpers/enum/pbill-details-action-type-enum';
import {UserTypeEnum} from '../../../../../helpers/enum/user-type-enum';
import {UIHelper} from '../../../../../helpers/ui-helper';

// 付款单详情-业务材料（项目公司）
@Component({
  selector: 'app-payment-bill-details-annex-sub',
  templateUrl: './payment-bill-details-annex-sub.component.html',
  styleUrls: ['./payment-bill-details-annex-sub.component.less']
})
export class PaymentBillDetailsAnnexSubComponent implements OnInit {

  // 表格
  listOfAllData: any[] = [1, 1, 1]; // 列表数据
  listLoading = false; // 列表加载等待指示器状态
  pageSize = 50; // 每页条数

  @Input() actionType: PbillDetailsActionTypeEnum;
  @Input() pBillId: string; // 付款单id

  userTypeEnum: typeof  UserTypeEnum = UserTypeEnum;
  etpType = this.uiHelper.getCurrentEtpType(); // 企业类型

  pbillDetailsActionTypeEnum: typeof  PbillDetailsActionTypeEnum = PbillDetailsActionTypeEnum;

  constructor(private uiHelper: UIHelper) { }

  ngOnInit(): void {
    this.listOfAllData = [
      {
        id: 1,
        annexTypeName: '完整版合同扫描件（若有补充协议，亦请同样上传）',
        annexFiles: [
          {
            fileName: '【合同盖章页扫描】乌鲁木齐碧桂园项目货量区A、B地块剩余楼栋铝合金门窗、防火窗、外墙格栅及A、B、C地块坡道雨棚工程.pdf',
            fileUrl:  'https://seal.hlt-factoring.com/pdf/seal/f41636da5daa475d95f5de0a573804f0.pdf'
          }
        ]
      },
      {
        id: 2,
        annexTypeName: '付款审批单',
        annexFiles: [
          {
            fileName: '付款审批单1.pdf',
            fileUrl:  'https://seal.hlt-factoring.com/pdf/seal/122e9d4c80e3447da12cc80d3a457941.pdf'
          },
          {
            fileName: '付款审批单2.pdf',
            fileUrl:  'https://seal.hlt-factoring.com/pdf/seal/122e9d4c80e3447da12cc80d3a457941.pdf'
          },
          {
            fileName: '付款审批单3.pdf',
            fileUrl:  'https://seal.hlt-factoring.com/pdf/seal/122e9d4c80e3447da12cc80d3a457941.pdf'
          }
        ]
      },
      {
        id: 3,
        annexTypeName: '工程进度款申请支付表',
        annexFiles: [
          {
            fileName: '3、工程进度款申请支付表.pdf',
            fileUrl:  'https://seal.hlt-factoring.com/pdf/seal/4ec2a08e053840aabf6213cb635342ef.pdf'
          }
        ]
      }
    ];
  }

}
