import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NzModalService} from 'ng-zorro-antd/modal';
import {EtpBankCardEditComponent} from './etp-bank-card-edit.component';

@Component({
  selector: 'app-etp-bank-card',
  templateUrl: './etp-bank-card.component.html',
  styleUrls: ['./etp-bank-card.component.less']
})
export class EtpBankCardComponent implements OnInit {

  searchForm!: FormGroup;

  // 表格
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: any[] = [];
  listOfAllData: any[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // 列表数据
  mapOfCheckedId: { [key: string]: boolean } = {}; // 记录选择
  numberOfChecked = 0;
  listLoading = false; // 列表加载等待指示器状态
  pageIndex = 1; // 页码
  pageSize = 10; // 每页条数
  total = 11; // 总条数

  constructor(private fb: FormBuilder,
              private modal: NzModalService,
              private viewContainerRef: ViewContainerRef) {
    this.searchForm = this.fb.group({
      branchName: [null, null],
      bankNo: [null, null]
    });
  }

  ngOnInit(): void {
  }

  search(b: boolean = false) {

  }

  refreshStatus() {
    this.isAllDisplayDataChecked = this.listOfDisplayData
      .filter(item => !item.disabled)
      .every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.listOfDisplayData.filter(item => !item.disabled).some(item => this.mapOfCheckedId[item.id]) &&
      !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.listOfAllData.filter(item => this.mapOfCheckedId[item.id]).length;
  }

  currentPageDataChange($event: any[]): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.filter(item => !item.disabled).forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }

  editModal(type): void {
    const modal = this.modal.create({
      nzTitle: type === 1 ? '新增' : '编辑',
      nzWidth: '600px',
      nzMask: true,
      nzMaskClosable: false,
      nzContent: EtpBankCardEditComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: { // 参数
        bankCardInfo: {}
      },
      nzFooter: [
        {
          label: '取消',
          onClick: instance => {
            modal.destroy();
          }
        },
        {
          label: '确定',
          type: 'primary',
          loading: false,
          onClick(instance): void {
            this.loading = true;
            // this.loading = false;
          }
        }
      ]
    });
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => console.log('[afterClose] The result is:', result));
  }

}
