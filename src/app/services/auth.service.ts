import { Injectable } from '@angular/core';
import {
  HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

import { API_URL } from '../../constants/ts-variables';

@Injectable()
export class AuthService {

  static isLoggedIn = false;

  redirectUrl: string;

  constructor(
    private http: HttpClient
  ) {}

  static logout(): void {
    AuthService.isLoggedIn = false;
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
          }
        });
  }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    public auth: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .do((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.status === 204) {
            console.dir(event);
            AuthService.isLoggedIn = true;
          }
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          console.dir(err);
        }
      });
  }
}
