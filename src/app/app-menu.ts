// 目前仅支持三级目录
export const APP_MENUS = [
  {
    title: '首页',
    icon: 'dashboard',
    link: '/'
  },
  {
    title: '用户管理',
    icon: 'appstore',
    children: [
      { title: '企业管理', link: '/navigation/affix' },
      { title: '会员管理', link: '/navigation/breadcrumb' }
    ]
  },
  {
    title: '贷前管理',
    icon: 'appstore',
    children: [
      { title: '授信协议管理', link: '/navigation/affix' },
      { title: '转让合同管理', link: '/navigation/breadcrumb' },
      { title: '产品管理', link: '/navigation/affix' }
    ]
  },
  {
    title: '贷中管理',
    icon: 'box-plot',
    children: [
      { title: '可融资数据', link: '/navigation/affix' },
      { title: '转让管理', link: '/navigation/affix' }
    ]
  },
  {
    title: '贷后管理',
    icon: 'box-plot',
    children: [
      { title: '资产管理', link: '/navigation/affix' },
      { title: '中登网登记', link: '/navigation/affix' },
      { title: '银行流水登记', link: '/navigation/affix' },
      { title: '汇款核销', link: '/navigation/affix' },
      { title: '客户台账', link: '/navigation/affix' }
    ]
  },
  {
    title: '系统管理',
    icon: 'box-plot',
    children: [
      { title: '系统用户管理', link: '/navigation/affix' },
      { title: '部门管理', link: '/navigation/dropdown' },
      { title: '角色管理', link: '/navigation/breadcrumb' },
      { title: '权限管理', link: '/navigation/dropdown' },
      { title: '菜单管理', link: '/navigation/menu' }
    ]
  }
];
