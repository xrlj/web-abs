import {Component} from '@angular/core';
import {EventBusService} from './helpers/event-bus/event-bus.service';
import {UIHelper} from './helpers/ui-helper';
import {environment} from '../environments/environment';
import {Title} from '@angular/platform-browser';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [EventBusService]
})
export class AppComponent {

  constructor(private router: Router, private eventBusService: EventBusService,
              private uiHelper: UIHelper, private titleService: Title) {
    this.setGlobal();
    // titleService.setTitle(Constants.appInfo.appName);
    const themeStyle = environment.themeStyle;
    uiHelper.changeTheme(themeStyle);

    // 处理同一个路由，参数变化，不会重新加载界面的问题。
    // tslint:disable-next-line:only-arrow-functions
    /*this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
    this.router.events.subscribe((evt) => {

      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });*/
  }

  /**
   * 声明全局变量
   */
  setGlobal() {
    (window as any).pdfWorkerSrc = 'assets/pdfjs/pdf.worker.js';
  }
}
