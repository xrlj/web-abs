import {UrlSerializer, UrlTree, DefaultUrlSerializer} from '@angular/router';

// url编码自定义处理
export class CustomUrlSerializer implements UrlSerializer {
  parse(url: any): UrlTree {
    const dus = new DefaultUrlSerializer();
    return dus.parse(url);
  }

  serialize(tree: UrlTree): any {
    let dus = new DefaultUrlSerializer(),
      // tslint:disable-next-line:prefer-const
     path = dus.serialize(tree);
    // use your regex to replace as per your requirement.
    return path.replace('%3F', '?');
  }
}
