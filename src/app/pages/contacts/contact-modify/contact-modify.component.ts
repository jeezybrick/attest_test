import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Contact } from '../../../shared/models/contact.model';
import { DeleteContactDialogComponent } from '../../../shared/components/delete-contact-dialog/delete-contact-dialog.component';
import { ContactService } from '../../../shared/services/contact/contact.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-contact-modify',
  templateUrl: './contact-modify.component.html',
  styleUrls: ['./contact-modify.component.scss']
})
export class ContactModifyComponent implements OnInit {

  public modifyContactForm: FormGroup;
  public isFormEdit = false;
  public contact: Contact = new Contact('', '', []);

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private contactService: ContactService,
              private toastService: ToastService,
              private location: Location,
              public dialog: MatDialog) {

  }

  public ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isFormEdit = true;
      this.contact = this.contactService.getContactDetail(+id);
    }

    this.createLoginForm();
  }

  private createLoginForm(): void {

    this.modifyContactForm = this.fb.group({
      first_name: [this.contact.name.first, [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)]],
      last_name: [this.contact.name.last, [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)]],
      phones: this.fb.array([this.createPhone()]),
    });

  }

  createPhone(): FormGroup {
    return this.fb.group({
      phone: ['', [Validators.minLength(14), Validators.maxLength(14)]]
    });
  }

  get phones(): FormArray {
    return this.modifyContactForm.get('phones') as FormArray;
  }

  addPhone() {
    this.phones.push(this.createPhone());
  }

  public onSubmit() {

    const formModel = this.modifyContactForm.value;

    let phonesDeepCopy: string[] = formModel.phones
      .filter((formPhones: any) => {
        return !!formPhones.phone.length;
      })
      .map((formPhones: any) => {
        return '+1 ' + formPhones.phone;
      });

    if (this.isFormEdit) {
      phonesDeepCopy = phonesDeepCopy.concat(this.contact.phone);
    }

    const data: Contact = {
      id: this.contact.id,
      name: {
        first: formModel.first_name,
        last: formModel.last_name
      },
      phone: phonesDeepCopy

    };

    if (this.isFormEdit) {
      this.editContact(data);
    } else {
      this.addContact(data);
    }

  }

  private addContact(data) {
    data.id = Math.floor(Math.random() * 100001);
    this.contactService.addContactToList(data);
    this.toastService.showToast('Contact successfully added!');
    this.goToContactListPage();
  }

  private editContact(data) {
    this.contactService.editContact(data);
    this.toastService.showToast('Contact successfully edit!');
    this.goToContactListPage();
  }

  private deleteContact(contact): void {
    this.contactService.deleteContact(contact);
    this.toastService.showToast('Contact successfully deleted!');
    this.goToContactListPage();
   }

  public goToContactListPage() {
    this.router.navigate(['contacts']);
  }

  public deletePhoneFromList(phone: string): void {
    const index = this.contact.phone.findIndex((data) => {
      return data === phone;
    });

    if (index > -1) {
      this.contact.phone.splice(index, 1);
    }
  }

  public deleteContactDialog(): void {

    const dialogRef = this.dialog.open(DeleteContactDialogComponent, {
      width: '250px',
      data: {contact: this.contact}
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result) {
        this.deleteContact(this.contact);
      }

    });
  }


  public goToPreviousPage(): void {
    this.location.back();
  }

   get f() {
    return this.modifyContactForm;
  }


}
