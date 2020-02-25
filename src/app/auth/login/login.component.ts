import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthenticationService } from '../athentication.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: fuseAnimations
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFormErrors: any;
  loginSbumiting = false;

  constructor(
    private fuseConfig: FuseConfigService,
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
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

    this.loginFormErrors = {
      username: {},
      password: {}
    };
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      rememberMe: true
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.onLoginFormValuesChanged();
    });
  }

  onLoginFormSubmit() {
    this.loginSbumiting = !this.loginSbumiting;
    ///console.log("loginFormValue",this.loginForm.value);
    this.auth.login(this.loginForm.value).subscribe(
      data => {
        this.auth.updateUserToken(data);
        this.route.navigateByUrl('/dashboard/main');
      },
      err => {
        this.loginSbumiting = !this.loginSbumiting;
        const error = err.error;

        let message = '';
        if (typeof error === 'string') {
          message = error + '     ';
        }
        if (error.Password !== undefined) {
          message += error.Password.toString() + '     ';
        }
        if (error.username !== undefined) {
          message += error.Username.toString() + '     ';
        }
        if (message.length === 0) {
          message = 'We will try again!';
          this.onLoginFormSubmit();
        }
        this.openSnackBar(message, 'Dismiss');

      }
    );
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
  onLoginFormValuesChanged() {
    //debugger;
    for (const field in this.loginFormErrors) {
      if (!this.loginFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.loginFormErrors[field] = {};

      // Get the control
      const control = this.loginForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.loginFormErrors[field] = control.errors;
      }
    }
  }
}
