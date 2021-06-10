import {Component, OnInit} from '@angular/core';
import {Api} from '../../helpers/http/api';
import {Router} from '@angular/router';
import {ApiPath} from '../../api-path';
import {Constants} from '../../helpers/constants';
import {AppPath} from '../../app-path';
import {SimpleReuseStrategy} from '../../helpers/simple-reuse-strategy';
import {UserStatusEnum} from '../../helpers/enum/user-status-enum';
import {EnterpriseStatusEnum} from '../../helpers/enum/enterprise-status-enum';
import {VSettingInfo} from '../../helpers/vo/v-setting-info';
import {environment} from '../../../environments/environment';
import {FinancingModelEnum} from '../../helpers/enum/financing-model-enum';
import {UIHelper} from '../../helpers/ui-helper';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.less']
})
export class InitComponent implements OnInit {

  status = false;

  constructor(private router: Router, private api: Api,
              private helper: UIHelper) {
  }

  ngOnInit() {
    // this.checkVerify();
    this.setMenus();

    // 保存系统设置初始化信息
    // TODO 请求网络从服务端获取
    const settingInfo: VSettingInfo = {
      theme: this.helper.getCurrentTheme(),
      sliderMenuTheme: environment.asideTheme,
      financingMode: FinancingModelEnum.FINANCING_SINGLE
    };
    this.helper.updateSettingInfo(settingInfo);
  }

  /**
   * 检查企业，登录账户审核认证状态。
   * 1.如果企业，代理人都已经实名认证，则获取菜单进入主页面；
   * 2.否则，跳转到实名认证页面。
   */

  /*checkVerify(): void {
    // 获取用户企业实名认证、个人实名认证状态信息
    this.api.get(ApiPath.usercentral.userApi.getAuthenticateStatus)
      .ok(data => {
        console.log(`认证信息》》》》》》：${JSON.stringify(data)}`)
        const uStatus = data.userStatus;
        const eStatus = data.etpStatus;
        if (uStatus === UserStatusEnum.CHECK_PASS && eStatus === EnterpriseStatusEnum.VERIFIED_PASS) { // 企业、个人都已经实名认证
          this.setMenus();
        } else {
          localStorage.setItem(Constants.localStorageKey.verifyStatus, JSON.stringify(data));
          // this.router.navigate([AppPath.verify], {queryParams: {userStatus: uStatus, etpStatus: eStatus}});
          this.router.navigate([AppPath.verify]);
        }
      });
  }*/

  /**
   * 获取应用菜单列表。
   */
  setMenus(): void {
    this.api.get(ApiPath.usercentral.userApi.getUserMenus)
      .ok(data => {
        localStorage.setItem(Constants.localStorageKey.menus, JSON.stringify(data));
        this.router.navigate([AppPath.pages], {replaceUrl: true});
      }).fail(error => {
      console.log(error.msg);
      this.status = true;
    }).final(b => {
      SimpleReuseStrategy.deleteRouteSnapshotAll(); // 重新初始化路由复用，清空旧的复用路由
    });
  }
}
