import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {AgreementTemplateComponent} from '../../agreement-template/agreement-template.component';
import {CommonService} from '../../../../../helpers/service/common.service';
import {UIHelper} from '../../../../../helpers/ui-helper';
import {Utils} from '../../../../../helpers/utils';
import {ProductService} from '../product.service';
import {DefaultBusService} from '../../../../../helpers/event-bus/default-bus.service';

// 产品底层协议设置列表
@Component({
  selector: 'app-product-agreement-list',
  templateUrl: './product-agreement-list.component.html',
  styleUrls: ['./product-agreement-list.component.less']
})
export class ProductAgreementListComponent implements OnInit {

  // ====协议模板列表
  listAgreementOfAllData = [];
  listAgreementLoading = false; // 列表加载等待指示器状态

  listDataOriBase64 = ''; // 初始加载的列表数据的base64字符串，用来比较列表数据是否变动

  @Input()
  productId: any;
  @Input()
  showType: any; // 1-新增、编辑；2-查看

  constructor(private modal: NzModalService,
              private viewContainerRef: ViewContainerRef,
              private commonService: CommonService,
              private productService: ProductService,
              private uiHelper: UIHelper,
              private utils: Utils,
              private defaultBusService: DefaultBusService) { }

  ngOnInit(): void {
    this.getProductTemplateAll();
  }

  getProductTemplateAll() {
    this.listAgreementLoading = true;
    this.productService.getProductAgrTemplateList(this.productId)
      .ok(data => {
        const list = [];
        data.forEach(item => {
          const agrTemplateNew: any = {};
          agrTemplateNew.id = item.id;
          agrTemplateNew.agrTemplateId = item.extra.agrTemplate?.id;
          agrTemplateNew.agrName = item.extra.agrTemplate?.agrName;
          agrTemplateNew.agrFileId = item.extra.agrTemplate?.agrFileId;
          agrTemplateNew.agrTypeBig = item.extra.agrTemplate?.agrTypeBig;
          agrTemplateNew.agrType = item.extra.agrTemplate?.agrType;
          agrTemplateNew.agrTypeSpecify = item.extra.agrTemplate?.agrTypeSpecify;
          const signRoles = this.setSignRolesCheckBox(item.extra.agrTemplate?.extra.signInfo)
          agrTemplateNew.signRoles = signRoles;
          agrTemplateNew.groupSort = item.agrGroup;
          agrTemplateNew.internalSort = item.agrGroupSort;

          list.push(agrTemplateNew);
        });
        this.listAgreementOfAllData = list;
        this.reSortList();
        this.listDataOriBase64 = this.utils.base64encoder(JSON.stringify(this.listAgreementOfAllData));
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        this.listAgreementLoading = false;
      });
  }

  del(id: string, agrTemplateId: string) {
    this.uiHelper.modalDel('确定从列表中删除协议模板？')
      .ok(() => {
        if (id) { // 调用接口删除
          this.defaultBusService.showLoading(true);
          this.productService.delBatchProductAgrTemplate(id)
            .ok(data => {
              this.listAgreementOfAllData = this.listAgreementOfAllData.filter(item => item.id !== id);
              this.reSortList();
            })
            .fail(error => {
              this.uiHelper.msgTipError(error.msg);
            })
            .final(b => {
              this.defaultBusService.showLoading(false);
            });
        } else { // 本地删除
          this.listAgreementOfAllData = this.listAgreementOfAllData.filter(item => item.agrTemplateId !== agrTemplateId);
          this.reSortList();
        }
      });
  }

