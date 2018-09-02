import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

const API_URL = 'http://localhost:3000/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private token: TokenService
   ) { }

  login(loginPaylaod) {
    return this.http.post(`${API_URL}/login`, loginPaylaod);
  }

  isLogged() {
    return this.token.hasToken();
  }
}
