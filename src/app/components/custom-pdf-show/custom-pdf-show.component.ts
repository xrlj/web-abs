import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DefaultBusService} from '../../helpers/event-bus/default-bus.service';
import {Subscription} from 'rxjs';
import {VPdfShow} from '../../helpers/vo/v-pdf-show';

@Component({
  selector: 'app-custom-pdf-show',
  templateUrl: './custom-pdf-show.component.html',
  styleUrls: ['./custom-pdf-show.component.less']
})
export class CustomPdfShowComponent implements OnInit, OnDestroy {

  @ViewChild('externalPdfViewer', { static: true }) public externalPdfViewer;

  defaultBusServiceSubscribe: Subscription;

  constructor(private defaultBusService: DefaultBusService) {
    // 订阅
    this.defaultBusServiceSubscribe = this.defaultBusService.pdfShow$.subscribe(vo => {
      this.openPdfNewTab(vo);
    });
  }

  ngOnInit(): void {
    console.log('执行 CustomPdfShowComponent init')
  }

  openPdfNewTab(vo: VPdfShow) {
    this.externalPdfViewer.pdfSrc = vo.url;
    if (vo.id) {
      this.externalPdfViewer.viewerId = vo.id;
    }
    if (vo.oriName) {
      this.externalPdfViewer.downloadFileName = vo.oriName;
    }
    this.externalPdfViewer.refresh();
  }

  ngOnDestroy(): void {
    console.log('执行 CustomPdfShowComponent ngOnDestroy')
    if (this.defaultBusServiceSubscribe) {
      this.defaultBusServiceSubscribe.unsubscribe();
    }
  }

}
