import { Injectable } from '@angular/core';
import {Api} from '../../../../helpers/http/api';
import {ApiPath} from '../../../../api-path';

@Injectable({
  providedIn: 'root'
})
export class PaymentBillService {

  constructor(private api: Api) { }

  getPaymentBillFromApi(par: string) {
    return this.api.getPBillFromApi(ApiPath.serviceAbsPayment.paymentBillApi.getPaymentBillFromApiAndImport, {jsonString: par});
  }
}
