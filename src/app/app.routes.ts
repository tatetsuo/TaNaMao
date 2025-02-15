import { Routes } from '@angular/router';
import { DefaultComponent } from './demo/dashboard/default/default.component';
import { ServicesComponent } from './demo/catalogo-servicos/catalogo-servicos.component';
import { MapaComponent } from './demo/mapa/mapa.component';

export const routes: Routes = [
  { path: '', component: DefaultComponent },
  { path: 'catalogo/:category', component: ServicesComponent },
  { path: 'mapa', component: MapaComponent },
  { path: '**', redirectTo: '' }
];