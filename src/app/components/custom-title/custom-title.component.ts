import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-custom-title',
  templateUrl: './custom-title.component.html',
  styleUrls: ['./custom-title.component.less']
})
export class CustomTitleComponent implements OnInit {

  titleStyles: any;
  @Input()
  title: string;
  @Input()
  titleFontSize = '16px';
  @Input()
  titleLink: string;
  @Input()
  titleDesc: string;

  rootDivStyles: any;
  @Input()
  isDLineShow = true;
  @Input()
  isDLineDashed = false;
  @Input()
  dLineColor = '#F0F0F0';
  @Input()
  dLineWidth = '1px';

  @Output() titleClick = new EventEmitter();

  // extra
  @Input() extraTip: string;
  @Output() extraTipChange = new EventEmitter();
  @Input()
  extraActionText: string;
  @Output() extraAction = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
    this.titleStyles = {
      'font-size': this.titleFontSize
    };
    this.rootDivStyles = {
      'border-bottom-style': this.isDLineDashed ? 'dashed' : 'solid',
      'border-bottom-color': this.dLineColor,
      'border-bottom-width': this.dLineWidth
    };
  }

  btnClick(event) {
    this.titleClick.emit(event);
  }

  extraActionClick() {
    this.extraAction.emit();
  }
}
