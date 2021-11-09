import {ThemeEnum} from '../app/helpers/enum/theme-enum';

export const environment = {
  production: true,
  tag: 'dev',
  themeStyle: ThemeEnum.Orange, // 设置系统默认风格
  asideTheme: 'light',  // 菜单抽屉主题，dark or light
  apiFileUrl: 'http://192.168.0.3:9020',
  apiUrl: 'https://api-test.xrlj.com'
};
