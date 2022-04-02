import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

/**
 * 管道。处理显示富文本（innerHTML）内联样式丢失问题。
 */
@Pipe({
  name: 'html'
})
export class HtmlPipe implements PipeTransform {
  constructor (private sanitizer: DomSanitizer) {
  }
  transform(style) {
    return this.sanitizer.bypassSecurityTrustHtml(style);
  }
}