  createAgrComponentModal(): void {
    const modal = this.modal.create({
      nzTitle: '选择产品协议模板',
      nzWidth: '70%',
      nzMaskClosable: false,
      nzCentered: false,
      nzContent: AgreementTemplateComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        selectAgrFlag: true
      },
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 100)),
      // nzOnOk: (componentInstance) => {console.log(componentInstance.showType)},
      nzFooter: [
        {
          label: '取消',
          type: 'default',
          onClick: componentInstance => {
            modal.destroy();
          }
        },
        {
          label: '确定',
          type: 'primary',
          onClick: componentInstance => {
            let isSelected = false;
            let isSelectedName = '';
            for (const key in componentInstance.mapOfCheckedId) {
              if (componentInstance.mapOfCheckedId[key]) {
                const agrTemplate = componentInstance.mapOfCheckedObj[key];
                const item = this.listAgreementOfAllData.find(item => item.agrTemplateId === agrTemplate.id);
                if (item) { // 已经添加过的模板，跳过
                  isSelectedName = item.agrName;
                  continue;
                }

                const agrTemplateNew: any = {};
                agrTemplateNew.id = null;
                agrTemplateNew.agrTemplateId = agrTemplate.id;
                agrTemplateNew.agrName = agrTemplate.agrName;
                agrTemplateNew.agrFileId = agrTemplate.agrFileId;
                agrTemplateNew.agrTypeBig = agrTemplate.agrTypeBig;
                agrTemplateNew.agrType = agrTemplate.agrType;
                agrTemplateNew.agrTypeSpecify = agrTemplate.agrTypeSpecify;
                const signRoles = this.setSignRolesCheckBox(agrTemplate.extra.signRoles);
                agrTemplateNew.signRoles = signRoles;
                agrTemplateNew.groupSort = 1;
                agrTemplateNew.internalSort = 1;
                this.listAgreementOfAllData.push(agrTemplateNew); // 选定的数据
                isSelected = true;
              }
            }
            if (!isSelected) {
              if (isSelectedName === '') {
                this.uiHelper.msgTipWarning('请选择模板');
              } else {
                this.uiHelper.msgTipWarning(`已选择模板【${isSelectedName}】`);
              }
            } else {
              modal.destroy();
              this.reSortList();
            }
          }
        }
      ]
    });
    const instance = modal.getContentComponent();
    modal.afterOpen.subscribe(() => console.log('创建对话框回调!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => console.log('关闭对话框回调:', result));

    // delay until modal instance created
    /*setTimeout(() => {
      instance.subtitle = 'sub title is changed';
    }, 2000);*/
  }

  private setSignRolesCheckBox(signRoles: any): any {
    signRoles.forEach(item => {
      item.label = item.userTypeName;
      item.value = item.id;
      item.disabled = true;
      item.checked = true;
    });

    return signRoles;
  }

  openTemplateFile(agrFileId: string) {
    this.commonService.downloadFileById(agrFileId);
  }

  showSaveBtnVisible(): boolean {
    if (this.listAgreementOfAllData.length === 0
      || this.utils.base64encoder(JSON.stringify(this.listAgreementOfAllData)) === this.listDataOriBase64) {
      return false;
    }
    return true;
  }

  save() {
    const body: any = [];
    this.listAgreementOfAllData.forEach(item => {
      const bodyItem: any = {};
      bodyItem.id = item.id;
      bodyItem.productId = this.productId;
      bodyItem.agreementTemplateId = item.agrTemplateId;
      bodyItem.agrGroup = item.groupSort;
      bodyItem.agrGroupSort = item.internalSort;
      body.push(bodyItem);
    });
    this.defaultBusService.showLoading(true);
    this.productService.saveList(body)
      .ok(data => {
        this.uiHelper.msgTipSuccess('保存成功');
        setTimeout(() => {this.getProductTemplateAll();}, 100);
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        this.defaultBusService.showLoading(false);
      });
  }

  /**
   * 排序列表重新显示。先按组排序，再组内排序。
   */
  reSortList(): void {
    const groupList = this.sortAndGroup(this.listAgreementOfAllData);
    if (groupList && groupList.length > 0) {
      groupList.forEach(item => {
        item.sort((a, b) => {
          return a.internalSort-b.internalSort;
        });
      });

      const listDataNew = [];
      groupList.forEach(item => {
        item.forEach(i => {
          listDataNew.push(i)
        });
      });
      this.listAgreementOfAllData = listDataNew;
    }
  }

  /**
   * 数据数据排序并分组
   * @param sortData 列表数据
   */
  private sortAndGroup(sortData: any[]): any {
    const groupBy = (array: any[], f: any) => {
      const groups: {
        [key: string]: any[];
      } = {};
      array.forEach((item) => {
        const group = JSON.stringify(f(item));
        groups[group] = groups[group] || [];
        groups[group].push(item);
      });
      return Object.keys(groups).map((group) => {
        return groups[group];
      });
    };
    const sorted = groupBy(sortData, (item: any) => {
      return item.groupSort; // 按item对象的groupSort排序并分组
    });
    return sorted;
  }

  /**
   * 是否放弃保存内容。放弃返回true，否则返回false。
   * 新增了模板返回true；内容发生变动返回true
   */
  hasGiveUpSave(): boolean {
    // 添加了新的模板
    const newAgrTemplates = this.listAgreementOfAllData.find(item => item.id === null);
    if (newAgrTemplates) return true;
    // 内容发生变动
    if (this.utils.base64encoder(JSON.stringify(this.listAgreementOfAllData)) !== this.listDataOriBase64) return true;
    return false;
  }

  /**
   * 比较原始加载的列表数据是否已经有所改变
   */
  compareListDataChange(): boolean {
    const listJsonStr = JSON.stringify(this.listAgreementOfAllData);
    this.utils.base64encoder(listJsonStr);
    return false;
  }
}
