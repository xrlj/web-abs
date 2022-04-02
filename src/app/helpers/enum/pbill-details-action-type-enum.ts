/**
 * 付款单详情页面不同显示逻辑类型
 */
export enum PbillDetailsActionTypeEnum {
  LOOK = 1, // 通用查看付款单详情
  EDIT = 2, // 保理商编辑付款单
  CHECK = 3, // 保理商审核付款单
  CHECK_AGAIN = 4, // 保理商复核付款单
  SUBMIT_SRC = 5 // 供应商，项目公司提交付款单资料
}
