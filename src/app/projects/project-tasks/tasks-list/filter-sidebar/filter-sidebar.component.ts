import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LookUpModel } from '../../../../core/lookUpCodes';

@Component({
  selector: 'app-filter-sidebar',
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.scss']
})
export class FilterSidebarComponent implements OnInit {
  taskFilterForm: FormGroup;
  @Input()
  filter: any;
  @Input()
  projects: LookUpModel[] = [];
  @Input()
  subProjects: LookUpModel[] = [];
  constructor(private fb: FormBuilder) {
    this.createFilterForm();
  }

  createFilterForm(): void {
    this.taskFilterForm = this.fb.group({
      name: [''],
      completeDate: [''],
      startDate: [''],
      projectId: [''],
      subProjectId: [''],
      refNum: ['']
    });
  }

  applyFilter(): void {}
  resetFilter(): void {}

  ngOnInit() {}
}
