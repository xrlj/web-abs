import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MyValidators} from '../../../../../helpers/MyValidators';

@Component({
  selector: 'app-agreement-template-details',
  templateUrl: './agreement-template-details.component.html',
  styleUrls: ['./agreement-template-details.component.less']
})
export class AgreementTemplateDetailsComponent implements OnInit {

  @Output() showList = new EventEmitter();

  @ViewChild('bigPdfViewer', { static: true }) public bigPdfViewer;

  pdfSrc = 'https://seal.hlt-factoring.com/pdf/seal/a3b5c84d70f5479fadf5052dcc2bd6fb.pdf';

  parSearchKey = '';

  nodes = [
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            { title: '发票代码', key: '0-0-0-0', isLeaf: true },
            { title: '0-0-0-1', key: '0-0-0-1', isLeaf: true },
            { title: '0-0-0-2', key: '0-0-0-2', isLeaf: true }
          ]
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            { title: '0-0-1-0', key: '0-0-1-0', isLeaf: true },
            { title: '0-0-1-1', key: '0-0-1-1', isLeaf: true },
            { title: '付款单号', key: '0-0-1-2', isLeaf: true }
          ]
        },
        {
          title: '0-0-2',
          key: '0-0-2',
          isLeaf: true
        }
      ]
    },
    {
      title: '0-1',
      key: '0-1',
      children: [
        { title: '0-1-0-0', key: '0-1-0-0', isLeaf: true },
        { title: '0-1-0-1', key: '0-1-0-1', isLeaf: true },
        { title: '0-1-0-2', key: '0-1-0-2', isLeaf: true }
      ]
    },
    {
      title: '0-2',
      key: '0-2',
      isLeaf: true
    }
  ];

  signTipText = '如果有坐标，将按坐标盖章，否则按关键字盖章';
  templateForm: FormGroup;
  formLabelSpan = 6;
  formControlSpan = 14;

  roleSignSetting = [
    {
      role: 'factor',
      roleName: '保理商',
      key: '',
      signSort: 1,
      signXY: {
        x: '',
        y: '',
      },
      signFlag: false
    },
    {
      role: 'core',
      roleName: '核心企业',
      key: '',
      signSort: 1,
      signXY: {
        x: '',
        y: '',
      },
      signFlag: false
    },
    {
      role: 'subCompany',
      roleName: '项目公司',
      key: '',
      signSort: 1,
      signXY: {
        x: '',
        y: '',
      },
      signFlag: false
    },
    {
      role: 'supplier',
      roleName: '供应商',
      key: '',
      signSort: 1,
      signXY: {
        x: '',
        y: '',
      },
      signFlag: false
    },
  ];

  constructor(private fb: FormBuilder) {
    this.templateForm = this.fb.group({
      agrBigType: [null, [MyValidators.required]],
      agrType: [null, [MyValidators.required]],
      agrSpecify: [null, [MyValidators.required]],
      agrName: [null, [MyValidators.required]],
      agrVersion: [null, [MyValidators.required]],
      agrTextReadTimeLimit: [null, [MyValidators.positiveInteger]],
      remark: [null, null]
    });
  }

  ngOnInit(): void {
  }

  backToList() {
    this.showList.emit();
  }

}
