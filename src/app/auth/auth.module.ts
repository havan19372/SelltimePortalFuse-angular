import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { authRouting } from './auth.routing';

import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { LockModule } from './lock/lock.module';
import { MailConfirmModule } from './mail-confirm/mail-confirm.module';
import { AuthenticationService } from './athentication.service';
import { AuthMainComponent } from './auth-main/auth-main.component';
import { FuseMainModule } from '../main/main.module';
import { FuseContentModule } from '../main/content/content.module';

@NgModule({
  imports: [
    // Routing
    authRouting,
    CommonModule,

    FuseMainModule,
    FuseContentModule
  ],
  exports: [AuthMainComponent],
  declarations: [AuthMainComponent],
  providers: [AuthenticationService]
})
export class AuthModule {}
