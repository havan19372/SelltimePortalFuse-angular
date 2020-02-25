import * as _ from 'lodash';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectMessageAddModel, ProjectModel } from '../../project.model';
import { UploadService } from '../../../core/services/upload.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { AuthenticationService } from '../../../auth/athentication.service';

@Component({
  selector: 'app-project-message-create',
  templateUrl: './project-message-create.component.html',
  styleUrls: ['./project-message-create.component.scss']
})
export class ProjectMessageCreateComponent implements OnInit {
  action: string;
  dialogTitle: string;

  projectMessage: ProjectMessageAddModel;
  projectMessageForm: FormGroup;
  allowedExtensions = '/(.jpg|.jpeg|.png|.gif)$/i';

  @ViewChild('fileInput') fileInput;

  @BlockUI('projectCreateBlock') blockUIList: NgBlockUI;

  constructor(
    private formBuilder: FormBuilder,
    private uploadService: UploadService,
    public dialogRef: MatDialogRef<ProjectMessageCreateComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private authSvc: AuthenticationService
  ) {}

  createProjectMessageForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.projectMessage.id],
      detail: [this.projectMessage.detail],
      createDate: [this.projectMessage.createDate],
      creator: [this.projectMessage.creator],
      projectId: [this.projectMessage.projectId],
      typeId: [this.projectMessage.typeId],
      attachments: [this.projectMessage.attachments]
    });
  }

  onChange(event: any) {
    this.blockUIList.start();

    const files = [].slice.call(event.target.files);
    if (files && files[0]) {
      const fileToUpload = files;

      this.uploadService.uploadMultiFiles(fileToUpload).subscribe(res => {
        res.forEach(element => {
          const attachment = {
            attachmentId: element.id,
            url: element.url
          };
          if (!this.projectMessage.attachments) {
            this.projectMessage.attachments = [];
          }
          this.projectMessage.attachments.unshift(attachment);

          this.projectMessageForm
            .get('attachments')
            .setValue(this.projectMessage.attachments);

          this.blockUIList.stop();
        });
      });
    }
  }

  deleteAttach(image): void {
    debugger;
    _.remove(
      this.projectMessage.attachments,
      att => att.attachmentId === image.attachmentId
    );

    debugger;
    this.projectMessageForm
      .get('attachments')
      .setValue(this.projectMessage.attachments);
  }

  ngOnInit() {
    this.action = this.data.action;
    if (this.action === 'add') {
      this.dialogTitle = 'New Project Message';
      this.projectMessage = new ProjectMessageAddModel();
      this.projectMessage.projectId = this.data.project.id;
      this.projectMessage.creator = this.authSvc.getUserToken().fullName;
    } else if (this.action === 'edit') {
      this.dialogTitle = 'Edit Project Message';
      this.projectMessage = this.data.message;
    }

    this.projectMessageForm = this.createProjectMessageForm();
  }

  uploadFile(event) {
    const files = [].slice.call(event.target.files);
    if (files && files[0]) {
      const fileToUpload = files;

      this.uploadService.uploadMultiFiles(fileToUpload).subscribe(res => {
        res.forEach(element => {
          const attachment = {
            attachmentId: element.id,
            url: element.url
          };

          this.projectMessage.attachments.unshift(attachment);
        });
      });
    }
  }
}
