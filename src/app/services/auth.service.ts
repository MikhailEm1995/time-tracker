import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

import { API_URL } from '../../constants/ts-variables';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';
import {NotificationsService} from './notifications.service';

@Injectable()
export class AuthService {

  static isLoggedIn = false;

  redirectUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private notifications: NotificationsService
  ) {}

  logout(): void {
    AuthService.isLoggedIn = false;
    this.router.navigate(['/auth']);
  }

  login(url, username, password): Observable<any> {
    if (localStorage.getItem('url')) {
      localStorage.removeItem('url');
    }
    localStorage.setItem('url', url);

    return this.http
      .post(
        API_URL + '/login',
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Api-Base-Url': url
          },
          observe: 'response',
          withCredentials: true
        })
      .do((res) => {
        if (res.status === 204) {
          AuthService.isLoggedIn = true;
          this.notifications.showMessage('Success', 'You\'re logged in');
        }
      });
  }
}
