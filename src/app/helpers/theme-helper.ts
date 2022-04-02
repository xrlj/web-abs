import {Injectable} from '@angular/core';
import {UIHelper} from './ui-helper';
import {ThemeEnum} from './enum/theme-enum';
import {UserStatusEnum} from './enum/user-status-enum';
import {EtpStatusEnum} from './enum/etp-status-enum';
import {sr_RS} from 'ng-zorro-antd/i18n';

@Injectable({
  providedIn: 'root'
})
export class ThemeHelper {

  constructor(private uiHelper: UIHelper) {
  }

  /**
   * 获取系统当前主题主色调值。
   * 注意这里的颜色值要和主题文件中的对应。
   */
  getCurrentThemePrimaryColor(): string {
    let primaryColor;
    const theme = this.uiHelper.getCurrentTheme();
    switch (theme) {
      case ThemeEnum.Turquoise:
        primaryColor = '#17B3A3';
        break;
      case ThemeEnum.Orange:
        primaryColor = '#EB6709';
        break;
      case ThemeEnum.Default:
        primaryColor = '#409EFF';
        break;
      default:
        primaryColor = '#409EFF';
        break;
    }

    return primaryColor;
  }

  /**
   * 用户管理列表。用户状态字段样式
   * @param status 用户状态
   */
  setUserStatusNameColor(status: number): any {
    let style = {};
    const theme = this.uiHelper.getCurrentTheme();
    switch (theme) {
      case ThemeEnum.Turquoise:
        switch (status) {
          case UserStatusEnum.BLACK:
            style = {background: 'red', color: 'red'};
            break;
          case UserStatusEnum.DISABLE:
            style = {background: 'red', color: 'red'};
            break;
          case UserStatusEnum.CHECK_FAILURE:
            style = {background: 'red', color: 'red'};
            break;
          case UserStatusEnum.CHECK_PASS:
            style = {background: 'green', color: 'green'};
            break;
          default:
            style = {background: '#F6F6F6', color: '#505654'};
            break;
        }
        break;
      case ThemeEnum.Orange:
        switch (status) {
          case UserStatusEnum.BLACK:
            style = {background: 'red', color: 'red'};
            break;
          case UserStatusEnum.DISABLE:
            style = {background: 'red', color: 'red'};
            break;
          case UserStatusEnum.CHECK_FAILURE:
            style = {background: 'red', color: 'red'};
            break;
          case UserStatusEnum.CHECK_PASS:
            style = {background: 'gold', color: 'gold'};
            break;
          default:
            style = {background: '#F6F6F6', color: '#505654'};
            break;
        }
        break;
      case ThemeEnum.Default:
        switch (status) {
          case UserStatusEnum.BLACK:
            style = {background: 'red', color: 'red'};
            break;
          case UserStatusEnum.DISABLE:
            style = {background: 'red', color: 'red'};
            break;
          case UserStatusEnum.CHECK_FAILURE:
            style = {background: 'red', color: 'red'};
            break;
          case UserStatusEnum.CHECK_PASS:
            style = {background: 'blue', color: 'blue'};
            break;
          default:
            style = {background: '#F6F6F6', color: '#505654'};
            break;
        }
        break;
    }
    return style;
  }

