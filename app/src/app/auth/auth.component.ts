import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;
  error = null;

  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(event) {
    event.preventDefault();

    const loginPayload = this.loginForm.getRawValue();

    if (this.loginForm.valid && !this.loginForm.pending) {

      this.authService.login(loginPayload)
        .subscribe((userData: any) => {
          this.tokenService.setToken(userData.token);
          this.router.navigateByUrl('/contacts');
        },
        (err) => {
          const hasErrorStatus = !!err.status;
          if (hasErrorStatus) {
            this.error = err.error.message;
          } else {
            this.error = 'Não foi possivel conectar com o servidor remoto';
          }
        });
    }
  }

}
