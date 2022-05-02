import {Component, OnInit} from '@angular/core';
import {UIHelper} from '../../helpers/ui-helper';
import {UserTypeEnum} from '../../helpers/enum/user-type-enum';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultBusService} from '../../helpers/event-bus/default-bus.service';
import {PbillStatusEnum} from '../../helpers/enum/pbill-status-enum';
import {PbillSsbStatusEnum} from '../../helpers/enum/pbill-ssb-status-enum';

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

  userTypeEnum: typeof UserTypeEnum = UserTypeEnum;
  pbillStatusEnum: typeof PbillStatusEnum = PbillStatusEnum;
  pbillSsbStatusEnum: typeof PbillSsbStatusEnum = PbillSsbStatusEnum;

  etpType: number;

  constructor(private uiHelper: UIHelper, private router: Router,
              private defaultBusService: DefaultBusService) {
  }

  ngOnInit() {
    this.etpType = this.uiHelper.getCurrentEtpType();
  }

  /**
   * 付款单提交资料。项目公司，供应商等
   */
  goPBillSubmit() {
    this.router.navigate(['/pages/business/payment-bill']).then(() => {
      if (this.etpType === this.userTypeEnum.SUPPLIER) {
        this.defaultBusService.goSearchPBillBySupplierStatus(this.pbillSsbStatusEnum.AIT_SUBMIT);
      }
      if (this.etpType === this.userTypeEnum.MEMBER) {
        this.defaultBusService.goSearchPBillBySubStatus(this.pbillSsbStatusEnum.AIT_SUBMIT);
      }
    });
  }
}
