import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { AdminDashnoardComponent } from "./modules/admin/admin-dashnoard/admin-dashnoard.component";
import { AdminUcioniceComponent } from "./modules/admin/admin-ucionice/admin-ucionice.component";
import { AdminTipoviNastaveComponent } from "./modules/admin/admin-tipovi-nastave/admin-tipovi-nastave.component";
import { AdminRazineNastaveComponent } from "./modules/admin/admin-razine-nastave/admin-razine-nastave.component";
import { AdminAuthGuard } from "./modules/admin/guards/admin-auth.guard";
import { PredavacDashnoardComponent } from "./modules/predavac/predavac-dashnoard/predavac-dashnoard.component";
import { PredavacAuthGuard } from "./modules/predavac/guards/predavac-auth.guard";
import { UcenikDashnoardComponent } from "./modules/ucenik/ucenik-dashnoard/ucenik-dashnoard.component";
import { UcenikAuthGuard } from "./modules/ucenik/guards/ucenik-auth.guard";
import { AdminPredavaciComponent } from "./modules/admin/admin-predavaci/admin-predavaci.component";
import { AdminUceniciComponent } from "./modules/admin/admin-ucenici/admin-ucenici.component";
import { PredavacUceniciComponent } from "./modules/predavac/predavac-ucenici/predavac-ucenici.component";
import { AdminPredavacDetailsComponent } from "./modules/admin/admin-predavac-details/admin-predavac-details.component";
import { AdminAddPredavacComponent } from "./modules/admin/admin-add-predavac/admin-add-predavac.component";
import { AdminAddUcenikComponent } from "./modules/admin/admin-add-ucenik/admin-add-ucenik.component";
import { AdminUcenikDetailsComponent } from "./modules/admin/admin-ucenik-details/admin-ucenik-details.component";
import { AdminTecajeviComponent } from "./modules/admin/admin-tecajevi/admin-tecajevi.component";
import { AdminTecajDetailsComponent } from "./modules/admin/admin-tecaj-details/admin-tecaj-details.component";
import { AdminRasporediComponent } from "./modules/admin/admin-rasporedi/admin-rasporedi.component";
import { PredavacAddUcenikComponent } from "./modules/predavac/predavac-add-ucenik/predavac-add-ucenik.component";
import { PredavacUcenikDetailsComponent } from "./modules/predavac/predavac-ucenik-details/predavac-ucenik-details.component";
import { PredavacTecajeviComponent } from "./modules/predavac/predavac-tecajevi/predavac-tecajevi.component";
import { PredavacRasporediComponent } from "./modules/predavac/predavac-rasporedi/predavac-rasporedi.component";
import { UcenikRasporediComponent } from "./modules/ucenik/ucenik-rasporedi/ucenik-rasporedi.component";
import { UcenikTecajeviComponent } from "./modules/ucenik/ucenik-tecajevi/ucenik-tecajevi.component";
import { UcenikCertifikatiComponent } from "./modules/ucenik/ucenik-certifikati/ucenik-certifikati.component";
import { UcenikTestoviComponent } from "./modules/ucenik/ucenik-testovi/ucenik-testovi.component";
import { PredavacTestoviComponent } from "./modules/predavac/predavac-testovi/predavac-testovi.component";
import { PredavacCertifikatiComponent } from "./modules/predavac/predavac-certifikati/predavac-certifikati.component";
import { AdminCertifikatiComponent } from "./modules/admin/admin-certifikati/admin-certifikati.component";
import { AdminTestoviComponent } from "./modules/admin/admin-testovi/admin-testovi.component";
import { NotificationsComponent } from "./components/notifications/notifications.component";
import { AuthGuard } from "./guards/auth.guard";
import { MessagesComponent } from "./components/messages/messages.component";
import { MessageDetailsComponent } from "./components/message-details/message-details.component";
import { NotificationDetailsComponent } from "./components/notification-details/notification-details.component";
import { AdminForumComponent } from "./modules/admin/admin-forum/admin-forum.component";
import { PredavacForumComponent } from "./modules/predavac/predavac-forum/predavac-forum.component";
import { UcenikForumComponent } from "./modules/ucenik/ucenik-forum/ucenik-forum.component";
import { AdminForumDetailsComponent } from "./modules/admin/admin-forum-details/admin-forum-details.component";
import { AdminTerminDetailsComponent } from "./modules/admin/admin-termin-details/admin-termin-details.component";
import { AdminAddForumComponent } from "./modules/admin/admin-add-forum/admin-add-forum.component";
import { UcenikForumDetailsComponent } from "./modules/ucenik/ucenik-forum-details/ucenik-forum-details.component";
import { UcenikTecajDetailsComponent } from "./modules/ucenik/ucenik-tecaj-details/ucenik-tecaj-details.component";
import { UcenikTerminDetailsComponent } from "./modules/ucenik/ucenik-termin-details/ucenik-termin-details.component";
import { PredavacForumDetailsComponent } from "./modules/predavac/predavac-forum-details/predavac-forum-details.component";
import { PredavacAddForumComponent } from "./modules/predavac/predavac-add-forum/predavac-add-forum.component";
import { PredavacTecajDetailsComponent } from "./modules/predavac/predavac-tecaj-details/predavac-tecaj-details.component";
import { AdminUserProfileDetailsComponent } from "./modules/admin/admin-user-profile-details/admin-user-profile-details.component";
import { AdminNotificationDetailsComponent } from "./modules/admin/admin-notification-details/admin-notification-details.component";
import { ProfileSettingsComponent } from "./components/profile-settings/profile-settings.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";




