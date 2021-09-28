import { Injectable } from '@angular/core';
import {Api} from '../../../../helpers/http/api';
import {ApiPath} from '../../../../api-path';
import {getIifeBody} from '@angular/compiler-cli/ngcc/src/host/esm2015_host';

@Injectable({
  providedIn: 'root'
})
export class AgreementTemplateService {

  constructor(private api: Api) { }

  /**
   * 获取模板大类列表。
   */
  getArgTypeBigListAll(body: any): any {
    return this.api.post(ApiPath.serviceAbsTemplate.agrTypeBig.getListAll, body);
  }

  /**
   * 获取大类下下面所有类型。
   */
  getArgTypeListAll(argTypeBigId: string): any {
    const  body = {'agrTypeBigId': argTypeBigId};
    return this.api.post(ApiPath.serviceAbsTemplate.agrType.getListAll, body);
  }

  /**
   * 获取类型下所有版别。
   */
  getArgTypeSpecifyListAll(agrTypeId: string): any {
    const  body = {'agrTypeId': agrTypeId};
    return this.api.post(ApiPath.serviceAbsTemplate.agrTypeSpecify.getListAll, body);
  }

  /**
   * 获取参数设置列表。
   */
  getParTreeListAll(): any {
    return this.api.get(ApiPath.serviceAbsTemplate.templateParManage.getTreeListAll);
  }

  /**
   * 保存协议模板全部信息。
   */
  saveAgrTemplateAll(body: any): any {
    return this.api.post(ApiPath.serviceAbsTemplate.agrTemplate.add, body);
  }
}
