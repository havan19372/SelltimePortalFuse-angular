import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { ProjectMessage } from '../../../project.model';
import { ProjectMessageCreateComponent } from '../../project-message-create/project-message-create.component';
import { ProjectService } from '../../../project.service';
import { environment } from '../../../../../environments/environment';


@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss'],
  animations: fuseAnimations
})
export class MessageDetailsComponent implements OnInit, OnDestroy {
  showDetails: boolean;
  message: ProjectMessage;
  onOpenedMessageChanged: Subscription;

  messageAddDialogRef: MatDialogRef<ProjectMessageCreateComponent, any>;

  imageUrl: string;
  constructor(
    private projectSvc: ProjectService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.imageUrl = environment.ImageApiUrl;
  }

  editMessage(message): void {
    debugger;
    this.messageAddDialogRef = this.dialog.open(ProjectMessageCreateComponent, {
      panelClass: 'mail-compose-dialog',
      width: '600px',
      data: {
        action: 'edit',
        project: null,
        message: message
      }
    });

    this.messageAddDialogRef.afterClosed().subscribe(response => {
      debugger;
      if (!response) {
        return;
      }

      if (response[0] === 'add') {
        this.projectSvc
          .createProjectMessage(response[1].getRawValue())
          .subscribe(projectMessage => {
            debugger;

            this.snackBar.open('Message added', 'OK', {
              verticalPosition: 'bottom',
              duration: 1000,
              panelClass: 'mat-green-bg'
            });
          });
      }else  if (response[0] === 'edit') {
        this.projectSvc
          .editProjectMessage(response[1].getRawValue())
          .subscribe(projectMessage => {
            debugger;


            this.snackBar.open('Message added', 'OK', {
              verticalPosition: 'bottom',
              duration: 1000,
              panelClass: 'mat-green-bg'
            });
          });
      }
    });
  }

  ngOnInit() {
    this.onOpenedMessageChanged = this.projectSvc.onOpenedMessageChanged.subscribe(
      message => {
         debugger;
        this.message = message;
      }
    );
  }

  ngOnDestroy(): void {
    this.onOpenedMessageChanged.unsubscribe();
  }
}
