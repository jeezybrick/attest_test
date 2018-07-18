import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject, Subscription } from 'rxjs';

import { Contact } from '../../models/contact.model';
import { environment } from '../../../../environments/environment';
import { map, tap } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private _contacts: Contact[];
  private contactsObs$;

  constructor(private http: HttpClient) {
  }

  public getContactsList(forceRefresh?: boolean): Observable<any> {

    if (!this.contactsObs$ || forceRefresh) {
      return this.contactsObs$ = this.http.get<Contact[]>(`${environment.contact_list_url}`)
        .pipe(
          map((data) => {
            return this.sortContactsByFirstName(data);
          }),
          tap((data) => {
            this._contacts = data;
          })
        );
    } else {
      return this.contactsObs$;
    }

  }

  public getContactDetail(contactId: number): any {

    const index = this.findContactIndex(contactId);

    if (index > -1) {
      return this._contacts[index];
    }


  }

  public addContactToList(contact): Contact[] {

    this._contacts.push(contact);
    this._contacts = this.sortContactsByFirstName(this._contacts);

    return this._contacts;
  }

  public editContact(contact): Contact {

    const index = this.findContactIndex(contact.id);

    if (index > -1) {
      this._contacts[index] = contact;
    }


    return contact;
  }

  public get contacts(): Contact[] {
    return this._contacts || [];
  }

  public deleteContact(contact): any {

    const index = this.findContactIndex(contact.id);

    if (index > -1) {
      this._contacts.splice(index, 1);
    }

    return this._contacts;
  }

  private findContactIndex(contactId: number): number {

    const index = this._contacts.findIndex((data) => {
      return data.id === contactId;
    });

    return index;
  }

  private sortContactsByFirstName(data): Contact[] {

    data.sort((a, b) => {
      if (a.name.first.toLowerCase() < b.name.first.toLowerCase()) {
        return -1;
      }
      if (a.name.first.toLowerCase() > b.name.first.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    return data;
  }


}
