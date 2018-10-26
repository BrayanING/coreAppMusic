import {Component, OnInit, EventEmitter} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

// Importando sweetalert
import * as _swal from 'sweetalert';
import {SweetAlert} from 'sweetalert/typings/core';

// Importando librerias de materialize
import {MaterializeAction} from 'angular2-materialize';
import {UserService} from '../../services/service.index';
import {User} from '../../models/user.models';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  // Instanciando modal
  modalActions = new EventEmitter<string | MaterializeAction>();

  // Variables
  forma: FormGroup;
  swal: SweetAlert = _swal as any;
  users: User[] = [];
  
  constructor(public _userService: UserService, public router: Router) {}

  ngOnInit() {
    this.forma = new FormGroup(
      {
        name: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        confirmPassword: new FormControl(null, Validators.required),
      },
      {
        validators: this.equalPassword('password', 'confirmPassword'),
      }
    );
  }

  equalPassword(password: string, confirmPassword: string) {
    return (group: FormGroup) => {
      const pass = group.controls[password].value;
      const passConfirm = group.controls[confirmPassword].value;

      if (pass === passConfirm) {
        return null;
      }

      return {
        equalconfirmPassword: true,
      };
    };
  }

  registerUser() {
    if (this.forma.invalid) {
      return;
    }
    const user = new User(
      null,
      this.forma.value.name,
      this.forma.value.email,
      this.forma.value.password,
      'NINGUNA',
      true
    );
    return this._userService.registerUser(user).subscribe(resp => {
      this.forma.reset();
      this.router.navigate(['/login']);
    });
  }
}
