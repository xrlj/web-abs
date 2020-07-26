import { Injectable } from '@angular/core';
import {Api} from '../../helpers/http/api';
import {ApiPath} from '../../api-path';

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
    return this.api.get(`${ApiPath.usercentral.enterprise.getEtpInfoByInvitationCode}/${code}`);
  }
}
