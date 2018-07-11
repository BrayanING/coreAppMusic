import {Injectable} from '@angular/core';
import {User} from '../../models/user.models';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICE} from '../../config/config';
import {Router} from '@angular/router';
import { ComplementsService } from '../complements.service';

// Importando rxjs map
import 'rxjs/add/operator/map';


@Injectable()
export class UserService {
  user: User;
  token: string;
  constructor(public http: HttpClient, public router: Router, public _complements: ComplementsService) {
    this.loadStorage();
  }
  registerUser(user: User) {
    const url = URL_SERVICE + '/user';
    return this.http.post(url, user).map((resp: any) => {
      this._complements.message('Usuario', 'creado', 'success');
      return resp.user;
    });
  }
  editUser(user: any) {
    const url = URL_SERVICE + '/user/' + user.id;
    return this.http.put(url, user).map((resp: any) => {
      this._complements.message('Usuario', 'editado', 'success');
      return resp.user;
    });
  }

  deleteUser(userId: Number) {
    const url = URL_SERVICE + '/user/' + userId;
    return this.http.delete(url).map((resp: any) => {
      this._complements.message('Usuario', 'eliminado', 'success');
      return resp.user;
    });
  }

  listUser() {
    const url = URL_SERVICE + '/user';
    return this.http.get(url).map((resp: any) => {
      return resp.users;
    });
  }
  collectionUser(name: string) {
    const url = URL_SERVICE + '/user/collection/' + name;
    return this.http.get(url).map((resp: any) => {
      return resp.users;
    });
  }

  loginUser(user: User) {
    const url = URL_SERVICE + '/login';
    return this.http.post(url, user).map((resp: any) => {
      this.saveStorage(resp.id, resp.token, resp.users);
      return resp;
    });
  }

  loginOn() {
    return this.token.length > 5 ? true : false;
  }

  saveStorage(id: string, token: string, users: User) {
    localStorage.setItem('idUsuario', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(users));

    this.user = users;
    this.token = token;
  }

  loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = null;
    }
  }

  logout() {
    this.user = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
