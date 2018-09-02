import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  hasToken() {
    return !!this.getToken();
  }

  getToken() {
    return window.localStorage.getItem('userToken');
  }

  setToken(token) {
    window.localStorage.setItem('userToken', token);
  }

  removeToken() {
    return window.localStorage.removeItem('userToken');
  }
}
