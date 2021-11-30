import { Injectable } from '@angular/core';
import {Api} from '../../../../helpers/http/api';
import {ApiPath} from '../../../../api-path';

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
}
