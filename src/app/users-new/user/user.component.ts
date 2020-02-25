import {
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  ViewChild
} from '@angular/core';
import { UserService } from './user.service';
import { ActivatedRoute, RouterStateSnapshot, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import { User } from './user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { confirmPassword } from '../../auth/confirmPassword.validator';
import { UsersService } from '../users/users.service';
import { validateUsernameEmail } from 'app/auth/usernameEmail.validator';

@Component({
  selector: 'user-info',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class UserComponent implements OnInit, OnDestroy {
  user = new User();
  onUserBehviorChanged: Subscription;
  pageType: string;
  routeParams: any;
  memberParamId: any;
  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private location: Location,
    private router: Router,
    public route: ActivatedRoute,
    private userSvc: UsersService
  ) {
    this.routeParams = route.snapshot.params;
    this.memberParamId = this.routeParams.memberId;
  }

  ngOnInit() {
    // Subscribe to update user on changes
    this.onUserBehviorChanged = this.userService.onUserBehviorChanged.subscribe(
      user => {
        if (user) {
          this.user = new User(user);
          this.pageType = 'edit';
        } else {
          this.pageType = 'new';
          this.user = new User();
        }

        this.userForm = this.createUserForm(this.pageType);
      }
    );
  }
  back() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  createUserForm(pageType: string) {
    if (pageType === 'new') {
      return this.formBuilder.group({
        id: [this.user.id],
        userName: [
          this.user.userName,
          [Validators.required],
          [validateUsernameEmail(this.userSvc)]
        ],
        // handle: [this.user.handle],
        email: [this.user.email],
        password: [this.user.password],
        passwordConfirm: [
          this.user.passwordConfirm,
          [Validators.required, confirmPassword]
        ],
        firstName: [this.user.firstName],
        lastName: [this.user.lastName],
        memberId: [this.user.memberId]
      });
    } else {
      return this.formBuilder.group({
        id: [this.user.id],
        userName: [{ value: this.user.userName, disabled: true }],
        // handle: [this.user.handle],
        email: [this.user.email],
        password: [this.user.password],
        passwordConfirm: [
          this.user.passwordConfirm,
          [Validators.required, confirmPassword]
        ],
        firstName: [this.user.firstName],
        lastName: [this.user.lastName],
        memberId: [this.user.memberId]
      });
    }
  }

  saveUser() {
    const data = this.userForm.getRawValue();

    data.memberId = this.memberParamId;

    this.userService.saveUser(data).then(() => {
      // Trigger the subscription with new data
      // this.userService.onUserBehviorChanged.next(data);

      // Show the success message
      this.snackBar.open('User saved', 'OK', {
        verticalPosition: 'top',
        duration: 2000
      });

      // Change the location with new one
      this.router.navigate(['/users/list', this.memberParamId]);
      // this.location.go('users/list/' + this.memberParamId);
    });
  }

  addUser() {
    const data = this.userForm.getRawValue();

    data.memberId = this.memberParamId;

    this.userService.addUser(data).then(() => {
      // Trigger the subscription with new data
      // this.userService.onUserBehviorChanged.next(data);

      // Show the success message
      this.snackBar.open('User added', 'OK', {
        verticalPosition: 'top',
        duration: 2000
      });

      // Change the location with new one
      this.router.navigate(['/users/list', this.memberParamId]);
      // this.location.go('users/list/' + this.memberParamId);
    });
  }

  ngOnDestroy() {
    this.onUserBehviorChanged.unsubscribe();
  }
}
