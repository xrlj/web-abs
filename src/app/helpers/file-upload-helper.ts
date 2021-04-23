import {Injectable} from '@angular/core';
import {HttpUtils} from './http/HttpUtils';
import {UIHelper} from './ui-helper';
import {NzUploadChangeParam} from 'ng-zorro-antd/upload';

@Injectable({
  providedIn: 'root'
})
export class FileUploadHelper {
  constructor(private uiHelper: UIHelper, private httpUtils: HttpUtils) {}

  uploadFileHandleChange({ file, fileList }: NzUploadChangeParam, isTip?: boolean | false): any {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      const response = file.response;
      if (!response) {
        if (isTip) {
          this.uiHelper.msgTipError(`${file.name} 文件上传失败`);
        }
        return;
      }

      const success = response.success;
      const code = response.code;
      const msg = response.msg;
      if (success) {
        if (isTip) {
          this.uiHelper.msgTipSuccess(`${file.name} 文件上传成功。`);
        }
        return response.data;
      } else {
        const b = this.httpUtils.dealError(code, msg);
        if (!b) {
          this.uiHelper.msgTipError(msg);
        }
      }
    } else if (status === 'error') {
      if (isTip) {
        this.uiHelper.msgTipError(`${file.name} 文件上传失败`);
      }
    }

    return undefined;
  }
}
