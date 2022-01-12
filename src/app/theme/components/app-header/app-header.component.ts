import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {ActivatedRoute, Router} from '@angular/router';
import {UIHelper} from '../../../helpers/ui-helper';
import {AppPath} from '../../../app-path';
import {DefaultBusService} from '../../../helpers/event-bus/default-bus.service';
import {Utils} from '../../../helpers/utils';
import {JwtKvEnum} from '../../../helpers/enum/jwt-kv-enum';
import {ThemeEnum} from '../../../helpers/enum/theme-enum';
import {environment} from '../../../../environments/environment';
import {Constants} from '../../../helpers/constants';
import {CommonService} from '../../../helpers/service/common.service';
import {FinancingModelEnum} from '../../../helpers/enum/financing-model-enum';
import {SimpleReuseStrategy} from '../../../helpers/simple-reuse-strategy';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MyValidators} from '../../../helpers/MyValidators';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.less']
})
export class AppHeaderComponent implements OnInit {

  isFullScreen = false;

  collapsed = false;

  @Output() toggleCollapsed = new EventEmitter();
  @Output() currentTheme = new EventEmitter();  // 更改主题色调，弹射主题到父组件
  @Output() asideTheme = new EventEmitter();  // 更改菜单抽屉主题，弹射主题到父组件

  @Output() onRefreshUrl = new EventEmitter<string>(); // 刷新页面

  appName = Constants.appInfo.appName;

  jwtKvEnum: typeof JwtKvEnum = JwtKvEnum;
  themeEnum: typeof ThemeEnum = ThemeEnum;

  // ====== 系统设置-抽屉
  settingVisible: boolean;
  sliderMenuThemeChecked: boolean;
  themeRadioValue: string;
  // 融资模式
  financingModeRadioValue: FinancingModelEnum;
  financingModelEnum: typeof FinancingModelEnum = FinancingModelEnum;

  isShowChangeEtpSpaceModal = false;
  isEtpSpaceModalOkLoading = false;
  etpSpaceChangeForm: FormGroup;

  constructor(private router: Router,
              private api: Api,
              public utils: Utils,
              private fb: FormBuilder,
              public uiHelper: UIHelper, private defaultBusService: DefaultBusService,
              private commonService: CommonService) {

    this.etpSpaceChangeForm = this.fb.group({
      etpSpace: [null, [MyValidators.required]]
    });
  }

  ngOnInit() {
    const settingInfo = this.uiHelper.getSysSettingInfo();
    if (settingInfo) {
      this.themeRadioValue = settingInfo.theme;
      this.sliderMenuThemeChecked = settingInfo.sliderMenuTheme === 'dark' ? true : false;
      this.financingModeRadioValue = settingInfo.financingMode;
    } else {
      this.themeRadioValue = this.uiHelper.getCurrentTheme();
      this.sliderMenuThemeChecked = environment.asideTheme === 'dark' ? true : false;
      this.financingModeRadioValue = FinancingModelEnum.FINANCING_SINGLE;
    }

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

    // 更新系统设置
    const s = this.uiHelper.getSysSettingInfo();
    if (event) {
      s.sliderMenuTheme = 'dark';
    } else {
      s.sliderMenuTheme = environment.asideTheme;
    }
    this.uiHelper.updateSettingInfo(s);
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

    // 更新系统配置
    const s = this.uiHelper.getSysSettingInfo();
    s.theme = theme;
    this.uiHelper.updateSettingInfo(s);
  }

  changeFinancingMode(financingMode: FinancingModelEnum): void {
    console.log(financingMode);
    // 更新系统配置
    const s = this.uiHelper.getSysSettingInfo();
    s.financingMode = financingMode;
    this.uiHelper.updateSettingInfo(s);

    // 刷新系统
    SimpleReuseStrategy.deleteRouteSnapshotAll(); // 重新初始化路由复用，清空旧的复用路由
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
    const object = SimpleReuseStrategy.getHandleObject(this.router.url);
    console.log(object);
    // this.onRefreshUrl.emit(this.router.url);
    // this.router.navigate([this.router.url]);
    // this.router.navigate(['/pages/business/factor/agreement-template']);
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


  changeEtpSpace() {
    this.isShowChangeEtpSpaceModal = true;
  }

  handleEtpSpaceModalCancel() {
    this.isShowChangeEtpSpaceModal = false;
    this.isEtpSpaceModalOkLoading = false;
    this.etpSpaceChangeForm.reset();
  }

  handleEtpSpaceModalOk() {

  }
}
