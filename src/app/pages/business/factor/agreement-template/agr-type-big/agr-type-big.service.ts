import { Injectable } from '@angular/core';
import {Api} from '../../../../../helpers/http/api';
import {Utils} from '../../../../../helpers/utils';
import {ApiPath} from '../../../../../api-path';

@Injectable({
  providedIn: 'root'
})
export class AgrTypeBigService {

  constructor(private api: Api, private utils: Utils) { }

  addOrUpdate(body: any): any {
    return this.api.post(`${ApiPath.serviceAbsTemplate.agrTypeBig.addOrUpdate}`, body);
  }

  getListPage(body: any): any {
    return this.api.post(ApiPath.serviceAbsTemplate.agrTypeBig.getListPage, body);
  }

  getListAll(body: any): any {
    return this.api.post(ApiPath.serviceAbsTemplate.agrTypeBig.getListAll, body);
  }

  get(id: string): any {
    return this.api.get(`${ApiPath.serviceAbsTemplate.agrTypeBig.get}/${id}`);
  }

  delete(...ids: any[]): any {
    const pars = this.utils.arrayToArrayParam(ids);
    return this.api.delete(`${ApiPath.serviceAbsTemplate.agrTypeBig.delete}/${pars}`)
  }
}
