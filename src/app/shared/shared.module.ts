import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

// Importaciones de Materialize
import 'materialize-css';
import { MaterializeModule } from 'angular2-materialize';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { ServiceModule } from '../services/service.module';


@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        SidenavComponent,
        NopagefoundComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        BrowserModule,
        FormsModule,
        ServiceModule,
        ReactiveFormsModule,
        MaterializeModule,
    ],
    exports: [
        FooterComponent,
        HeaderComponent,
        SidenavComponent,
        NopagefoundComponent,
    ],
    providers: [],
})
export class ShareModule { }
