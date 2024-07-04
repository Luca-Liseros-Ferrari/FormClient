import { Routes } from '@angular/router';
import { PersonFormComponent } from './person-form/person-form.component';

export const routes: Routes = [
    { path: '', redirectTo: '/form', pathMatch: 'full' },
    { path: 'form', component: PersonFormComponent }
  ];
