import {Component, Input, OnInit} from '@angular/core';
import {PbillDetailsActionTypeEnum} from '../../../../../helpers/enum/pbill-details-action-type-enum';
import {UserTypeEnum} from '../../../../../helpers/enum/user-type-enum';
import {UIHelper} from '../../../../../helpers/ui-helper';
import {PaymentBillService} from '../payment-bill.service';
import {environment} from '../../../../../../environments/environment';
import {ApiPath} from '../../../../../api-path';
import {NzUploadChangeParam} from 'ng-zorro-antd/upload';
import {MediaType} from '../../../../../helpers/http/media-type';
import {FileUploadHelper} from '../../../../../helpers/file-upload-helper';
import {DefaultBusService} from '../../../../../helpers/event-bus/default-bus.service';
import {CommonService} from '../../../../../helpers/service/common.service';

// 付款单详情-业务材料（项目公司）
@Component({
  selector: 'app-payment-bill-details-annex-sub',
  templateUrl: './payment-bill-details-annex-sub.component.html',
  styleUrls: ['./payment-bill-details-annex-sub.component.less']
})
export class PaymentBillDetailsAnnexSubComponent implements OnInit {

  @Input() actionType: PbillDetailsActionTypeEnum;
  @Input() pBillId: string; // 付款单id
  @Input() productId: string; // 付款单关联产品id

  // 表格
  listOfAllData: any[] = []; // 列表数据
  listLoading = false; // 列表加载等待指示器状态
  pageSize = 100; // 每页条数

  userTypeEnum: typeof  UserTypeEnum = UserTypeEnum;
  etpType = this.uiHelper.getCurrentEtpType(); // 企业类型

  pbillDetailsActionTypeEnum: typeof  PbillDetailsActionTypeEnum = PbillDetailsActionTypeEnum;

  uploadFileUrl = environment.apiUrl.concat(ApiPath.sysfilesystem.sysFiles.uploadFile);
  // annexFileList: NzUploadFile[] = [];

  constructor(private uiHelper: UIHelper, private fileUploadHelper: FileUploadHelper,
              private paymentBillService: PaymentBillService, private defaultBusService: DefaultBusService,
              private commonService: CommonService) { }

  ngOnInit(): void {
    this.getSubUploadAnnexList();
    /*this.listOfAllData = [
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
    ];*/
  }

  getSubUploadAnnexList() {
    this.paymentBillService.getUploadAnnexList(this.productId, this.userTypeEnum.MEMBER)
      .ok(data => {
        if (data && data.length > 0) {
          data.forEach(value => {
            value.annexFiles = [
              {
                fileName: '3、工程进度款申请支付表.pdf',
                fileUrl:  'https://seal.hlt-factoring.com/pdf/seal/4ec2a08e053840aabf6213cb635342ef.pdf'
              },
              {
                fileName: '付款审批单2.pdf',
                fileUrl:  'https://seal.hlt-factoring.com/pdf/seal/122e9d4c80e3447da12cc80d3a457941.pdf'
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

  beforeUpload() {
    return this.fileUploadHelper.beforeUpload(80, '请上传doc、jpg、png或者pdf文件', MediaType.DOCX, MediaType.DOC, MediaType.APPLICATION_PDF_VALUE, MediaType.JPG, MediaType.PNG);
  }

  uploadFileChange($event: NzUploadChangeParam, annexId) {
    debugger;
    let result;
    const  fileType = $event.file.type;
    if (fileType === MediaType.JPG || fileType === MediaType.PNG) {
    } else if (fileType === MediaType.DOC || fileType === MediaType.DOCX) {
    } else { // pdf
      result = this.fileUploadHelper.uploadFileHandleChange($event, true, this.defaultBusService);
    }
    result = this.fileUploadHelper.uploadFileHandleChange($event, true, this.defaultBusService);
    if (result) {
      const suffix: string = result.suffix;
      if (suffix.startsWith('doc')) {
        this.commonService.docToPdf(result.url, result.oriName)
          .ok(data => {
            console.log(data);
          })
          .fail(error => {
            this.uiHelper.msgTipError('doc转pdf失败');
          })
          .final(b => {
            this.defaultBusService.showLoading(false);
          });
      } else if (suffix === 'jpg' || suffix === 'png') {
        this.commonService.imgToPdf(result.url, result.oriName)
          .ok(data => {
            console.log(data);
          })
          .fail(error => {
            this.uiHelper.msgTipError('图片转换pdf失败');
          })
          .final(b => {
            this.defaultBusService.showLoading(false);
          });
      } else {
        this.defaultBusService.showLoading(false);
      }
    } else {
      this.defaultBusService.showLoading(false);
    }
  }
}
