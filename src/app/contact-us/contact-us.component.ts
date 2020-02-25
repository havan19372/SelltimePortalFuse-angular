import { Component, OnInit, ViewChild, Input } from '@angular/core';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { fuseAnimations } from '@fuse/animations';
import { ContactUsService } from 'app/contact-us/contact-us.service';
import { MatTableDataSource, MatPaginator, MatSort, PageEvent, MatTable, MatDialogModule, MatDialog } from '@angular/material';
import { merge } from 'rxjs/observable/merge';
import { map, catchError, startWith, switchMap, tap } from 'rxjs/operators';
import { of as observableOf } from 'rxjs/observable/of';
import { FormControl } from '@angular/forms';
import { SweetAlertService } from '../core/services/sweet-alert.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { AddContactUsNoteComponent } from './add-contact-us-note/add-contact-us-note';
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  animations: [
    fuseAnimations,
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', visibility: 'hidden' })
      ),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class ContactUsComponent implements OnInit {
  @Input() filter: FormControl;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource();
  // displayedColumns = ['select', 'id', 'createDate', 'name', 'email', 'tel', 'mobile', 'notes', 'options'];
  displayedColumns = ['id', 'createDate', 'name', 'email', 'tel', 'mobile', 'notes', 'noteCount', 'options'];

  expandedElement: any;
  isExpansionDetailRow = (i: number, row: Object) => {
    console.log('ownproperty: ', row.hasOwnProperty('detailRow'), i, row, this.expandedElement);
    return row.hasOwnProperty('detailRow');
  };

  listLength: number;
  currentPage: number;
  selection: SelectionModel<any>;
  loading: boolean;

  constructor(public dialog: MatDialog, private router: Router,
    public snackBar: MatSnackBar,    private contactusSvc: ContactUsService, 
    private sweetAlert: SweetAlertService) {
    this.filter = new FormControl('');
    this.currentPage = 0;

    const initialSelection = [];
    const allowMultiSelect = true;
    this.selection = new SelectionModel<any>(allowMultiSelect, initialSelection);

    this.loading = false;
  }

  ngOnInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    console.log('this.paginator.page: ', this.paginator.page);

    merge(
      this.sort.sortChange,
      this.paginator.page,
      this.filter.valueChanges.debounceTime(300).distinctUntilChanged()
    )
      .pipe(
        startWith({}),
        tap(stream => { console.log('this.loading', this.loading); this.loading = true; console.log('this.loading', this.loading); }),
        switchMap(() => {
          return this.contactusSvc.getContactUs(
            this.paginator.pageIndex + 1,
            this.paginator.pageSize || 10,
            this.sort.active,
            this.sort.direction,
            this.filter.value
          );
        }),
        map((response: any) => {
          const pagingHeader = JSON.parse(response.headers.get('X-Pagination'));
          this.listLength = pagingHeader.totalCount;
          return response;
        }),
        catchError(() => {
          // in case any error... remove loader...
          this.loading = false;
          return observableOf([]);
        })
      )
      .subscribe(data => {
        // debugger;
        this.loading = false;
        this.selection.clear(); //clear selection...
        this.dataSource.data = this.generateTableRowsIndex(data.body);
      });
  }

  onEditClick(row) {
    console.log(row);
    const url = 'contact-us/edit/' + row['id'];
    this.routeChange(url);
  }

  deleteContact(contact): void {
    this.sweetAlert.showPrompt('Are you sure?', "You won't be able to revert this!", 'Yes, delete it!', result => {
      if (result.value) {
        this.contactusSvc.deleteContact(contact).subscribe(response => {

          this.sweetAlert.showSuccess('Deleted Successfully', `${contact.name} deleted !`);

          // remove element from locally data array...
          let data = this.dataSource.data;
          _.remove(data, (elem: any) => {
            console.log('removing: ', data, elem, elem.cId, contact.cId);
            return elem.cId === contact.cId || (elem.detailRow && elem.element.cId === contact.cId);
          });

          // rerender the table...
          this.refreshTable();
        });
      }
    }
    );
  }

  routeChange(path: string) {
    this.router.navigate([path]);
  }

  getPageStatus(details: PageEvent) {
    // to generate auto-incremental indexes of table...
    this.currentPage = details.pageIndex * details.pageSize;
  }

  generateTableRowsIndex(data) {
    const rows = [];
    // adding incremental indexes...
    data.forEach((element, index) => {
      const elem = { ...element, cId: this.currentPage + (index + 1) };
      // rows.push(elem);
      rows.push(elem, { detailRow: true, element: elem });
    });
    return rows;
  }

  // If you don't need a filter or a pagination this can be simplified, you just use code from else block
  private refreshTable() {
    // if there's a paginator active we're using it for refresh
    if (this.paginator.hasNextPage()) {
      this.paginator.nextPage();
      this.paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.paginator.hasPreviousPage()) {
      this.paginator.previousPage();
      this.paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSource.filter = '';
      // this.dataSource.filter = this.filter.nativeElement.value;
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    // reason is details rows make the length double...
    const numRows = this.dataSource.data.length / 2;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => {
        if (!row.hasOwnProperty('detailRow'))
          return this.selection.select(row);
      });
  }

  getSelectedRows() {
    alert(this.selection.selected.length + " rows selected ?  want to perform an action?");
    console.log('selected rows: ', this.selection.selected);
  }

  onAddNoteClick(contact) {
    this.openDialog(contact);
  }

  openDialog(contact): void {
    const dialogRef = this.dialog.open(AddContactUsNoteComponent, {
      width: '600px',
      height: '350px',
      data: { contactUsId: contact.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result[0] == 'add') {
        const data = this.dataSource.data;
        data.map((elem: any) => {
          if (elem.id == contact.id) {
            elem.noteCount += 1;
          }
        });
        this.dataSource.data = data;
      }
    });
  }
  exportContactExcel() {
    this.snackBar.open("Your download will begin in seconds", "OK", {
      verticalPosition: "bottom",
      duration: 8000
    });
    this.contactusSvc.exportExcel().subscribe(data => {
      this.snackBar.dismiss();
      var blob = new Blob([data], {type: "text/csv"});
      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = `Contactus_${new Date().toDateString()}.csv`;
      link.click();   
     });
  }

   
}
