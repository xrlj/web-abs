import {Injectable} from '@angular/core';
import {ApiPath} from '../../api-path';
import {Api} from '../http/api';
import {AppPath} from '../../app-path';
import {UIHelper} from '../ui-helper';
import {Router} from '@angular/router';
import {DefaultBusService} from '../event-bus/default-bus.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private api: Api, private uiHelper: UIHelper,
              private router: Router) { }

  /**
   * 退出登录。
   */
  logout(defaultBusService: DefaultBusService): void {
    this.uiHelper.modalConfirm('确定退出登录？')
      .ok(() => {
        defaultBusService.showLoading(true);
        this.api.get(ApiPath.logout).ok(data => {
          if (data) {
            this.uiHelper.logoutLocalStorageClean();
            this.router.navigate([AppPath.login]); // 退出成功
          } else {
            this.uiHelper.msgTipError('退出失败');
          }
        }).fail(error => {
          this.uiHelper.msgTipError(error.msg);
        }).final(() => {
          defaultBusService.showLoading(false);
        });
      });
  }

  /**
   * 获取登录用户所属企业的详情。
   */
  getEtpInfoByUser(): any {
    return this.api.get(ApiPath.usercentral.enterprise.getEtpInfoByUser);
  }
}
