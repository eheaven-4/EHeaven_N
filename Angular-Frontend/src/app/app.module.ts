import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatModule } from './material.theme';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';


import { FlexLayoutModule } from '@angular/flex-layout';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';

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


@NgModule({
  declarations: [
    AppComponent,
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
  ],
  imports: [
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
  ],
  providers: [
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
