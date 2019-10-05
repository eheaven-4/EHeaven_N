import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './component/Admin/register/register.component';
import { ContactusComponent } from './component/Admin/contactus/contactus.component';

import { LoginComponent } from './component/Auth/login/login.component';
import { ProfileComponent } from './component/Auth/profile/profile.component';

import { HomeComponent } from './component/home/home.component';

import { AcademicsComponent } from './component/Base_Components/academics/academics.component';
import { NotificationComponent } from './component/Base_Components/notification/notification.component';
import { AddNotificationComponent } from './component/Admin/add-notification/add-notification.component';


import { CertificationComponent } from './component/Base_Components/certification/certification.component';
import { PrepareCertificationComponent } from './component/Admin/prepare-certification/prepare-certification.component';

import { AttendanceComponent } from './component/Base_Components/attendance/attendance.component';
import { AdminDashboardComponent } from './component/Admin/admin-dashboard/admin-dashboard.component';
import { NewsComponent } from './component/Admin/news/news.component';
import { PaymentsComponent } from './component/Admin/payments/payments.component';
import { StudentProgressComponent } from './component/Base_Components/student-progress/student-progress.component';
import { ManageMarksComponent } from './component/Base_Components/manage-marks/manage-marks.component';
import { ExtraCurricularComponent } from './component/Base_Components/extra-curricular/extra-curricular.component';
import { ClassRegistrationComponent } from './component/Admin/class-registration/class-registration.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'contactus', component: ContactusComponent},
  {path: 'notifications', component: NotificationComponent},
  {path: 'academics/:id', component: AcademicsComponent },
  {path: 'add_notification', component: AddNotificationComponent},
  {path: 'certification', component: CertificationComponent},
  {path: 'prepare_certification', component: PrepareCertificationComponent},
  {path: 'attendance' , component:AttendanceComponent},
  {path: 'admin_dashboard', component:AdminDashboardComponent},
  {path: 'news_feeds', component:NewsComponent},
  {path: 'payments', component:PaymentsComponent},
  {path: 'student_progress/:id', component: StudentProgressComponent},
  {path: 'manage_marks', component: ManageMarksComponent},
  {path: 'extra_curricular', component: ExtraCurricularComponent},
  {path: 'class_registration', component:ClassRegistrationComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
