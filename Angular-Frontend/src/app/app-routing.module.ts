import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/Auth/login/login.component';
import { ProfileComponent } from './component/Auth/profile/profile.component';
import { SidebarComponent } from './component/Auth/sidebar/sidebar.component';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/Admin/register/register.component';
import { ContactusComponent } from './component/Admin/contactus/contactus.component';
import { NotificationComponent } from './component/Admin/notification/notification.component';
import { AcademicsComponent } from './component/Base_Components/academics/academics.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'contactus', component: ContactusComponent},
  {path: 'notifications', component: NotificationComponent},
  {path: 'academics/:id', component: AcademicsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
