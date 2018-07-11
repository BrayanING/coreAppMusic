import { Injectable } from '@angular/core';
import { Genre } from '../../models/genre.models';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../../config/config';
import { Router } from '@angular/router';
import {ComplementsService} from '../complements.service';
// Importando rxjs map
import 'rxjs/add/operator/map';

@Injectable()
export class GenreService {

  genre: Genre;
  constructor(
    public http: HttpClient,
    public router: Router,
    public _complementsService: ComplementsService) { }

  registerGenre(genre: Genre) {
    const url = URL_SERVICE + '/genre';
    return this.http.post(url, genre).map((resp: any) => {
      this._complementsService.message('Género', 'creado', 'success');
      return resp.genre;
    });
  }

  editGenre(genre: Genre) {
    const url = URL_SERVICE + '/genre/' + genre.id;
    return this.http.put(url, genre).map((resp: any) => {
      this._complementsService.message('Género', 'editado', 'success');
      return resp.genre;
    });
  }

  deleteGenre(genreId: Number) {
    const url = URL_SERVICE + '/genre/' + genreId;
    return this.http.delete(url).map((resp: any) => {
      this._complementsService.message('Género', 'eliminado', 'success');
      return resp.genre;
    });
  }

  listGenre() {
    const url = URL_SERVICE + '/genre';
    return this.http.get(url).map((resp: any) => {
      return resp.genres;
    });
  }
  collectionGenre(name: string) {
    const url = URL_SERVICE + '/genre/collection/' + name;
    return this.http.get(url).map((resp: any) => {
      return resp.genres;
    });
  }
}
