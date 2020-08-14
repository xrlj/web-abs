import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiPath} from '../../../api-path';
import {UIHelper} from '../../../helpers/ui-helper';
import {AppPath} from '../../../app-path';
import {DefaultBusService} from '../../../helpers/event-bus/default-bus.service';
import {Utils} from '../../../helpers/utils';
import {JwtKvEnum} from '../../../helpers/enum/jwt-kv-enum';
import {ThemeEnum} from '../../../helpers/enum/theme-enum';
import {environment} from '../../../../environments/environment';
import {VMenuResp} from '../../../helpers/vo/resp/v-menu-resp';
import {Constants} from '../../../helpers/constants';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.less']
})
export class AppHeaderComponent implements OnInit {
  constructor(private router: Router,
              private api: Api,
              public utils: Utils,
              public uiHelper: UIHelper, private defaultBusService: DefaultBusService) {
  }

  collapsed = false;

  @Output() toggleCollapsed = new EventEmitter();
  @Output() currentTheme = new EventEmitter();  // 更改主题色调，弹射主题到父组件
  @Output() asideTheme = new EventEmitter();  // 更改菜单抽屉主题，弹射主题到父组件

  appName = Constants.appInfo.appName;

  jwtKvEnum: typeof  JwtKvEnum = JwtKvEnum;
  themeEnum: typeof  ThemeEnum = ThemeEnum;

  // ====== 系统设置-抽屉
  settingVisible: boolean;
  sliderMenuThemeChecked = environment.asideTheme === 'dark' ? true : false;
  themeRadioValue: string;

  ngOnInit() {
    this.themeRadioValue = this.uiHelper.getCurrentTheme();
  }

  toggle() {
    this.collapsed = !this.collapsed;
    this.toggleCollapsed.emit();
  }

  /**
   * 变更菜单抽屉主题,并弹出到父组件。
   * @param event 选定true，否者false
   */
  asideChangeTheme(event): void {
    this.asideTheme.emit(event);
  }

  /**
   * 更改系统主题色调。
   * @param event 主题
   */
  changeTheme(event: any): void {
    let theme = null;
    switch (event) {
      case ThemeEnum.Default:
        theme = ThemeEnum.Default;
        break;
      case ThemeEnum.Orange:
        theme = ThemeEnum.Orange;
        break;
      case ThemeEnum.Turquoise:
        theme = ThemeEnum.Turquoise;
        break;
    }
    this.uiHelper.changeTheme(theme);
    this.currentTheme.emit(theme);
  }

  /**
   * 退出登录。
   */
  logout(): void {
    this.uiHelper.modalConfirm('确定退出登录？')
      .ok(() => {
        this.defaultBusService.showLoading(true);
        /*this.api.get(ApiPath.logout).ok(data => {
          if (data) {
            this.uiHelper.logoutLocalStorageClean();
            this.router.navigate([AppPath.login]); // 退出成功
          } else {
            this.uiHelper.msgTipError('退出失败');
          }
        }).fail(error => {
          this.uiHelper.msgTipError('退出失败');
        }).final(() => {
          this.defaultBusService.showLoading(false);
        });*/
      });
  }

  openSettingDrawer() {
    this.settingVisible = true;
  }

  closeSettingDrawer() {
    this.settingVisible = false;
  }

  /**
   * 个人中心。
   */
  openUserCentre() {
    this.router.navigate([AppPath.userCentre]);
  }

  /**
   * 刷新路由，重新加载页面。
   * // TODO 路由会重新加载，但是页面无法重新加载。需要再具体组件中订阅路由事件，是否有更好办法？
   */
  routerRefresh() {
    this.router.navigate([this.router.url]);
  }
}
