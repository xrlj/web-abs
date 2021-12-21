import { Injectable } from '@angular/core';
import {Api} from '../../../../helpers/http/api';
import {ApiPath} from '../../../../api-path';
import {ContentTypeEnum} from '../../../../helpers/http/content-type-enum';
import {Utils} from '../../../../helpers/utils';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private api: Api, private utils: Utils) { }

  getFpdtTypeListAll(): any {
    return this.api.get(ApiPath.serviceAbsProduct.fpdtTypeApi.getListAll);
  }

  addProductBasicInfo(body: any): any {
    return this.api.post(ApiPath.serviceAbsProduct.productApi.add, body);
  }

  updateProductBasicInfo(body: any): any {
    return this.api.post(ApiPath.serviceAbsProduct.productApi.update, body);
  }

  getProductBasicById(id: string): any {
    return this.api.get(`${ApiPath.serviceAbsProduct.productApi.getProductById}/${id}`);
  }

  getProductListPage(body: any): any {
    return this.api.post(ApiPath.serviceAbsProduct.productApi.getProductListPage, body);
  }

  updateProductStatus(id: string, pdtStatus: number): any {
    return this.api.post(ApiPath.serviceAbsProduct.productApi.updateProductStatus, null, null,
      {productId: id, status: pdtStatus}, ContentTypeEnum.APPLICATION_FORM_URLENCODED_VALUE);
  }

  /**************** 产品分期相关 **************/

  addProductStaging(body: any): any {
    return this.api.post(ApiPath.serviceAbsProduct.productStagingApi.add, body);
  }

  updateProductStaging(body: any): any {
    return this.api.post(ApiPath.serviceAbsProduct.productStagingApi.update, body);
  }

  getProductStagingListPage(body: any): any {
    return this.api.post(ApiPath.serviceAbsProduct.productStagingApi.getListPage, body);
  }

  getProductStagingInfo(id: string): any {
    return this.api.get(`${ApiPath.serviceAbsProduct.productStagingApi.getById}/${id}`);
  }

  delProductStaging(...ids: string[]): any {
    return this.api.delete(`${ApiPath.serviceAbsProduct.productStagingApi.del}/${this.utils.arrayToArrayParam(ids)}`);
  }

  /************ 协议模板相关 ***************/

  saveList(body: any) {
    return this.api.post(ApiPath.serviceAbsProduct.productTemplateApi.addList, body);
  }

  getProductAgrTemplateList(productId: string) {
    return this.api.get(`${ApiPath.serviceAbsProduct.productTemplateApi.getByProductIdList}/${productId}`);
  }

  delBatchProductAgrTemplate(...ids: any) {
    return this.api.delete(`${ApiPath.serviceAbsProduct.productTemplateApi.del}/${this.utils.arrayToArrayParam(ids)}`);
  }

  /**
   * 附件相关
   */

  getAnnexListAll() {
    return this.api.get(ApiPath.serviceAbsProduct.annexTypeApi.getListAll);
  }

  saveProductAnnexList(body: any) {
    return this.api.post(ApiPath.serviceAbsProduct.productAnnexApi.addOrUpdateList, body);
  }

  getProductAnnexList(productId: string) {
    return this.api.get(`${ApiPath.serviceAbsProduct.productAnnexApi.getListByProductId}/${productId}`);
  }

  delProductAnnexByProductId(productId: string, annexTypeIds: string[]) {
    return this.api.delete(`${ApiPath.serviceAbsProduct.productAnnexApi.delByProductId}/${productId}/${this.utils.arrayToArrayParam(annexTypeIds)}`);
  }

  delProductAnnexByIds(ids: string[]) {
    return this.api.delete(`${ApiPath.serviceAbsProduct.productAnnexApi.delByIds}/${ids}`);
  }
}
