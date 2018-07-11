import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

// Importaciones de Materialize
import 'materialize-css';
import {MaterializeModule} from 'angular2-materialize';

// Importando modulos
import {ShareModule} from '../shared/shared.module';
import {PAGES_ROUTES} from './pages.routes';

// Importando componentes
import {HomeComponent} from './home/home.component';
import {UserComponent} from './user/user.component';
import {GenreComponent} from './genre/genre.component';
import {ArtistComponent} from './artist/artist.component';
import {AlbumComponent} from './album/album.component';
import {TrackComponent} from './track/track.component';
import {ServiceModule} from '../services/service.module';
import {PagesComponent} from './pages.component';

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    UserComponent,
    GenreComponent,
    ArtistComponent,
    AlbumComponent,
    TrackComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    MaterializeModule,
    ShareModule,
    PAGES_ROUTES,
  ],
  exports: [
    HomeComponent,
    UserComponent,
    GenreComponent,
    ArtistComponent,
    AlbumComponent,
    TrackComponent,
  ],
  providers: [],
})
export class PageModule {}
