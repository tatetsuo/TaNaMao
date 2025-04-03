import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { AuthGuard } from './guards/auth.guard';
import { UserProfileComponent } from './demo/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/default',
        pathMatch: 'full'
      },
      {
        path: 'default',
        loadComponent: () => import('./demo/dashboard/default/default.component').then((c) => c.DefaultComponent),
        canActivate: [AuthGuard] // Adicionar o guard 
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/elements/typography/typography.component')
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/elements/element-color/element-color.component')
      },
      {
        path: 'catalogo/:category',
        loadComponent: () => import('./demo/catalogo-servicos/catalogo-servicos.component').then((m) => m.ServicesComponent)
      },
      {
        path: 'mapa',
        loadComponent: () => import('./demo/mapa/mapa.component').then((c) => c.MapaComponent)
      },
      {
        path: 'contrato/:id',
        loadComponent: () => import('./demo/comprar-servico/comprar-servico.component').then((m) => m.ComprarServicosComponent)
      },
      {
        path: 'perfil',
        component: UserProfileComponent, // Adicionar a rota para o perfil do usuário
        canActivate: [AuthGuard] // Adicionar o guard
      },
      {
        path: 'minha-carteira',
        loadComponent: () => import('./demo/wallet/user-wallet/user-wallet.component').then((m) => m.UserWalletComponent)
      },
      {
        path: 'meus-servicos',
        loadComponent: () => import('./demo/services/my-services/my-services.component').then((m) => m.MyServicesComponent)
      },
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'guest',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then((m) => m.AuthenticationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
