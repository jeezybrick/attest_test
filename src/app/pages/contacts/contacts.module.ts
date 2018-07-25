import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule, MatCardModule,
  MatDialogModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressBarModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';
import { NgxMaskModule } from 'ngx-mask';

import { contactRoutes } from './contacts.route';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactModifyComponent } from './contact-modify/contact-modify.component';
import { SharedModule } from '../../shared/shared.module';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { DeleteContactDialogComponent } from '../../shared/components/delete-contact-dialog/delete-contact-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    NgPipesModule,
    NgxMaskModule.forRoot(),
    RouterModule.forChild(contactRoutes)
  ],
  declarations: [
    ContactListComponent,
    ContactDetailComponent,
    ContactModifyComponent,
    DeleteContactDialogComponent
  ],
  entryComponents: [
    DeleteContactDialogComponent
  ]
})
export class ContactsModule { }

