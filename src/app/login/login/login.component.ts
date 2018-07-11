import {Component, OnInit, EventEmitter} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

// Importando sweetalert
import * as _swal from 'sweetalert';
import {SweetAlert} from 'sweetalert/typings/core';

// Importando librerias de materialize
import {MaterializeAction} from 'angular2-materialize';
import {UserService} from '../../services/service.index';
import {User} from '../../models/user.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // Instanciando modal
  modalActions = new EventEmitter<string | MaterializeAction>();

  // Variables
  swal: SweetAlert = _swal as any;
  users: User[] = [];
  constructor(public router: Router, public _userService: UserService) {}

  ngOnInit() {}

  loginUser(forma: NgForm) {
    if (forma.invalid) {
      return;
    }
    const user = new User(
      null,
      null,
      forma.value.email,
      forma.value.password,
      null,
      null
    );
    this._userService.loginUser(user).subscribe(
      resp => {
        this.router.navigate(['/home']);
      },
      err => {
        swal('Información', 'Credenciales incorrectos', 'error');
      }
    );
  }
}
