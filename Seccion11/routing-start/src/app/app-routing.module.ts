import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from './servers/server/server-resolver.service';
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent }
    ]
  },

  //{ path: 'users', component: UsersComponent },
  //{ path: 'users/:id/:name', component: UserComponent },
  {
    path: 'servers',
    //proteje el root de la funcionalidad
    //canActivate:[AuthGuard], 

    //proteje los hijos de la funcionalidad
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [
      { path: ':id', component: ServerComponent, resolve : {server111: ServerResolver} },
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  },
  // {path: 'not-found', component : PageNotFoundComponent},
  { path: 'not-found', component: ErrorPageComponent, data: { message: 'Page not found (404)' } },
  //paginas no encontradas
  { path: '**', redirectTo: '/not-found' }
  //next work fine
  // {path: 'servers', component: ServersComponent},
  // {path: 'servers/:id', component: ServerComponent }, 
  //{path: 'servers/:id/edit', component: EditServerComponent } 
];
@NgModule({
  imports: [
    /**
     * https://codecraft.tv/courses/angular/routing/routing-strategies/
     */
    //RouterModule.forRoot(appRoutes, { useHash: true })
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
