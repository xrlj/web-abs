import { Injectable } from '@angular/core';
import {Api} from '../../../../helpers/http/api';
import {ApiPath} from '../../../../api-path';
import {Utils} from '../../../../helpers/utils';

@Injectable({
  providedIn: 'root'
})
export class PaymentBillService {

  constructor(private api: Api, private utils: Utils) { }

  getPaymentBillFromApi(par: string) {
    return this.api.get(ApiPath.serviceAbsPayment.paymentBillApi.getPaymentBillFromApiAndImport, {jsonString: par});
  }

  getPaymentBillListPage(body: any) {
    return this.api.post(ApiPath.serviceAbsPayment.paymentBillApi.getListPage, body);
  }

  /**
   * 根据付款单id获取付款单详情
   * @param pbId 付款单id
   */
  getPaymentBillDetails(pbId: string) {
    return this.api.get(`${ApiPath.serviceAbsPayment.paymentBillApi.getDetails}/${pbId}`);
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

  getUploadAnnexList(productId: string, role: number) {
    return this.api.get(`${ApiPath.serviceAbsProduct.productAnnexApi.getListUpload}/${productId}/${role}`);
  }

  /**
   * 保存付款单企业上传的附件
   */
  savPytBillAnnexFile(body: any) {
    return this.api.post(ApiPath.serviceAbsPayment.pytBillAnnexFile.save, body);
  }

  // 根据付款单下不同企业类型上传的附件列表
  getPytBillAnnexFileList(pdId: string, etpType: number) {
    return this.api.get(`${ApiPath.serviceAbsPayment.pytBillAnnexFile.getPytBillAnnexFileList}/${pdId}/${etpType}`);
  }

  delPytBillAnnexFile(pytBillAnnexFileIds: string[]) {
    return this.api.delete(`${ApiPath.serviceAbsPayment.pytBillAnnexFile.del}/${this.utils.arrayToArrayParam(pytBillAnnexFileIds)}`)
  }

  /**
   * 提交付款单资料
   */
  submitMaterial(userType: number, body: any) {
    return this.api.post(`${ApiPath.serviceAbsPayment.paymentBillApi.submitMaterial}/${userType}`, body);
  }
}
