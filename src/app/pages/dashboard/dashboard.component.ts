import {Component, OnInit} from '@angular/core';
import {UIHelper} from '../../helpers/ui-helper';
import {UserTypeEnum} from '../../helpers/enum/user-type-enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  // 公告分页
  pageIndex = 1;
  pageSize = 3;
  total = 10

  userTypeEnum: typeof  UserTypeEnum = UserTypeEnum;

  etpType: number;

  constructor(private uiHelper: UIHelper) {}

  ngOnInit() {
    this.etpType = this.uiHelper.getCurrentEtpType();
  }
}
