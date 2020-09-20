import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-user-centre',
  templateUrl: './user-centre.component.html',
  styleUrls: ['./user-centre.component.less']
})
export class UserCentreComponent implements OnInit, OnDestroy {

  dataModel: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log('>>>>>>>>>>>>>>>>>>>个人中心');
  }

  ngOnDestroy(): void {
  }
}
