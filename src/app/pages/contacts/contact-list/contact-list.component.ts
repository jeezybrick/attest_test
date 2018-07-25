import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../shared/models/contact.model';
import { ContactService } from '../../../shared/services/contact/contact.service';
import { finalize } from 'rxjs/internal/operators';
import { DeleteContactDialogComponent } from '../../../shared/components/delete-contact-dialog/delete-contact-dialog.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { trigger, animate, style, transition, state } from '@angular/animations';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  animations: [
    trigger('contactState', [
      state('inactive', style({
        // backgroundColor: '#eee',
      })),
      state('active', style({
        left: '-2px'
      })),
      state('in', style({transform: 'translateX(0)'})),
     /* transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate('0.3s 200ms')
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(100%)'}))
      ]),*/
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class ContactListComponent implements OnInit {

  public searchString = '';
  public contacts: Contact[] = this.contactService.contacts;
  public isContactsListLoading = false;

  constructor(private contactService: ContactService,
              public dialog: MatDialog,
              private router: Router) {
  }

  public ngOnInit() {

    if (!this.contacts.length) {
      this.getContactsList();
    }

  }

  private getContactsList(): void {

    this.isContactsListLoading = true;

    this.contactService.getContactsList()
      .pipe(
        finalize(() => {
          this.isContactsListLoading = false;
        }),
      )
      .subscribe((data) => {
          this.contacts = data;
        },
        (error) => {
          console.log(error);
        });
  }

  public editContact(event: Event, contact: Contact): void {
    event.stopPropagation();
    this.router.navigate(['/contacts', contact.id, 'edit']);
  }

  public deleteContact(contact: Contact): void {

    this.isContactsListLoading = true;
    this.contacts = this.contactService.deleteContact(contact);

    setTimeout(() => {
      this.isContactsListLoading = false;
    }, 300);

  }

  public deleteContactDialog(event: Event, contact: Contact): void {

    event.stopPropagation();

    const dialogRef = this.dialog.open(DeleteContactDialogComponent, {
      width: '250px',
      data: {contact: contact}
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.deleteContact(contact);
      }

    });
  }

  public getDifferenceBeetweenFirstLetters(index, contacts) {

    if (index === 0) {
      return contacts[index].name.first[0];
    }
    return contacts[index].name.first[0].toLowerCase() !== contacts[index - 1].name.first[0].toLowerCase();
  }

  public toggleContactState(contact): void {
    contact.state = contact.state === 'active' ? 'inactive' : 'active';
  }

  public goToContactDetail(contact: Contact): void {
    this.router.navigate(['/contacts', contact.id]);
  }

}
