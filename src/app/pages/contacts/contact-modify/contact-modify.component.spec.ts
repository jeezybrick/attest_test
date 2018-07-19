import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ContactModifyComponent } from './contact-modify.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule } from '@angular/material';
import { NgxMaskModule } from 'ngx-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ContactModifyComponent', () => {
  let component: ContactModifyComponent;
  let fixture: ComponentFixture<ContactModifyComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactModifyComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatListModule,
        MatDialogModule,
        NgxMaskModule.forRoot()
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.modifyContactForm.valid).toBeFalsy();
  });


  it('first name field validity', () => {
    let errors = {};
    const firstName = component.modifyContactForm.controls['first_name'];
    expect(firstName.valid).toBeFalsy();

    // First name field is required
    errors = firstName.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set first name to something incorrect
    firstName.setValue('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
    errors = firstName.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxlength']).toBeTruthy();

    // Set first name to something correct
    firstName.setValue('Andrey');
    errors = firstName.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();
  });

  it('phone field validity', () => {

    let errors = {};
    const phone = component.modifyContactForm.get('phones')['controls'][0]['controls']['phone'];

    expect(phone.valid).toBeTruthy();

    // Phone field is not required
    errors = phone.errors || {};
    expect(errors['required']).toBeFalsy();

    // Set phone to something incorrect
    phone.setValue('12345');
    errors = phone.errors || {};
    expect(errors['minlength']).toBeTruthy();

    // Set phone to something correct
    phone.setValue('(950) 557-3199');
    errors = phone.errors || {};
    expect(errors['minlength']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();


  });

  it('make a form valid', () => {

    expect(component.modifyContactForm.valid).toBeFalsy();

    component.modifyContactForm.get('first_name').setValue('Andrey');
    component.modifyContactForm.get('last_name').setValue('Statsenko');

    expect(component.modifyContactForm.valid).toBeTruthy();

  });


  it('submitting a form NOT emits', fakeAsync(() => {

    const hostElement = fixture.nativeElement;
    const saveButton: HTMLElement = hostElement.querySelector('#save_button');
    spyOn(component, 'onSubmit');

    saveButton.click();
    tick();
    fixture.detectChanges();

    expect(component.onSubmit).not.toHaveBeenCalled();

  }));

  it('submitting a form emits', fakeAsync(() => {

    const hostElement = fixture.nativeElement;
    const saveButton: HTMLElement = hostElement.querySelector('#save_button');
    spyOn(component, 'onSubmit');

    component.modifyContactForm.get('first_name').setValue('Andrey');
    component.modifyContactForm.get('last_name').setValue('Statsenko');

    fixture.detectChanges();

    saveButton.click();
    tick();

    fixture.detectChanges();

    expect(component.onSubmit).toHaveBeenCalled();
    //expect(mockRouter.navigate).toHaveBeenCalledWith(['contacts']);


  }));

  it('one input for phones initially', fakeAsync(() => {

    const phonesFormArray = component.modifyContactForm.get('phones');

    expect(phonesFormArray['controls'].length).toBe(1);

  }));

  it('several inputs for phones after click Add phone button', fakeAsync(() => {

    const phonesFormArray = component.modifyContactForm.get('phones');

    const hostElement = fixture.nativeElement;
    const addPhoneButton: HTMLElement = hostElement.querySelector('#add-input-for-phone');

    fixture.detectChanges();

    addPhoneButton.click();
    addPhoneButton.click();
    tick();

    fixture.detectChanges();

    expect(phonesFormArray['controls'].length).toBe(3);


  }));


});
