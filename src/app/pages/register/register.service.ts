import { Injectable } from '@angular/core';
import {Api} from '../../helpers/http/api';
import {ApiPath} from '../../api-path';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private api: Api) { }

  /**
   * 根据注册邀请码获取企业信息
   * @param code 注册邀请码
   */
  getEtpInfoByInvitationCode(code: string): any {
    return this.api.get(`${ApiPath.usercentral.enterprise.getEtpInfoByInvitationCode}`, new HttpParams().set('code', code));
  }

  /**
   * 获取短信验证码。
   * @param mobileNum 手机号码。
   */
  getAuthCode(mobileNum: string): any {
    return this.api.post(ApiPath.sysnotify.smsApi.register, {mobile: mobileNum});
  }

  /**
   * 校验注册验证码。
   * @param mobileNum 手机号码
   * @param code 输入的验证码
   */
  verifyAuthCode(mobileNum: string, code: string): any {
    return this.api.post(ApiPath.sysnotify.smsApi.verifyAuthCode, {mobile: mobileNum, authCode: code});
  }
}
