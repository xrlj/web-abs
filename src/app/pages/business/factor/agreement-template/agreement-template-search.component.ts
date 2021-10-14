import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AgreementTemplateService} from './agreement-template.service';
import {AgrTemplateStatusEnum} from '../../../../helpers/enum/agr-template-status-enum';

@Component({
  selector: 'app-agreement-template-search',
  templateUrl: './agreement-template-search.component.html',
  styleUrls: ['./agreement-template-search.component.less']
})
export class AgreementTemplateSearchComponent implements OnInit {

  searchForm!: FormGroup;
  isCollapse = false;

  agrTypeBigListAll: any[];
  agrTypeListAll: any[];
  agrSpecifyListAll: any[];

  agrTemplateStatusEnum: typeof  AgrTemplateStatusEnum = AgrTemplateStatusEnum;

  @Output() searchData = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private agreementTemplateService: AgreementTemplateService) {
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
    this.agreementTemplateService.getArgTypeBigListAll({})
      .ok(data => {
        this.agrTypeBigListAll = data;
      });
  }

  search() {
    this.searchData.next(this.searchForm.value);
  }

  agrTypeBigSelect($event: any) {
    this.searchForm.controls.agrType.setValue(null);
    this.searchForm.controls.agrSpecify.setValue(null);
    this.agrTypeListAll= null;
    this.agrSpecifyListAll = null;
    this.agreementTemplateService.getArgTypeListAll($event)
      .ok(data => {
        this.agrTypeListAll = data;
      });
  }

  resetSearchForm(): void {
    this.searchForm.reset();
  }

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
  }

  agrTypeSelect($event: any) {
    if (!$event) return;
    this.searchForm.controls.agrSpecify.setValue(null);
    this.agrSpecifyListAll = null;
    this.agreementTemplateService.getArgTypeSpecifyListAll($event)
      .ok(data => {
        this.agrSpecifyListAll = data;
      });
  }
}
