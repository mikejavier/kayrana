import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contacts: any = [];

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.contactService.getContacts()
      .subscribe(contacts => this.contacts = contacts);
  }

  deleteContact(contactId) {
    this.contactService.deleteContact(contactId)
      .subscribe(() => this.getContacts());
  }

}
