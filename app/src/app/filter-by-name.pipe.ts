import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {

  transform(contacts, contactName: string) {

    if (!contactName) return contacts;

    contactName = contactName.trim().toLowerCase();

    return contacts.filter(contact => contact.firstName.toLowerCase().includes(contactName))
  }

}
