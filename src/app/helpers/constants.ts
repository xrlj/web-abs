export const Constants = {
  apiRequest: {
    retryTime: 2,  // 重试次数
    timeOut: 1000 * 5 // 5秒
  },
  appInfo: {
    appName: 'xxxxxxx',
    clientId: '2e5a0de806a58450',
    clientDeviceType: 'web',
    superUserId: '384564355850567680'
  },
  localStorageKey: {
    token: 'm-jwt-token',
    currentEtpInfo: 'current-etp-info', // 当前企业和标签
    verifyStatus: 'verify-status', // 企业、个人实名认证状态信息
    menus: 'user-menus', // 菜单
    currentTheme: 'current-theme', // 当前主题色调风格,
    systemSettingInfo:  'system-setting-info'  // 系统设置信息
  },
  nzFormItem: {
    nzFormLabel: {
      nzSm: 4,
      nzXs: 24
    },
    nzFormControl: {
      nzSm: 10,
      nzXs: 24
    }
  }
};
