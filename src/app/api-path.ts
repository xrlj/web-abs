/****************服务名称start********************/
const serviceauth = 'serviceauth';
const usercentral = 'usercentral';
const sysfilesystem = 'sysfilesystem'; // 文件系统服务
const sysnotify = 'sysnotify'; // 通知服务
/****************服务名称 end********************/

export const ApiPath = {
  login: `/${serviceauth}/auth/login`,
  logout: `/${serviceauth}/auth/invalidate`,
  usercentral: {
    userApi: {
      getUserMenus: `/${usercentral}/user/getUserMenus`,
      registerByInvitationCode: `/${usercentral}/user/registerByInvitationCode`
    },
    enterprise: {
      getEtpInfoByInvitationCode: `/${usercentral}/enterprise/getEtpInfoByInvitationCode`
    },
    menuApi: {
    },
    appInfoApi: {
    },
    roleApi: {
    },
    dept: {
    },
    rolePermissions: {
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
