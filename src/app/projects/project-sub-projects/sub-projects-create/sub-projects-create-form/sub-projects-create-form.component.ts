import * as _ from 'lodash';
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  Inject,
  ElementRef,
  NgZone
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { LookUpService } from '../../../../core/services/look-up.service';
import { LookUpModel, LookUpCodes } from '../../../../core/lookUpCodes';
import { confirmPassword } from '../../../../auth/confirmPassword.validator';
import { UploadService } from '../../../../core/services/upload.service';

import { ProjectModel } from '../../../project.model';
import { SubProjectsCreateService } from '../sub-projects-create.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-sub-projects-create-form',
  templateUrl: './sub-projects-create-form.component.html',
  styleUrls: ['./sub-projects-create-form.component.scss']
})
export class SubProjectsCreateFormComponent implements OnInit {
  @Input() SubProject: ProjectModel;
  @Input() pageType: string;
  @Output() onAddSubProject = new EventEmitter();
  @Input() SubProjectsForm: FormGroup;
  projects: ProjectModel[];
  @BlockUI('projectCreate') blockUIList: NgBlockUI;

  constructor(
    private formBuilder: FormBuilder,
    private lookUpSvc: LookUpService,
    private uploadService: UploadService,
    private subProjectsCreateSvc: SubProjectsCreateService
  ) {}

  ngOnInit() {
    this.subProjectsCreateSvc.getProjectList().subscribe(response => {
      debugger;
      this.projects = response;
    });
  }
}
