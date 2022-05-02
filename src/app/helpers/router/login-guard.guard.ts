import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {Constants} from '../constants';

// 守卫路由，防止未授权访问
@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // 路由守卫逻辑，登录后才能显示路由
    const token = localStorage.getItem(Constants.localStorageKey.token);
    return token ? true : false;
  }

}
