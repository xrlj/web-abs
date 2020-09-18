export const Constants = {
  apiRequest: {
    retryTime: 3,  // 重试次数
    timeOut: 5000
  },
  appInfo: {
    appName: '供应链融资平台',
    clientId: '2e5a0de806a58450',
    clientDeviceType: 'web'
  },
  localStorageKey: {
    token: 'm-jwt-token',
    verifyStatus: 'verify-status', // 企业、个人实名认证状态信息
    menus: 'user-menus', // 菜单
    currentTheme: 'current-theme' // 当前主题色调风格
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
