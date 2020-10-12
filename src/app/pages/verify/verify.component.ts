import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UIHelper} from '../../helpers/ui-helper';
import {Constants} from '../../helpers/constants';
import {Subscription} from 'rxjs';
import {DefaultBusService} from '../../helpers/event-bus/default-bus.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.less']
})
export class VerifyComponent implements OnInit {

  etpStatus = 0;
  userStatus = 0;
  verifyTitle = '企业实名认证';

  constructor(private router: ActivatedRoute, private uiHelper: UIHelper) {
  }

  ngOnInit(): void {
    this.uiHelper.verifyLoginAndJumpToLogin();

    // 获取初始认证状态
    const statusInfo = JSON.parse(localStorage.getItem(Constants.localStorageKey.verifyStatus));
    this.etpStatus = statusInfo.etpStatus;
    this.userStatus = statusInfo.userStatus;
    if (this.etpStatus === 4 && this.userStatus !== 4) {
      this.verifyTitle = '个人账号实名认证';
    }
  }
}
