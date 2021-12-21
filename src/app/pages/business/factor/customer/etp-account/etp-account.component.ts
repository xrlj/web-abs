import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {EtpAccountService} from './etp-account.service';
import {EtpAccountDetailsComponent} from './etp-account-details/etp-account-details.component';
import {UserStatusEnum} from '../../../../../helpers/enum/user-status-enum';
import {VCustomerAccountReq} from '../../../../../helpers/vo/req/v-customer-account-req';
import {VCustomerAccountResp} from '../../../../../helpers/vo/resp/v-customer-account-resp';
import {UIHelper} from '../../../../../helpers/ui-helper';
import {ThemeHelper} from '../../../../../helpers/theme-helper';
import {CommonService} from '../../../../../helpers/service/common.service';

@Component({
  selector: 'app-etp-account',
  templateUrl: './etp-account.component.html',
  styleUrls: ['./etp-account.component.less']
})
export class EtpAccountComponent implements OnInit {

  userStatusEnum: typeof UserStatusEnum = UserStatusEnum;

  // tab
  tabIndex = 0;
  tabTitle = [];

  // 表格
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: VCustomerAccountResp[] = [];
  listOfAllData: VCustomerAccountResp[] = []; // 列表数据
  mapOfCheckedId: { [key: string]: boolean } = {}; // 记录选择角色
  numberOfChecked = 0;
  loading = false; // 列表加载等待指示器状态
  pageIndex = 1; // 页码
  pageSize = 10; // 每页条数
  total = 0; // 总条数

  // 列表搜索条件
  vCustomerAccountReq: VCustomerAccountReq = {pageIndex: this.pageIndex, pageSize: this.pageSize};

  // 子组件
  @ViewChild(EtpAccountDetailsComponent)
  etpAccountDetailsComponent: EtpAccountDetailsComponent;

  checkModalVisible = false;
  checkModalOkLoading = false;

  constructor(private fb: FormBuilder, public uiHelper: UIHelper,
              private etpAccountService: EtpAccountService, public themeHelper: ThemeHelper,
              private commonService: CommonService) {
  }

  ngOnInit() {
    this.commonService.getDictValueListByType('enterprise_type')
      .ok(data => {
        this.tabTitle = data;
      })
      .fail(error => {
        console.log(error);
      });


    this.search();
  }

  search(reset: boolean = false): void {
    reset ? this.vCustomerAccountReq.pageIndex = 1 : this.vCustomerAccountReq.pageIndex = this.pageIndex;
    this.vCustomerAccountReq.pageSize = this.pageSize;
    this.vCustomerAccountReq.userType = this.tabTitle[this.tabIndex].dictValue;
    this.loading = true;
    this.etpAccountService.getEtpUserList(this.vCustomerAccountReq)
      .ok(data => {
        this.pageIndex = data.pageIndex;
        this.pageSize = data.pageSize;
        this.total = data.total;
        this.listOfAllData = data.list;
      }).fail(error => {
      this.uiHelper.msgTipError(error.msg);
    }).final(() => {
      this.loading = false;
    });
  }

  /**
   * 表格数据更改时候设定选择信息。保持选择或者取消
   * @param $event 选择事件
   */
  currentPageDataChange($event: VCustomerAccountResp[]): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  /**
   * 选择所有。
   * @param value 选择事件
   */
  checkAll(value: boolean): void {
    this.listOfDisplayData.filter(item => !item.disabled).forEach(item => (this.mapOfCheckedId[item.userId] = value));
    this.refreshStatus();
  }

  /**
   * 表格刷新选择信息。
   */
  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData
      .filter(item => !item.disabled)
      .every(item => this.mapOfCheckedId[item.userId]);
    this.isIndeterminate =
      this.listOfDisplayData.filter(item => !item.disabled).some(item => this.mapOfCheckedId[item.userId]) &&
      !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.listOfAllData.filter(item => this.mapOfCheckedId[item.userId]).length;
  }

  /**
   * 查看详情。
   * @param id 账号id
   */
  details(id: any) {
    // this.etpAccountDetailsComponent.initData(id);
    this.checkModalVisible = true;
  }

  /**
   * 显示审核用户信息对话框
   * @param id 用户id
   */
  verifyCheck(id: string): void {
    this.etpAccountDetailsComponent.initData(id);
    this.checkModalVisible = true;
  }

  /**
   * 取消审核对话框。
   */
  checkHandleCancel() {
    this.etpAccountDetailsComponent.resetUI();
    this.checkModalVisible = false;
  }

  /**
   * 提交审核内容。
   */
  checkHandleOk() {
    this.etpAccountDetailsComponent.submitCheckInfo(this);
  }
}
