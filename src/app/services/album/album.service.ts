import { Injectable } from '@angular/core';
import { Album } from '../../models/album.models';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../../config/config';
import { Router } from '@angular/router';
import { ComplementsService } from '../complements.service';
// Importando rxjs map
import 'rxjs/add/operator/map';


@Injectable()
export class AlbumService {
  album: Album;
  constructor(
    public http: HttpClient,
    public router: Router,
    public _complementsService: ComplementsService
  ) {}

  registerAlbum(album: Album) {
    const url = URL_SERVICE + '/album';
    return this.http.post(url, album).map((resp: any) => {
      this._complementsService.message('Album', 'creado', 'success');
      return resp.album;
    });
  }

  editAlbum(album: Album) {
    const url = URL_SERVICE + '/album/' + album.id;
    return this.http.put(url, album).map((resp: any) => {
      this._complementsService.message('Album', 'editado', 'success');
      return resp.album;
    });
  }

  deleteAlbum(albumId: Number) {
    const url = URL_SERVICE + '/album/' + albumId;
    return this.http.delete(url).map((resp: any) => {
      this._complementsService.message('Album', 'eliminado', 'success');
      return resp.album;
    });
  }

  listAlbum() {
    const url = URL_SERVICE + '/album';
    return this.http.get(url).map((resp: any) => {
      return resp.albums;
    });
  }

  collectionAlbum(name: string) {
    const url = URL_SERVICE + '/album/collection/' + name;
    return this.http.get(url).map((resp: any) => {
      return resp.albums;
    });
  }
}
