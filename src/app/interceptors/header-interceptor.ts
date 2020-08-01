import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';
import {Constants} from '../helpers/constants';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('>>>>>HeaderInterceptor');
    const newReq = req.clone({ setHeaders: { 'Client-Id': Constants.appInfo.clientId, 'Client-Device-Type': Constants.appInfo.clientDeviceType } });
    return next.handle(newReq);
  }
}
