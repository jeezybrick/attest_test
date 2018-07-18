import { Routes } from '@angular/router';

import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactModifyComponent } from './contact-modify/contact-modify.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactsListExistsGuard } from '../../shared/guards/auth-guard.service';


export const contactRoutes: Routes = [
  { path: '', component: ContactListComponent },
  {
    path: 'add',
    component: ContactModifyComponent,
    canActivate: [ContactsListExistsGuard]
  },
  {
    path: ':id/edit',
    component: ContactModifyComponent,
    canActivate: [ContactsListExistsGuard]
  },
  {
    path: ':id',
    component: ContactDetailComponent,
    canActivate: [ContactsListExistsGuard]
  },
];
