
import { environment } from './../../../../../environments/environment.prod';
import { Data } from '@angular/router';

import * as _ from 'lodash';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { UploadService } from 'app/core/services/upload.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { AuthenticationService } from 'app/auth/athentication.service';
import { CommentModel } from 'app/task/models/comment.model';
import { TaskModel } from 'app/task/models/task.model';
import { AttachmentModel } from 'app/task/models/attachment.model';
import { TaskService } from 'app/task/service/Task.service';
import { CommentDataService } from 'app/task/service/comment-data.service';

@Component({
  selector: 'app-comment-single',
  templateUrl: './comment-single.component.html',
  styleUrls: ['./comment-single.component.scss']
})
export class CommentSingleComponent implements OnInit {
  action: string;
  dialogTitle: string;
  comment: CommentModel;
  comments: CommentModel[];
  commentForm: FormGroup;
  allowedExtensions = '/(.jpg|.jpeg|.png|.gif)$/i';
  imageUrl = environment.ImageApiUrl;
  card: TaskModel;
  board: any;
  list: any;

  @ViewChild('fileInput') fileInput;
  @BlockUI('projectCreateBlock') blockUIList: NgBlockUI;

  constructor(
    private formBuilder: FormBuilder,
    private uploadService: UploadService,
    public dialogRef: MatDialogRef<CommentSingleComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private authSvc: AuthenticationService,
    public snackBar: MatSnackBar,
    private taskServc: TaskService,
    private commentSrvc: CommentDataService,
  ) { }
  createCommentForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.comment.id],
      comment: [this.comment.comment],
      // createDate: [this.timeSheet.date],
      creator: [this.comment.creator],
      attachments: [this.comment.attachments],
      taskId: [this.comment.taskId],
    });
  }

  deleteAttach(image): void {
    _.remove(
      this.comment.attachments,
      att => att.attachmentId === image.attachmentId
    );

    this.commentForm
      .get('attachments')
      .setValue(this.comment.attachments);
  }

  ngOnInit() {

    this.commentSrvc.onCommentList.subscribe(comments => {
      this.comments = comments;
      console.log("task main comments: ",this.comments);
    })

    this.action = this.data.action;
    this.card = this.data.task;
    this.list = this.data.list;
    this.board = this.data.board;
    if (this.action === 'new') {
      this.dialogTitle = `New Comment  For ( ${this.data.task.name} )`;
      this.comment = {
        creator: this.authSvc.getUserToken().fullName,
        taskId: this.data.task.id,
      };
    } else if (this.action === 'edit') {
      debugger;
      this.dialogTitle = `Edit comment For ( ${this.data.task.name} )`;
      this.comment = this.data.comment;
    }

    this.commentForm = this.createCommentForm();
  }

  uploadFile(event) {
    const files = [].slice.call(event.target.files);
    if (files && files[0]) {
      const fileToUpload = files;

      this.uploadService.uploadMultiFiles(fileToUpload).subscribe(res => {
        res.forEach(element => {
          const attachment = {
            attachmentId: element.id,
            url: element.url,
            sourceFileName: element.sourceFileName,
            fileExtension: element.fileExtension
          };
            if(!this.comment.attachments){this.comment.attachments=[];}
          this.comment.attachments.unshift(attachment);
          this.commentForm
          .get('attachments')
          .setValue(this.comment.attachments);

        this.blockUIList.stop();
        });
      });
    }
  }
  removeDueDate(): void
  {
      this.card.startDate = '';
      this.updateCard();
  }

  checkExtensionImage(c: AttachmentModel) {
    let valToLower = c.fileExtension.toLowerCase();
    let regex = new RegExp("(.*?)\.(jpg|png|jpeg)$"); //add or remove required extensions here
     return regex.test(valToLower);
  }

  openImage(attachment) {
    window.open(this.imageUrl + attachment.url)
  }

  updateCard(): any
  {
    this.card.projectId = this.board.id;
    this.taskServc
      .updateTask(this.card)
      .subscribe(response => {
    });
  }
}
