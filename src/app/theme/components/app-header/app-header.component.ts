import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {Router} from '@angular/router';
import {UIHelper} from '../../../helpers/ui-helper';
import {AppPath} from '../../../app-path';
import {DefaultBusService} from '../../../helpers/event-bus/default-bus.service';
import {Utils} from '../../../helpers/utils';
import {JwtKvEnum} from '../../../helpers/enum/jwt-kv-enum';
import {ThemeEnum} from '../../../helpers/enum/theme-enum';
import {environment} from '../../../../environments/environment';
import {Constants} from '../../../helpers/constants';
import {ApiPath} from '../../../api-path';
import {CommonService} from '../../../helpers/service/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.less']
})
export class AppHeaderComponent implements OnInit {
  constructor(private router: Router,
              private api: Api,
              public utils: Utils,
              public uiHelper: UIHelper, private defaultBusService: DefaultBusService,
              private commonService: CommonService) {
  }

  isFullScreen = false;

  collapsed = false;

  @Output() toggleCollapsed = new EventEmitter();
  @Output() currentTheme = new EventEmitter();  // 更改主题色调，弹射主题到父组件
  @Output() asideTheme = new EventEmitter();  // 更改菜单抽屉主题，弹射主题到父组件

  appName = Constants.appInfo.appName;

  jwtKvEnum: typeof JwtKvEnum = JwtKvEnum;
  themeEnum: typeof ThemeEnum = ThemeEnum;

  // ====== 系统设置-抽屉
  settingVisible: boolean;
  sliderMenuThemeChecked = environment.asideTheme === 'dark' ? true : false;
  themeRadioValue: string;

  ngOnInit() {
    this.themeRadioValue = this.uiHelper.getCurrentTheme();

    window.addEventListener('resize', () => {
      this.checkFull();
    });

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
    this.commonService.logout(this.defaultBusService);
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

  fullScreen() {
    if (!this.isFullScreen) {
      const docElmWithBrowsersFullScreenFunctions = document.documentElement as HTMLElement & {
        mozRequestFullScreen(): Promise<void>;
        webkitRequestFullscreen(): Promise<void>;
        msRequestFullscreen(): Promise<void>;
      };

      if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
        docElmWithBrowsersFullScreenFunctions.requestFullscreen();
      } else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) { /* Firefox */
        docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
      } else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
      } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) { /* IE/Edge */
        docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
      }
      this.isFullScreen = true;
    } else {
      const docWithBrowsersExitFunctions = document as Document & {
        mozCancelFullScreen(): Promise<void>;
        webkitExitFullscreen(): Promise<void>;
        msExitFullscreen(): Promise<void>;
      };
      if (docWithBrowsersExitFunctions.exitFullscreen) {
        docWithBrowsersExitFunctions.exitFullscreen();
      } else if (docWithBrowsersExitFunctions.mozCancelFullScreen) { /* Firefox */
        docWithBrowsersExitFunctions.mozCancelFullScreen();
      } else if (docWithBrowsersExitFunctions.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        docWithBrowsersExitFunctions.webkitExitFullscreen();
      } else if (docWithBrowsersExitFunctions.msExitFullscreen) { /* IE/Edge */
        docWithBrowsersExitFunctions.msExitFullscreen();
      }
      this.isFullScreen = false;
    }
  }

  checkFull() {
    const fullStatus = document['fullscreen'] || document['webkitIsFullScreen'] || document['mozFullScreen'] || false;
    if (!fullStatus) {
      this.isFullScreen = false;
    } else {
      this.isFullScreen = true;
    }
  }


}
