import {Injectable} from '@angular/core';
import {ApiPath} from '../../api-path';
import {Api} from '../http/api';
import {AppPath} from '../../app-path';
import {UIHelper} from '../ui-helper';
import {Router} from '@angular/router';
import {DefaultBusService} from '../event-bus/default-bus.service';
import {UserTypeEnum} from '../enum/user-type-enum';
import {Utils} from '../utils';
import {JwtKvEnum} from '../enum/jwt-kv-enum';
import {HttpClient} from '@angular/common/http';
import {MediaType} from '../http/media-type';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private api: Api, private uiHelper: UIHelper,
              private router: Router, private utils: Utils,
              private httpClient: HttpClient) { }

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
  getEtpInfoByUser(userId: string): any {
    return this.api.get(`${ApiPath.usercentral.enterprise.getEtpInfoByUser}/${userId}`);
  }

  /*************************** 短信发送相关 start  ****************************/

  /**
   * 校验注册验证码。
   * @param mobileNum 手机号码
   * @param code 输入的验证码
   */
  verifyAuthCode(mobileNum: string, code: string): any {
    return this.api.post(ApiPath.sysnotify.smsApi.verifyAuthCode, {mobile: mobileNum, authCode: code});
  }

  /**
   * 身份验证验证码短信发送
   * @param mobileNum 手机号码
   * @param effectiveTime 短信验证码有效时间,单位（秒）
   */
  authenticationSmsCode(mobileNum: string, _effectiveTime: number): any {
    return this.api.post(ApiPath.sysnotify.smsApi.authentication, {mobile: mobileNum, effectiveTime: _effectiveTime});
  }

  /*************************** 短信发送相关 end  ****************************/

  /**************************** 用户信息相关 start ********************************/

  /**
   * 获取用户详情。
   * @param userId 用户id
   */
  getUserInfoById(userId: string): any {
    return this.api.get(`${ApiPath.usercentral.userApi.getUserInfoById}/${userId}`);
  }

  /**
   * 检查企业，登录账户审核认证状态。
   * 1.如果企业，代理人都已经实名认证，则返回认证信息。
   * 2.否则，跳转到实名认证页面。
   */
  /*async checkVerify() {
    // 获取用户企业实名认证、个人实名认证状态信息
    await this.api.get(ApiPath.usercentral.userApi.getAuthenticateStatus)
      .ok(data => {
        console.log(`认证信息》》》》》》：${JSON.stringify(data)}`);
        const uStatus = data.userStatus;
        const eStatus = data.etpStatus;
        if (uStatus === UserStatusEnum.CHECK_PASS && eStatus === EnterpriseStatusEnum.VERIFIED_PASS) { // 企业、个人都已经实名认证
          return data;
        } else {
          localStorage.setItem(Constants.localStorageKey.verifyStatus, JSON.stringify(data));
          // this.router.navigate([AppPath.verify], {queryParams: {userStatus: uStatus, etpStatus: eStatus}});
          this.router.navigate([AppPath.verify]);
        }
      }).final(b => {
        return null;
    });
  }*/

  /**************************** 用户信息相关 end ********************************/

  /**************************菜单 start****************************************/
  getMenuList(_clientId: string, _type: number, _userType?: UserTypeEnum): any {
    const uType = this.utils.getJwtTokenClaim(JwtKvEnum.UserType);
    const body = {
      clientId: _clientId,
      type: _type,
      userType: uType
    };
    return this.api.post(`${ApiPath.usercentral.menuApi.getMenuList}`, body);
  }
  /**************************菜单 end****************************************/

  /********************************* 文件操作 ***************************/

  /**
   * 下载或者打开文件。
   * @param fileId 文件id
   */
  openFileNewBrowserTab(fileId: string) {
    this.api.get(`${ApiPath.sysfilesystem.sysFiles.getById}/${fileId}`)
      .ok(data => {
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display:none');
        a.setAttribute('href', data.url);
        a.setAttribute('target', '_blank')
        a.setAttribute('download', data.oriName);
        a.click();
        URL.revokeObjectURL(data.url);
        document.body.removeChild(a); // 删除该a标签
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
  }

  /**
   * 客户端下载文件二进制。
   * @param fileId 文件id
   */
  downloadFileById(fileId: string) {
    this.api.get(`${ApiPath.sysfilesystem.sysFiles.getById}/${fileId}`)
      .ok(data => {
        const url = `${environment.apiFileUrl}/${data.path}`;
        // const url = 'http://192.168.0.3:9020/xrlj-20200620/2021-07-02/2781ebec-27fc-42d5-8e7b-6364aabadec7.pdf';
        this.downloadFileBlob(url, data.suffix, data.oriName);
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
  }

  private downloadFileBlob(url: string, fileType: string, fileOriName: string): void {
    this.httpClient.get(url, {responseType: 'blob'})
      .subscribe((data: any) => {
        const aLink = document.createElement('a');
        const blob = new Blob([data], {type: MediaType[fileType.toUpperCase()]});
        const objectURL = URL.createObjectURL(blob);
        aLink.setAttribute('href', objectURL);
        aLink.setAttribute('target', '_blank');
        aLink.setAttribute('download', fileOriName);
        aLink.style.visibility = 'hidden';
        document.body.appendChild(aLink);
        aLink.click();
        URL.revokeObjectURL(objectURL); // 释放上面创建的url，内存不再保存它
        document.body.removeChild(aLink); // 删除该a标签
      })
  }

  /********************* 字典 ***********************/

  /**
   * 根据字典类型获取字典值列表
   */
  getDictValueListByType(dictType: string) {
    return this.api.get(`${ApiPath.syscommon.universalDicValue.getValueListByDicType}/${dictType}`);
  }

  /**
   * doc文件转换成pdf
   * @param netUrl 原img文件网络地址
   * @param oriName 文件原名称
   */
  docToPdf(netUrl: string, oriName: string) {
    const body = {'oriFilePath': netUrl, 'oriName': oriName};
    return this.api.post(ApiPath.serviceSysOffdct.docWorker.docToPdf, body);
  }

  /**
   * jpg, png转成pdf
   * @param netUrl 原img文件网络地址
   * @param oriName 文件原名称
   */
  imgToPdf(netUrl: string, oriName: string) {
    const body = {'oriFilePath': netUrl, 'oriName': oriName};
    return this.api.post(ApiPath.serviceSysOffdct.pdfWorker.imgToPdf, body);
  }

}
