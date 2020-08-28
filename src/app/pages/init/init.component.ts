import {Component, OnInit} from '@angular/core';
import {Api} from '../../helpers/http/api';
import {Router} from '@angular/router';
import {ApiPath} from '../../api-path';
import {Constants} from '../../helpers/constants';
import {AppPath} from '../../app-path';
import {SimpleReuseStrategy} from '../../helpers/simple-reuse-strategy';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.less']
})
export class InitComponent implements OnInit {

  constructor(private router: Router, private api: Api) {
  }

  status = false;

  ngOnInit() {
    this.init();
  }

  init(): void {
    this.status = false;
    // 获取菜单信息
    /*this.api.get(ApiPath.usercentral.userApi.getUserMenus)
      .ok(data => {
        SimpleReuseStrategy.deleteRouteSnapshotAll(); // 重新初始化路由复用，清空旧的复用路由
        localStorage.setItem(Constants.localStorageKey.menus, JSON.stringify(data));
        // this.router.navigate([AppPath.pages], {queryParams: {userStatus: 'abc'}});
        this.router.navigate([AppPath.pages], {replaceUrl: true});
      }).fail(error => {
      this.status = true;
    });*/

    // 获取用户企业实名认证、个人实名认证状态信息
    this.api.get(ApiPath.usercentral.userApi.getAuthenticateStatus)
      .ok(data => {
        const uStatus = data.userStatus;
        const eStatus = data.etpStatus;
        this.router.navigate([AppPath.verify], {queryParams: {userStatus: uStatus, etpStatus: eStatus}});
      }).fail(error => {
      this.status = true;
    }).final(b => {
      this.status = true;
      });
  }
}
