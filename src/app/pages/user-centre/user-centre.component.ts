import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {quillConfig} from '../../helpers/quill-config';

@Component({
  selector: 'app-user-centre',
  templateUrl: './user-centre.component.html',
  styleUrls: ['./user-centre.component.less']
})
export class UserCentreComponent implements OnInit, OnDestroy{

  config = quillConfig;
  htmlText: any;
  editor: any;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  quillEditorCreated(quill) {
    // const toolbar = quill.getModule('toolbar');
    // toolbar.addHandler('image', this.imageHandler.bind(this));
    this.editor = quill;
  }

  /*imageHandler() {
    const Imageinput = document.createElement('input');
    Imageinput.setAttribute('type', 'file');
    Imageinput.setAttribute('accept','image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
    Imageinput.classList.add('ql-image');
    Imageinput.addEventListener('change', () => {
      const file = Imageinput.files[0];
      const data: FormData = new FormData();
      data.append('file', file, file.name);
      const header = new Headers();
      header.append('Accept', 'application/json');
      const options = new RequestOptions({ headers: header });
      if (Imageinput.files != null && Imageinput.files[0] != null) {
        this.http.post('http://xxxx/upload', data, options)
          .map(res => res.json())
          .subscribe(res => {
            const range = this.editor.getSelection(true);
            const index = range.index + range.length;
            this.editor.insertEmbed(range.index, 'image', 'http://'+res.url);
          });
      }
    });
    Imageinput.click();
  }*/

  ngOnDestroy(): void {
  }

  /*imageHandler() {
    const Imageinput = document.createElement('input');
    Imageinput.setAttribute('type', 'file');
    Imageinput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
    Imageinput.classList.add('ql-image');

    Imageinput.addEventListener('change', () =>  {
      const file = Imageinput.files[0];
      if (Imageinput.files != null && Imageinput.files[0] != null) {
        this._service.sendFileToServer(file).subscribe(res => {
          this._returnedURL = res;
          this.pushImageToEditor();
        });
      }
    });

    Imageinput.click();
  }*/

  /*pushImageToEditor() {
    const range = this.editor.getSelection(true);
    const index = range.index + range.length;
    this.editor.insertEmbed(range.index, 'image', this._returnedURL);
  }*/

}
