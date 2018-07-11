import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../user/user.service';
import { Router } from '@angular/router';

@Injectable()
export class LoginGuardGuard implements CanActivate {
  constructor(public _userService: UserService,
    public router: Router) {}
  canActivate() {
    if (this._userService.loginOn()) {
      console.log('PASO EL GUARD');
      return true;
    } else {
      console.log('Bloqueado por guard');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
