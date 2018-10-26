import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistComponent } from './artist.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { GenreService } from '../../services/genre/genre.service';
import { ComplementsService } from '../../services/complements.service';
import { ArtistService } from '../../services/artist/artist.service';
import { AlbumService } from '../../services/album/album.service';
import { Router } from '@angular/router';
import { Artist } from '../../models/artist.models';

describe('ArtistComponent', () => {
  let component: ArtistComponent;
  let fixture: ComponentFixture<ArtistComponent>;
  let http: HttpClient;
  let router: Router;
  let complementsService: ComplementsService;
  let artistService = new ArtistService(http, router, complementsService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistComponent ],
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
    fixture = TestBed.createComponent(ArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('Debe llamar al servidor para registar un artista', () => {
    let artist = new Artist(null, 1, 'Gabriel', 'Es un artista', true);

    const espia = spyOn(artistService, 'registerArtist').and.callFake(res => res);
    artistService.registerArtist(artist);
    expect(espia).toHaveBeenCalled();

  });

  it('Debe llamar al servidor para obtener todos los registros', () => {    
    const espia = spyOn(artistService, 'listArtist').and.callFake(res => res);
    artistService.listArtist();
    expect(espia).toHaveBeenCalled();
  })
});
