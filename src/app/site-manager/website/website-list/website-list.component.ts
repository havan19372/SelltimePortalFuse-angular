import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { WebsiteService } from '../website.service';
import { IWebsiteModel } from '../website.model';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { CreateWebsiteComponent } from '../create-website/create-website.component';
import { MatSnackBar } from '@angular/material';
import { CreatePageComponent } from '../../page/create-page/create-page.component';
import { PageService } from '../../page/page.service';
import { Router } from '@angular/router';
import { ContentListComponent } from '../../content/content-list/content-list.component';
import { SweetAlertService } from '../../../core/services/sweet-alert.service';
import { IPageModel } from '../../page/page.model';
import { fuseAnimations } from '@fuse/animations';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.scss'],
  animations: fuseAnimations
})
export class WebsiteListComponent implements OnInit {
  websites: IWebsiteModel[];
  searchInput: FormControl;
  dialogRef: any;
  constructor(
    private websiteSvc: WebsiteService,
    public dialog: MatDialog,
    private pageSvc: PageService,
    private router: Router,
    private snackBar: MatSnackBar,
    private sweetAlert: SweetAlertService
  ) {
    this.searchInput = new FormControl('');
  }

  newWebsite(websiteId?: number): void {
    if (websiteId != null) {
      this.websiteSvc.getWebsite(websiteId).subscribe(data => {
        this.openCloseWebsiteDialoge(websiteId, data);
      });
    } else {
      this.openCloseWebsiteDialoge(websiteId, null);
    }
  }

  openCloseWebsiteDialoge(websiteId?: number, website?: IWebsiteModel) {
    this.dialogRef = this.dialog.open(CreateWebsiteComponent, {
      width: '800px',
      data: {
        action: website == null ? 'new' : 'edit',
        website: website
      }
    });
    this.dialogRef.afterClosed().subscribe((websiteForm: FormGroup) => {
      if (!websiteForm) {
        return;
      }
      if (websiteForm.valid) {
        if (website == null) {
          this.websiteSvc
            .newWebsite(websiteForm.getRawValue())
            .subscribe(response => {
              this.websites.push(response);
            });
        } else {
          this.websiteSvc
            .updateWebsite(websiteId, websiteForm.getRawValue())
            .subscribe(response => {
              this.websites[
                this.websites.indexOf(
                  this.websites.find(c => c.id === websiteId)
                )
              ] = response;

              this.snackBar.open(
                `Website ${response.name} Updated Successfuly`,
                'OK',
                {
                  verticalPosition: 'top',
                  duration: 1000,
                  panelClass: 'mat-green-bg'
                }
              );
            });
        }
      }
    });
  }

  newPage(website: IWebsiteModel) {
    this.dialogRef = this.dialog.open(CreatePageComponent, {
      width: '600px',
      data: {
        action: 'new',
        websiteId: website.id
      }
    });

    this.dialogRef.afterClosed().subscribe((pageForm: FormGroup) => {
      if (!pageForm) {
        return;
      }

      if (pageForm.valid) {
        this.pageSvc.addPage(pageForm.getRawValue()).subscribe(response => {
          website.pages.push(response);
          this.snackBar.open(`Page  Created Successfuly`, 'OK', {
            verticalPosition: 'top',
            duration: 1000,
            panelClass: 'mat-green-bg'
          });
        });
      }
    });
  }

  editPage(pageId: number, websiteId: number) {
    this.pageSvc.getPage(pageId).subscribe(page => {
      this.dialogRef = this.dialog.open(CreatePageComponent, {
        width: '600px',
        data: {
          action: 'edit',
          page: page,
          websiteId: websiteId
        }
      });

      this.dialogRef.afterClosed().subscribe((pageForm: FormGroup) => {
        if (!pageForm) {
          return;
        }

        if (pageForm.valid) {
          this.pageSvc
            .editPage(pageForm.getRawValue(), pageId)
            .subscribe(response => {
              const website = this.websites[
                this.websites.indexOf(
                  this.websites.find(c => c.id === websiteId)
                )
              ];
              website.pages[
                website.pages.indexOf(website.pages.find(i => i.id === pageId))
              ] = response;
              this.snackBar.open(
                `Page ${response.name} Updated Successfuly`,
                'OK',
                {
                  verticalPosition: 'top',
                  duration: 1000,
                  panelClass: 'mat-green-bg'
                }
              );
            });
        }
      });
    });
  }

  viewContent(pageId: number): void {
    this.pageSvc.getPageContent(pageId).subscribe(response => {
      if (response.length) {
        this.dialogRef = this.dialog.open(ContentListComponent, {
          width: '600px',
          data: {
            contents: response
          }
        });

        this.dialogRef.afterClosed().subscribe((resp: any) => {
          if (resp) {
            if (resp[1] === 'edit') {
              this.router.navigate([
                '/siteManager/contents/create',
                pageId,
                resp[0]
              ]);
            } else {
            }
          }
        });
      } else {
        this.snackBar.open(`Page has no content !`, 'OK', {
          verticalPosition: 'bottom',
          duration: 1000,
          panelClass: 'mat-blue-bg'
        });
      }
    });
  }

  addContent(pageId: number): void {
    this.router.navigate(['/siteManager/contents/create', pageId, 'new']);
  }

  deletePage(pageId: number, website: IWebsiteModel): void {
    this.sweetAlert.showPrompt(
      'Are you sure?',
      "You won't be able to revert this!",
      'Yes, delete it!',
      result => {
        if (result.value) {
          this.pageSvc.deletePage(pageId).subscribe(response => {
            this.sweetAlert.showSuccess(
              'Deleted Successfully',
              `Page #${pageId} deleted !`
            );
            // debugger;
            const pages = website.pages;
            _.remove(pages, (elem: IPageModel) => {
              return elem.id === pageId;
            });
            website.pages = pages;
          });
        }
      }
    );
  }

  ngOnInit() {
    this.websiteSvc.getWebsites().subscribe(response => {
      this.websites = response;
    });
    this.searchInput.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(searchText => {
        this.websiteSvc.onSearchTextChanged.next(searchText);
      });
  }
}
