import {Buffer} from 'buffer';
import {Injectable} from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';
// https://github.com/auth0/angular2-jwt
import {JwtHelperService} from '@auth0/angular-jwt';
import {JwtKvEnum} from './enum/jwt-kv-enum';
import {Constants} from './constants';
import {environment} from '../../environments/environment';
import {AppPath} from '../app-path';
import {UIHelper} from './ui-helper';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Utils {

  constructor(private router: Router) {
  }

  /**
   * 开发，测试环境下才打印文本到控制台
   * @param data 打印内容
   */
  print(data: any): void {
    if (environment.tag === 'dev' || environment.tag === 'test') {
      console.log(data)
    }
  }

  /**
   * 文件转base64
   */
  getBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  /**
   * 字符串转码base64。
   * @param content 待转码字符串
   */
  base64encoder(content: string): string {
    const encoder = new Buffer(content).toString('base64');
    return encoder;
  }

  /**
   * base64解码成字符串。
   * @param base64 base64编码。
   */
  base64decoder(base64: string): string {
    const decoder = new Buffer(base64, 'base64').toString();
    return decoder;
  }

  /**
   * 内容md5加密。以字符串形式返回。
   * @param content 待加密内容。
   */
  md5Str(content: string): string {
    const md5Str = Md5.hashStr(content).toString();
    return md5Str;
  }

  /**
   * 解析jwt token。
   * @param token 待解析token。
   */
  jwtTokenDecode(): any {
    const token = localStorage.getItem(Constants.localStorageKey.token);
    if (!token) {
      // throw new Error('没有获取到token');
      this.router.navigate([AppPath.login]);
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken;
  }

  /**
   * 判断token是否已经过期。true过期，false未过期。
   * @param token 保存的token。
   */
  jwtTokenIsExpired(): boolean {
    const token = localStorage.getItem(Constants.localStorageKey.token);
    if (!token) {
      throw new Error('没有获取到token');
    }
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(token);
    return isExpired;
  }

  /**
   * 获取jwt token中保存的自定义字段值。
   * @param token jwt token
   * @param jwtKvEnum 枚举
   */
  getJwtTokenClaim(jwtKvEnum: JwtKvEnum): any {
    const decodeToken = this.jwtTokenDecode();
    switch (jwtKvEnum) {
      case JwtKvEnum.Username:
        return decodeToken.username;
        break;
      case JwtKvEnum.AppType:
        return decodeToken.appType;
        break;
      case JwtKvEnum.UserId:
        return decodeToken.userId;
        break;
      case JwtKvEnum.EnterpriseId:
        return decodeToken.etpId;
        break;
      case JwtKvEnum.UserType:
        return decodeToken.userType;
        break;
      case JwtKvEnum.EnterpriseName:
        return decodeToken.etpName;
        break;
      default:
        return '';
        break;
    }
  }

  /**
   * 数组去重。
   * @param array 数组
   */
  removeRepeatOfArray<T>(array: Array<T>): Array<T> {
    if (!array) {
      return [];
    }
    const arrayNew = [];
    array.forEach(value => {
      if (!arrayNew.includes(value)) {
        arrayNew.push(value);
      }
    });
    return arrayNew;
  }

  /**
   * 把数组参数转换成英文逗号隔开的字符串。
   * @param array 数组
   * @return 如： a,b,c
   */
  arrayToArrayParam(array: any[]): string {
    let arrayPar  = '';
    array.forEach((value, index) => {
      arrayPar = arrayPar.concat(value);
      if (index !== array.length - 1) {
        arrayPar = arrayPar.concat(',');
      }
    });
    return arrayPar;
  }

  generateUUID(): string {
    // tslint:disable-next-line:only-arrow-functions
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      // tslint:disable-next-line:no-bitwise
      const r = (Math.random() * 16) | 0;
      // tslint:disable-next-line:no-bitwise
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  /**
   * 把json对象中指定字段值转换成string类型。
   * 注意json对象只处理第一层而已。
   */
  conversionJsonNumValue2StrValue(jsonObjData: any, keys: string[]): any {
    if (!jsonObjData) return jsonObjData;
    for (const key in jsonObjData) {
      if (keys.find(i => i === key)) {
        jsonObjData[key] = jsonObjData[key].toString;
      }
    }
  }
}
