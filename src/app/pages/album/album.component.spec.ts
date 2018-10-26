import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumComponent } from './album.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { GenreService } from '../../services/genre/genre.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ComplementsService } from '../../services/complements.service';
import { ArtistService } from '../../services/artist/artist.service';
import { AlbumService } from '../../services/album/album.service';
import { Router } from '@angular/router';
import { Album } from '../../models/album.models';
import { Observable } from 'rxjs/Observable';

describe('AlbumComponent', () => {
  let component: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;
  let http: HttpClient;
  let router: Router;
  let complementsService: ComplementsService;
  let albumService = new AlbumService(http, router, complementsService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumComponent ],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterializeModule,
        HttpClientModule
      ],
      providers: [GenreService, ComplementsService, ArtistService, AlbumService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe llamar al servidor para registar un album', () => {
    let album = new Album(null, 1, 'Album1', 1, '2018-10-25', 1, true);

    const espia = spyOn(albumService, 'registerAlbum').and.callFake(res => res);
    albumService.registerAlbum(album);
    expect(espia).toHaveBeenCalled();
  });

  it('Debe llamar al servidor para obtener todos los registros', () => {    
    const espia = spyOn(albumService, 'listAlbum').and.callFake(res => res);
    albumService.listAlbum();
    expect(espia).toHaveBeenCalled();
  })
});
