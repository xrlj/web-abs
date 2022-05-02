/**
 * 付款单主状态
 */
export enum PbillStatusEnum {
  CHECK_INIT = 0, // 未提交审核
  CHECK_FIRST_WAIT = 3, // 待审核
  CHECK_FIRST_COMPLETE = 6, // 审核通过
  CHECK_SECOND_COMPLETE = 9, // 复核通过
  CHECK_FAILURE = 12, // 已退回- 项目公司，供应商都退回
  LAW_CHECK_PASS = 15, // 律所审核通过
  LAW_CHECK_FAILURE = 18, // 律所审核不通过
  PACKAGE_PASS = 21, // 已打包
  PAY_COMPLETE = 24, // 已放款
  INVOICED = 27, // 已开票
  OUT_OF_POLL = 30 // 已出池
}
