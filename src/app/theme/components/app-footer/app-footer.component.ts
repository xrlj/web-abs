import { Component, OnInit } from '@angular/core';
import {Constants} from '../../../helpers/constants';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.less']
})
export class AppFooterComponent implements OnInit {
  constructor() {}

  copyright = Constants.COPYRIGHT;

  ngOnInit() {}
}
