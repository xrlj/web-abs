import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.less']
})
export class VerifyComponent implements OnInit {

  etpStatus = 0;
  userStatus = 0;

  showStatus = 1;

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe()
  }

  goToVerify(status: number) {
    this.showStatus = status;
  }
}
