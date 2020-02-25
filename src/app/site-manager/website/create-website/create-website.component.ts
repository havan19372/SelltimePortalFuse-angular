import { LookUpModel, LookUpCodes } from './../../../core/lookUpCodes';
import { INotificationsModel } from './../website.model';
import { style } from '@angular/animations';
import { Component, OnInit, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { IWebsiteModel, IWebsiteUrlModel } from '../website.model';
import { MatDialogRef, MAT_DIALOG_DATA,MatSnackBar } from '@angular/material';
 

import * as _ from 'lodash';
import { LookUpService } from 'app/core/services/look-up.service';
@Component({
  selector: 'app-create-website',
  templateUrl: './create-website.component.html',
  styleUrls: ['./create-website.component.scss']
})
export class CreateWebsiteComponent implements OnInit {
  dialogTitle: string;
  websiteForm: FormGroup;
  action: string;
  website: IWebsiteModel;

  websiteUrl: FormControl;
  displayNameFrom: FormControl;
   emailForm: FormControl;
   themes: LookUpModel[];

  constructor(
    public dialogRef: MatDialogRef<CreateWebsiteComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private lookUpSvc: LookUpService

  ) {}

  createWebsiteForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.website.id],
      name: [this.website.name, Validators.required],
      expiryDate: [this.website.expiryDate],
      publishDate: [this.website.publishDate],
      domainKey: [this.website.domainKey],
      secretKey: [this.website.secretKey],
      websiteUrls: [this.website.websiteUrls],
      notifications: [this.website.notifications],
      themeId:[this.website.themeId]
    });
  }

  addWebsiteUrl(): void {
     const webUrl: IWebsiteUrlModel = {
      url: this.websiteUrl.value
    };
    this.website.websiteUrls.push(webUrl);
    this.websiteForm.get('websiteUrls').setValue(this.website.websiteUrls);
    this.websiteUrl.reset();
  }

  editWebsiteUrl(url: IWebsiteUrlModel): void {
    this.websiteUrl.setValue(url.url);
    this.deleteWebsiteUrl(url);
  }

  deleteWebsiteUrl(url: IWebsiteUrlModel): void {
    _.remove(this.website.websiteUrls, elem => {
      return elem.url === url.url;
    });
    this.websiteForm.get('websiteUrls').setValue(this.website.websiteUrls);
  }

  addNotificationItem(): void {

    const notificationItem: INotificationsModel = {
     displayName: this.displayNameFrom.value,
     email: this.emailForm.value
   };
   this.website.notifications.push(notificationItem);
   this.websiteForm.get('notifications').setValue(this.website.notifications);
   this.emailForm.reset();
   this.displayNameFrom.reset();
 }

 editNotificationl(notificationItem: INotificationsModel): void {
  //  this.websiteUrl.setValue(url.url);
  //  this.deleteWebsiteUrl(url);
 }

 deleteNotificationl(notificationItem: INotificationsModel): void {
   _.remove(this.website.notifications, elem => {
     return elem.email === notificationItem.email;
   });
   this.websiteForm.get('notifications').setValue(this.website.notifications);
 }
  
  ngOnInit() {
    this.lookUpSvc
    .getLookUpDetails(LookUpCodes.Theme)
    .subscribe((response: LookUpModel[]) => {
      this.themes = response;
    });

    this.websiteUrl = new FormControl('');
    this.displayNameFrom = new FormControl('');
    this.emailForm = new FormControl('');
    this.action = this.data.action;
    if (this.action === 'edit') {
      this.website = this.data.website;
      this.dialogTitle = `Edit ${this.website.name}`;
    } else {
      this.dialogTitle = 'New Website';
      this.website = {
        name: '',
        isActive: false,
        domainKey: '',
        publishDate: '',
        expiryDate: '',
        websiteUrls: [],
        notifications:[]
      };
    }

    this.websiteForm = this.createWebsiteForm();
  }

  copySecetKey(text){
       // Create new element
   var el = document.createElement('textarea');
   // Set value (string to be copied)
   el.value = text;
   // Set non-editable to avoid focus and move outside of view
   el.setAttribute('readonly', '');
   //el.style = {position: 'absolute', left: '-9999px'};
   document.body.appendChild(el);
   // Select text inside element
   el.select();
   // Copy text to clipboard
   document.execCommand('copy');
   // Remove temporary element
   document.body.removeChild(el);
   this.snackBar.open('Secret key copied', 'undo', {
    duration: 2000,
  });  }
}
