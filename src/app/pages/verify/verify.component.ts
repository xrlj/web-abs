import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UIHelper} from '../../helpers/ui-helper';
import {Constants} from '../../helpers/constants';
import {EnterpriseStatusEnum} from '../../helpers/enum/enterprise-status-enum';
import {UserStatusEnum} from '../../helpers/enum/user-status-enum';

/**
 * 认证中心
 */
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.less']
})
export class VerifyComponent implements OnInit {

  userStatusEnum: typeof  UserStatusEnum = UserStatusEnum; // 用户状态枚举
  enterpriseStatusEnum: typeof  EnterpriseStatusEnum = EnterpriseStatusEnum; // 企业状态枚举

  etpStatus = 0;
  userStatus = 0;
  verifyTitle = '企业实名认证';

  constructor(private router: ActivatedRoute, private uiHelper: UIHelper) {
  }

  ngOnInit(): void {
    this.uiHelper.verifyLoginAndJumpToLogin();

    // 获取初始认证状态
    const statusInfo = JSON.parse(localStorage.getItem(Constants.localStorageKey.verifyStatus));
    this.etpStatus = statusInfo.etpStatus;
    this.userStatus = statusInfo.userStatus;
    if (this.etpStatus === EnterpriseStatusEnum.VERIFIED_PASS && this.userStatus !== UserStatusEnum.CHECK_PASS) {
      this.verifyTitle = '个人账号实名认证';
    }
  }
}
