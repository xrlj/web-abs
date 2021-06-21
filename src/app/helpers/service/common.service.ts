import {Injectable} from '@angular/core';
import {ApiPath} from '../../api-path';
import {Api} from '../http/api';
import {AppPath} from '../../app-path';
import {UIHelper} from '../ui-helper';
import {Router} from '@angular/router';
import {DefaultBusService} from '../event-bus/default-bus.service';
import {UserStatusEnum} from '../enum/user-status-enum';
import {EnterpriseStatusEnum} from '../enum/enterprise-status-enum';
import {Constants} from '../constants';
import {UserTypeEnum} from '../enum/user-type-enum';
import {Utils} from '../utils';
import {JwtKvEnum} from '../enum/jwt-kv-enum';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private api: Api, private uiHelper: UIHelper,
              private router: Router, private utils: Utils) { }

  /**
   * 退出登录。
   */
  logout(defaultBusService: DefaultBusService): void {
    this.uiHelper.modalConfirm('确定退出登录？')
      .ok(() => {
        defaultBusService.showLoading(true);
        this.api.get(ApiPath.logout).ok(data => {
          if (data) {
            this.uiHelper.logoutLocalStorageClean();
            this.router.navigate([AppPath.login]); // 退出成功
          } else {
            this.uiHelper.msgTipError('退出失败');
          }
        }).fail(error => {
          this.uiHelper.msgTipError(error.msg);
        }).final(() => {
          defaultBusService.showLoading(false);
        });
      });
  }

  /**
   * 获取登录用户所属企业的详情。
   */
  getEtpInfoByUser(userId: string): any {
    return this.api.get(`${ApiPath.usercentral.enterprise.getEtpInfoByUser}/${userId}`);
  }

  /*************************** 短信发送相关 start  ****************************/

  /**
   * 校验注册验证码。
   * @param mobileNum 手机号码
   * @param code 输入的验证码
   */
  verifyAuthCode(mobileNum: string, code: string): any {
    return this.api.post(ApiPath.sysnotify.smsApi.verifyAuthCode, {mobile: mobileNum, authCode: code});
  }

  /**
   * 身份验证验证码短信发送
   * @param mobileNum 手机号码
   * @param effectiveTime 短信验证码有效时间,单位（秒）
   */
  authenticationSmsCode(mobileNum: string, _effectiveTime: number): any {
    return this.api.post(ApiPath.sysnotify.smsApi.authentication, {mobile: mobileNum, effectiveTime: _effectiveTime});
  }

  /*************************** 短信发送相关 end  ****************************/

  /**************************** 用户信息相关 start ********************************/

  /**
   * 获取用户详情。
   * @param userId 用户id
   */
  getUserInfoById(userId: string): any {
    return this.api.get(`${ApiPath.usercentral.userApi.getUserInfoById}/${userId}`)
  }

  /**
   * 检查企业，登录账户审核认证状态。
   * 1.如果企业，代理人都已经实名认证，则返回认证信息。
   * 2.否则，跳转到实名认证页面。
   */
  async checkVerify() {
    // 获取用户企业实名认证、个人实名认证状态信息
    await this.api.get(ApiPath.usercentral.userApi.getAuthenticateStatus)
      .ok(data => {
        console.log(`认证信息》》》》》》：${JSON.stringify(data)}`);
        const uStatus = data.userStatus;
        const eStatus = data.etpStatus;
        if (uStatus === UserStatusEnum.CHECK_PASS && eStatus === EnterpriseStatusEnum.VERIFIED_PASS) { // 企业、个人都已经实名认证
          return data;
        } else {
          localStorage.setItem(Constants.localStorageKey.verifyStatus, JSON.stringify(data));
          // this.router.navigate([AppPath.verify], {queryParams: {userStatus: uStatus, etpStatus: eStatus}});
          this.router.navigate([AppPath.verify]);
        }
      }).final(b => {
        return null;
    });
  }

  /**************************** 用户信息相关 end ********************************/

  /**************************菜单 start****************************************/
  getMenuList(_clientId: string, _type: number, _userType?: UserTypeEnum): any {
    const uType = this.utils.getJwtTokenClaim(JwtKvEnum.UserType);
    const body = {
      clientId: _clientId,
      type: _type,
      userType: uType
    };
    return this.api.post(`${ApiPath.usercentral.menuApi.getMenuList}`, body);
  }
  /**************************菜单 end****************************************/
}
