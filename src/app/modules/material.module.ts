import { NgModule } from '@angular/core';
import {
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatOptionModule,
  MatSelectModule
} from '@angular/material';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatSelectModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatSelectModule
  ],
  declarations: []
})
export class MaterialModule { }
