// 产品列表
export interface VProductListResp {
  /**
   * 产品id
   */
  id: string;
  /**
   * 产品编号
   */
  pdtCode: string;
  /**
   * 产品名称
   */
  pdtName: string;
  /**
   * 核心企业名称
   */
  coreEtpName: string;
  /**
   * 产品状态
   */
  pdtStatus: number;
  /**
   * 产品状态名称
   */
  pdtStatusName: string;
  /**
   * 产品类型
   */
  pdtTypeName: string;
  /**
   * 创建时间
   */
  dateCreated: string;
  /**
   * 创建人
   */
  creatorRealName: string;
  /**
   * 选择状态。
   */
  disabled?: boolean;
}
