import { Routes } from '@angular/router';
import { DefaultComponent } from './demo/dashboard/default/default.component';
import { ServicesComponent } from './demo/catalogo-servicos/catalogo-servicos.component';

export const routes: Routes = [
  { path: '', component: DefaultComponent },
  { path: 'catalogo/:category', component: ServicesComponent },
  { path: '**', redirectTo: '' }
];