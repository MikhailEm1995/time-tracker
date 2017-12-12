import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { MaterialModule } from './modules/material.module';
import { Page404Component } from './pages/page-404/page-404.component';
import { TrackerPageComponent } from './pages/tracker-page/tracker-page.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { DescriptionComponent } from './components/description/description.component';
import { ControlsComponent } from './components/controls/controls.component';

const appRoutes: Routes = [
  { path: 'auth', component: AuthPageComponent },
  { path: 'tracker', component: TrackerPageComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: '**', component: Page404Component }
];

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    Page404Component,
    TrackerPageComponent,
    SearchFormComponent,
    DescriptionComponent,
    ControlsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
