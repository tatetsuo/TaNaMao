import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { AuthGuard } from './guards/auth.guard';
import { ClientGuard } from './guards/client.guard';
import { FreelancerGuard } from './guards/freelancer.guard';
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
        canActivate: [ClientGuard] // Alterado para ClientGuard - apenas clientes normais
      },
      // Outras rotas para usuários normais
      {
        path: 'typography',
        loadComponent: () => import('./demo/elements/typography/typography.component'),
        canActivate: [AuthGuard]
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/elements/element-color/element-color.component'),
        canActivate: [AuthGuard]
      },
      {
        path: 'catalogo/:category',
        loadComponent: () => import('./demo/catalogo-servicos/catalogo-servicos.component').then((m) => m.ServicesComponent),
        canActivate: [ClientGuard] // Apenas clientes
      },
      {
        path: 'mapa',
        loadComponent: () => import('./demo/mapa/mapa.component').then((c) => c.MapaComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'contrato/:id',
        loadComponent: () => import('./demo/comprar-servico/comprar-servico.component').then((m) => m.ComprarServicosComponent),
        canActivate: [ClientGuard] // Apenas clientes
      },
      {
        path: 'perfil',
        component: UserProfileComponent,
        canActivate: [ClientGuard] // Apenas clientes
      },
      {
        path: 'minha-carteira',
        loadComponent: () => import('./demo/wallet/user-wallet/user-wallet.component').then((m) => m.UserWalletComponent),
        canActivate: [ClientGuard] // Apenas clientes
      },
      {
        path: 'meus-servicos',
        loadComponent: () => import('./demo/services/my-services/my-services.component').then((m) => m.MyServicesComponent),
        canActivate: [ClientGuard] // Apenas clientes
      },
      
      // Rotas para prestadores de serviço
      {
        path: 'prestador-dashboard',
        loadComponent: () => import('./demo/prestador-dashboard/prestador-dashboard.component').then((m) => m.PrestadorDashboardComponent),
        canActivate: [FreelancerGuard] // Apenas prestadores
      },
      {
        path: 'prestador-perfil',
        loadComponent: () => import('./demo/freelancer-profile/freelancer-profile.component').then((m) => m.FreelancerProfileComponent),
        canActivate: [FreelancerGuard] // Apenas prestadores
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
