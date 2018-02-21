import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

const URL_PATTERN = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
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
    const url = this.authForm.controls.url.value;
    const username = this.authForm.controls.login.value;
    const password = this.authForm.controls.password.value;

    this.authService.login(url, username, password).subscribe(() => {
        if (AuthService.isLoggedIn) {
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/tracker';

        this.router.navigate([redirect]);
      }
    });
  }

  createForm(): void {
    this.authForm = this.fb.group({
      url: ['', Validators.compose([
        Validators.required, Validators.pattern(URL_PATTERN)
      ])],
      login: ['', Validators.compose([
        Validators.required, Validators.pattern(LOGIN_PATTERN)
      ])],
      password: ['', Validators.compose([
        Validators.required, Validators.pattern(PASSWORD_PATTERN)
      ])]
    });
  }

  getErrorMessage(value: string, customMsg): string {
    let message: string;

    message = this.authForm.get(value).value.length === 0 ?
      `This field must contain ${value}` :
      customMsg ? customMsg :
      `${value} contains forbidden characters`;

    return message;
  }
}
