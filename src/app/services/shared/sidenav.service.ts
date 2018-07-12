import {Injectable} from '@angular/core';

@Injectable()
export class SidenavService {
  menu: any = [
    {titulo: 'Inicio', icon: 'home', url: '/home'},
    {titulo: 'Albums', icon: 'track_changes', url: '/album'},
    {titulo: 'Artistas', icon: 'record_voice_over', url: '/artist'},
    {titulo: 'Género', icon: 'mic', url: '/genre'},
    {titulo: 'Usuarios', icon: 'group', url: '/user'},
  ];
  constructor() {}
}
