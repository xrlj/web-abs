import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UIHelper} from '../../../helpers/ui-helper';
import {DefaultBusService} from '../../../helpers/event-bus/default-bus.service';
import {AppAsideComponent, AppBodyComponent, AppHeaderComponent} from '../../components';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.less'],
  providers: [DefaultBusService]
})
export class DefaultComponent implements OnInit, OnDestroy {

  // 控制目录的展开/折叠
  collapsed = false;

  @ViewChild(AppHeaderComponent)
  private appHeaderComponent: AppHeaderComponent;
  @ViewChild(AppBodyComponent)
  private appBodyComponent: AppBodyComponent;
  @ViewChild(AppAsideComponent)
  private appAsideComponent: AppAsideComponent;

  constructor(private router: Router, private uiHelper: UIHelper) {
  }

  ngOnInit() {
    // 服务端处理token是否过期，避免客户端和服务器时间不一致，或者改动客户端系统时间变成未过期
    this.uiHelper.verifyLoginAndJumpToLogin();
  }

  onToggleCollapsed(evt) {
    console.log('执行了 onToggleCollapsed');
    this.collapsed = !this.collapsed;
  }

  /**
   * 变更主题色调。
   */
  setCurrentTheme(evt): void {
    this.appBodyComponent.setCurrentTabClasses(evt); // 调用子组件方法
  }

  /**
   * 变更菜单抽屉主题。
   */
  setAsideTheme(evt): void {
    this.appAsideComponent.changeAsideMenuTheme(evt);
  }

  ngOnDestroy(): void {
  }

  /**
   * 点击快捷tab
   */
  clickTab($event: any) {
    if (this.collapsed) {
      return;
    }
    this.appAsideComponent.selectedMenuOnClickTabMenu($event);
  }
}
