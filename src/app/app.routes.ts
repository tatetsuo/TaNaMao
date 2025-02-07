import { Routes } from '@angular/router';
import { DefaultComponent } from './demo/dashboard/default/default.component';

export const routes: Routes = [
  { path: '', component: DefaultComponent },
  { path: '**', redirectTo: '' }
];
