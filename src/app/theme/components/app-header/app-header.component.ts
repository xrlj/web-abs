import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.less']
})
export class AppHeaderComponent implements OnInit {
  constructor(private router: Router) {}

  userTypeName: string;

  ngOnInit() {
    this.userTypeName = '保理商';
  }

  logout() {
    console.log('submit');
    this.router.navigateByUrl('/login');
  }

}
