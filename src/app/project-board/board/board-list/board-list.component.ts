import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  ViewChild
} from '@angular/core';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { Subscription } from 'rxjs';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskStatusService } from "../task-status.service";
import { SingleTaskComponent } from 'app/project-board/single-task/single-task.component';
import { TaskService } from 'app/task/service/Task.service';
import { TaskModel } from 'app/task/models/task.model';
import { FormGroup, FormControl } from '@angular/forms';
import { CommentModel } from 'app/task/models/comment.model';
import { CommentDataService } from 'app/task/service/comment-data.service';
import { CommentSingleComponent } from './comment-single/comment-single.component';
import { TimeSheetDataService } from 'app/task/service/time-sheet-data.service';

export interface boardList {
  id?:number;
  name?:string;
  cards?:any[];
}
@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BoardListComponent implements OnInit {
  dialogRef: any;
  tasks: TaskModel[];

  @ViewChild(FusePerfectScrollbarDirective)
  listScroll: FusePerfectScrollbarDirective;

  onBoardChanged: Subscription;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  @Input()
  list:boardList;
  @Input()
  connectedTo:any[];
  @Input()
  project: any;
  comments: CommentModel[];


  constructor(public dialog: MatDialog,
    private taskStatusService: TaskStatusService,
    private taskServc: TaskService,
    public snackBar: MatSnackBar,
    private commentSrvc: CommentDataService,
    private timeSheetDataServc: TimeSheetDataService) {}

  removeList(id: number): void {
    this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage =
      "Are you sure you want to delete the list and it's all cards?";

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

  dropped(event: CdkDragDrop<any[]>) {

    if (event.previousContainer === event.container) {
     moveItemInArray(
       event.container.data,
        event.previousIndex,
        event.currentIndex
     );
    } else {
      transferArrayItem(
       event.previousContainer.data,
       event.container.data,
       event.previousIndex,
       event.currentIndex
     );
    }

    this.taskStatusService.changeTaskStatus(event.container.data[event.currentIndex].id,this.list.id)
    .subscribe(
      data => {
        console.log("Task updated succesfully.");
      }
    );
  }

  onCardAdd(taskId): void {
    if (taskId != null) {
      this.taskServc.GetTaskById(taskId).subscribe(data => {
        this.openCloseTaskDialoge(taskId, data);
      });
    } else {
      this.openCloseTaskDialoge(taskId, null);
    }
  }

  openCloseTaskDialoge(taskId?: number, task?: TaskModel) {
    this.dialogRef = this.dialog.open(SingleTaskComponent, {
      width: '800px',
      data: {
        action: task == null ? 'new' : 'edit',
        task: task,
        id: taskId,
        statusId: this.list.id,
        projectId: this.project.id,
        statusName: this.list.name,
        projectName: this.project.name,
        subProjects: this.project.subProjects
      }
    });



    this.dialogRef.afterClosed().subscribe((taskForm: FormGroup) => {
      if (!taskForm) {
        return;
      }
      if (taskForm.valid) {
        if (task == null) {
          this.taskServc
            .createTask(taskForm.getRawValue())
            .subscribe(response => {
              this.tasks.unshift(response);
              this.snackBar.open(`Task ${response.name} Created Successfuly`, 'OK', { verticalPosition: 'top', duration: 1000, });
            });
        } else {
          var objectTask = taskForm.getRawValue();
          this.taskServc
            .updateTask(objectTask)
            .subscribe(response => {
              let itemIndex = this.tasks.findIndex(item => item.id == objectTask.id);
              this.tasks[itemIndex] = objectTask;
              this.snackBar.open(`Task ${response.name} Updated Successfuly`, 'OK', { verticalPosition: 'top', duration: 1000, });
            });
        }
      }
    });
  }

  selectTask(task: TaskModel){
    this.taskServc.SelectTask(task);
    this.commentSrvc.getComments(task.id);
    this.commentSrvc.onCommentList.subscribe(comments => {
      this.comments = comments;
    })
    this.openCloseComment(null, null, task);
  }


  findIndexToUpdate(items: any[], newItem: any) {
    let itemIndex = items.findIndex(item => item.id == newItem.id);
    items[itemIndex] = newItem;
  }
  openCloseComment(id: number, comment: CommentModel,selectedTask: TaskModel) {
    this.dialogRef = this.dialog.open(CommentSingleComponent, {
      width: '800px',
      data: {
        action: comment == null ? 'new' : 'edit',
        comment: comment,
        task: selectedTask,
        id: id,
        list: this.list,
        board: this.project
      }
    });
    this.dialogRef.afterClosed().subscribe((commentModelRespons: any) => {
      if(!commentModelRespons)return;
      var commentForm = commentModelRespons[1];
      if (!commentForm|| !commentForm.valid) {
        return;
      }
        this.timeSheetDataServc.startStopLoading(true);
        if (comment == null) {
          this.commentSrvc
            .createComment(commentForm.getRawValue())
            .subscribe(response => {
              this.comments.push(response);
              this.timeSheetDataServc.startStopLoading(false);
              this.snackBar.open( `Comment ${response.id} Created Successfuly`, 'OK', { verticalPosition: 'top', duration: 1000 });
            });
        } else {
          var objectTimeSheet = commentForm.getRawValue();
          this.commentSrvc
            .updateComment(objectTimeSheet)
            .subscribe(response => {
              this.timeSheetDataServc.startStopLoading(false);
              this.findIndexToUpdate(this.comments,response);
              this.snackBar.open(`Comment ${response.id} Updated Successfuly`, 'OK', { verticalPosition: 'top', duration: 1000 });
            });
        }
    });
  }

  ngOnInit() {
    this.tasks = this.list.cards;
  }
}
