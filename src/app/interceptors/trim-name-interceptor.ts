import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class TrimNameInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('>>>>>HeaderInterceptor');

    const url: string = req.url;
    const urlObject = new URL(url);
    if (urlObject.origin === environment.apiFileUrl) {
      return next.handle(req);
    }

    console.log(req.body);
    const body = req.body;
    if (!body || !body.name ) {
      return next.handle(req);
    }
    // copy the body and trim whitespace from the name property
    const newBody = { ...body, name: body.name.trim() };
    // clone request and set its body
    const newReq = req.clone({ body: newBody });
    // send the cloned request to the next handler.
    return next.handle(newReq);
  }
}
