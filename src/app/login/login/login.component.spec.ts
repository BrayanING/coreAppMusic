import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpClientModule	 } from '@angular/common/http'; 
import { UserService } from '../../services/user/user.service';
import { ComplementsService } from '../../services/complements.service';
import { Observable } from 'rxjs/Observable';
// INSTEAD of
import 'rxjs/Observable'; 
import 'rxjs/add/observable/throw';
import { User } from '../../models/user.models';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let http: HttpClient;
  let router: Router;
  let complementsService: ComplementsService;
  const userService = new UserService(http, router, complementsService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers: [UserService, ComplementsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('El formulario debe contener 2 campos', () => {
    expect( component.forma.contains('email')).toBeTruthy();
    expect( component.forma.contains('password')).toBeTruthy();
  });

  it('El email debe ser valido', () => {
    const email = component.forma.get('email');
    email.setValue('prueba@prueba.com');
    expect(email.valid).toBeTruthy();
  });

  it('El password debe ser valido', () => {
    const password = component.forma.get('password');
    password.setValue('1234567');
    expect(password.valid).toBeTruthy();
  });

  it('El email y password no deben ser nulos', () => {
    const email = component.forma.get('email');
    email.setValue('prueba@prueba.com');
    const password = component.forma.get('password');
    password.setValue('1234567');

    expect(email).not.toBeNull();
    expect(password).not.toBeNull();
  });

  it('Comprobar el metodo de acceso', () => {
    const email = component.forma.get('email');
    email.setValue('prueba@prueba.com');
    const password = component.forma.get('password');
    password.setValue('1234567');
    const espia = spyOn(component, 'loginUser').and.callFake(user => {
      return user;
    });
    component.loginUser();
    expect(espia).toHaveBeenCalled();

  });

  it('Comprobar si hay error al acceder', () => {
    let error = true;
    let user = new User(
      null,
      null,
     'prueba@prueba.com',
     '1234567',
      null,
      null
    );
    
    const espia = spyOn(userService, 'loginUser').and.returnValue(Observable.throw(error));
    userService.loginUser(user);
    expect(espia).toBeTruthy();
  })




});
