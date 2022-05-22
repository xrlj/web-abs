import {Component, Input, OnInit} from '@angular/core';
import {PbillDetailsActionTypeEnum} from '../../../../../helpers/enum/pbill-details-action-type-enum';
import {PaymentBillService} from '../payment-bill.service';
import {UserTypeEnum} from '../../../../../helpers/enum/user-type-enum';
import {UIHelper} from '../../../../../helpers/ui-helper';
import {environment} from '../../../../../../environments/environment';
import {ApiPath} from '../../../../../api-path';
import {MediaType} from '../../../../../helpers/http/media-type';
import {FileUploadHelper} from '../../../../../helpers/file-upload-helper';
import {NzUploadChangeParam} from 'ng-zorro-antd/upload';
import {CommonService} from '../../../../../helpers/service/common.service';
import {DefaultBusService} from '../../../../../helpers/event-bus/default-bus.service';

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

  userTypeEnum: typeof UserTypeEnum = UserTypeEnum;
  etpType = this.uiHelper.getCurrentEtpType(); // 企业类型
  pbillDetailsActionTypeEnum: typeof PbillDetailsActionTypeEnum = PbillDetailsActionTypeEnum;

  // 表格
  listOfAllData: any[] = []; // 列表数据
  listLoading = false; // 列表加载等待指示器状态
  pageSize = 1000; // 每页条数

  uploadFileUrl = environment.apiUrl.concat(ApiPath.sysfilesystem.sysFiles.uploadFile);
  uploadAnnexFileFailTip = '附件上传失败';

  constructor(private paymentBillService: PaymentBillService,
              private uiHelper: UIHelper,
              private fileUploadHelper: FileUploadHelper,
              private commonService: CommonService,
              private defaultBusService: DefaultBusService) {
  }

  ngOnInit(): void {
    this.getUploadAnnexList();
  }

  getUploadAnnexList() {
    this.paymentBillService.getUploadAnnexList(this.productId, this.userTypeEnum.SUPPLIER)
      .ok(data => {
        if (data && data.length > 0) {
          this.listOfAllData = data;
          this.getSubAnnexFiles();
        }
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
  }

  /**
   * 获取已经上传的附件文件列表。并匹配显示在对应附件字典下。
   */
  private getSubAnnexFiles() {
    this.paymentBillService.getPytBillAnnexFileList(this.pBillId, UserTypeEnum.SUPPLIER)
      .ok(data => {
        this.listOfAllData.forEach(value => {
          const list = data.filter(value1 => value1.annexId === value.id);
          const annexFiles = [];
          list.forEach(v => {
              annexFiles.push({fileName: v.vsysFileResp.oriName, fileUrl: this.uiHelper.getFileUrl(v.vsysFileResp.path), id: v.id})
            }
          );
          value.annexFiles = annexFiles;
        });
      });
  }

  beforeUpload() {
    return this.fileUploadHelper.beforeUpload(80, '请上传doc、jpg、png或者pdf文件',
      MediaType.DOCX,
      MediaType.DOC,
      MediaType.APPLICATION_PDF_VALUE,
      MediaType.JPG,
      MediaType.PNG);
  }

  uploadFileChange({file, fileList}: NzUploadChangeParam, annexId) {
    this.defaultBusService.showLoading(true);
    const result = this.fileUploadHelper.uploadFileHandleChange({file, fileList});
    if (result) {
      const fileType = file.type;
      if (fileType === MediaType.JPG || fileType === MediaType.PNG) {
        // 转成pdf
        this.commonService.imgToPdf(result.url, result.oriName)
          .ok(data => {
            this.savePBillAnnexFile(data.id, annexId);
          })
          .fail(error => {
            console.log(`图片转换pdf失败::${error.msg}`);
            this.uiHelper.msgTipError(this.uploadAnnexFileFailTip);
          })
          .final(b => {
            if (!b) {
              this.defaultBusService.showLoading(false);
            }
          });
      } else if (fileType === MediaType.DOC || fileType === MediaType.DOCX) {
        // 转成pdf
        this.commonService.docToPdf(result.url, result.oriName)
          .ok(data => {
            this.savePBillAnnexFile(data.id, annexId);
          })
          .fail(error => {
            console.log(`doc转pdf失败::${error.msg}`);
            this.uiHelper.msgTipError(this.uploadAnnexFileFailTip);
          })
          .final(b => {
            if (!b) {
              this.defaultBusService.showLoading(false);
            }
          });
      } else { // pdf 直接保存,无需再转换文件格式
        this.savePBillAnnexFile(result.id, annexId);
      }
    } else {
      if (file.status !== 'uploading') {
        this.defaultBusService.showLoading(false);
        this.uiHelper.msgTipError(this.uploadAnnexFileFailTip);
      }
    }
  }

  private savePBillAnnexFile(_fileId: string, _annexId: string) {
    const body: any = {
      paymentBillId: this.pBillId,
      annexId: _annexId,
      userType: this.uiHelper.getCurrentEtpType(),
      etpId: this.uiHelper.getCurrentEtpId(),
      fileId: _fileId
    };
    this.paymentBillService.savPytBillAnnexFile(body)
      .ok(data => {
        // 刷新列表
        this.refreshAnnexFileList();
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        this.defaultBusService.showLoading(false);
      })
  }

  private refreshAnnexFileList() {
    setTimeout(() => {
      this.getSubAnnexFiles();
    }, 100);
  }

  delAnnexFile(annexFileId: string) {
    this.uiHelper.modalDel('确定删除附件？')
      .ok(() => {
        this.defaultBusService.showLoading(true);
        this.paymentBillService.delPytBillAnnexFile([annexFileId])
          .ok(data => {
            if (data) {
              this.refreshAnnexFileList();
            }
          })
          .fail(error => {
            this.uiHelper.msgTipError(error.msg);
          })
          .final(b => {
            this.defaultBusService.showLoading(false);
          });
      })
  }
}
