import { Component, OnInit } from '@angular/core';
import {TransferChange, TransferItem, TransferSelectChange} from 'ng-zorro-antd/transfer';

@Component({
  selector: 'app-product-annex-list',
  templateUrl: './product-annex-list.component.html',
  styleUrls: ['./product-annex-list.component.less']
})
export class ProductAnnexListComponent implements OnInit {

  // 穿梭框
  listAnnexTransferData: TransferItem[] = [];
  annexPageSize = 10;
  // 后台接口返回
  checkOptionsOne = [
    {label: '保理商', value: 'Apple', checked: true, disabled: true},
    {label: '供应商', value: 'Apple', disabled: true},
    {label: '核心企业', value: 'Pear', disabled: true},
    {label: '项目公司', value: 'Orange', disabled: true}
  ];

  constructor() { }

  ngOnInit(): void {
    this.getAnnexData();
  }

  getAnnexData() {
    for (let i = 0; i < 20; i++) {
      this.listAnnexTransferData.push({
        key: i.toString(),
        index: i + 1,
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        disabled: false,
        checked: false
      });
    }

    // [2, 3].forEach(idx => (this.listAnnexTransferData[idx].direction = 'right'));
  }

  annexSelect($event: TransferSelectChange) {
    console.log($event);
  }

  annexChange(ret: TransferChange) {
    console.log('nzChange', ret);
    const listKeys = ret.list.map(l => l.key);
    const hasOwnKey = (e: TransferItem) => e.hasOwnProperty('key');
    this.listAnnexTransferData = this.listAnnexTransferData.map(e => {
      if (listKeys.includes(e.key) && hasOwnKey(e)) {
        if (ret.to === 'left') {
          delete e.hide;
        } else if (ret.to === 'right') {
          e.hide = false;
        }
      }
      return e;
    });
  }

}
