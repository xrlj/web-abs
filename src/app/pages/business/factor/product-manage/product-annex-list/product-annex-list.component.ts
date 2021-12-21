import {Component, Input, OnInit} from '@angular/core';
import {TransferChange, TransferItem, TransferSelectChange} from 'ng-zorro-antd/transfer';
import {ProductService} from '../product.service';
import {CommonService} from '../../../../../helpers/service/common.service';
import {DefaultBusService} from '../../../../../helpers/event-bus/default-bus.service';
import {UIHelper} from '../../../../../helpers/ui-helper';

@Component({
  selector: 'app-product-annex-list',
  templateUrl: './product-annex-list.component.html',
  styleUrls: ['./product-annex-list.component.less']
})
export class ProductAnnexListComponent implements OnInit {

  @Input()
  productId: string;
  @Input()
  showType: any; // 1-新增、编辑；2-查看

  etpList = [];

  targetKes: string[] = []; // 右边列表的key

  // 穿梭框
  listAnnexTransferData: TransferItem[] = [];
  $asTransferItems = (data: unknown): TransferItem[] => data as TransferItem[];

  constructor(private productService: ProductService,
              private commonService: CommonService,
              private defaultBusService: DefaultBusService,
              public uiHelper: UIHelper) {
  }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.defaultBusService.showLoading(true);
    this.commonService.getDictValueListByType('enterprise_type')
      .ok(data => {
        if (data) {
          this.etpList = data;
        }
        this.getAnnexTypeAll();
      });
  }

  getAnnexTypeAll() {
    this.productService.getAnnexListAll()
      .ok(data => {
        if (data) {
          const dataNew: any = [];
          data.forEach((item, i) => {
            dataNew.push({
              key: item.id,
              title: item.annexTypeName,
              disabled: false,
              checked: false,
              index: i + 1,
              id: null,
              annexTypeId: item.id,
              annexTypeName: item.annexTypeName,
              etpRolesUpload: this.getNewEtpList(this.etpList),
              etpRolesSign: this.getNewEtpList(this.etpList),
              uploadStatus: true,
              productAnnexSort: 1
            });
          });
          this.getProductAnnexList(dataNew);
          // this.listAnnexTransferData = dataNew;
        }
      })
  }

  getProductAnnexList(annexTypeAll: any[]) {
    this.productService.getProductAnnexList(this.productId)
      .ok(data => {
        data.forEach(value => {
          const annexTypeId = value.annexTypeId;
          const dealItem = annexTypeAll.find(item => item.annexTypeId === annexTypeId);
          dealItem.direction = 'right';
          dealItem.id = value.id;
          dealItem.uploadStatus = value.uploadStatus;
          dealItem.productAnnexSort = value.annexSort;
          dealItem.etpRolesUpload = this.getNewEtpList(this.etpList, value.uploadRoles);
          dealItem.etpRolesSign = this.getNewEtpList(this.etpList, value.signRoles);
        });
        this.listAnnexTransferData = annexTypeAll;
      })
      .fail(error => error.msg)
      .final(b => {
        this.defaultBusService.showLoading(false);
      });
  }

  private getNewEtpList(etpList: any[], check?: any[]): any {
    if (!etpList || etpList.length === 0) return [];
    const etpListNew = [];
    etpList.forEach(value => {
      const item = {
        label: value.dictLabel,
        value: value.dictValue,
        dictValueEnum: value.dictValueEnum,
        checked: check ? check.includes(value.dictValueEnum) ? true : false : false,
        disabled: false
      };
      etpListNew.push(item);
    });
    return etpListNew;
  }

  annexSelect($event: TransferSelectChange) {
  }

  annexChange(ret: TransferChange) {
    if (ret.from === 'right') {
      const transferList = ret.list.filter(value => value && value.id !== ''); // 找出有id值的
      const transferIds = transferList.map(value => value.id);
      if (transferIds) {
        this.defaultBusService.showLoading(true);
        this.productService.delProductAnnexByIds(transferIds)
          .ok(data => {
            this.dealTransfer(ret);
          })
          .fail(error => {
            this.uiHelper.msgTipError(error.msg);
          })
          .final(b => {
            this.defaultBusService.showLoading(false);
          });
      } else {
        this.dealTransfer(ret);
      }
    } else {
      this.dealTransfer(ret);
    }
  }

  dealTransfer(ret: TransferChange) {
    const listKeys = ret.list.map(l => l.key);
    const hasOwnKey = (e: TransferItem) => e.hasOwnProperty('key');
    this.listAnnexTransferData = this.listAnnexTransferData.map(e => {
      if (listKeys.includes(e.key) && hasOwnKey(e)) {
        if (ret.to === 'left') {
          delete e.hide;
        } else if (ret.to === 'right') {
          e.hide = false;
        }
      }
      return e;
    });
  }

  save() {
    const targetList = this.listAnnexTransferData.filter(item => item.direction === 'right');
    const targetListNew: any[] = [];
    targetList.forEach(value => {
      let etpRolesUpload = '';
      let etpRolesSign = '';
      value.etpRolesUpload.forEach(value => {
        if (value.checked) {
          etpRolesUpload = etpRolesUpload.concat(value.dictValueEnum).concat(',');
        }
      });
      value.etpRolesSign.forEach(value => {
        if (value.checked) {
          etpRolesSign = etpRolesSign.concat(value.dictValueEnum).concat(',');
        }
      });
      targetListNew.push({
        id: value.id,
        productId: this.productId,
        annexTypeId: value.annexTypeId,
        annexTypeName: value.annexTypeName,
        annexSort: value.productAnnexSort,
        uploadStatus: value.uploadStatus,
        uploadRoles: etpRolesUpload.slice(0, etpRolesUpload.lastIndexOf(',')),
        signRoles: etpRolesSign.slice(0, etpRolesSign.lastIndexOf(','))
      });
    });

    const needUploadRoleCheckTip = targetListNew.find(item => item.uploadRoles === '');
    if (needUploadRoleCheckTip) {
      this.uiHelper.msgTipWarning(`【${needUploadRoleCheckTip.annexTypeName}】请选择上传角色！`);
      return;
    }

    this.defaultBusService.showLoading(true);
    this.productService.saveProductAnnexList(targetListNew)
      .ok(data => {
        this.initData();
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        this.defaultBusService.showLoading(false);
      });
  }

}
