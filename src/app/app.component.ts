import {Component} from '@angular/core';
import {EventBusService} from './helpers/event-bus/event-bus.service';
import {UIHelper} from './helpers/ui-helper';
import {environment} from '../environments/environment';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [EventBusService]
})
export class AppComponent {

  constructor(private eventBusService: EventBusService, private uiHelper: UIHelper, private titleService: Title) {
    this.setGlobal();
    // titleService.setTitle(Constants.appInfo.appName);
    const themeStyle = environment.themeStyle;
    uiHelper.changeTheme(themeStyle);
  }

  /**
   * 声明全局变量
   */
  setGlobal() {
    (window as any).pdfWorkerSrc = 'assets/pdfjs/pdf.worker.js';
  }
}
