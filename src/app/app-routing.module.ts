import { AdminGuard } from './guards/admin/admin.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginGuard } from './guards/login/login.guard';

const routes: Routes = [

{path: '', component:LoginComponent,canActivate: [LoginGuard]},
{path: 'dashboard', component:DashboardComponent,canActivate: [AdminGuard]},
{path: 'register', component:RegisterComponent,canActivate: [LoginGuard]}





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
