import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-agreement-template-search',
  templateUrl: './agreement-template-search.component.html',
  styleUrls: ['./agreement-template-search.component.less']
})
export class AgreementTemplateSearchComponent implements OnInit {

  searchForm!: FormGroup;
  isCollapse = true

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      agrBigType: [null, null],
      agrType: [null, null],
      agrSpecify: [null, null],
      agrName: [null, null],
      agrTemplateStatus: [null, null],
      agrVersion: [null, null]
    });
  }

  ngOnInit(): void {
  }

  search() {
  }

  resetSearchForm(): void {
    this.searchForm.reset();
  }

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
  }

}
