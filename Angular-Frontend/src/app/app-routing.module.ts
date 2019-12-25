import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './component/Admin/register/register.component';
import { ContactusComponent } from './component/Admin/contactus/contactus.component';

import { LoginComponent } from './component/Auth/login/login.component';
import { ProfileComponent } from './component/Auth/profile/profile.component';

import { HomeComponent } from './component/home/home.component';

import { AdminDashboardComponent } from './component/Admin/admin-dashboard/admin-dashboard.component';
import { AcademicsComponent } from './component/Base_Components/academics/academics.component';
import { AddNotificationComponent } from './component/Admin/add-notification/add-notification.component';
import { ClassRegistrationComponent } from './component/Admin/class-registration/class-registration.component';
import { AddClassTimetableComponent } from './component/Admin/add-class-timetable/add-class-timetable.component';
import { AddTeacherTimetableComponent } from './component/Admin/add-teacher-timetable/add-teacher-timetable.component';
import { PrepareCertificationComponent } from './component/Admin/prepare-certification/prepare-certification.component';
import { NewsComponent } from './component/Admin/news/news.component';
import { PaymentsComponent } from './component/Admin/payments/payments.component';


import { NotificationComponent } from './component/Base_Components/notification/notification.component';
import { CertificationComponent } from './component/Base_Components/certification/certification.component';

import { AttendanceComponent } from './component/Base_Components/attendance/attendance.component';
import { StudentProgressComponent } from './component/Base_Components/student-progress/student-progress.component';
import { ManageMarksComponent } from './component/Base_Components/manage-marks/manage-marks.component';
import { ExtraCurricularComponent } from './component/Base_Components/extra-curricular/extra-curricular.component';
import { AcademicSubjectComponent } from './component/Base_Components/academic-subject/academic-subject.component';
import { SearchUserComponent } from './component/Admin/search-user/search-user.component';
import { MenuComponent } from './component/Base_Components/menu/menu.component';
import { SubjectsComponent } from './component/Base_Components/subjects/subjects.component';
import { SidebarComponent } from './component/Auth/sidebar/sidebar.component';
import { UserRootComponent } from './component/user-root/user-root.component';


// const routes: Routes = [
//   {path: '', component: HomeComponent},
//   {path: 'menu', component: MenuComponent},
//   {path: 'login', component: LoginComponent},
//   {path: 'register', component: RegisterComponent},
//   {path: 'profile/:id', component: ProfileComponent},
//   {path: 'contactus', component: ContactusComponent},
//   {path: 'notifications', component: NotificationComponent},
//   {path: 'academics/:sbjName', component: AcademicsComponent },
//   {path: 'add_notification', component: AddNotificationComponent},
//   {path: 'certification', component: CertificationComponent},
//   {path: 'prepare_certification', component: PrepareCertificationComponent},
//   {path: 'attendance' , component:AttendanceComponent},
//   {path: 'admin_dashboard', component:AdminDashboardComponent},
//   {path: 'news_feeds', component:NewsComponent},
//   {path: 'payments', component:PaymentsComponent},
//   {path: 'student_progress/:id', component: StudentProgressComponent},
//   {path: 'manage_marks', component: ManageMarksComponent},
//   {path: 'extra_curricular', component: ExtraCurricularComponent},
//   {path: 'class_registration', component:ClassRegistrationComponent},
//   {path: 'add_cls_tt', component:AddClassTimetableComponent},
//   {path: 'add_techr_tt', component:AddTeacherTimetableComponent},
//   {path: 'academic_subject/:id', component:AcademicSubjectComponent},
//   {path: 'search_user', component:SearchUserComponent},
//   {path: 'subjects', component: SubjectsComponent}
// ];
const routes: Routes = [
  {path: '', component: HomeComponent},
  // {path: 'menu/:id', component: MenuComponent},
  {path: 'login', component: LoginComponent},
  {path:':id/menu',component:MenuComponent},
  {path:':id',component:UserRootComponent,children:[  
    // {path:'',redirectTo:'/notification',pathMatch:'full'},
    
    {path:'register',component:RegisterComponent},
    {path: 'notifications', component: NotificationComponent},
    {path: 'academics', component: AcademicsComponent},
    {path: 'add_notification', component: AddNotificationComponent},
    {path: 'certification', component: CertificationComponent},
    {path: 'prepare_certification', component: PrepareCertificationComponent},
    {path: 'attendance' , component:AttendanceComponent},
    {path: 'admin_dashboard', component:AdminDashboardComponent},
    {path: 'news_feeds', component:NewsComponent},
    {path: 'payments', component:PaymentsComponent},
    {path: 'student_progress', component: StudentProgressComponent},
    {path: 'manage_marks', component: ManageMarksComponent},
    {path: 'extra_curricular', component: ExtraCurricularComponent},
    {path: 'class_registration', component:ClassRegistrationComponent},
    {path: 'add_cls_tt', component:AddClassTimetableComponent},
    {path: 'add_techr_tt', component:AddTeacherTimetableComponent},
    {path: 'academic_subject', component:AcademicSubjectComponent},
    {path: '', component: ProfileComponent},
    {path: 'search_user', component:SearchUserComponent},
    {path: 'subjects', component: SubjectsComponent},
  ]},
  
  {path: 'contactus', component: ContactusComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

