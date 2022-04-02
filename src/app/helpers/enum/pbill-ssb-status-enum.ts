/**
 * 付款单供应商，项目公司申请状态枚举
 */
export enum PbillSsbStatusEnum {
  AIT_SUBMIT = 0, // 待提交
  WAIT_CHECK = 3, // 待审核
  CHECK_PASS = 5, // 待复核
  CHECK_PASS_AGAIN = 11, // 复核通过
  CHECK_FAILURE = 14, // 审核不通过
  CHECK_FAILURE_AGAIN = 17, // 复核不通过
  OUT_OF_POLL= 20 // 已出池
}
