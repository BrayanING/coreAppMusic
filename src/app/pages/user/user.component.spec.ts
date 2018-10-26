import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { GenreService } from '../../services/genre/genre.service';
import { ComplementsService } from '../../services/complements.service';
import { ArtistService } from '../../services/artist/artist.service';
import { AlbumService } from '../../services/album/album.service';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let http: HttpClient;
  let router: Router;
  let complementsService: ComplementsService;
  let userService = new UserService(http, router, complementsService);

  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterializeModule,
        HttpClientModule,
      ],
      providers: [GenreService, ComplementsService, ArtistService, AlbumService, UserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe llamar al servidor para eliminar un registro', () => {
    const espia = spyOn(userService, 'deleteUser').and.callFake(res => res);
    userService.deleteUser(1);
    expect(espia).toHaveBeenCalled();

  });

  it('Debe llamar al servidor para obtener todos los registros', () => {    
    const espia = spyOn(userService, 'listUser').and.callFake(res => res);
    userService.listUser();
    expect(espia).toHaveBeenCalled();
  })
});
