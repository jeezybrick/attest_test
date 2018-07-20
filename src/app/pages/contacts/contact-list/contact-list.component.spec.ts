import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ContactListComponent } from './contact-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatProgressBarModule
} from '@angular/material';
import { NgPipesModule } from 'ngx-pipes';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '../../../../environments/environment';
import { Contact } from '../../../shared/models/contact.model';
import { ContactService } from '../../../shared/services/contact/contact.service';


describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let httpMock: HttpTestingController;
  let contactService: ContactService;
  const dummyContacts: Contact[] = [
    {
      id: 1,
      name: {
        first: 'Egor',
        last: 'Usatuy'
      },
      phone: [
        '+1 (950) 557-3199',
        '+1 (950) 557-228'
      ]
    },
    {
      id: 2,
      name: {
        first: 'Ruslan',
        last: 'Kostikov'
      },
      phone: [
        '+1 (777) 666-3199',
        '+1 (999) 777-228'
      ]
    },
    {
      id: 3,
      name: {
        first: 'Andrey',
        last: 'Statsenko'
      },
      phone: [
        '+1 (777) 557-3199',
        '+1 (999) 557-228'
      ]
    }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactListComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressBarModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        NgPipesModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.get(HttpTestingController);
    contactService = TestBed.get(ContactService);

    component.ngOnInit();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

/*  it('qqqq', () => {

    const request = httpMock.expectOne(`${environment.contact_list_url}`);
    const compiled = fixture.debugElement.nativeElement;

    request.flush(dummyContacts);

    fixture.detectChanges();

    contactService.getContactsList().subscribe((contacts) => {
      console.log(compiled.querySelector('mat-toolbar'));
    });

   // expect(compiled.querySelector('mat-toolbar').textContent).toContain('Light IT');

  });*/



});
