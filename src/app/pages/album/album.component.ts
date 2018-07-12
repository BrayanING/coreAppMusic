import { Component, OnInit, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import * as moment from 'moment';
// Import Jquery
declare var $: any;
declare var Materialize: any;

// Importando sweetalert
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';

// Importando librerias de materialize
import { MaterializeAction } from 'angular2-materialize';
import { GenreService, ArtistService, ComplementsService, AlbumService } from '../../services/service.index';
import { User } from '../../models/user.models';
import { Artist } from '../../models/artist.models';
import { Album } from '../../models/album.models';
import { Genre } from '../../models/genre.models';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit {
  // Instanciando modal
  modalActions = new EventEmitter<string | MaterializeAction>();

  // Variables
  moment: moment.Moment = moment('someDate');
  forma: FormGroup;
  swal: SweetAlert = _swal as any;
  albums: any[] = [];
  artists: Artist;
  genres: Genre;
  editAlbum: Album;
  addAlbum: Album;
  user: User;
  token: string;
  constructor(
    public _genreService: GenreService,
    public _artistService: ArtistService,
    public _albumService: AlbumService,
    public _complementsService: ComplementsService
  ) {}

  ngOnInit() {
    this.clearAlbumt();
    this.loadStorage();
    this.listAlbum();
    this.listArtist();
    this.listGenre();
  }

  openModal() {
    this.modalActions.emit({action: 'modal', params: ['open']});
  }

  clearAlbumt() {
    this.editAlbum = new Album();
    this.addAlbum = new Album();
  }

  registerAlbum(formAdd: NgForm) {
    if (formAdd.invalid) {
      return;
    }
    this.addAlbum.userId = this.user.id;
    return this._albumService.registerAlbum(this.addAlbum).subscribe(resp => {
      this.listAlbum();
      formAdd.reset();
    });
  }

  deleteAlbum(albumId: Number) {
    swal({
      title: 'Información',
      text: 'Desea eliminar el registro',
      icon: 'warning',
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        return this._albumService.deleteAlbum(albumId).subscribe(resp => {
          this.listAlbum();
        });
      }
    });
  }

  showAlbum(album: any) {
    const dateFormat = moment(album.dateReleased)
      .format('DD/MM/YYYY');
    album.dateReleased = dateFormat;
    this.editAlbum = new Album(
      album.id,
      this.user.id,
      album.name,
      album.artistId,
      album.dateReleased,
      album.genreId,
      album.status
    );
    this._complementsService.plugin();
  }

  changeAlbum(formEddit: NgForm) {
    return this._albumService.editAlbum(this.editAlbum).subscribe(resp => {
      this.listAlbum();
      formEddit.reset();
    });
  }

  listAlbum() {
    this._albumService.listAlbum().subscribe(albums => {
      this.albums = albums;
    });
  }

  listArtist() {
    this._artistService.listArtist().subscribe(artists => {
      this.artists = artists;
    });
  }
  listGenre() {
    this._genreService.listGenre().subscribe(genres => {
      this.genres = genres;
    });
  }

  collectionAlbum(name: string) {
    if (name.length <= 0) {
      this.listAlbum();
      return;
    }
    this._albumService.collectionAlbum(name).subscribe(albums => {
      this.albums = albums;
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
}
