import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { StudentsComponent } from './students/students.component';
// import { CalendarComponent } from './users/calendar.component';
import { CalendarComponent } from './users/calendar.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthGuard } from "./shared/gaurd/auth.gaurd";
import { SecureInnerPagesGuard } from "./shared/gaurd/secure-inner-pages.gaurd";
import { AdminGuard } from "./shared/gaurd/admin.gaurd";
import { TutorUserComponent } from './users/tutorUser.component';



const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'register-user', component: SignUpComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'tutorpage', component: TutorUserComponent, canActivate: [AdminGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
