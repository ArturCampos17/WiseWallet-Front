import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
<<<<<<< HEAD
import { RegisterTransactionComponent } from './components/register-transaction/register-transaction.component';
import { ListTransitionComponent } from './components/list-transition/list-transition.component';
=======
import { RegisterTransitionComponent } from './components/register-transition/register-transition.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
>>>>>>> b98f06d (Modulo transactions list)
import { CategoryManagementComponent } from './components/category-management/category-management.component'
import { StatisticsReportComponent } from './components/statistics-report/statistics-report.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './components/guards/auth.guard';


import { AuthService } from './components/services/auth.service';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { ContactComponent } from './components/contact/contact.component';





const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
<<<<<<< HEAD
  { path: 'register-transition', component: RegisterTransactionComponent, canActivate: [AuthGuard] },
  { path: 'list-transition', component: ListTransitionComponent, canActivate: [AuthGuard] },
=======
  { path: 'register-transition', component: RegisterTransitionComponent, canActivate: [AuthGuard] },
  { path: 'transaction-list', component: TransactionListComponent , canActivate: [AuthGuard] },
>>>>>>> b98f06d (Modulo transactions list)
  { path: 'category', component: CategoryManagementComponent, canActivate: [AuthGuard] },
  { path: 'report', component: StatisticsReportComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileUserComponent, canActivate: [AuthGuard] },
  { path: '**',  redirectTo: '/login',pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
