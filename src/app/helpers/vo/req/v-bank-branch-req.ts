export interface VBankBranchReq {
  /**
   * 总行名称。
   */
  bankName?: string;
  /**
   * 所在省名称。
   */
  province?: string;
  /**
   * 所在市名称。
   */
  city?: string;
  /**
   * 支行名称。
   */
  branchName?: string;
  /**
   * 联行号。
   */
  branchCode?: string;
}
