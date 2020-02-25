import { Injectable } from '@angular/core';
import { ApiService } from 'app/core/services/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskFilterModel } from '../models/taskFilter.model';
import { catchError } from 'rxjs/operators';
//import { CommentModel } from '../models/Comment.model';
import * as moment from 'moment';
import { CommentModel } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentDataService {
  CommentList: any;
  onCommentList: BehaviorSubject<any> = new BehaviorSubject([]);
   onLoading: BehaviorSubject<any> = new BehaviorSubject(false);


  constructor(private apiSvc: ApiService) {

  }

  getComments(taskId){

    this.startStopLoading(true);
    this.apiSvc.get(`/TaskComment/list/${taskId}`).subscribe(data => {
      this.CommentList = data;
      this.onCommentList.next(this.CommentList);
      this.startStopLoading(false);
    });
  }
startStopLoading(start:boolean){
  this.onLoading.next(start);
}
  GetCommentById(id){
    return this.apiSvc.get(`/TaskComment/${id}`);

  }
  createComment(Comment: any): Observable<CommentModel> {
    return this.apiSvc
      .post(`/TaskComment`, Comment)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  updateComment(Comment: any): Observable<CommentModel> {
    return this.apiSvc
      .put(`/TaskComment/${Comment.id}`, Comment)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  DeleteComment(id:any){
    return this.apiSvc.delete(`/TaskComment/${id}/true`)
    .pipe(catchError((error: any) => Observable.throw(error.json())));

  }
  Done(id:any,done:any){
    return this.apiSvc.get(`Comment/done/${id}?done=${done}`)
    .pipe(catchError((error: any) => Observable.throw(error.json())));

  }

}
