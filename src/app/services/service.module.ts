import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {
  UserService,
  GenreService,
  ArtistService,
  SidenavService,
  LoginGuardGuard,
  ComplementsService,
} from './service.index';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    UserService,
    GenreService,
    ArtistService, 
    SidenavService,
    LoginGuardGuard,
    ComplementsService,
  ],
  declarations: [],
})
export class ServiceModule {}
