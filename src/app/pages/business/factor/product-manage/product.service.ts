import { Injectable } from '@angular/core';
import {Api} from '../../../../helpers/http/api';
import {ApiPath} from '../../../../api-path';
import {ContentTypeEnum} from '../../../../helpers/http/content-type-enum';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private api: Api) { }

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
    return this.api.get(`${ApiPath.serviceAbsProduct.productStagingApi.getById}/${id}`)
  }
}
