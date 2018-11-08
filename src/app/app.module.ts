import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { FullCalendarModule } from 'ng-fullcalendar';
import { ColorPickerModule } from 'ngx-color-picker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { TooltipModule} from "ngx-tooltip";


import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LeftsideComponent } from './components/leftside/leftside.component';
import { SkillSelectComponent } from './components/skill-select/skill-select.component';
import { AdminDashnoardComponent } from './modules/admin/admin-dashnoard/admin-dashnoard.component';
import { UcenikDashnoardComponent } from './modules/ucenik/ucenik-dashnoard/ucenik-dashnoard.component';
import { PredavacDashnoardComponent } from './modules/predavac/predavac-dashnoard/predavac-dashnoard.component';
import { UcioniceListComponent } from './components/ucionice-list/ucionice-list.component';
import { TipoviNastaveListComponent } from './components/tipovi-nastave-list/tipovi-nastave-list.component';
import { RazineNastaveListComponent } from './components/razine-nastave-list/razine-nastave-list.component';
import { AdminUcioniceComponent } from './modules/admin/admin-ucionice/admin-ucionice.component';
import { AdminTipoviNastaveComponent } from './modules/admin/admin-tipovi-nastave/admin-tipovi-nastave.component';
import { AdminRazineNastaveComponent } from './modules/admin/admin-razine-nastave/admin-razine-nastave.component';
import { routing } from './app.routes';
import { AdminPredavaciComponent } from './modules/admin/admin-predavaci/admin-predavaci.component';
import { PredavaciListComponent } from './components/predavaci-list/predavaci-list.component';
import { UceniciListComponent } from './components/ucenici-list/ucenici-list.component';
import { PredavacUceniciComponent } from './modules/predavac/predavac-ucenici/predavac-ucenici.component';
import { AdminPredavacDetailsComponent } from './modules/admin/admin-predavac-details/admin-predavac-details.component';
import { PredavacDetailsComponent } from './components/predavac-details/predavac-details.component';
import { TokenExpTimerComponent } from './components/token-exp-timer/token-exp-timer.component';
import { AddPredavacComponent } from './components/add-predavac/add-predavac.component';
import { AdminAddPredavacComponent } from './modules/admin/admin-add-predavac/admin-add-predavac.component';
import { AdminUceniciComponent } from './modules/admin/admin-ucenici/admin-ucenici.component';
import { AdminAddUcenikComponent } from './modules/admin/admin-add-ucenik/admin-add-ucenik.component';
import { AdminUcenikDetailsComponent } from './modules/admin/admin-ucenik-details/admin-ucenik-details.component';
import { AddUcenikComponent } from './components/add-ucenik/add-ucenik.component';
import { UcenikDetailsComponent } from './components/ucenik-details/ucenik-details.component';
import { AdminTecajeviComponent } from './modules/admin/admin-tecajevi/admin-tecajevi.component';
import { AdminTecajDetailsComponent } from './modules/admin/admin-tecaj-details/admin-tecaj-details.component';
import { AdminRasporediComponent } from './modules/admin/admin-rasporedi/admin-rasporedi.component';
import { UnosTerminaComponent } from './components/unos-termina/unos-termina.component';
import { PredavacAddUcenikComponent } from './modules/predavac/predavac-add-ucenik/predavac-add-ucenik.component';
import { PredavacUcenikDetailsComponent } from './modules/predavac/predavac-ucenik-details/predavac-ucenik-details.component';
import { PredavacTecajeviComponent } from './modules/predavac/predavac-tecajevi/predavac-tecajevi.component';
import { PredavacRasporediComponent } from './modules/predavac/predavac-rasporedi/predavac-rasporedi.component';
import { UcenikRasporediComponent } from './modules/ucenik/ucenik-rasporedi/ucenik-rasporedi.component';
import { UcenikTecajeviComponent } from './modules/ucenik/ucenik-tecajevi/ucenik-tecajevi.component';
import { UcenikCertifikatiComponent } from './modules/ucenik/ucenik-certifikati/ucenik-certifikati.component';
import { UcenikTestoviComponent } from './modules/ucenik/ucenik-testovi/ucenik-testovi.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { AdminTestoviComponent } from './modules/admin/admin-testovi/admin-testovi.component';
import { AdminCertifikatiComponent } from './modules/admin/admin-certifikati/admin-certifikati.component';
import { PredavacTestoviComponent } from './modules/predavac/predavac-testovi/predavac-testovi.component';
import { PredavacCertifikatiComponent } from './modules/predavac/predavac-certifikati/predavac-certifikati.component';
import { MessagesListComponent } from './components/messages-list/messages-list.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NotificationDetailsComponent } from './components/notification-details/notification-details.component';
import { MessageDetailsComponent } from './components/message-details/message-details.component';
import { LiveChatComponent } from './components/live-chat/live-chat.component';
import { AdminForumComponent } from './modules/admin/admin-forum/admin-forum.component';
import { PredavacForumComponent } from './modules/predavac/predavac-forum/predavac-forum.component';
import { UcenikForumComponent } from './modules/ucenik/ucenik-forum/ucenik-forum.component';
import { AdminOdrzaniTerminDetailsComponent } from './modules/admin/admin-odrzani-termin-details/admin-odrzani-termin-details.component';
import { AdminDodajForumComponent } from './modules/admin/admin-dodaj-forum/admin-dodaj-forum.component';
import { AdminForumDetailsComponent } from './modules/admin/admin-forum-details/admin-forum-details.component';
import { AdminTerminDetailsComponent } from './modules/admin/admin-termin-details/admin-termin-details.component';
import { AdminAddForumComponent } from './modules/admin/admin-add-forum/admin-add-forum.component';
import { UcenikForumDetailsComponent } from './modules/ucenik/ucenik-forum-details/ucenik-forum-details.component';
import { UcenikTecajDetailsComponent } from './modules/ucenik/ucenik-tecaj-details/ucenik-tecaj-details.component';
import { UcenikTerminDetailsComponent } from './modules/ucenik/ucenik-termin-details/ucenik-termin-details.component';
import { PredavacForumDetailsComponent } from './modules/predavac/predavac-forum-details/predavac-forum-details.component';
import { PredavacAddForumComponent } from './modules/predavac/predavac-add-forum/predavac-add-forum.component';
import { PredavacTecajDetailsComponent } from './modules/predavac/predavac-tecaj-details/predavac-tecaj-details.component';
import { AdminUserProfileDetailsComponent } from './modules/admin/admin-user-profile-details/admin-user-profile-details.component';
import { AdminNotificationDetailsComponent } from './modules/admin/admin-notification-details/admin-notification-details.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    LeftsideComponent,
    SkillSelectComponent,
    UnosTerminaComponent,
    AdminDashnoardComponent,
    UcenikDashnoardComponent,
    PredavacDashnoardComponent,
    UcioniceListComponent,
    TipoviNastaveListComponent,
    RazineNastaveListComponent,
    AdminUcioniceComponent,
    AdminTipoviNastaveComponent,
    AdminRazineNastaveComponent,
    AdminPredavaciComponent,
    PredavaciListComponent,
    UceniciListComponent,
    PredavacUceniciComponent,
    AdminPredavacDetailsComponent,
    PredavacDetailsComponent,
    TokenExpTimerComponent,
    AddPredavacComponent,
    AdminAddPredavacComponent,
    AdminUceniciComponent,
    AdminAddUcenikComponent,
    AdminUcenikDetailsComponent,
    AddUcenikComponent,
    UcenikDetailsComponent,
    AdminTecajeviComponent,
    AdminTecajDetailsComponent,
    AdminRasporediComponent,
    PredavacAddUcenikComponent,
    PredavacUcenikDetailsComponent,
    PredavacTecajeviComponent,
    PredavacRasporediComponent,
    UcenikRasporediComponent,
    UcenikTecajeviComponent,
    UcenikCertifikatiComponent,
    UcenikTestoviComponent,
    NotificationListComponent,
    AdminTestoviComponent,
    AdminCertifikatiComponent,
    PredavacTestoviComponent,
    PredavacCertifikatiComponent,
    MessagesListComponent,
    NotificationsComponent,
    MessagesComponent,
    NotificationDetailsComponent,
    MessageDetailsComponent,
    LiveChatComponent,
    AdminForumComponent,
    PredavacForumComponent,
    UcenikForumComponent,
    AdminOdrzaniTerminDetailsComponent,
    AdminDodajForumComponent,
    AdminForumDetailsComponent,
    AdminTerminDetailsComponent,
    AdminAddForumComponent,
    UcenikForumDetailsComponent,
    UcenikTecajDetailsComponent,
    UcenikTerminDetailsComponent,
    PredavacForumDetailsComponent,
    PredavacAddForumComponent,
    PredavacTecajDetailsComponent,
    AdminUserProfileDetailsComponent,
    AdminNotificationDetailsComponent,
    ProfileSettingsComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    FullCalendarModule,
    ColorPickerModule,
    AngularDualListBoxModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    TooltipModule
    
  ],
  providers: [
    /*
    {
      provide: LOCALE_ID, useValue: 'hr-HR'
    },*/
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'hr'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
