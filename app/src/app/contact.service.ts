import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { TokenService } from './token.service';

const API_URL = 'http://localhost:3000/contacts';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  httpOptions = {
    headers: new HttpHeaders({
      'token': this.getToken()
    })
  };

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  getContacts() {
    return this.http.get(API_URL, this.httpOptions);
  }

  addContact(contact) {
    return this.http.post(API_URL, contact, this.httpOptions);
  }

  deleteContact(contactId) {
    return this.http.delete(`${API_URL}/${contactId}`, this.httpOptions);
  }

  getToken() {
    return this.tokenService.getToken();
  }
}
