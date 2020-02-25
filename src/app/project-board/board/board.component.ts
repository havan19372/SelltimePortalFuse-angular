import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import * as fromStore from '../state';
import { ProjectsBoard } from 'app/project-board/project-board.model';
import { Subscription, Observable } from 'rxjs';
import { TaskStatusService } from "./task-status.service";
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { TaskFilterModel } from 'app/task/models/taskFilter.model';
import { AuthenticationService } from 'app/auth/athentication.service';
import { TimeSheetDataService } from 'app/task/service/time-sheet-data.service';
import { TaskService } from 'app/task/service/Task.service';
import { TaskModel } from 'app/task/models/task.model';
import { ProjectService } from 'app/projects/project.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  animations: fuseAnimations
})
export class BoardComponent implements OnInit {
  project: ProjectsBoard;
  tasks: TaskModel[];
  updatedTasks: TaskModel[];
  projectTasks: TaskModel[];
  onProjectsChanged: Subscription;

  list: Array<object> = [];
  settings: any;
  taskStatuses:any[];
  StatusIds = [];

  detailsLookUps: any[];
  projects: any[];
  projectId: number;
  private sub: any;
  isLoadingResults: boolean;


  searchInput: FormControl;
  filterParams: TaskFilterModel;
  isCollapsed = true;
  isFiltered = false;
  isMyTask: boolean = true;

  constructor(private store: Store<fromStore.ProjectBoardState>,
    private taskStatusdetailService: TaskStatusService,
    private route: ActivatedRoute,
    private authSvc: AuthenticationService,
    private taskServc: TaskService,
    private timeSheetDataServc: TimeSheetDataService,
    private projectSvc: ProjectService
    ) {
      this.searchInput = new FormControl('');
      this.settings = {
        color: 'fuse-dark'
      };
      this.isLoadingResults = true;
  }
  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.projectId = +params['projectId']; // (+) converts string 'id' to a number
      console.log(this.projectId);
      // In a real app: dispatch action to load the details here.
    });

    this.projectSvc.getProjects();

    this.itializeTaskFilter();
    this.taskServc.setTaskFilter(this.filterParams);

    this.taskStatusdetailService.getDetailsLookups().subscribe(
      (response) => {
        this.detailsLookUps = response;
        this.taskStatuses = this.detailsLookUps;
      },
      (err) => console.log('error occurs'),
      () => {
        this.getProjectTasks();
      }
    );

    this.taskServc.getTasks();
    this.taskServc.onTasksChanged.subscribe(
      response => {
      this.timeSheetDataServc.startStopLoading(false);
      this.tasks = response;
      this.list = [];
      this.getProjectTasks();
    });

    this.searchInput.valueChanges
    .debounceTime(300)
    .distinctUntilChanged()
    .subscribe(searchText => {
        this.tasks =   this.taskServc.tasks.filter(t=>
         ( t.name !=null && t.name.indexOf(searchText.trim())>-1)||
         ( t.detail !=null &&  t.detail.indexOf(searchText.trim())>-1)||
          t.id.toString().indexOf(searchText.trim())>-1 ||
           searchText=="");
     });
  }

  getProjectTasks(){
    this.onProjectsChanged = this.projectSvc.onProjectsChanged.subscribe(
      response => {
        this.projects = response;
        const selectedProject = this.projects.filter(project => project.id == this.projectId)
        this.project = selectedProject[0];
        this.projectTasks = this.tasks.filter(projectTask => projectTask.projectId == this.projectId);
        this.taskStatuses.forEach((element, index) => {
          this.StatusIds.push(element.text);
          const result = this.projectTasks.filter(projectTask => projectTask.statusId == element.value)
          this.list.push({
            id: element.value,
            name: element.text,
            cards: result
          });
          if(this.taskStatuses.length == this.list.length){
            this.isLoadingResults = false;
          }
        });
      }
    );
  }

  onListAdd($event: string): void {
    this.list.push({
      id: this.list.length + 1,
      name: $event,
      cards: null
    });
  }

  itializeTaskFilter() {
    this.filterParams = {
      pageNumber: 1,
      pageSize: 500,
      projectId: null,
      projectSubId: null,
      name: '',
      dateFrom: null,
      dateTo: null,
      refNum: null,
    };
    this.setFilterAssig();
  }

  isOpenSearch() {
    this.isCollapsed = !this.isCollapsed;
  }

  filterTasks(filterValues) {
    console.log("filterValues: ",filterValues);
    this.isOpenSearch();
    this.isFiltered = true;
    this.filterParams = filterValues;
    this.loadTasks();
  }

  clearTaskFilter() {
    this.itializeTaskFilter();
    this.isFiltered = false;
    this.loadTasks();
  }

  loadTasks() {
    this.timeSheetDataServc.startStopLoading(true);
    this.taskServc.setTaskFilter(this.filterParams);
    this.taskServc.getTasks();
    this.taskServc.onTasksChanged.subscribe(response => {
      this.timeSheetDataServc.startStopLoading(false);
      this.tasks = response;
    });
  }

  onMyTaskChange() {
    this.setFilterAssig();
    this.loadTasks();
  }

  setFilterAssig() {
    if (this.isMyTask) {
      this.filterParams.userId = this.authSvc.getUserToken().userId;
    } else {
      this.filterParams.userId = null;
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.onProjectsChanged.unsubscribe();
  }
}
