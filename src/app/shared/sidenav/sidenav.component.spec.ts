import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavComponent } from './sidenav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { SidenavService } from '../../services/shared/sidenav.service';
import { UserService, ComplementsService } from '../../services/service.index';
import { MaterializeModule } from 'angular2-materialize';
import { User } from '../../models/user.models';

xdescribe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavComponent],
      imports: [RouterTestingModule, HttpClientModule, MaterializeModule],
      providers: [SidenavService, UserService, ComplementsService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    component.user = {} as any;
    component.token = '';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
