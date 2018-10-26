import {Component, OnInit, EventEmitter} from '@angular/core';
import {NgForm, FormGroup, FormControl, Validators} from '@angular/forms';
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
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // Instanciando modal
  modalActions = new EventEmitter<string | MaterializeAction>();

  // Variables
  // Variables
  forma: FormGroup;
  swal: SweetAlert = _swal as any;
  users: User[] = [];
  error: boolean;
  constructor(public router: Router, public _userService: UserService) {
    this.error = false;
  }

  ngOnInit() {
    this.forma = new FormGroup(
      {
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required)
      });
  }

  loginUser() {
    if (this.forma.invalid) {
      return;
    }
    const user = new User(
      null,
      null,
      this.forma.value.email,
      this.forma.value.password,
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
