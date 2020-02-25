import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { ProjectMessage } from '../../../../project.model';
import { ProjectService } from '../../../../project.service';

@Component({
  selector: 'app-message-list-item',
  templateUrl: './message-list-item.component.html',
  styleUrls: ['./message-list-item.component.scss'],
  animations: fuseAnimations
})
export class MessageListItemComponent implements OnInit {
  @Input() message: ProjectMessage;
  @HostBinding('class.selected') selected: boolean;

  constructor(private projectSvc: ProjectService) {}

  onSelectedChange(message: ProjectMessage): void {
    this.projectSvc.readMessage(message);
  }

  ngOnInit() {}
}
