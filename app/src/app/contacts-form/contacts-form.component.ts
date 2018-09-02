import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts-form',
  templateUrl: './contacts-form.component.html',
  styleUrls: ['./contacts-form.component.css']
})
export class ContactsFormComponent implements OnInit {

  contactForm: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private contactService: ContactService,
    private router: Router
  ) { }

  ngOnInit() {
    this.contactForm = this.formbuilder.group({
      firstName: ['', Validators.required],
      lastName: [],
      phone: ['', Validators.required],
      email: [],
      address: [],
      photo: [],
    });
  }

  addContact(event) {
    event.preventDefault();

    const newContact = this.contactForm.getRawValue();

    if (this.contactForm.valid && !this.contactForm.pending) {
      this.contactService.addContact(newContact)
        .subscribe(() => this.router.navigateByUrl('/contacts'));
    }
  }

}
