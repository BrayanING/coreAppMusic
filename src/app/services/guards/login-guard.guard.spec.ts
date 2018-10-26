import { TestBed, async, inject } from '@angular/core/testing';

import { LoginGuardGuard } from './login-guard.guard';
import { UserService } from '../user/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { HttpClientModule } from '@angular/common/http';
import { GenreService } from '../genre/genre.service';
import { ComplementsService } from '../complements.service';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';

describe('LoginGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterializeModule,
        HttpClientModule],
      providers: [LoginGuardGuard, UserService, GenreService, ComplementsService, ArtistService, AlbumService]
    });
  });

  it('should ...', inject([LoginGuardGuard], (guard: LoginGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
