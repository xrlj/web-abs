/**
 * pdf签署文件信息。
 */
export interface VSignPdfInfoResp {
  id: string;  // 文件id,唯一
  url: string;  // pdf文件访问路径
  path: string;
  name: string; // 文件名称
  pages: number;  // pdf文件总页数
  signStatus: number; // 文件签署状态 1-已经签署（本公司已签署）；2-待签署；3-无需签署；4-拒签; 5-所有公司已签署完成
  thumbnailUrl: string; // pdf图片缩略图url
  taskInfo: VSignPdfTaskInfoResp;
  attachmentInfo?: VSignPdfAttachmentInfoResp[];
  active?: boolean; // 激活状态
}

/**
 * pdf签署文件的pdf附件信息。
 */
export interface VSignPdfAttachmentInfoResp {
  id: string;  // 文件id
  url: string;  // pdf文件访问路径
  path: string;
  name: string; // 文件名称
  pages: number; // pdf页码总数
  thumbnailUrl: string; // pdf图片缩略图url
  active?: boolean; // 激活状态
}

/**
 * pdf签署文件的签署任务信息
 */
export interface VSignPdfTaskInfoResp {
  topic: string;  // 文件主题
  fromSystem: string;  // 文件来源
  organizer: string; // 文件发起方
  organizerTime: string; // 文件发起时间
  roleInfo: VSignPdfTaskRoleInfoResp[];
  logInfo: VSignPdfTaskLogInfoResp[];
}

/**
 * 签署方
 */
export interface VSignPdfTaskRoleInfoResp {
  signUserName: string;  // 签署人姓名
  enterpriseName: string;  // 所属企业名称
}

/**
 * 签署文件时间流
 */
export interface VSignPdfTaskLogInfoResp {
  operateDes: string;  // 操作描述
  operateDay: string;  // 操作日期
  operateTime: string;  // 操作时间
}

