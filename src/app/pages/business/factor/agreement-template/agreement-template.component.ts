import {Component, OnInit, ViewChild} from '@angular/core';
import {AgreementTemplateSearchComponent} from './agreement-template-search.component';
import {AgreementTemplateService} from './agreement-template.service';
import {UIHelper} from '../../../../helpers/ui-helper';
import {CommonService} from '../../../../helpers/service/common.service';

/**
 * 协议模板管理。
 */
@Component({
  selector: 'app-agreement-template',
  templateUrl: './agreement-template.component.html',
  styleUrls: ['./agreement-template.component.less']
})
export class AgreementTemplateComponent implements OnInit {

  showType = 1; // 1-显示列表；2-显示详情、新增、编辑页面

  // 表格
  listOfAllData: any[] = []; // 列表数据
  listLoading = false; // 列表加载等待指示器状态
  pageIndex = 1; // 页码
  pageSize = 10; // 每页条数
  total = 0; // 总条数

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
              private uiHelper: UIHelper, private commonService: CommonService) { }

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

    this.listLoading = true;
    this.agreementTemplateService.getAgrTemplateListPage(this.searchParBody)
      .ok(data => {
        this.pageIndex = data.pageIndex;
        this.pageSize = data.pageSize;
        this.total = data.total;
        this.listOfAllData = data.list;
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        this.listLoading = false;
      });
  }

  currentPageDataChange($event: any[]): void {
    this.listOfAllData = $event;
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
}
