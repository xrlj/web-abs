import {Injectable} from '@angular/core';
import {Api} from '../../../../../helpers/http/api';
import {ApiPath} from '../../../../../api-path';
import {VCustomerEtpReq} from '../../../../../helpers/vo/req/v-customer-etp-req';

@Injectable({
  providedIn: 'root'
})
export class EtpManageService {

  constructor(private api: Api) { }

  /**
   * 新增企业。
   * @param body 请求json对象。
   */
  addEtp(body: any): any {
    return this.api.post(ApiPath.usercentral.enterprise.addEtp, body);
  }

  /**
   * 分页查询列表。
   * @param vCustomerEtpReq 查询条件。
   */
  getAllByEtp(vCustomerEtpReq: VCustomerEtpReq): any {
    return this.api.post(ApiPath.usercentral.enterprise.getAllByEtp, vCustomerEtpReq);
  }

  /**
   * 获取企业详情。
   */
  getEtpInfo(id: string): any {
    return this.api.get(`${ApiPath.usercentral.enterprise.getEtpInfo}/${id}`)
  }

  /**
   * 审核企业信息。
   */
  checkEtpInfo(body: any): any {
    return this.api.post(ApiPath.usercentral.enterprise.checkEtpInfo, body);
  }
}
