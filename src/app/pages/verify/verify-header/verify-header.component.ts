import {Component, Input, OnInit} from '@angular/core';
import {DefaultBusService} from '../../../helpers/event-bus/default-bus.service';
import {CommonService} from '../../../helpers/service/common.service';

@Component({
  selector: 'app-verify-header',
  templateUrl: './verify-header.component.html',
  styleUrls: ['./verify-header.component.less']
})
export class VerifyHeaderComponent implements OnInit {

  @Input()
  verifyTitle: string;

  constructor(private defaultBusService: DefaultBusService, private commonService: CommonService) { }

  ngOnInit(): void {
  }

  /**
   * 退出登录。
   */
  logout() {
    this.commonService.logout(this.defaultBusService);
  }
}
