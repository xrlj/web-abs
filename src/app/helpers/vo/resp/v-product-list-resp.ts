// 产品列表
export interface VProductListResp {
  /**
   * 产品id
   */
  id: string;
  /**
   * 产品编号
   */
  ptCode: string;
  /**
   * 产品名称
   */
  ptName: string;
  /**
   * 核心企业名称
   */
  coreEtpName: string;
  /**
   * 产品状态
   */
  ptStatus: boolean;
  /**
   * 产品类型
   */
  ptType: string;
  /**
   * 创建时间
   */
  dateCreated: string;
  /**
   * 创建人
   */
  creator: string;
  /**
   * 选择状态。
   */
  disabled?: boolean;
}
