import {Component, OnInit, EventEmitter} from '@angular/core';
import {FormGroup, FormControl, Validators, NgForm} from '@angular/forms';

// Importando Jquery
declare var $: any;
declare var Materialize: any;

// Importando sweetalert
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';

// Importando librerias de materialize
import {MaterializeAction} from 'angular2-materialize';
import { UserService, ComplementsService } from '../../services/service.index';
import { User } from '../../models/user.models';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  // Instanciando modal
  modalActions = new EventEmitter<string | MaterializeAction>();

  // Variables
  forma: FormGroup;
  swal: SweetAlert = _swal as any;
  users: User[] = [];
  editUser: User;
  constructor(public _userService: UserService, public _complementsService: ComplementsService) {}

  ngOnInit() {
    this.listUser();
    this.clearUserEdit();
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

  clearUserEdit() {
    this.editUser = new User(null, null, null, null, null, null);
  }

  openModal() {
    this.modalActions.emit({action: 'modal', params: ['open']});
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
      this.listUser();
      this.forma.reset();
    });
  }

  showUser(user: any) {
    this.editUser = new User(user.id, user.name, user.email, null, null, null);
    this._complementsService.plugin();
  }

  deleteUser(userId: Number) {
    swal({
      title: 'Información',
      text: 'Desea eliminar el usuario',
      icon: 'warning',
      dangerMode: true,
    })
      .then(willDelete => {
        if (willDelete) {
          return this._userService.deleteUser(userId).subscribe(resp => {
            this.listUser();
          });
        }
      });
  }

  changeUser(form: NgForm) {
    return this._userService.editUser(this.editUser).subscribe(resp => {
      this.listUser();
      form.reset();
    });
  }

  listUser() {
    this._userService.listUser().subscribe(users => {
      this.users = users;
    });
  }

  collectionUser(name: string) {
    if (name.length <= 0) {
      this.listUser();
      return;
    }
    this._userService.collectionUser(name).subscribe(users => {
      this.users = users;
    });
  }

  plugin() {
    $(document).ready(function () {
      $('.input-field label').addClass('active');
    });
  }
}
