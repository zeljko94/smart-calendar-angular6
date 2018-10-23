import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  table: string = 'Notification';
  notifications: any[] = [];

  constructor(private http: HttpService) { }


  notifyTecajInsert(TecajID, IssuerID){
    return this.http.getJWT(this.table + "/NotifyTecajInsert", {TecajID: TecajID, IssuerID: IssuerID});
  }

  notifyTecajDelete(TecajID, IssuerID){
    return this.http.getJWT(this.table + "/NotifyTecajDelete", {TecajID: TecajID, IssuerID: IssuerID});
  }



  notifyForumInsert(ForumID, IssuerID){
    return this.http.getJWT(this.table + "/NotifyForumInsert", {ForumID: ForumID, IssuerID: IssuerID});
  }

  notifyForumDelete(ForumID, IssuerID){
    return this.http.getJWT(this.table + "/NotifyForumDelete", {ForumID: ForumID, IssuerID: IssuerID});
  }



  notifyForumPostInsert(ForumPostID, IssuerID){
    return this.http.getJWT(this.table + "/NotifyForumPostInsert", {ForumPostID: ForumPostID, IssuerID: IssuerID});
  }

  notifyForumPostDelete(ForumPostID, IssuerID){
    return this.http.getJWT(this.table + "/NotifyForumPostDelete", {ForumPostID: ForumPostID, IssuerID: IssuerID});
  }




  notifyUcenikInsert(UcenikID, IssuerID){
    return this.http.getJWT(this.table + "/NotifyUcenikInsert", {UcenikID: UcenikID, IssuerID: IssuerID});
  }

  notifyUcenikDelete(UcenikID, IssuerID){
    return this.http.getJWT(this.table + "/NotifyUcenikDelete", {UcenikID: UcenikID, IssuerID: IssuerID});
  }






  notifyTerminInsert(TerminID, IssuerID){
    return this.http.getJWT(this.table + "/NotifyTerminInsert", {TerminID: TerminID, IssuerID: IssuerID});
  }

  NotifyTerminUpdate(data){
    return this.http.postJWT(this.table + "/NotifyTerminUpdate", data);
  }

  NotifyTerminDelete(TerminID, IssuerID){
    return this.http.getJWT(this.table + "/NotifyTerminDelete", {TerminID: TerminID, IssuerID: IssuerID});
  }
  



  
  getForUser(UserID){
    return this.http.getJWT(this.table + "/GetForUser", {UserID: UserID});
  }

  userSeeNotifications(UserID){
    return this.http.getJWT(this.table + "/UserSeeNotifications", {UserID: UserID});
  }
  
  insert(o){
    return this.http.postJWT(this.table + "/Insert", o);
  }
}
