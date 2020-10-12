import {VBankCardReq} from './v-bank-card-req';

export interface VEtpReq {
  /**
   * 企业信息id。
   */
  id?: string;
  /**
   * 企业名称。
   */
  etpName?: string;
  /**
   * 统一社会信用码非空
   */
  unifyCode?: string;
  /**
   * 原始编号
   */
  oriCode?: string;
  /**
   * 企业简称。
   */
  shortName?: string;
  /**
   * 企业简介
   */
  description?: string;
  /**
   * 企业门户网址。
   */
  webSite?: string;
  /**
   * 联系人姓名
   */
  contactName?: string;
  /**
   * 联系人手机号码
   */
  contactMobile?: string;
  /**
   * 联系人座机
   */
  contactPhone?: string;
  /**
   * 企业邮箱
   */
  email?: string;
  /**
   * 公司传真
   */
  fax?: string;
  /**
   * 公司联系座机电话
   */
  telephone?: string;
  /**
   * 公司地址全称
   */
  address?: string;
  /**
   * 营业执照号码
   */
  businessLicense?: string;
  /**
   * 营业执照图片。
   */
  businessLicensePicFileId?: string;
  /**
   * 组织机构代码
   */
  organizationCode?: string;
  /**
   * 税务登记证
   */
  taxCode?: string;
  /**
   * 法人
   */
  legalPerson?: string;
  /**
   * 法人身份证号码
   */
  legalPersonIdNo?: string;
  /**
   * 法人身份证正反面图片
   */
  legalPersonIdNoPicFileId?: string;
  /**
   * 注册地址。
   */
  registeredAddress?: string;
  /**
   * 企业银行卡信息。
   */
  bankCardInfo?: VBankCardReq;
}
