import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/Auth/login/login.component';
import { ProfileComponent } from './component/Auth/profile/profile.component';
import { SidebarComponent } from './component/Auth/sidebar/sidebar.component';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/Admin/register/register.component';
import { ContactusComponent } from './component/Admin/contactus/contactus.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'sidebar', component: SidebarComponent},
  {path: 'contactus', component: ContactusComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
