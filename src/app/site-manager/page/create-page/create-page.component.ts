import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IPageModel } from '../page.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LookUpService } from 'app/core/services/look-up.service';
import { LookUpModel, LookUpCodes } from 'app/core/lookUpCodes';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  dialogTitle: string;
  pageForm: FormGroup;
  action: string;
  page: IPageModel;
  pageTemplates: LookUpModel[];
  constructor(
    public dialogRef: MatDialogRef<CreatePageComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private lookUpSvc: LookUpService
  ) {}

  createPageForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.page.id],
      name: [this.page.name],
      title: [this.page.title],
      meta: [this.page.meta],
      metaDescription: [this.page.metaDescription],
      websiteId: this.page.websiteId,
      templateId: [this.page.templateId],
      showOnMenu: [this.page.showOnMenu],
      menuOrderNum: [this.page.menuOrderNum],
      heading:[this.page.heading]
    });
  }

  ngOnInit() {
    this.lookUpSvc
      .getLookUpDetails(LookUpCodes.pageTemplate)
      .subscribe((response: LookUpModel[]) => {
        this.pageTemplates = response;
      });

    this.action = this.data.action;
    if (this.action === 'edit') {
      this.page = this.data.page;
      this.dialogTitle = `Edit Page`;
    } else {
      this.dialogTitle = 'New Page';
      this.page = {
        name: '',
        title: '',
        meta: '',
        metaDescription: '',
        websiteId: this.data.websiteId,
        templateId: null,
        showOnMenu: false,
        menuOrderNum: null
      };
    }

    this.pageForm = this.createPageForm();
  }
}
