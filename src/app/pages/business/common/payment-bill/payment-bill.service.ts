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

  getInvoiceListPage(body: any) {
    return this.api.post(ApiPath.serviceAbsPayment.paymentBillInvoice.getListPage, body);
  }

  getInvoiceListAllByPbId(pbId: string) {
    return this.api.get(`${ApiPath.serviceAbsPayment.paymentBillInvoice.getListAllByPb}/${pbId}`);
  }

  saveInvoiceIssue(body: any) {
    return this.api.post(ApiPath.serviceAbsPayment.pytBillInvoiceIssue.save, body);
  }

  getInvoiceIssueListPage(body: any) {
    return this.api.post(ApiPath.serviceAbsPayment.pytBillInvoiceIssue.getListPage, body);
  }

  getInvoiceIssueCount(pbillId: string) {
    return this.api.get(`${ApiPath.serviceAbsPayment.pytBillInvoiceIssue.getInvoiceIssueCount}/${pbillId}`);
  }

  updateInvoice(id: string, body: any) {
    return this.api.post(`${ApiPath.serviceAbsPayment.paymentBillInvoice.update}/${id}`, body);
  }
}
