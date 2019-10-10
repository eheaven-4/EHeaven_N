import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatModule } from './material.theme';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
<<<<<<< HEAD
import { FileSelectDirective ,FileDropDirective} from 'ng2-file-upload';
=======
>>>>>>> parent of 5ee58ece... Merge branch 'master' of https://github.com/eheaven-4/EHeaven_N

import { FlexLayoutModule } from '@angular/flex-layout';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { NavbarComponent } from './component/Auth/navbar/navbar.component';
import { LoginComponent } from './component/Auth/login/login.component';
import { RegisterComponent } from './component/Admin/register/register.component';
import { ProfileComponent } from './component/Auth/profile/profile.component';
import { HomeComponent } from './component/home/home.component';
import { SidebarComponent } from './component/Auth/sidebar/sidebar.component';
import { FooterComponent } from './component/Auth/footer/footer.component';
import { ContactusComponent } from './component/Admin/contactus/contactus.component';
import { AcademicsComponent } from './component/Base_Components/academics/academics.component';
import { NotificationComponent } from './component/Base_Components/notification/notification.component';
import { AddNotificationComponent } from './component/Admin/add-notification/add-notification.component';
import { CertificationComponent } from './component/Base_Components/certification/certification.component';
import { PrepareCertificationComponent } from './component/Admin/prepare-certification/prepare-certification.component';
import { AttendanceComponent } from './component/Base_Components/attendance/attendance.component';
import { NewsComponent } from './component/Admin/news/news.component';
import { AdminDashboardComponent } from './component/Admin/admin-dashboard/admin-dashboard.component';
import { PaymentsComponent } from './component/Admin/payments/payments.component';
import { StudentProgressComponent } from './component/Base_Components/student-progress/student-progress.component';
import { ManageMarksComponent } from './component/Base_Components/manage-marks/manage-marks.component';
import { ExtraCurricularComponent } from './component/Base_Components/extra-curricular/extra-curricular.component';
import { ClassRegistrationComponent } from './component/Admin/class-registration/class-registration.component';
import { BulkaddComponent } from './component/Admin/register/bulkadd/bulkadd.component';
import { AddClassTimetableComponent } from './component/Admin/add-class-timetable/add-class-timetable.component';
import { AddTeacherTimetableComponent } from './component/Admin/add-teacher-timetable/add-teacher-timetable.component';



@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    FileSelectDirective,
    FileDropDirective,
=======
>>>>>>> parent of 5ee58ece... Merge branch 'master' of https://github.com/eheaven-4/EHeaven_N
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SidebarComponent,
    HomeComponent,
    FooterComponent,
    ContactusComponent,
    NotificationComponent,
    AcademicsComponent,
    AddNotificationComponent,
    CertificationComponent,
    PrepareCertificationComponent,
    AttendanceComponent,
    NewsComponent,
    AdminDashboardComponent,
    PaymentsComponent,
    StudentProgressComponent,
    ManageMarksComponent,
    ExtraCurricularComponent,
    ClassRegistrationComponent,
    BulkaddComponent,
    AddClassTimetableComponent,
    AddTeacherTimetableComponent,
  ],
  imports: [
    NgFlashMessagesModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgFlashMessagesModule,
    MatModule,
    MatExpansionModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MDBBootstrapModule,
    FontAwesomeModule,
  ],
  providers: [
    CookieService,
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
