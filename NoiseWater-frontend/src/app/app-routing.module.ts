

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { HomeComponent } from './components/home/home.component';





const routes: Routes = [
  { path: 'register-page', component: RegisterComponent },
  { path: 'home-page', component: HomeComponent },
  { path: 'login-page', component: LoginComponent },
  { path: '', redirectTo: '/login-page', pathMatch: 'full' },
  { path: 'u-list', component: HomeComponent },


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
