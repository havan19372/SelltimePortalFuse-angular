import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators
} from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { fuseAnimations } from '@fuse/animations';
import { ApiService } from '../../core/services/api.service';
import { MatSnackBar } from '@angular/material';
import { UserModel } from 'app/auth/user.model';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss'],
  animations: fuseAnimations
})
export class AddMemberComponent implements OnInit {
  memberForm: FormGroup;
  userForm: FormGroup;

  usersList: UserModel[] = [];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    public snackBar: MatSnackBar,
  ) {
    this.initilizeForm();
  }

  ngOnInit() {}

  onSubmitForm() {
    if (!this.memberForm.valid) {
      this.validateForm(this.memberForm);
    } else if (this.memberForm.valid) {
      this.api
        .post("Member", this.memberForm.value)
        .subscribe(response => {
          this.snackBar.open('Record saved', 'OK', {
            verticalPosition: 'bottom',
            duration: 2000
          });
          this.router.navigate(['members']);
          console.log(response.message);
        });
    }
  }

  onSubmitUserForm() {
    if (!this.userForm.valid) {
      this.validateForm(this.userForm);
    } else if (this.userForm.valid) {
      this.users.push(this.userForm);
      // this.addUserToMemberList(this.userForm);
    }
  }

  onCancelClick() {
    this.memberForm.reset();
  }

  editListUser(userForm: FormGroup) {
    this.userForm = userForm;
  }

  deleteListUser() {}

  private addUserToMemberList(userForm: FormGroup) {
    this.users.push(userForm);
  }

  get name() {
    return this.memberForm.get('name');
  }
  get code() {
    return this.memberForm.get('code');
  }
  get host() {
    return this.memberForm.get('host');
  }
  get sponsorCode() {
    return this.memberForm.get('sponsorCode');
  }

  get users(): FormArray {
    return this.memberForm.get('users') as FormArray;
  }

  get userName() {
    return this.userForm.get('userName');
  }
  get email() {
    return this.userForm.get('email');
  }
  get password() {
    return this.userForm.get('password');
  }
  get passwordConfirm() {
    return this.userForm.get('passwordConfirm');
  }

  private initilizeForm() {
    this.memberForm = this.fb.group({
      name: ["", Validators.required],
      code: "",
      host: ["", Validators.required],
      sponsorCode: "",
      users: this.fb.array([])
    });


  }

  private validateForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(filed => {
      const control = formGroup.get(filed);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }
}
