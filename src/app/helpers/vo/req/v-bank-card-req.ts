export interface VBankCardReq {
  /**
   * 银行卡信息id。
   */
  id?: string;
  /**
   * 开户行名称。
   */
  etpBankName?: string;
  /**
   * 省名称。
   */
  province?: string;
  /**
   * 市名称。
   */
  city?: string;
  /**
   * 支行全称。
   */
  etpBranchName?: string;
  /**
   * 银行卡名称。
   */
  etpBankCardName?: string;
  /**
   * 银行卡卡号。
   */
  etpBankCardNum?: string;
  /**
   * 开户许可证图片。
   */
  permitPicFileId?: string;
}
