import {Component, Input, OnInit} from '@angular/core';
import {SignStatusEnum} from '../../../../../helpers/enum/sign-status-enum';

@Component({
  selector: 'app-sign-list-search-multiple',
  templateUrl: './sign-list-search-multiple.component.html',
  styleUrls: ['./sign-list-search-multiple.component.less']
})
export class SignListSearchMultipleComponent implements OnInit {

  @Input()
  signStatus: SignStatusEnum;

  constructor() { }

  ngOnInit(): void {
  }

}
