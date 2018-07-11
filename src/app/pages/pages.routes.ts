import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { AlbumComponent } from './album/album.component';
import { ArtistComponent } from './artist/artist.component';
import { GenreComponent } from './genre/genre.component';
import { TrackComponent } from './track/track.component';
import { UserComponent } from './user/user.component';
import { LoginGuardGuard } from '../services/service.index';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'album', component: AlbumComponent },
            { path: 'artist', component: ArtistComponent },
            { path: 'genre', component: GenreComponent },
            { path: 'track', component: TrackComponent },
            { path: 'user', component: UserComponent },
            { path: '', redirectTo: 'home', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
