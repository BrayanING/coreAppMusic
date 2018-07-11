import { Injectable } from '@angular/core';
import { Artist } from '../../models/artist.models';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../../config/config';
import { Router } from '@angular/router';
import { ComplementsService } from '../complements.service';
// Importando rxjs map
import 'rxjs/add/operator/map';

@Injectable()
export class ArtistService {
  artist: Artist;
  constructor(
    public http: HttpClient,
    public router: Router,
    public _complementsService: ComplementsService
  ) {}

  registerArtist(artist: Artist) {
    const url = URL_SERVICE + '/artist';
    return this.http.post(url, artist).map((resp: any) => {
      this._complementsService.message('Artista', 'creado', 'success');
      return resp.artist;
    });
  }

  editArtist(artist: Artist) {
    const url = URL_SERVICE + '/artist/' + artist.id;
    return this.http.put(url, artist).map((resp: any) => {
      this._complementsService.message('Artista', 'editado', 'success');
      return resp.artist;
    });
  }

  deleteArtist(artistId: Number) {
    const url = URL_SERVICE + '/artist/' + artistId;
    return this.http.delete(url).map((resp: any) => {
      this._complementsService.message('Artista', 'eliminado', 'success');
      return resp.artist;
    });
  }

  listArtist() {
    const url = URL_SERVICE + '/artist';
    return this.http.get(url).map((resp: any) => {
      return resp.artists;
    });
  }

  collectionArtist(name: string) {
    const url = URL_SERVICE + '/artist/collection/' + name;
    return this.http.get(url).map((resp: any) => {
      return resp.artists;
    });
  }
}