  /**
   * 设置企业状态标签再不同主题下，不同状态的颜色。
   * @param etpStatus 企业状态。
   */
  setEtpStatusColor(etpStatus: number): any {
    let style = {};
    const theme = this.uiHelper.getCurrentTheme();
    switch (theme) {
      case ThemeEnum.Turquoise:
        switch (etpStatus) {
          case EtpStatusEnum.CHECK_WAIT:
            style = {background: '#F6F6F6', color: '#505654'};
            break;
          case EtpStatusEnum.CHECK_PASS:
            style = {background: 'green', color: 'green'};
            break;
          case EtpStatusEnum.CHECK_FAILURE:
            style = {background: 'red', color: 'red'};
            break;
          case EtpStatusEnum.VERIFIED_WAITING:
            style = {background: '#F6F6F6', color: '#505654'};
            break;
          case EtpStatusEnum.VERIFIED_PASS:
            style = {background: 'green', color: 'green'};
            break;
          case EtpStatusEnum.DISABLE:
            style = {background: 'red', color: 'red'};
            break;
          case EtpStatusEnum.BLACK:
            style = {background: 'red', color: 'red'};
            break;
        }
        break;
      case ThemeEnum.Orange:
        switch (etpStatus) {
          case EtpStatusEnum.CHECK_WAIT:
            style = {background: '#F6F6F6', color: '#505654'};
            break;
          case EtpStatusEnum.CHECK_PASS:
            style = {background: 'gold', color: 'gold'};
            break;
          case EtpStatusEnum.CHECK_FAILURE:
            style = {background: 'red', color: 'red'};
            break;
          case EtpStatusEnum.VERIFIED_WAITING:
            style = {background: '#F6F6F6', color: '#505654'};
            break;
          case EtpStatusEnum.VERIFIED_PASS:
            style = {background: 'gold', color: 'gold'};
            break;
          case EtpStatusEnum.DISABLE:
            style = {background: 'red', color: 'red'};
            break;
          case EtpStatusEnum.BLACK:
            style = {background: 'red', color: 'red'};
            break;
        }
        break;
      case ThemeEnum.Default:
        switch (etpStatus) {
          case EtpStatusEnum.CHECK_WAIT:
            style = {background: '#F6F6F6', color: '#505654'};
            break;
          case EtpStatusEnum.CHECK_PASS:
            style = {background: 'blue', color: 'blue'};
            break;
          case EtpStatusEnum.CHECK_FAILURE:
            style = {background: 'red', color: 'red'};
            break;
          case EtpStatusEnum.VERIFIED_WAITING:
            style = {background: '#F6F6F6', color: '#505654'};
            break;
          case EtpStatusEnum.VERIFIED_PASS:
            style = {background: 'blue', color: 'blue'};
            break;
          case EtpStatusEnum.DISABLE:
            style = {background: 'red', color: 'red'};
            break;
          case EtpStatusEnum.BLACK:
            style = {background: 'red', color: 'red'};
            break;
        }
        break;
    }
    return style;
  }

  setPBillStatusColorNormal(status: number): any {
    let nzColor = 'default';
    if (status === 3) {
      nzColor = 'processing'
    }
    if (
      status === 6
      || status === 9
      || status === 13
      || status === 15
      || status === 21
      || status === 24
      || status === 27
    ) {
      nzColor = 'success';
    }
    if (status === 12 || status === 18) {
      nzColor = 'error';
    }
    if (status === 30) {
      nzColor = 'warning';
    }
    return nzColor;
  }

  /**
   * 付款单状态标签颜色设置
   */
  setPBillStatusColor(status: number): any {
    let nzColor = 'default';
    const theme = this.uiHelper.getCurrentTheme();
    switch (theme) {
      case ThemeEnum.Turquoise:
        switch (status) {
          case 0: // 未提交审核
            nzColor = '';
            break;
          case 3: // 待审核
            nzColor = 'blue';
            break;
          case 6: // 审核通过
            nzColor = 'lime';
            break;
          case 9: // 复核通过
            nzColor = 'green';
            break;
          case 12: // 已退回
            nzColor = 'magenta';
            break;
          case 15: // 律所审核通过
            nzColor = 'red';
            break;
          case 18: // 律所审核不通过
            nzColor = 'red';
            break;
          case 21: // 已打包
            nzColor = 'cyan';
            break;
          case 24: // 已放款
            nzColor = 'gold';
            break;
          case 27: // 已开票
            nzColor = 'gold';
            break;
          case 30: // 已出池
            nzColor = 'red';
            break;
          default:
            nzColor = '';
            break;
        }
        break;
      case ThemeEnum.Orange:
        switch (status) {
          case 0: // 未提交审核
            nzColor = '';
            break;
          case 3: // 待审核
            nzColor = 'blue';
            break;
          case 6: // 审核通过
            nzColor = 'lime';
            break;
          case 9: // 复核通过
            nzColor = 'green';
            break;
          case 12: // 已退回
            nzColor = 'magenta';
            break;
          case 15: // 律所审核通过
            nzColor = 'red';
            break;
          case 18: // 律所审核不通过
            nzColor = 'red';
            break;
          case 21: // 已打包
            nzColor = 'cyan';
            break;
          case 24: // 已放款
            nzColor = 'gold';
            break;
          case 27: // 已开票
            nzColor = 'gold';
            break;
          case 30: // 已出池
            nzColor = 'red';
            break;
          default:
            nzColor = '';
            break;
        }
        break;
      case ThemeEnum.Default:
        switch (status) {
          case 0: // 未提交审核
            nzColor = '';
            break;
          case 3: // 待审核
            nzColor = 'orange';
            break;
          case 6: // 审核通过
            nzColor = 'lime';
            break;
          case 9: // 复核通过
            nzColor = 'green';
            break;
          case 12: // 已退回
            nzColor = 'magenta';
            break;
          case 15: // 律所审核通过
            nzColor = 'red';
            break;
          case 18: // 律所审核不通过
            nzColor = 'red';
            break;
          case 21: // 已打包
            nzColor = 'cyan';
            break;
          case 24: // 已放款
            nzColor = 'gold';
            break;
          case 27: // 已开票
            nzColor = 'gold';
            break;
          case 30: // 已出池
            nzColor = 'red';
            break;
          default:
            nzColor = '';
            break;
        }
        break;
    }
    return nzColor;
  }

