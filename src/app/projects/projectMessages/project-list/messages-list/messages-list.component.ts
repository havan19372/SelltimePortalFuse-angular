import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ProjectMessage, ProjectModel } from '../../../project.model';
import { ProjectService } from '../../../project.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss'],
  animations: fuseAnimations
})
export class MessagesListComponent implements OnInit, OnDestroy {
  projectMessages: ProjectMessage[];
  selectedProject: ProjectModel;
  openedMessage: ProjectMessage;

  onProjectMessagesChanged: Subscription;
  onSelectedProjectChanged: Subscription;
  onOpenedMessageChanged: Subscription;
  constructor(private projectSvc: ProjectService) {}

  ngOnInit(): void {
    this.onSelectedProjectChanged = this.projectSvc.onSelectedProjectChanged.subscribe(
      project => {
        this.selectedProject = project;
      }
    );

    this.onProjectMessagesChanged = this.projectSvc.onProjectMessagesChanged.subscribe(
      messages => {
        //
        this.projectMessages = messages;
      }
    );

    this.onOpenedMessageChanged = this.projectSvc.onOpenedMessageChanged.subscribe(
      message => {
        this.openedMessage = message;
      }
    );
  }

  readMessage(message: ProjectMessage): void {
    this.projectSvc.readMessage(message);
  }

  ngOnDestroy(): void {
    this.onProjectMessagesChanged.unsubscribe();
    this.onSelectedProjectChanged.unsubscribe();
    this.onOpenedMessageChanged.unsubscribe();
  }
}
