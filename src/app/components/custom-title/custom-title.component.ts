import {AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-custom-title',
  templateUrl: './custom-title.component.html',
  styleUrls: ['./custom-title.component.less']
})
export class CustomTitleComponent implements OnInit, AfterViewInit {

  titleStyles: any;
  @Input() title: string;
  @Input() titleFontSize = '16px';
  @Input() titleLink: string;
  @Input() titleBtnType: string | 'link' | 'primary' | 'default';
  @Output() titleClick = new EventEmitter();

  @Input() titleDesc: string; // 左边标签按钮描述
  // titleDesc文本中点击事件
  @Output() descActionOne = new EventEmitter();
  @Output() descActionTwo = new EventEmitter();

  rootDivStyles: any;
  @Input() isDLineShow = true;
  @Input() isDLineDashed = false;
  @Input() dLineColor = '#F0F0F0';
  @Input() dLineWidth = '1px';

  // extra
  @Input() extraTip: string;
  @Output() extraTipChange = new EventEmitter();
  @Input() extraActionText: string;
  @Output() extraAction = new EventEmitter();

  constructor(private elementRef: ElementRef) {
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

  _descActionOne() {
    this.descActionOne.emit();
  }

  _descActionTwo() {
    this.descActionTwo.emit();
  }

  /**
   * 描述内容innerHTML添加click点击事件失效处理方案。
   * 注意标签添加id
   */
  addDescClickEvent(){
    if (this.elementRef.nativeElement.querySelector('#desc-action-one')) {
      this.elementRef.nativeElement.querySelector('#desc-action-one').addEventListener('click', this._descActionOne.bind(this))
    }
    if (this.elementRef.nativeElement.querySelector('#desc-action-two')) {
      this.elementRef.nativeElement.querySelector('#desc-action-two').addEventListener('click', this._descActionTwo.bind(this))
    }
  }

  ngAfterViewInit(): void {
    this.addDescClickEvent();
  }
}
