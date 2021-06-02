import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MyValidators} from '../../../../../helpers/MyValidators';

// 产品分期列表
@Component({
  selector: 'app-product-staging-list',
  templateUrl: './product-staging-list.component.html',
  styleUrls: ['./product-staging-list.component.less']
})
export class ProductStagingListComponent implements OnInit {

  // ====产品分期列表
  listOfAllData: any[] = [];
  listLoading = false; // 列表加载等待指示器状态
  pageIndex = 1; // 页码
  pageSize = 10; // 每页条数
  total = 0; // 总条数

  // 新增编辑对话框
  addOrEditForm: FormGroup;
  isShowAddOrEditModal = false;
  modalType = 1; // 1-新增；2-编辑
  isModalOkLoading = false;
  stagingForm: FormGroup;
  formLabelSpan = 6;
  formControlSpan = 14;

  constructor(private fb: FormBuilder) {
    this.stagingForm = this.fb.group({
      stgName: [null, [MyValidators.required, MyValidators.maxLength(80)]],
      stgStatus: [null, [MyValidators.required]],
      stgBuyDiscount: [null, [MyValidators.required, MyValidators.decimal]],
      stgFoundDate: [null, null],
      stgSellDiscount: [null, null],
      stgExpiryDate: [null, null],
      stgComment: [null, [MyValidators.maxLength(200), MyValidators.maxLength(5)]],
    });
  }

  ngOnInit(): void {
  }

  showDialog() {
    this.isShowAddOrEditModal = true;
  }

  handleCancel() {
    this.isShowAddOrEditModal = false;
  }

  handleOk(modalType: number) {
  }
}
