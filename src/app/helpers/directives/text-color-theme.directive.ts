import {Directive, ElementRef, Input} from '@angular/core';
import {ThemeHelperService} from '../theme-helper.service';

@Directive({
  selector: '[appTextColorTheme]'
})
export class TextColorThemeDirective {

  // 如果有值，元素字体颜色就为该颜色，否则取当前主题主色为字体颜色
  textColor = 'red';

  constructor(private el: ElementRef, private themeHelper: ThemeHelperService) {
    this.setTextColor()
  }

  private setTextColor() {
    this.el.nativeElement.style.background = this.themeHelper.getCurrentThemePrimaryColor();
    /*if (this.textColor) {
      this.el.nativeElement.style.color = this.textColor;
    } else {
      this.el.nativeElement.style.color = this.themeHelper.getCurrentThemePrimaryColor();
    }*/
  }

}
