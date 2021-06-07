import {Component, Input, OnInit} from '@angular/core';
import {SignStatusEnum} from '../../../../../helpers/enum/sign-status-enum';

@Component({
  selector: 'app-sign-list-multiple',
  templateUrl: './sign-list-multiple.component.html',
  styleUrls: ['./sign-list-multiple.component.less']
})
export class SignListMultipleComponent implements OnInit {

  // 签署状态
  @Input()
  signStatus: SignStatusEnum;

  constructor() { }

  ngOnInit(): void {
  }

}
