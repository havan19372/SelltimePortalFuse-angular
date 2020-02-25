import * as _ from 'lodash';
import { Component, OnInit, Inject } from '@angular/core';
import { IContentModel } from '../content.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../../core/services/sweet-alert.service';
import { ContentService } from '../content.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss'],
  animations: fuseAnimations
})
export class ContentListComponent implements OnInit {
  dialogTitle: string;
  contents: IContentModel[];

  constructor(
    public dialogRef: MatDialogRef<ContentListComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private router: Router,
    private sweetAlert: SweetAlertService,
    private ContentSvc: ContentService
  ) {}

  editContent(contentId: number): void {
    this.dialogRef.close([contentId, 'edit']);
  }

  deleteContent(contentId: number): void {
    this.sweetAlert.showPrompt(
      'Are you sure?',
      "You won't be able to revert this!",
      'Yes, delete it!',
      result => {
        if (result.value) {
          this.ContentSvc.deleteContent(contentId).subscribe(response => {
            this.sweetAlert.showSuccess(
              'Deleted Successfully',
              `Content #${contentId} deleted !`
            );
            debugger;
            _.remove(this.contents, (elem: IContentModel) => {
              return elem.id === contentId;
            });

            if (!this.contents.length) {
              this.dialogRef.close();
            }
          });
        }
      }
    );
  }

  ngOnInit() {
    this.dialogTitle = 'Content List';

    this.contents = this.data.contents;
  }
}
