import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../services/user/user.service';
import { ComplementsService } from '../../services/complements.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/from';
import 'rxjs/add/Observable/empty';
import { User } from '../../models/user.models';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  const userService = new UserService(null, null, null);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
      ],
      providers: [UserService, ComplementsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe crear un formulario con 4 campos', () => {
    expect( component.forma.contains('name')).toBeTruthy();
    expect( component.forma.contains('email')).toBeTruthy();
    expect( component.forma.contains('password')).toBeTruthy();
    expect( component.forma.contains('confirmPassword')).toBeTruthy();
  });

  it('El email debe ser valido', () => {
    const control = component.forma.get('email');
    control.setValue('josue@gmail.com');
    expect(control.valid).toBeTruthy();
  });

  it('Confirmar el nombre sea un string', () => {
    const control = component.forma.get('name');
    control.setValue('josue');
    expect(control.valid).toString();
  });

  it('Confirmar password', ()=> {
    const password = '1234567';
    const confirmPassword = '1234567';

    expect(component.equalPassword(password, confirmPassword)).not.toBeFalsy();
    
  });
  
  it('Ingresando password validos', () => {
    const pass = component.forma.get('password');
    const confirmPass = component.forma.get('confirmPassword');

    pass.setValue('1234567');
    confirmPass.setValue('1234567');

    expect(pass.valid).toBeTruthy();
    expect(confirmPass.valid).toBeTruthy();
    expect(confirmPass.validator).toBeTruthy();
  });

  it('Debe llamar al servidor para registrar un nuevo usuario', () => {  

    const espia = spyOn(component, 'registerUser').and.callFake((user) => {
      return user;
    });

    component.registerUser();
    expect(espia).toHaveBeenCalled();

  })


});