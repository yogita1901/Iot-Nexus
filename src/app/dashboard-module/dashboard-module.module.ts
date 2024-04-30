import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HydroSenseComponent } from './src/lib/component/hydro-sense/hydro-sense.component';
import { TankInfoComponent } from './src/lib/component/tank-info/tank-info.component';
import { TankStatusComponent } from './src/lib/component/tank-status/tank-status.component';
import { AuthGuard } from '../auth/auth.guard';
import { SignupComponent } from '../signup/signup.component';
import { WaterConsumptionComponent } from './src/lib/component/water-consumption/water-consumption.component';

const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: HydroSenseComponent,
    canActivate: [AuthGuard], 
    children: [
      { path: 'tankSpecification', component: TankInfoComponent },
      { path: 'tankLevel', component: TankStatusComponent },
      { path: 'waterConsumption', component: WaterConsumptionComponent },
      { path: '', redirectTo: 'tankSpecification', pathMatch: 'full' } 
    ]
  },
  { path: 'signup', component: SignupComponent } 
];

@NgModule({
  declarations: [
    HydroSenseComponent,
    TankInfoComponent,
    TankStatusComponent,
    WaterConsumptionComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(dashboardRoutes) 
  ]
})
export class DashboardModuleModule { }
