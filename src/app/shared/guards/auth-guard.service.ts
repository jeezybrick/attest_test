import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
}
  from '@angular/router';

import { ContactService } from '../services/contact/contact.service';


@Injectable()
export class ContactsListExistsGuard implements CanActivate {

  constructor(private contactService: ContactService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.contactService.contacts && this.contactService.contacts.length) {
      return true;
    }

    this.router.navigate(['/contacts']);

    return false;
  }

}
