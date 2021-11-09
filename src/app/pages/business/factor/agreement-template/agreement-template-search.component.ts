import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AgreementTemplateService} from './agreement-template.service';
import {CommonService} from '../../../../helpers/service/common.service';

@Component({
  selector: 'app-agreement-template-search',
  templateUrl: './agreement-template-search.component.html',
  styleUrls: ['./agreement-template-search.component.less']
})
export class AgreementTemplateSearchComponent implements OnInit, AfterViewInit {

  searchForm!: FormGroup;
  isCollapse = false;

  agrTypeBigListAll: any[];
  agrTypeListAll: any[];
  agrSpecifyListAll: any[];

  agrTemplateStatus = []; // 协议模板状态

  @Output() searchClick = new EventEmitter<any>();

  @Input() searchData: any;

  constructor(private fb: FormBuilder, private agreementTemplateService: AgreementTemplateService,
              private commonService: CommonService) {
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

    this.commonService.getDictValueListByType('agr_status')
      .ok(data => {
        this.agrTemplateStatus = data;
      });
  }

  ngAfterViewInit(): void {
    if (this.searchData) {
      this.searchForm.patchValue(this.searchData);
    }
  }

  search() {
    this.searchData = this.searchForm.value;
    this.searchClick.next(this.searchData);
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
