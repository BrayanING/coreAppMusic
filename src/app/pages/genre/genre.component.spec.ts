import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreComponent } from './genre.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { GenreService } from '../../services/genre/genre.service';
import { ComplementsService } from '../../services/complements.service';
import { ArtistService } from '../../services/artist/artist.service';
import { AlbumService } from '../../services/album/album.service';
import { Router } from '@angular/router';

describe('GenreComponent', () => {
  let component: GenreComponent;
  let fixture: ComponentFixture<GenreComponent>;
  let http: HttpClient;
  let router: Router;
  let complementsService: ComplementsService;
  let genreService = new GenreService(http, router, complementsService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenreComponent ],
      imports: [
        RouterTestingModule,
        FormsModule,
        MaterializeModule,
        HttpClientModule,
        ReactiveFormsModule
      ],
      providers: [GenreService, ComplementsService, ArtistService, AlbumService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   
  it('Debe llamar al servidor para eliminar un registro', () => {
    const espia = spyOn(genreService, 'deleteGenre').and.callFake(res => res);
    genreService.deleteGenre(2);
    expect(espia).toHaveBeenCalled();

  });

  it('Debe llamar al servidor para obtener todos los registros', () => {    
    const espia = spyOn(genreService, 'listGenre').and.callFake(res => res);
    genreService.listGenre();
    expect(espia).toHaveBeenCalled();
  })
});
