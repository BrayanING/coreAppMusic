import {Component, OnInit, EventEmitter} from '@angular/core';
import {FormGroup, FormControl, NgForm } from '@angular/forms';

// Importando sweetalert
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';

// Importando librerias de materialize
import { MaterializeAction } from 'angular2-materialize';
import { GenreService, ComplementsService } from '../../services/service.index';
import { Genre } from '../../models/genre.models';
import { User } from '../../models/user.models';
@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css'],
})
export class GenreComponent implements OnInit {
  // Instanciando modal
  modalActions = new EventEmitter<string | MaterializeAction>();

  // Variables
  // Variables
  forma: FormGroup;
  swal: SweetAlert = _swal as any;
  genres: Genre[] = [];
  userId: Number;
  editGenre: Genre;
  user: User;
  token: string;
  constructor(public _genreService: GenreService, public _complementsService: ComplementsService) {}

  ngOnInit() {
    this.loadStorage();
    this.listGenre();
    this.clearUserEdit();
  }

  openModal() {
    this.modalActions.emit({action: 'modal', params: ['open']});
  }

  clearUserEdit() {
    this.editGenre = new Genre(null, null, null, null, null);
  }

  registerGenre(formAdd: NgForm) {
    if (formAdd.invalid) {
      return;
    }
    const genre = new Genre(
      null,
      this.user.id,
      formAdd.value.name,
      formAdd.value.description,
      null
    );
    return this._genreService.registerGenre(genre).subscribe(resp => {
      this.listGenre();
      formAdd.reset();
    });
  }

  deleteGenre(genreId: Number) {
    swal({
      title: 'Información',
      text: 'Desea eliminar el registro',
      icon: 'warning',
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        return this._genreService.deleteGenre(genreId).subscribe(resp => {
          this.listGenre();
        });
      }
    });
  }

  showUser(genre: any) {
    this.editGenre = new Genre(genre.id, this.user.id, genre.name, genre.description, null);
    this._complementsService.plugin();
  }

  changeGenre(formEddit: NgForm) {
    return this._genreService.editGenre(this.editGenre).subscribe(resp => {
      this.listGenre();
      formEddit.reset();
    });
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

  listGenre() {
    this._genreService.listGenre().subscribe(genres => {
      this.genres = genres;
    });
  }

  collectionGenre(name: string) {
    if (name.length <= 0) {
      this.listGenre();
      return;
    }
    this._genreService.collectionGenre(name).subscribe(genres => {
      this.genres = genres;
    });
  }
}
