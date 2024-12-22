import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginGuard } from '../../resources/LoginGuard';

export const routes: Routes = [
    {path: '', component: LoginPageComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuard]},
];
