import {NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {RouterModule, Router} from '@angular/router';
// Importaciones de Materialize
import 'materialize-css';
import {MaterializeModule} from 'angular2-materialize';
// Importando las rutas
import {APP_ROUTING} from './app.routes';

// Importando service
import {ServiceModule} from './services/service.module';

// Importando modulos
import {PageModule} from './pages/pages.module';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login/login.component';
import {RegisterComponent} from './login/register/register.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterializeModule,
    ServiceModule,
    PageModule,
    APP_ROUTING,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
