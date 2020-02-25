import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../auth/athentication.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private route: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isLoggedIn()) {
      // 
      return true;
    } else {
      // 
      this.route.navigateByUrl('auth/login');
      return false;
    }
  }
}
