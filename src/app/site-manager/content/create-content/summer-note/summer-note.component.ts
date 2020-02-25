import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
declare var $:any
@Component({
  selector: 'app-summer-note',
  templateUrl: './summer-note.component.html',
  styleUrls: ['./summer-note.component.scss']
})
export class SummerNoteComponent{
  form: FormGroup;
  config = {
    height: '200px',
    uploadImagePath: '/api/upload'
  };
  editorDisabled = false;
  get sanitizedHtml() {
    return this.sanitizer.bypassSecurityTrustHtml(this.form.get('html').value);
  }
  constructor(
    private sanitizer: DomSanitizer
  ) {
    this.form = new FormGroup({
      html: new FormControl()
    });
  }
  enableEditor() {
    this.editorDisabled = false;
  }
  disableEditor() {
    this.editorDisabled = true;
  }
  onEditorChange($event){
    console.log("@editorChange",$event);
  }
  onBlur() {
    console.log('Blur');
  }
}
