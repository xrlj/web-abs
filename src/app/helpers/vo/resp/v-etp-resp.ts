export interface VEtpResp {
  /**
   * 企业id。
   */
  id: string;
  /**
   * 企业编码。
   */
  etpCode: string;
  /**
   * 企业全称。
   */
  etpName: string;
  /**
   * 企业联系人。
   */
  contactName: string;
  /**
   * 企业联系人电话。
   */
  contactMobile: string;
  /**
   * 社会统一信用代码
   */
  unifyCode: string;
  /**
   * 法人姓名
   */
  legalPerson: string;
  /**
   * 法人身份证号码。
   */
  legalPersonIdNo: string;
  /**
   * 企业状态
   */
  status: number;
  /**
   * 企业状态名称
   */
  statusName: string;
  /**
   * 创建时间。
   */
  dateCreated: string;
  /**
   * 注册状态
   */
  registerStatus: string;
  /**
   * 选择状态。
   */
  disabled?: boolean;
}
