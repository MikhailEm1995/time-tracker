import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthPageComponent } from '../../pages/auth-page/auth-page.component';
import { TrackerPageComponent } from '../../pages/tracker-page/tracker-page.component';
import { Page404Component } from '../../pages/page-404/page-404.component';

import { AuthGuardService } from '../../services/auth-guard.service';

const appRoutes: Routes = [
  { path: 'auth', component: AuthPageComponent },
  // TODO Раскомментировать
  { path: 'tracker', /*canActivate: [AuthGuardService],*/ component: TrackerPageComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
