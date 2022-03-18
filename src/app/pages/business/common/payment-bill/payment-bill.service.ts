import { Injectable } from '@angular/core';
import {Api} from '../../../../helpers/http/api';
import {ApiPath} from '../../../../api-path';

@Injectable({
  providedIn: 'root'
})
export class PaymentBillService {

  constructor(private api: Api) { }

  getPaymentBillFromApi(par: string) {
    return this.api.get(ApiPath.serviceAbsPayment.paymentBillApi.getPaymentBillFromApiAndImport, {jsonString: par});
  }

  getPaymentBillListPage(body: any) {
    return this.api.post(ApiPath.serviceAbsPayment.paymentBillApi.getListPage, body);
  }

  importPaymentBillByExcel(body: any) {
    return this.api.post(ApiPath.serviceAbsPayment.paymentBillApi.saveImportPaymentBillByExcel, body);
  }
}
