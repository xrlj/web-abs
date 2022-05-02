import {Injectable} from '@angular/core';
import {HttpUtils} from './http/HttpUtils';
import {UIHelper} from './ui-helper';
import {NzUploadChangeParam, NzUploadFile} from 'ng-zorro-antd/upload';
import {Observable, Observer} from 'rxjs';
import {MediaType} from './http/media-type';
import {DefaultBusService} from './event-bus/default-bus.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadHelper {
  constructor(private uiHelper: UIHelper, private httpUtils: HttpUtils) {
  }

  uploadFileHandleChange({file, fileList}: NzUploadChangeParam, isTip?: boolean | false, defaultBusService?: DefaultBusService): any {
    if (defaultBusService) {
      defaultBusService.showLoading(true);
    }
    const status = file.status;
    if (status !== 'uploading') {
      // console.log(file, fileList);
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
          if (defaultBusService) {
            defaultBusService.showLoading(false);
          }
          this.uiHelper.msgTipSuccess(`${file.name} 文件上传成功。`);
        }
        return response.data;
      } else {
        if (defaultBusService) {
          defaultBusService.showLoading(false);
        }
        const b = this.httpUtils.dealError(code, msg);
        if (!b) {
          this.uiHelper.msgTipError(msg);
        }
      }
    } else if (status === 'error') {
      if (isTip) {
        this.uiHelper.msgTipError(`${file.name} 文件上传失败`);
      }
      if (defaultBusService) {
        defaultBusService.showLoading(false);
      }
    }

    return undefined;
  }

  beforeUpload(fileSizeLimit: number, fileTypeTip: string, ...fileType: MediaType[]): any {
    const beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) =>
      new Observable((observer: Observer<boolean>) => {
        let isFileType = false
        fileType.every(value => {
          if (file.type === value) {
            isFileType = true;
            return false;
          }
          return true;
        });
        if (!isFileType) {
          this.uiHelper.msgTipError(fileTypeTip);
          observer.complete();
          return;
        }
        // tslint:disable-next-line:no-non-null-assertion
        const isLtFileSize = file.size! / 1024 / 1024 < fileSizeLimit;
        if (!isLtFileSize) {
          this.uiHelper.msgTipError(`文件大小不能超过${fileSizeLimit}M`);
          observer.complete();
          return;
        }
        observer.next(isFileType && isLtFileSize);
        observer.complete();
      });

    return beforeUpload;
  }

  getUrl(path: string) {
    return `${environment.apiFileUrl}/${path}`;
  }
}
