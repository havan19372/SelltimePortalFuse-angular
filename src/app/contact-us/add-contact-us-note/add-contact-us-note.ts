import { Component, OnInit, Inject } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { ContactUsService } from '../contact-us.service';

interface Note {
    createDate: Date,
    creator: string,
    note: string,
}

@Component({
  selector: 'app-gallery-create',
  templateUrl: './add-contact-us-note.html',
  styleUrls: ['./add-contact-us-note.scss']
})
export class AddContactUsNoteComponent implements OnInit
{
  @BlockUI('NotesListBlock') blockUI: NgBlockUI;
  notes: Array<Note>;

  constructor(private contactUsNotes: ContactUsService, public snackBar: MatSnackBar, public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) private data: any)
  {
    this.notes = [];
    this.blockUI.start();
  }

  ngOnInit()
  {
    this.contactUsNotes.getContactUsNotes(this.data.contactUsId)
    .subscribe(rsp => {
        this.notes = rsp;
        console.log('get notes: ', rsp);
    });
  }

  save(form: FormGroup)
  {
    console.log('form saved: ', form);
    if ( form.valid )
    {
        this.contactUsNotes.addContactUsNote(form.value.notes, this.data.contactUsId)
        .subscribe(rsp => {
            if ( rsp ) {

                let creator = rsp.creator;

                if ( rsp.creator == '' || rsp.creator == null ) {
                    const storage = JSON.parse(localStorage.getItem('SellTime_API_Auth_Strg'));
                    creator = storage ? storage.fullName : 'Admin';
                }

                rsp.creator = creator;
                this.notes.unshift(rsp);
                form.reset({onlySelf: false, emitEvent: false});   // reset the form... 
                this.snackBar.open('Noted Added Successfully!', 'OK', {verticalPosition: 'bottom', duration: 1000, panelClass: 'mat-green-bg'});
                this.dialogRef.close(['add', rsp]);
            }
            console.log('contactUsNotes response: ', rsp);
        }, error => {
            this.snackBar.open('Error, please try again later!', 'OK', {verticalPosition: 'bottom', duration: 1000, panelClass: 'mat-green-bg'});
            this.dialogRef.close(['error', error]);
        });
    }
  }
}
