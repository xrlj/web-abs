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
    // titleService.setTitle(Constants.appInfo.appName);
    const themeStyle = environment.themeStyle;
    uiHelper.changeTheme(themeStyle);
  }
}
