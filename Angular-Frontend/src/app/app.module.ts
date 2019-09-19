import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatModule } from './material.theme';
import { FlexLayoutModule } from '@angular/flex-layout';

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
import { FileExplorerComponent } from './component/file-explorer/file-explorer.component';
import { NewFolderDialogComponent } from './component/file-explorer/modals/new-folder-dialog/new-folder-dialog.component';
import { RenameDialogComponent } from './component/file-explorer/modals/rename-dialog/rename-dialog.component';
import { NotificationComponent } from './component/Base_Components/notification/notification.component';
import { AddNotificationComponent } from './component/Admin/add-notification/add-notification.component';
import { CertificationComponent } from './component/Base_Components/certification/certification.component';

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
    FileExplorerComponent,
    NewFolderDialogComponent,
    RenameDialogComponent,
    AddNotificationComponent,
    CertificationComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgFlashMessagesModule,
    MatModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
