import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CommonModule } from '@angular/common';
import { FeaturesComponent } from './features/features.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { DashboardModuleModule } from './dashboard-module/dashboard-module.module';

const routes: Routes = [
  { path: 'homepage', component: HomePageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    DashboardModuleModule, // Import DashboardModuleModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
