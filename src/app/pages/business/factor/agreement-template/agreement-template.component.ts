import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AgreementTemplateSearchComponent} from './agreement-template-search.component';
import {AgreementTemplateService} from './agreement-template.service';
import {UIHelper} from '../../../../helpers/ui-helper';
import {CommonService} from '../../../../helpers/service/common.service';
import {UiTableHelper} from '../../../../helpers/ui-table-helper';

/**
 * 协议模板管理。
 */
@Component({
  selector: 'app-agreement-template',
  templateUrl: './agreement-template.component.html',
  styleUrls: ['./agreement-template.component.less']
})
export class AgreementTemplateComponent implements OnInit {

  @Input()
  selectAgrFlag = false;

  showType = 1; // 1-显示列表；2-显示详情、新增、编辑页面

  // 表格
  listOfAllData: any[] = []; // 列表数据
  listLoading = false; // 列表加载等待指示器状态
  pageIndex = 1; // 页码
  pageSize = 10; // 每页条数
  total = 0; // 总条数

  // 列表选定
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: any[] = [];
  mapOfCheckedId: { [key: string]: boolean } = {}; // 记录选择id
  mapOfCheckedObj: { [key: string]: any } = {}; // 记录选择对象
  numberOfChecked = 0; // 每页选择的记录

  selectedId: string;
  detailsType: number;

  @ViewChild(AgreementTemplateSearchComponent)
  private agreementTemplateSearchComponent: AgreementTemplateSearchComponent;

  // 查询条件对象
  searchParBody = {
    pageIndex: this.pageIndex,
    pageSize: this.pageSize,
    agrTypeBigId: null,
    agrTypeId: null,
    agrTypeSpecifyId: null,
    agrName: null,
    agrStatus: null,
    agrVersion: null
  };
  // 回写查询条件
  searchData: any;

  constructor(private agreementTemplateService: AgreementTemplateService,
              private uiHelper: UIHelper, private commonService: CommonService,
              private uiTableHelper: UiTableHelper) { }

  ngOnInit(): void {
    this.search(null);
  }

  search(searchData, reSearch = false) {
    if (reSearch) {
      this.pageIndex = 1;
    }

    if (searchData) {
      this.searchData = searchData;

      this.searchParBody.agrTypeBigId = searchData.agrBigType;
      this.searchParBody.agrTypeId = searchData.agrType;
      this.searchParBody.agrTypeSpecifyId = searchData.agrSpecify;
      this.searchParBody.agrName = searchData.agrName;
      this.searchParBody.agrStatus = searchData.agrTemplateStatus;
      this.searchParBody.agrVersion = searchData.agrVersion;
    }
    this.searchParBody.pageIndex = this.pageIndex;
    this.searchParBody.pageSize = this.pageSize;
    if (this.selectAgrFlag) {
      // 选择模板，只能选择状态为已生效的。生效的值为2，注意和字段设置的一致
      this.searchParBody.agrStatus = 2;
    }

    this.listLoading = true;
    this.agreementTemplateService.getAgrTemplateListPage(this.searchParBody)
      .ok(data => {
        this.pageIndex = data.pageIndex;
        this.pageSize = data.pageSize;
        this.total = data.total;
        this.listOfAllData = this.uiTableHelper.tableListDataAddCheckDisablePar(data.list);
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        this.listLoading = false;
      });
  }

  currentPageDataChange($event: any[]): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  showDetails(detailsType: number, data?: any) {
    this.detailsType = detailsType;
    if (data) {
      this.selectedId = data.id;
    }
    this.showType = 2;
  }

  refreshUI() {
    this.agreementTemplateSearchComponent.ngOnInit();
    this.ngOnInit();
  }

  goBackList() {
    this.showType = 1;
  }

  openTemplateFile(agrFileId: string) {
    this.commonService.downloadFileById(agrFileId);
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.filter(item => !item.disabled).forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData
      .filter(item => !item.disabled)
      .every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.listOfDisplayData.filter(item => !item.disabled).some(item => this.mapOfCheckedId[item.id]) &&
      !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.listOfAllData.filter(item => this.mapOfCheckedId[item.id]).length;

    this.listOfDisplayData.filter(item => !item.disabled).forEach(item => (this.mapOfCheckedObj[item.id] = item));
  }
}
