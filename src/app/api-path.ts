/****************服务名称start********************/

const serviceauth = 'serviceauth'; // 鉴权中心服务
const usercentral = 'usercentral'; // 用户中心服务
const syscommon = 'syscommon';  // 公共服务
const sysfilesystem = 'sysfilesystem'; // 文件系统服务
const sysnotify = 'sysnotify'; // 通知服务
const esign = 'esign'; // e签宝服务
const serviceAbsTemplate = 'serviceAbsTemplate'; // 模板协议服务
const serviceAbsProduct = 'serviceAbsProduct'; // 产品服务
const serviceAbsPayment = 'serviceAbsPayment'; // 付款单管理服务

/****************服务名称 end********************/

export const ApiPath = {
  login: `/${serviceauth}/auth/login`,  // 登录
  logout: `/${serviceauth}/auth/invalidate`,  // 退出登录
  usercentral: {
    userApi: {
      getUserMenus: `/${usercentral}/user/getUserMenus`,  // 登录后获取用户拥有的菜单列表
      getAuthenticateStatus: `/${usercentral}/user/getAuthenticateStatus`,  // 获取各认证状态信息
      registerByInvitationCode: `/${usercentral}/user/registerByInvitationCode`, // 邀请码注册，提交保存注册信息
      getUserInfoById: `/${usercentral}/user/getUserInfoById`, // 根据用户id获取用户详情信息。
      saveVerifyCheckInfo: `/${usercentral}/user/saveVerifyCheckInfo`, // 提交个人实名认证信息到后台待审核。
      getUserCheckResultList: `/${usercentral}/user/getUserCheckResultList`, // 获取用户审核记录列表。
      getEtpUserList: `/${usercentral}/user/getEtpUserList`,
      saveCheckUserSeal: `/${usercentral}/user/saveCheckUserSeal`,
      exitUsername: `/${usercentral}/user/exitUsername`,
      updateUserStatus: `/${usercentral}/user/updateUserStatus`,
      delUser: `/${usercentral}/user/delUser`,
      updateUserPassword: `/${usercentral}/user/updateUserPassword`,
      resetUserPassword: `/${usercentral}/user/resetUserPassword`,
      addSystemUser: `/${usercentral}/user/addSystemUser`,
      getUserList: `/${usercentral}/user/getUserList`,
      updateSystemUser: `/${usercentral}/user/updateSystemUser`,
      getUserCanSelectRoles: `/${usercentral}/user/getUserCanSelectRoles`,
      getRolesByUserId: `/${usercentral}/user/getRolesByUserId`,
      addUserRoles: `/${usercentral}/user/addUserRoles`,
    },
    dept: {
      saveOrUpdate: `/${usercentral}/dept/saveOrUpdate`,
      del: `/${usercentral}/dept/del`,
      getById: `/${usercentral}/dept/getById`,
      getAll: `/${usercentral}/dept/getAll`
    },
    roleApi: {
      getAll: `/${usercentral}/role/getAll`,
      save: `/${usercentral}/role/save`,
      update: `/${usercentral}/role/update`,
      getById: `/${usercentral}/role/getById`,
      del: `/${usercentral}/role/del`,
      getAllRoleByDeptId: `/${usercentral}/role/getAllRoleByDeptId`
    },
    menuApi: {
      getMenuList: `/${usercentral}/menu/getMenuList`,
      getById: `/${usercentral}/menu/getById`
    },
    enterprise: {
      getEtpInfoByInvitationCode: `/${usercentral}/enterprise/getEtpInfoByInvitationCode`, // 根据邀请码获取邀请企业信息
      getEtpInfoByUser: `/${usercentral}/enterprise/getEtpInfoByUser`, // 获取用户所属企业的详情
      saveOrUpdate: `/${usercentral}/enterprise/saveOrUpdate`, // 保存或者更新企业信息。
      checkPayMoney: `/${usercentral}/enterprise/checkPayMoney`, // 对公打款金额校验。
      addEtp: `/${usercentral}/enterprise/addEtp`,
      getAllByEtp: `/${usercentral}/enterprise/getAllByEtp`,
      getEtpInfo: `/${usercentral}/enterprise/getEtpInfo`,
      checkEtpInfo: `/${usercentral}/enterprise/checkEtpInfo`,
      addEtpApiConf: `/${usercentral}/enterprise/addEtpApiConf`,
      getEtpApiConfByEtpId: `/${usercentral}/enterprise/getEtpApiConfByEtpId`,
    }
  },
  serviceAbsTemplate: {
    agrTypeBig: {
      get: `/${serviceAbsTemplate}/agrTypeBig/get`,
      getListAll: `/${serviceAbsTemplate}/agrTypeBig/getListAll`,
      addOrUpdate: `/${serviceAbsTemplate}/agrType/addOrUpdate`,
      getListPage: `/${serviceAbsTemplate}/agrType/getListPage`,
      delete: `/${serviceAbsTemplate}/agrType/delete`
    },
    agrType: {
      addOrUpdate: `/${serviceAbsTemplate}/agrType/addOrUpdate`,
      getListPage: `/${serviceAbsTemplate}/agrType/getListPage`,
      get: `/${serviceAbsTemplate}/agrType/get`,
      delete: `/${serviceAbsTemplate}/agrType/delete`,
      getListAll: `/${serviceAbsTemplate}/agrType/getListAll`
    },
    agrTypeSpecify: {
      addOrUpdate: `/${serviceAbsTemplate}/agrTypeSpecify/addOrUpdate`,
      delete: `/${serviceAbsTemplate}/agrTypeSpecify/delete`,
      get: `/${serviceAbsTemplate}/agrTypeSpecify/get`,
      getListPage: `/${serviceAbsTemplate}/agrTypeSpecify/getListPage`,
      getListAll: `/${serviceAbsTemplate}/agrTypeSpecify/getListAll`
    },
    templateParManage: {
      get: `/${serviceAbsTemplate}/templateParManage/get`,
      getTreeListAll: `/${serviceAbsTemplate}/templateParManage/getTreeListAll`
    },
    agrTemplate: {
      add: `/${serviceAbsTemplate}/agrTemplate/add`,
      getListPage: `/${serviceAbsTemplate}/agrTemplate/getListPage`
    }
  },
  syscommon: {
    bankBranchDic: {
      getBankNameList: `/${syscommon}/bankBranchDic/getBankNameList`, // 获取银行名称列表
      getProvinceList: `/${syscommon}/bankBranchDic/getProvinceList`, //  获取省份名称列表
      getCityByProvinceList: `/${syscommon}/bankBranchDic/getCityByProvinceList`,  // 获取某省份下所有城市名称列表。
      getBranchNameTopNumList: `/${syscommon}/bankBranchDic/getBranchNameTopNumList`  // 条件查询，获取支行名称列表。
    },
    kaptcha: {
      getVerifyCode: `/${syscommon}/kaptcha/getVerifyCode`,
      verifyCode: `/${syscommon}/kaptcha/verifyCode`
    },
    universalDic: {
      getList: `/${syscommon}/universalDic/getList`
    },
    universalDicValue: {
      getList: `/${syscommon}/universalDicValue/getList`,
      getValueListByDicType: `/${syscommon}/universalDicValue/getValueListByDicType`,
    }
  },
  sysfilesystem: {
    sysFiles: {
      uploadFile: `/${sysfilesystem}/sysFiles/uploadFile`, // 上传文件接口
      getById: `/${sysfilesystem}/sysFiles/getById` // 根据文件id获取文件信息
    }
  },
  sysnotify: {
    smsApi: {
      register: `/${sysnotify}/sms/register`, // 注册短信通知
      authentication: `/${sysnotify}/sms/authentication`, // 身份验证验证码
      verifyAuthCode: `/${sysnotify}/sms/verifyAuthCode`  // 注册验证码短信
    }
  },
  esign: {
    eSignApi: {
      verifyEnterprise: `/${esign}/esign/verifyEnterprise`, // e签宝-企业信息校验。
      verifyPersonal: `/${esign}/esign/verifyPersonal` // 个人实名认证（运营商三要素）。
    }
  },
  serviceAbsProduct: {
    fpdtTypeApi: {
      getListAll: `/${serviceAbsProduct}/fpdtType/getListAll` // 获取全部产品类型
    },
    annexType: {
      addOrUpdate: `/${serviceAbsProduct}/annexType/addOrUpdate`,
      delete: `/${serviceAbsProduct}/annexType/delete`,
      get: `/${serviceAbsProduct}/annexType/get`,
      getListPage: `/${serviceAbsProduct}/annexType/getListPage`,
      getList: `/${serviceAbsProduct}/annexType/getList`
    },
    productApi: {
      add: `/${serviceAbsProduct}/product/add`, // 新增
      update: `/${serviceAbsProduct}/product/update`, // 更新
      getProductById: `/${serviceAbsProduct}/product/getProductById`, // 根据id获取详情
      getProductListPage: `/${serviceAbsProduct}/product/getProductListPage`, // 分页获取列表
      getProductListAll: `/${serviceAbsProduct}/product/getProductListAll`, // 获取保理商所有产品列表
      updateProductStatus: `/${serviceAbsProduct}/product/updateProductStatus` // 更新产品状态
    },
    productStagingApi: {
      add: `/${serviceAbsProduct}/productStaging/add`, // 新增
      update: `/${serviceAbsProduct}/productStaging/update`, // 更新
      getListPage: `/${serviceAbsProduct}/productStaging/getListPage`, // 分页获取列表
      getListAll: `/${serviceAbsProduct}/productStaging/getListAll`, // 获取产品下所有分期列表
      getById: `/${serviceAbsProduct}/productStaging/getById`,
      del: `/${serviceAbsProduct}/productStaging/del`,
    },
    productTemplateApi: {
      addList: `/${serviceAbsProduct}/productTemplate/addList`, // 新增列表
      getByProductIdList: `/${serviceAbsProduct}/productTemplate/getByProductIdList`, // 获取产品的所有协议模板
      del: `/${serviceAbsProduct}/productTemplate/del`, // 批量删除产品协议模板
    },
    annexTypeApi: {
      getListAll: `/${serviceAbsProduct}/annexType/getListAll` // 获取所有附件列表
    },
    productAnnexApi: {
      addOrUpdateList: `/${serviceAbsProduct}/productAnnex/addOrUpdateList`, // 新增或者更新
      getListByProductId: `/${serviceAbsProduct}/productAnnex/getListByProductId`, // 获取产品所有附件
      delByProductId: `/${serviceAbsProduct}/productAnnex/delByProductId`, // 批量删除产品下附件类型
      delByIds: `/${serviceAbsProduct}/productAnnex/delByIds`, // 批量删除产品附件类型
    }
  },
  serviceAbsPayment: {
    paymentBillApi: {
      getPaymentBillFromApiAndImport: `/${serviceAbsPayment}/paymentBill/getPaymentBillFromApiAndImport`
    }
  }
};
