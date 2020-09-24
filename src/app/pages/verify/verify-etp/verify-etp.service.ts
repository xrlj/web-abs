import { Injectable } from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {ApiPath} from '../../../api-path';
import {VBankBranchReq} from '../../../helpers/vo/req/v-bank-branch-req';

@Injectable({
  providedIn: 'root'
})
export class VerifyEtpService {

  constructor(private api: Api) { }

  getBankNameList(): any {
    return this.api.get(ApiPath.syscommon.bankBranchDic.getBankNameList);
  }

  getProvinceList(): any {
    return this.api.get(ApiPath.syscommon.bankBranchDic.getProvinceList);
  }

  getCityByProvinceList(provinceName: string): any {
    return this.api.get(ApiPath.syscommon.bankBranchDic.getCityByProvinceList, {'province': provinceName});
  }

  getBranchNameTopNumList(vo: VBankBranchReq): any {
    return this.api.post(ApiPath.syscommon.bankBranchDic.getBranchNameTopNumList, vo);
  }
}
