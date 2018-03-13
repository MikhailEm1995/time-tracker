import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { MaterialModule } from './modules/material/material.module';
import { Page404Component } from './pages/page-404/page-404.component';
import { TrackerPageComponent } from './pages/tracker-page/tracker-page.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { DescriptionComponent } from './components/description/description.component';
import { ControlsComponent } from './components/controls/controls.component';

import { AppRoutingModule } from './modules/app-routing/app-routing.module';

import { AuthGuardService, AuthInterceptor } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { TasksService } from './services/tasks.service';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import {NotificationsService} from './services/notifications.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    Page404Component,
    TrackerPageComponent,
    SearchFormComponent,
    DescriptionComponent,
    ControlsComponent,
    CapitalizePipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuardService,
    AuthService,
    TasksService,
    NotificationsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
