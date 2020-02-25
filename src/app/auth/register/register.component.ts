import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../athentication.service';
import { confirmPassword } from '../confirmPassword.validator';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: fuseAnimations
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerFormErrors: any;
  registerSbumiting = false;

  constructor(
    private fuseConfig: FuseConfigService,
    private authenticate: AuthenticationService,
    private formBuilder: FormBuilder,
    private route: Router,
    public snackBar: MatSnackBar
  ) {
    this.fuseConfig.setConfig({
      layout: {
        navigation: 'none',
        toolbar: 'none',
        footer: 'none'
      }
    });

    this.registerFormErrors = {
      userName: {},
      email: {},
      password: {},
      passwordConfirm: {}
    };
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirm: ['', [Validators.required, confirmPassword]]
    });

    this.registerForm.valueChanges.subscribe(() => {
      this.onRegisterFormValuesChanged();
    });
  }

  onRegisterFormValuesChanged() {
    for (const field in this.registerFormErrors) {
      if (!this.registerFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.registerFormErrors[field] = {};

      // Get the control
      const control = this.registerForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.registerFormErrors[field] = control.errors;
      }
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
  onRegisterSubmit() {
    this.registerSbumiting = !this.registerSbumiting;

    //    if(this.registerForm.status!='VALID'){return;}
    this.authenticate.register(this.registerForm.value).subscribe(
      data => {
        this.authenticate.updateUserToken(data);
        this.route.navigateByUrl('/products/list');
      },
      err => {
        this.registerSbumiting = !this.registerSbumiting;
        const error = err.error;
        this.registerSbumiting = !this.registerSbumiting;

        let message = '';
        if (typeof error === 'string') {
          message = error + '     ';
        }
        if (error.Password !== undefined) {
          message += error.Password.toString() + '     ';
        }
        if (error.email !== undefined) {
          message += error.email.toString();
        }
        if (error.username !== undefined) {
          message += error.username.toString();
        }
        if (message.length === 0) {
          message = 'We will try again!';
          this.onRegisterSubmit();
        }
        this.openSnackBar(message, 'Dismiss');
        for (let index = 0; index < err.error.length; index++) {
          const element = err.error[index];
          console.log(element);
        }
      }
    );
  }
}

