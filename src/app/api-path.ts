/****************服务名称start********************/
const serviceauth = 'serviceauth';
const usercentral = 'usercentral';
const syscommon = 'syscommon';
const sysfilesystem = 'sysfilesystem'; // 文件系统服务
const sysnotify = 'sysnotify'; // 通知服务
const esign = 'esign'; // e签宝服务
/****************服务名称 end********************/

export const ApiPath = {
  login: `/${serviceauth}/auth/login`,  // 登录
  logout: `/${serviceauth}/auth/invalidate`,  // 退出登录
  usercentral: {
    userApi: {
      getUserMenus: `/${usercentral}/user/getUserMenus`,  // 登录后获取用户拥有的菜单列表
      getAuthenticateStatus: `/${usercentral}/user/getAuthenticateStatus`,  // 获取各认证状态信息
      registerByInvitationCode: `/${usercentral}/user/registerByInvitationCode` // 邀请码注册，提交保存注册信息
    },
    enterprise: {
      getEtpInfoByInvitationCode: `/${usercentral}/enterprise/getEtpInfoByInvitationCode`, // 根据邀请码获取邀请企业信息
      getEtpInfoByUser: `/${usercentral}/enterprise/getEtpInfoByUser`, // 获取用户所属企业的详情
      saveOrUpdate: `/${usercentral}/enterprise/saveOrUpdate` // 保存或者更新企业信息。
    }
  },
  syscommon: {
    bankBranchDic: {
      getBankNameList: `/${syscommon}/bankBranchDic/getBankNameList`, // 获取银行名称列表
      getProvinceList: `/${syscommon}/bankBranchDic/getProvinceList`, //  获取省份名称列表
      getCityByProvinceList: `/${syscommon}/bankBranchDic/getCityByProvinceList`,  // 获取某省份下所有城市名称列表。
      getBranchNameTopNumList: `/${syscommon}/bankBranchDic/getBranchNameTopNumList`  // 条件查询，获取支行名称列表。
    }
  },
  sysfilesystem: {
    sysFiles: {
      uploadFile: `/${sysfilesystem}/sysFiles/uploadFile` // 上传文件接口
    }
  },
  sysnotify: {
    smsApi: {
      register: `/${sysnotify}/sms/register`, // 注册短信通知
      verifyAuthCode: `/${sysnotify}/sms/verifyAuthCode`  // 注册验证码短信
    }
  },
  esign: {
    eSignApi: {
      verifyEnterprise: `/${esign}/esign/verifyEnterprise`, // e签宝-企业信息校验。
    }
  }
};