  setPBillSubOrSupplerStatusTagColor(status: number): any {
    let nzColor = 'default';
    const theme = this.uiHelper.getCurrentTheme();
    switch (theme) {
      case ThemeEnum.Turquoise:
        switch (status) {
          case 0: // 待提交
            nzColor = '';
            break;
          case 3: // 待审核
            nzColor = 'blue';
            break;
          case 5: // 待复核
            nzColor = 'geekblue';
            break;
          case 11: // 复核通过
            nzColor = 'green';
            break;
          case 14: // 审核不通过
            nzColor = 'red';
            break;
          case 17: // 复核不通过
            nzColor = 'red';
            break;
          case 20: // 已出池
            nzColor = 'red';
            break;
          default:
            nzColor = '';
            break;
        }
        break;
      case ThemeEnum.Orange:
        switch (status) {
          case 0: // 待提交
            nzColor = '';
            break;
          case 3: // 待审核
            nzColor = 'blue';
            break;
          case 5: // 待复核
            nzColor = 'geekblue';
            break;
          case 11: // 复核通过
            nzColor = 'green';
            break;
          case 14: // 审核不通过
            nzColor = 'red';
            break;
          case 17: // 复核不通过
            nzColor = 'red';
            break;
          case 20: // 已出池
            nzColor = 'red';
            break;
          default:
            nzColor = '';
            break;
        }
        break;
      case ThemeEnum.Default:
        switch (status) {
          case 0: // 待提交
            nzColor = '';
            break;
          case 3: // 待审核
            nzColor = 'orange';
            break;
          case 5: // 待复核
            nzColor = 'gold';
            break;
          case 11: // 复核通过
            nzColor = 'green';
            break;
          case 14: // 审核不通过
            nzColor = 'red';
            break;
          case 17: // 复核不通过
            nzColor = 'red';
            break;
          case 20: // 已出池
            nzColor = 'red';
            break;
          default:
            nzColor = '';
            break;
        }
        break;
    }
    return nzColor;
  }

  /**
   * 通用状态tag标签各种颜色标识设置。
   */
  setCommonStatusColor(status: number): any {
    let style = {};
    const theme = this.uiHelper.getCurrentTheme();
    switch (theme) {
      case ThemeEnum.Turquoise:
        switch (status) {
          case 0:
            style = {background: '#F6F6F6', color: '#505654'};
            break;
          case 1:
            style = {background: 'green', color: 'green'};
            break;
          case 2:
            style = {background: 'red', color: 'red'};
            break;
          case 3:
            style = {background: '#F6F6F6', color: '#505654'};
            break;
          case 4:
            style = {background: 'green', color: 'green'};
            break;
          case 5:
            style = {background: 'red', color: 'red'};
            break;
          case 6:
            style = {background: 'red', color: 'red'};
            break;
        }
        break;
      case ThemeEnum.Orange:
        switch (status) {
          case 0:
            style = {background: '#F6F6F6', color: '#505654'};
            break;
          case 1:
            style = {background: 'gold', color: 'gold'};
            break;
          case 2:
            style = {background: 'red', color: 'red'};
            break;
          case 3:
            style = {background: '#F6F6F6', color: '#505654'};
            break;
          case 4:
            style = {background: 'gold', color: 'gold'};
            break;
          case 5:
            style = {background: 'red', color: 'red'};
            break;
          case 6:
            style = {background: 'red', color: 'red'};
            break;
        }
        break;
      case ThemeEnum.Default:
        switch (status) {
          case 0:
            style = {background: '#F6F6F6', color: '#505654'};
            break;
          case 1:
            style = {background: 'blue', color: 'blue'};
            break;
          case 2:
            style = {background: 'red', color: 'red'};
            break;
          case 3:
            style = {background: '#F6F6F6', color: '#505654'};
            break;
          case 4:
            style = {background: 'blue', color: 'blue'};
            break;
          case 5:
            style = {background: 'red', color: 'red'};
            break;
          case 6:
            style = {background: 'red', color: 'red'};
            break;
        }
        break;
    }
    return style;
  }
}
