import {AfterViewInit, Component, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {PDFDocumentProxy, PDFProgressData, PDFSource} from 'pdfjs-dist';
import {PdfViewerComponent} from 'ng2-pdf-viewer';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {NzTabPosition} from 'ng-zorro-antd/tabs';
import {SIGN_PDF_LIST} from '../../mock/sign-pdf-list';
import {Api} from '../../helpers/http/api';

@Component({
  selector: 'app-pdf-show',
  templateUrl: './pdf-show.component.html',
  styleUrls: ['./pdf-show.component.less']
})
export class PdfShowComponent implements OnInit, AfterViewInit {
  // @Input() pdfUrl: string | Uint8Array | PDFSource = '/assets/abc.pdf';
  @Input() pdfSrc: string | Uint8Array | PDFSource;

  pdfSizeRate = 1; // pdf文件缩放比
  sliderStatus = false; // slider是否禁止滑动
  zoomScale = 'page-height';
  renderText = true;
  page = 1;
  pageNum = 1;
  progressData: PDFProgressData;
  isLoaded = false;
  error: any;
  pdf: PDFDocumentProxy;
  outline: any[];
  rotation = 0;

  @ViewChild(PdfViewerComponent, {static: false})
  pdfComponent: PdfViewerComponent;

  /*左右两边收缩状态,true收缩*/
  leftCollapsed = false;
  rightCollapsed = false;

  leftTabs = [true, false];

  rightTabs = null;
  rightTabSelected = null;

  pdfFiles = SIGN_PDF_LIST;
  pdfFileSelected: any; // 选择的

  /*快捷滚动按钮显示控制*/
  toTopBtn = false;
  toBottomBtn = true;

  position: NzTabPosition = 'left';
  tabs = ['文件', '附件'];

  private getDataTerms = new Subject<number>();

  constructor(private renderer2: Renderer2, private api: Api) {
  }

  ngOnInit(): void {
    console.log('执行 PdfShowComponent init')
    /*对页码显示跳转框做输入防抖*/
    this.getDataTerms
      .pipe(
        // 请求防抖 300毫秒
        debounceTime(300), // 等待，直到用户停止输入
        distinctUntilChanged()  // 等待，直到内容发生了变化
      ).subscribe(term => {
      // 这里做逻辑
      this.validatePageNumInput(term);
    });

    // pdfFiles数据初始处理
    this.pdfFiles.forEach((value, index) => {
      if (index === 0) {
        value.active = true;
        this.pdfFileSelected = value;
      } else {
        value.active = false;
      }
    });
    this.initPdfLoad();
  }

  initPdfLoad() {
    this.pageNum = 1;
    this.page = 1;
    this.isLoaded = false;
    this.pdfSrc = this.pdfFileSelected.url;

    if (this.pdfFileSelected.signStatus === 2) {
      this.rightTabs = [{title: '我的印章', active: true}, {title: '任务信息', active: false}];
    } else {
      this.rightTabs = [{title: '任务状态', active: true}, {title: '任务信息', active: false}]
    }
    this.rightTabSelected = this.rightTabs[0];
  }

  getPageNumData(value: number) {
    this.getDataTerms.next(value);
  }

  validatePageNumInput(_pageNum) {
    if (this.isPositiveInteger(_pageNum.toString())) {
      if (_pageNum > this.pdf.numPages) {
        this.pageNum = this.pdf.numPages;
      }
      if (_pageNum < 1) {
        this.pageNum = 1;
      }
    } else {
      this.pageNum = this.page;
    }
  }

  // 正整数
  isPositiveInteger(value: string): boolean {
    return typeof value === 'string' && /^[0-9]*$/.test(value);
  }

  /**
   * 视图初始化完成调用。
   */
  ngAfterViewInit(): void {
    /*视图加载完成后，动态为该div元素添加滚动条事件监听*/
    this.renderer2.listen(this.pdfComponent.pdfViewerContainer.nativeElement, 'scroll', (event => {
      this.setCurrentPage();
      this.setStickBtnDisplayOrNone();
    }));
  }

  private setCurrentPage() {
    // if (this.pageNum !== this.page) this.pageNum = this.page;

    this.pageNum = this.page;
  }

  private setStickBtnDisplayOrNone() {
    const elt = this.pdfComponent.pdfViewerContainer.nativeElement;
    if (elt.scrollTop === 0) {
      this.toTopBtn = false;
    } else {
      this.toTopBtn = true;
    }

    const atBottom = elt.scrollHeight - elt.scrollTop === elt.clientHeight
    // console.log('==============滚动条到底了：', atBottom);
    if (atBottom || this.page === this.pdf.numPages) { // 在底部
      this.toBottomBtn = false;
    } else {
      this.toBottomBtn = true;
    }
  }

  /**
   * 左边tab切换
   */
  leftTabsToggle(index: number) {
    if (this.leftTabs[index]) {
      this.leftCollapsed = false;
      return;
    }
    const temp = [];
    this.leftTabs.forEach(() => {
      temp.push(false)
    });
    temp[index] = true
    this.leftTabs = temp;

    if (this.leftCollapsed) {
      this.leftCollapsed = false;
    }

    /*处理pdf文件显示*/
    if (index === 0) { // 签署文件
      this.initPdfLoad();
    }
    if (index === 1) {  // 附件
      if (this.pdfFileSelected.attachmentInfo && this.pdfFileSelected.attachmentInfo.length > 0) {
        let url = '';
        this.pdfFileSelected.attachmentInfo.forEach((value, i) => {
          if (i === 0) {
            value.active = true;
            url = value.url;
          } else {
            value.active = false;
          }
        });

        // 设置附件pdf参数
        this.pdfSrc = url;
        this.pageNum = 1;
        this.page = 1;
      }
    }
  }

  /**
   * 每页渲染完回调
   */
  pageRendered(e: CustomEvent) {
    // console.log('(page-rendered)', e);
  }

  /**
   * Pdf loading progress callback
   * @param progressData pdf progress data
   */
  onProgress(progressData: PDFProgressData) {
    // console.log('onProgress=', progressData);
    this.progressData = progressData;

    this.isLoaded = progressData.loaded >= progressData.total;
    this.error = null; // clear error
  }

  openNewTab() {
    // 第三个参数表示浏览器兼容
    window.open('#/pdf-show', '_blank', 'noopener');
  }

  /**
   * pdf加载完后获取其对象。
   */
  afterLoadComplete(pdf: PDFDocumentProxy) {
    console.log('>>>>pdf加载完成：', pdf);
    this.pdf = pdf;
    // pdf.getPage(3).then(i => console.log('>>>>>', i)) // 获取指定页码信息
    this.loadOutline();

    // 快捷按钮状态初始化
    this.toTopBtn = false;
    this.toBottomBtn = true;
  }

  /**
   * Get outline
   */
  loadOutline() {
    this.pdf.getOutline().then((outline: any[]) => {
      this.outline = outline;
    });
  }

  /**
   * 旋转pdf
   */
  rotate(angle: number) {
    this.rotation += angle;
  }

  /**
   * 收缩展开左边。
   */
  leftToggle() {
    this.leftCollapsed = !this.leftCollapsed;
  }

  /**
   * 收缩展开右边。
   */
  rightToggle() {
    this.rightCollapsed = !this.rightCollapsed;
  }

  /**
   * pdf视图动态样式。
   */
  collapsedStyle() {
    let style;
    if (this.leftCollapsed && this.rightCollapsed) { // 两边都关闭
      style = {'margin-left': '40px', 'width': 'calc(100% - 41px)'}
    } else {
      if (!this.leftCollapsed && !this.rightCollapsed) { // 两边都展开
        style = {'margin-left': '280px', 'width': 'calc(100% - 560px)'}
      }
      if (!this.leftCollapsed && this.rightCollapsed) { // 左边展开,右边关闭
        style = {'margin-left': '280px', 'width': 'calc(100% - 281px)'}
      }
      if (this.leftCollapsed && !this.rightCollapsed) { // 左边关闭,右边展开
        style = {'margin-left': '40px', 'width': 'calc(100% - 320px)'}
      }
    }
    return style;
  }

  /**
   * pdf滚动到第一页。
   */
  toTop() {
    // const p = this.pdfComponent.pdfViewerContainer.nativeElement;
    // p.scrollTo(0, 0);

    this.page = 1;
    this.pageNum = this.page;
  }

  /**
   * pdf滚动到最后一页
   */
  toBottom() {
    // const p = this.pdfComponent.pdfViewerContainer.nativeElement;
    // p.scrollTop = p.scrollHeight - p.clientHeight;

    this.page = this.pdf.numPages;
    this.pageNum = this.pdf.numPages;
  }

  /**
   * 滚动到指定页
   */
  scrollToPage(page: number) {
    if (page < 1) {
      page = 1;
    }
    if (page > this.pdf.numPages) {
      page = this.pdf.numPages;
    }
    this.pdfComponent.pdfViewer.scrollPageIntoView({
      pageNumber: page
    });
  }

  /**
   * 切换签署pdf预览。
   */
  switchPdf(item: any) {
    if (item.active) {
      return;
    }
    this.pdfFiles.forEach((value, index) => {
      if (item.id === value.id) {
        value.active = true;
        this.pdfFileSelected = value;
      } else {
        value.active = false;
      }
    });
    this.initPdfLoad();
  }

  switchRightTab(tab: any) {
    this.rightTabSelected = tab;
    if (tab.active) {
      return;
    }
    this.rightTabs.forEach((value, index) => {
      if (value.title === tab.title) {
        value.active = true;
      } else {
        value.active = false;
      }
    });
  }

  onError(error: any) {
    console.log('>>>>load error::', error);
    this.error = error; // set error
    if (error.name === 'PasswordException') {
      const password = prompt(
        '该文档受密码保护！请输入密码：'
      );

      if (password) {
        this.error = null;
        this.setPassword(password);
      }
    }
    if (error.name === 'UnknownErrorException') {
      console.log('加载pdf错误：', error.message);
    }
  }

  private setPassword(password: string) {
    let newSrc;

    if (this.pdfSrc instanceof ArrayBuffer) {
      newSrc = {data: this.pdfSrc};
    } else if (typeof this.pdfSrc === 'string') {
      newSrc = {url: this.pdfSrc};
    } else {
      newSrc = {...this.pdfSrc};
    }

    newSrc.password = password;

    this.pdfSrc = newSrc;
  }

  /**
   * 切换附件选中
   * @param attachment 选中附件对象
   */
  switchAttachmentPdf(attachment: any) {
    let url = '';
    this.pdfFileSelected.attachmentInfo?.forEach((value) => {
      if (attachment.id === value.id) {
        value.active = true;
        url = value.url;
      } else {
        value.active = false;
      }
    });

    this.pdfSrc = url;
    this.pageNum = 1;
    this.page = 1;
  }

  browserPrint(){
    const printContent = document.getElementById('report');
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }
}
