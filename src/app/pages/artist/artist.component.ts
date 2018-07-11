import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

// Import Jquery
declare var $: any;
declare var Materialize: any;

// Importando sweetalert
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';

// Importando librerias de materialize
import { MaterializeAction } from 'angular2-materialize';
import {ArtistService, ComplementsService} from '../../services/service.index';
import { User } from '../../models/user.models';
import { Artist } from '../../models/artist.models';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css'],
})
export class ArtistComponent implements OnInit {
  // Instanciando modal
  modalActions = new EventEmitter<string | MaterializeAction>();

  // Variables
  forma: FormGroup;
  swal: SweetAlert = _swal as any;
  artists: Artist[] = [];
  editArtist: Artist;
  user: User;
  token: string;
  constructor(
    public _artistService: ArtistService,
    public _complementsService: ComplementsService
  ) {}

  ngOnInit() {
    this.loadStorage();
    this.listArtist();
    this.clearArtistEdit();
  }

  openModal() {
    this.modalActions.emit({action: 'modal', params: ['open']});
  }

  clearArtistEdit() {
    this.editArtist = new Artist(null, null, null, null, null);
  }

  registerArtist(formAdd: NgForm) {
    if (formAdd.invalid) {
      return;
    }
    const artist = new Artist(
      null,
      this.user.id,
      formAdd.value.name,
      formAdd.value.bio,
      null
    );
    return this._artistService.registerArtist(artist).subscribe(resp => {
      this.listArtist();
      formAdd.reset();
    });
  }

  deleteArtist(artistId: Number) {
    swal({
      title: 'Información',
      text: 'Desea eliminar el registro',
      icon: 'warning',
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        return this._artistService.deleteArtist(artistId).subscribe(resp => {
          this.listArtist();
        });
      }
    });
  }

  showArtist(artist: any) {
    this.editArtist = new Artist(artist.id, this.user.id, artist.name, artist.bio, null);
    this._complementsService.plugin();
  }

  changeArtist(formEddit: NgForm) {
    return this._artistService.editArtist(this.editArtist).subscribe(resp => {
      this.listArtist();
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

  listArtist() {
    this._artistService.listArtist().subscribe(artists => {
      this.artists = artists;
    });
  }

  collectionArtist(name: string) {
    if (name.length <= 0) {
      this.listArtist();
      return;
    }
    this._artistService.collectionArtist(name).subscribe(artists => {
      this.artists = artists;
    });
  }
}
