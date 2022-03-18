import {Injectable} from '@angular/core';
import {Api} from '../../../../helpers/http/api';
import {ApiPath} from '../../../../api-path';

@Injectable({
  providedIn: 'root'
})
export class AgreementTemplateService {

  constructor(private api: Api) { }

  /**
   * 获取模板大类列表。
   */
  getArgTypeBigListAll(body: any) {
    return this.api.post(ApiPath.serviceAbsTemplate.agrTypeBig.getListAll, body);
  }

  /**
   * 获取大类下下面所有类型。
   */
  getArgTypeListAll(etpId: string, argTypeBigId: string) {
    const  body = {'etpId': etpId, 'agrTypeBigId': argTypeBigId};
    return this.api.post(ApiPath.serviceAbsTemplate.agrType.getListAll, body);
  }

  /**
   * 获取类型下所有版别。
   */
  getArgTypeSpecifyListAll(etpId: string, agrTypeId: string) {
    const  body = {'etpId': etpId, 'agrTypeId': agrTypeId};
    return this.api.post(ApiPath.serviceAbsTemplate.agrTypeSpecify.getListAll, body);
  }

  /**
   * 获取参数设置列表。
   */
  getParTreeListAll() {
    return this.api.get(ApiPath.serviceAbsTemplate.templateParManage.getTreeListAll);
  }

  /**
   * 保存协议模板全部信息。
   */
  saveAgrTemplateAll(body: any) {
    return this.api.post(ApiPath.serviceAbsTemplate.agrTemplate.add, body);
  }

  /**
   * 分页列表。
   */
  getAgrTemplateListPage(body: any) {
    return this.api.post(ApiPath.serviceAbsTemplate.agrTemplate.getListPage, body);
  }
}
