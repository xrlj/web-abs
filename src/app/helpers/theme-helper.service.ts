import { Injectable } from '@angular/core';
import {UIHelper} from './ui-helper';
import {ThemeEnum} from './enum/theme-enum';

@Injectable({
  providedIn: 'root'
})
export class ThemeHelperService {

  constructor(private uiHelper: UIHelper) { }

  /**
   * 获取系统当前主题主色调值。
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
}
