import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

const LOGIN_PATTERN = /^[A-Za-z0-9 ]*$/;
const PASSWORD_PATTERN = /^[A-Za-z0-9!@#$%^&*()_ ]*$/;

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  authForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.createForm();
  }

  login(): void {
    this.authService.login().subscribe(() => {
      if (this.authService.isLoggedIn) {
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/tracker';

        this.router.navigate([redirect]);
      }
    });
  }

  createForm(): void {
    this.authForm = this.fb.group({
      url: ['', Validators.required],
      login: ['', Validators.compose([
        Validators.required, Validators.pattern(LOGIN_PATTERN)
      ])],
      password: ['', Validators.compose([
        Validators.required, Validators.pattern(PASSWORD_PATTERN)
      ])]
    });
  }

  getErrorMessage(value: string): string {
    let message: string;

    message = this.authForm.get(value).value.length === 0 ?
      `This field must contain ${value}` :
      `${value} contains forbidden characters`;

    return message;
  }
}
