import {Directive, ElementRef} from '@angular/core';
import {ThemeHelper} from '../helpers/theme-helper';

/**
 * 属性指令-字体颜色为主色调颜色。即字体颜色为主题样式颜色
 */
@Directive({
  selector: '[appTextColorTheme]'
})
export class TextColorThemeDirective {

  constructor(private el: ElementRef, private themeHelper: ThemeHelper) {
    debugger;
    this.el.nativeElement.style.color = this.themeHelper.getCurrentThemePrimaryColor();
  }
}
