// 合同模板状态
export enum AgrTemplateStatusEnum {
  DRAFT = 0, // 草稿
  CHECK_WAIT, // 待审核
  CHECK_PASS, // 已生效,审核通过
  CHECK_FAIL, // 审核拒绝
  BLACK// 已失效
}
