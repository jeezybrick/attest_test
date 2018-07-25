import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Contact } from '../../../shared/models/contact.model';
import { ContactService } from '../../../shared/services/contact/contact.service';
import { DeleteContactDialogComponent } from '../../../shared/components/delete-contact-dialog/delete-contact-dialog.component';
import { ToastService } from '../../../shared/services/toast.service';


@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {

  public contact: Contact = new Contact('', '', []);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private toastService: ToastService,
              public dialog: MatDialog,
              private contactService: ContactService) {
  }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.contact = this.contactService.getContactDetail(+id);
    }

  }

  get fullName() {
    return `${this.contact.name.first} ${this.contact.name.last}`;
  }

  public goToEditPage(): void {
    this.router.navigate(['/contacts', this.contact.id, 'edit']);
  }

  public deleteContactDialog(): void {

    const dialogRef = this.dialog.open(DeleteContactDialogComponent, {
      width: '250px',
      data: {contact: this.contact}
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.deleteContact(this.contact);
      }

    });
  }

  private deleteContact(contact): void {
    this.contactService.deleteContact(contact);
    this.toastService.showToast('Contact successfully deleted!');
    this.goToContactListPage();
  }

  private goToContactListPage() {
    this.router.navigate(['contacts']);
  }

}
