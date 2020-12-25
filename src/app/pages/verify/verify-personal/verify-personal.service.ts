import { Injectable } from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {ApiPath} from '../../../api-path';

@Injectable({
  providedIn: 'root'
})
export class VerifyPersonalService {

  constructor(private api: Api) { }

  /**
   * 个人三要素信息验证。
   */
  verifyPersonal(body: any): any {
    return this.api.post(ApiPath.esign.eSignApi.verifyPersonal, body);
  }

  /**
   * 提交个人实名认证信息。
   */
  saveVerifyCheckInfo(body: any): any {
    return this.api.post(ApiPath.usercentral.userApi.saveVerifyCheckInfo, body);
  }

  /**
   * 获取用户审核记录列表。
   * @param _userId 用户id
   * @param _state 审核成功或者失败状态。0-失败记录；1-成功记录
   */
  getUserCheckResultList(_userId: string, _state: number): any {
    return this.api.get(ApiPath.usercentral.userApi.getUserCheckResultList, {userId: _userId, state: _state});
  }
}