const appRoutes: Routes = [
    { path: '',      component: LoginComponent },
    { path: 'login', component: LoginComponent },

    //#region SHARED ROUTES
    { 
        path: 'notifications', 
        component: NotificationsComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'messages', 
        component: MessagesComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'message-details/:id', 
        component: MessageDetailsComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'notification-details/:id', 
        component: NotificationDetailsComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'profile-settings/:id', 
        component: ProfileSettingsComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'forgot-password', 
        component: ForgotPasswordComponent,
        //canActivate: [AuthGuard]
    },
    { 
        path: 'reset-password/:token', 
        component: ResetPasswordComponent,
        //canActivate: [AuthGuard]
    },
    //#endregion


    //#region ADMIN ROUTES
    { 
        path: 'admin/dashboard', 
        component: AdminDashnoardComponent,
        canActivate: [AdminAuthGuard]
    },
    { 
        path: 'admin/ucionice', 
        component: AdminUcioniceComponent,
        canActivate: [AdminAuthGuard]
    },
    { 
        path: 'admin/tipovi-nastave', 
        component: AdminTipoviNastaveComponent,
        canActivate: [AdminAuthGuard]
    },
    { 
        path: 'admin/razine-nastave', 
        component: AdminRazineNastaveComponent,
        canActivate: [AdminAuthGuard]
    },
    {
        path: 'admin/predavaci',
        component: AdminPredavaciComponent,
        canActivate: [AdminAuthGuard]
    },
    {
        path: 'admin/ucenici',
        component: AdminUceniciComponent,
        canActivate: [AdminAuthGuard]
    },
    {
        path: 'admin/predavac-details/:id',
        component: AdminPredavacDetailsComponent,
        canActivate: [AdminAuthGuard]
    },
    {
        path: 'admin/add-predavac',
        component: AdminAddPredavacComponent,
        canActivate: [AdminAuthGuard]
    },
    {
        path: 'admin/ucenici',
        component: AdminUceniciComponent,
        canActivate: [AdminAuthGuard]
    },
    {
        path: 'admin/add-ucenik',
        component: AdminAddUcenikComponent,
        canActivate: [AdminAuthGuard]
    },
    {
        path: 'admin/ucenik-details/:id',
        component: AdminUcenikDetailsComponent,
        canActivate: [AdminAuthGuard]
    },
    {
        path: 'admin/tecajevi',
        component: AdminTecajeviComponent,
        canActivate: [AdminAuthGuard]
    },
    {
        path: 'admin/tecaj-details/:id',
        component: AdminTecajDetailsComponent,
        canActivate: [AdminAuthGuard]
    },
    {
        path: 'admin/rasporedi',
        component: AdminRasporediComponent,
        canActivate: [AdminAuthGuard]
    },
    {
        path: 'admin/certifikati',
        component: AdminCertifikatiComponent,
        canActivate: [AdminAuthGuard]
    },
    {
        path: 'admin/testovi',
        component: AdminTestoviComponent,
        canActivate: [AdminAuthGuard]
    },
    {
        path: 'admin/forum',
        component: AdminForumComponent,
        canActivate: [AdminAuthGuard]
    },
    {
        path: 'admin/forum-details/:id',
        component: AdminForumDetailsComponent,
        canActivate: [AdminAuthGuard]
    },
    {
        path: 'admin/add-forum',
        component: AdminAddForumComponent,
        canActivate: [AdminAuthGuard]
    },
    {
        path: 'admin/termin-details/:id',
        component: AdminTerminDetailsComponent,
        canActivate: [AdminAuthGuard]
    },
    {
        path: 'admin/user-profile-details/:id',
        component: AdminUserProfileDetailsComponent,
        canActivate: [AdminAuthGuard]
    },
    {
        path: 'admin/notification-details/:id',
        component: AdminNotificationDetailsComponent,
        canActivate: [AdminAuthGuard]
    },
    //#endregion ADMIN ROUTES




    //#region PREDAVAC ROUTES
    {
        path: 'predavac/dashboard',
        component: PredavacDashnoardComponent,
        canActivate: [PredavacAuthGuard]
    },
    {
        path: 'predavac/ucenici',
        component: PredavacUceniciComponent,
        canActivate: [PredavacAuthGuard]
    },
    {
        path: 'predavac/add-ucenik',
        component: PredavacAddUcenikComponent,
        canActivate: [PredavacAuthGuard]
    },
    {
        path: 'predavac/ucenik-details/:id',
        component: PredavacUcenikDetailsComponent,
        canActivate: [PredavacAuthGuard]
    },
    {
        path: 'predavac/tecaji',
        component: PredavacTecajeviComponent,
        canActivate: [PredavacAuthGuard]
    },
    {
        path: 'predavac/tecaj-details/:id',
        component: PredavacTecajDetailsComponent,
        canActivate: [PredavacAuthGuard]
    },
    {
        path: 'predavac/rasporedi',
        component: PredavacRasporediComponent,
        canActivate: [PredavacAuthGuard]
    },
    {
        path: 'predavac/certifikati',
        component: PredavacCertifikatiComponent,
        canActivate: [PredavacAuthGuard]
    },
    {
        path: 'predavac/testovi',
        component: PredavacTestoviComponent,
        canActivate: [PredavacAuthGuard]
    },
    {
        path: 'predavac/forum',
        component: PredavacForumComponent,
        canActivate: [PredavacAuthGuard]
    },
    {
        path: 'predavac/forum-details/:id',
        component: PredavacForumDetailsComponent,
        canActivate: [PredavacAuthGuard]
    },
    {
        path: 'predavac/add-forum',
        component: PredavacAddForumComponent,
        canActivate: [PredavacAuthGuard]
    },
    //#endregion PREDAVAC ROUTES


    //#region UCENIK ROUTES
    {
        path: 'ucenik/dashboard',
        component: UcenikDashnoardComponent,
        canActivate: [UcenikAuthGuard]
    },
    {
        path: 'ucenik/rasporedi',
        component: UcenikRasporediComponent,
        canActivate: [UcenikAuthGuard]
    },
    {
        path: 'ucenik/tecaji',
        component: UcenikTecajeviComponent,
        canActivate: [UcenikAuthGuard]
    },
    {
        path: 'ucenik/tecaj-details/:id',
        component: UcenikTecajDetailsComponent,
        canActivate: [UcenikAuthGuard]
    },
    {
        path: 'ucenik/termin-details/:id',
        component: UcenikTerminDetailsComponent,
        canActivate: [UcenikAuthGuard]
    },
    {
        path: 'ucenik/certifikati',
        component: UcenikCertifikatiComponent,
        canActivate: [UcenikAuthGuard]
    },
    {
        path: 'ucenik/testovi',
        component: UcenikTestoviComponent,
        canActivate: [UcenikAuthGuard]
    },
    {
        path: 'ucenik/forum',
        component: UcenikForumComponent,
        canActivate: [UcenikAuthGuard]
    },
    {
        path: 'ucenik/forum-details/:id',
        component: UcenikForumDetailsComponent,
        canActivate: [UcenikAuthGuard]
    },
    //#endregion UCENIK ROUTES

    {path: '**', redirectTo: '', pathMatch: 'full'}
];


export const routing = RouterModule.forRoot(appRoutes);