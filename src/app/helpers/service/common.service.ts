import {Injectable} from '@angular/core';
import {ApiPath} from '../../api-path';
import {Api} from '../http/api';
import {AppPath} from '../../app-path';
import {UIHelper} from '../ui-helper';
import {Router} from '@angular/router';
import {DefaultBusService} from '../event-bus/default-bus.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private api: Api, private uiHelper: UIHelper,
              private router: Router) { }

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

  /**************************** 用户信息相关 end ********************************/
}
