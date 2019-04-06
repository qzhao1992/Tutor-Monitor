import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AuthComponent } from './auth/auth.component';


const routes: Routes = [
  { path: 'users', component: UsersComponent},
  { path: 'login', component: AuthComponent},
  { path: '', redirectTo: '/users', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
