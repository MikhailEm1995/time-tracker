import { Injectable } from '@angular/core';
import {
  Router, CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { AuthService } from './auth.service';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import {NotificationsService} from "./notifications.service";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private notifications: NotificationsService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    if (url === '/tracker') {
      return this.checkLogin(url);
    }

    if (url === '/auth') {
      return this.checkCookie(url);
    }
  }

  checkLogin(url: string): boolean {
    if (AuthService.isLoggedIn) { return true; }

    this.authService.redirectUrl = url;

    this.router.navigate(['/auth']);
    this.notifications.showMessage('Error', 'You\'re not authorized');
    return false;
  }

  checkCookie(url: string): boolean {
    if (url === '/auth' && document.cookie.indexOf('JSESSIONID') !== -1) {
      AuthService.isLoggedIn = true;
      this.router.navigate(['/tracker']);
      this.notifications.showMessage('Success', 'You\'re logged in');
      return false;
    }

    return true;
  }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private notifications: NotificationsService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .catch(
        (err: any, caught: Observable <HttpEvent <any>>) => {
          if (err instanceof HttpErrorResponse && (err.status === 401 || err.status === 403)) {
            this.notifications.showMessage('Error', 'You\'re not authorized');
            this.authService.logout();
          }
          return caught;
        }
      );
  }
}

