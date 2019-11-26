import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AnalysesComponent} from './analyses/analyses.component';
import {ClientsComponent} from './clients/clients.component';
import {LoginComponent} from './login/login.component';
import {AdminClientsComponent} from './admin-clients/admin-clients.component';
import {AdminAnalysesComponent} from './admin-analyses/admin-analyses.component';
import {AdminUsersComponent} from './admin-users/admin-users.component';


const routes: Routes = [
  {path: 'analyses/:urlAnls', component: AnalysesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'adminClients', component: AdminClientsComponent},
  {path: 'adminAnalyses', component: AdminAnalysesComponent},
  {path: 'adminUsers', component: AdminUsersComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
