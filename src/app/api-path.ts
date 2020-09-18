/****************服务名称start********************/
const serviceauth = 'serviceauth';
const usercentral = 'usercentral';
const syscommon = 'syscommon';
const sysfilesystem = 'sysfilesystem'; // 文件系统服务
const sysnotify = 'sysnotify'; // 通知服务
/****************服务名称 end********************/

export const ApiPath = {
  login: `/${serviceauth}/auth/login`,
  logout: `/${serviceauth}/auth/invalidate`,
  usercentral: {
    userApi: {
      getUserMenus: `/${usercentral}/user/getUserMenus`,
      getAuthenticateStatus: `/${usercentral}/user/getAuthenticateStatus`,
      registerByInvitationCode: `/${usercentral}/user/registerByInvitationCode`
    },
    enterprise: {
      getEtpInfoByInvitationCode: `/${usercentral}/enterprise/getEtpInfoByInvitationCode`
    }
  },
  syscommon: {
    bankBranchDic: {
      getBankNameList: `/${syscommon}/bankBranchDic/getBankNameList`,
      getProvinceList: `/${syscommon}/bankBranchDic/getProvinceList`,
      getCityByProvinceList: `/${syscommon}/bankBranchDic/getCityByProvinceList`
    }
  },
  sysfilesystem: {
    sysFiles: {
      uploadFile: `/${sysfilesystem}/sysFiles/uploadFile`
    }
  },
  sysnotify: {
    smsApi: {
      register: `/${sysnotify}/sms/register`,
      verifyAuthCode: `/${sysnotify}/sms/verifyAuthCode`
    }
  }
};
