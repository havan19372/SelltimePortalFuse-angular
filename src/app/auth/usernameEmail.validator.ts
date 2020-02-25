// import { MemberService } from "../members/memberCreate/member.service";
import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors
} from "@angular/forms";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/timer";
import { UsersService } from "../users-new/users/users.service";



export function validateUsernameEmail(
  userSvc: UsersService
): AsyncValidatorFn {
  return (
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    const debounceTime = 800; // milliseconds
    return Observable.timer(debounceTime).switchMap(() => {

      return userSvc.checkEmailUsername(control.value).map(res => {

        return res ? { emailTaken: true } : null;
      });
    });
  };
}
