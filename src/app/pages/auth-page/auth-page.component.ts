import { Component, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { loginPattern, passwordPattern } from '../../../constants/validation-patterns';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements AfterContentChecked {
  allowLogin = false;

  authForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngAfterContentChecked() {
    this.allowLogin = this.authForm.status === 'VALID';
  }

  createForm() {
    this.authForm = this.fb.group({
      url: ['', Validators.required],
      login: ['', Validators.compose([
        Validators.required, Validators.pattern(loginPattern)
      ])],
      password: ['', Validators.compose([
        Validators.required, Validators.pattern(passwordPattern)
      ])]
    });
  }
}
