import { Component, OnInit } from '@angular/core';
import { SidenavService, UserService } from '../../services/service.index';
import { User } from '../../models/user.models';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  user: User;
  token: string;
  constructor( public _sidenav: SidenavService, public _userService: UserService ) { }

  ngOnInit() {
    $(document).ready(function () {
      $('.button-collapse').sideNav({
        menuWidth: 170, // Default is 300
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true,
      });
    });
    this.loadStorage();
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

}
