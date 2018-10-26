import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  table: string = 'Notification';
  notifications: any[] = [];

  constructor(private http: HttpService) { }

  getByID(id){
    return this.http.getJWT(this.table + "/Get", {ID: id});
  }

  

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

  

  notifyPredavacInsert(PredavacID, IssuerID){
    return this.http.getJWT(this.table + "/NotifyPredavacInsert", {PredavacID: PredavacID, IssuerID: IssuerID});
  }

  notifyPredavacDelete(PredavacID, IssuerID){
    return this.http.getJWT(this.table + "/NotifyPredavacDelete", {PredavacID: PredavacID, IssuerID: IssuerID});
  }



  notifyRazinaInsert(RazinaID, IssuerID){
    return this.http.getJWT(this.table + "/NotifyRazinaInsert", {RazinaID: RazinaID, IssuerID: IssuerID});
  }

  notifyRazinaDelete(RazinaID, IssuerID){
    return this.http.getJWT(this.table + "/notifyRazinaDelete", {RazinaID: RazinaID, IssuerID: IssuerID});
  }


  notifyTipNastaveInsert(TipID, IssuerID){
    return this.http.getJWT(this.table + "/notifyTipNastaveInsert", {TipID: TipID, IssuerID: IssuerID});
  }

  notifyTipNastaveDelete(TipID, IssuerID){
    return this.http.getJWT(this.table + "/notifyTipNastaveDelete", {TipID: TipID, IssuerID: IssuerID});
  }


  notifyUcionicaInsert(UcionicaID, IssuerID){
    return this.http.getJWT(this.table + "/NotifyUcionicaInsert", {UcionicaID: UcionicaID, IssuerID: IssuerID});
  }

  notifyUcionicaDelete(UcionicaID, IssuerID){
    return this.http.getJWT(this.table + "/NotifyUcionicaDelete", {UcionicaID: UcionicaID, IssuerID: IssuerID});
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
  
  
  NotifyTecajObavijestInsert(TerminID, IssuerID){
    return this.http.getJWT(this.table + "/NotifyTecajObavijestInsert", {TerminID: TerminID, IssuerID: IssuerID});
  }


  
  getAllForUser(UserID){
    return this.http.getJWT(this.table + "/GetAllForUser", {UserID: UserID});
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
