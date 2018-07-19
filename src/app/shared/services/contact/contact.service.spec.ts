import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ContactService } from './contact.service';
import { Contact } from '../../models/contact.model';
import { environment } from '../../../../environments/environment';


describe('ContactService', () => {

  let injector: TestBed;
  let service: ContactService;
  let httpMock: HttpTestingController;
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
    }
  ];

  const dummyContact: Contact = {
      id: 4,
      name: {
        first: 'Sergey',
        last: 'Ivanov'
      },
      phone: [
        '+1 (111) 557-3199',
        '+1 (433) 557-228'
      ]
    };


  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactService]
    });

    injector = getTestBed();
    service = TestBed.get(ContactService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([ContactService], () => {
    expect(service).toBeTruthy();
  }));

  it('should retrieve posts form the API via GET', () => {

    service.getContactsList().subscribe((contacts) => {
      expect(contacts.length).toBe(3);
      expect(service.contacts.length).toBe(3);
      expect(contacts).toEqual(dummyContacts);
    });

    const request = httpMock.expectOne(`${environment.contact_list_url}`);

    expect(request.request.method).toBe('GET');

    request.flush(dummyContacts);

  });


  it('Initial contacts must me empty array', inject([ContactService], () => {
    expect(service.contacts).toEqual([]);
  }));

  it('Contacts array after first must be not empty', () => {

    expect(service.contacts.length).toBe(0);

    service.getContactsList().subscribe((contacts) => {
      expect(service.contacts.length).toBe(3);
    });

     const request = httpMock.expectOne(`${environment.contact_list_url}`);
     request.flush(dummyContacts);

  });

  it('index of first element must be 0', inject([ContactService], () => {

    const index = service.findContactIndex(dummyContacts, dummyContacts[0].id);
    expect(index).toEqual(0);
  }));

  it('must add new contact to contact list', inject([ContactService], () => {

    service.getContactsList()
      .subscribe((contacts) => {

        expect(service.contacts.length).toBe(3);
        service.addContactToList(dummyContact);
        expect(service.contacts.length).toBe(4);

      });

    const request = httpMock.expectOne(`${environment.contact_list_url}`);
    request.flush(dummyContacts);

  }));

   it('must delete contact from contact list', inject([ContactService], () => {

    service.getContactsList()
      .subscribe((contacts) => {

        expect(service.contacts.length).toBe(4);
        service.deleteContact(dummyContact);
        expect(service.contacts.length).toBe(3);

      });

    const request = httpMock.expectOne(`${environment.contact_list_url}`);
    request.flush(dummyContacts);

  }));


  it('must return exists contact detail', inject([ContactService], () => {

    service.getContactsList()
      .subscribe((contacts) => {

        const existsContact = service.getContactDetail(contacts[0].id);
        expect(existsContact).toBe(contacts[0]);

      });

    const request = httpMock.expectOne(`${environment.contact_list_url}`);
    request.flush(dummyContacts);

  }));

  it('must return undefined for non exists contact detail', inject([ContactService], () => {

    service.getContactsList()
      .subscribe((contacts) => {

        const fakeId = 322;

        const nonExistsContact = service.getContactDetail(fakeId);
        expect(nonExistsContact).toBeUndefined();

      });

    const request = httpMock.expectOne(`${environment.contact_list_url}`);
    request.flush(dummyContacts);

  }));


});
