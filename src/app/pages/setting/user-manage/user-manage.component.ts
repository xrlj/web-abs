import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../../helpers/service/common.service';
import {Api} from '../../../helpers/http/api';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.less']
})
export class UserManageComponent implements OnInit {

  constructor(private commonService: CommonService, private api: Api) { }

  ngOnInit(): void {
  }

  testVerify() {
    const a =  this.commonService.checkVerify();
    console.log(a);
  }
}
