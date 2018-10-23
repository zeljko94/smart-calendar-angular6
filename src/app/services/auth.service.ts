import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { SwalService } from './swal.service';

import * as jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  JWT: string = 'jwt_token';

  constructor(
    private http: HttpService,
    private sanitizer: DomSanitizer,
    private swal: SwalService,
    private router: Router) { 
    }


  sanitize(imgUrl){
    return this.sanitizer.bypassSecurityTrustUrl(imgUrl);
  }

  login(email, pass){
    return this.http.post("Auth/Login", {Email: email, Password: pass});
  }

  redirect(){
    var privileges = this.getPrivileges();
    if(privileges == 'admin'){ 
      this.router.navigate(['/admin/dashboard']);
    }
    else if(privileges == 'predavac'){
      this.router.navigate(['/predavac/dashboard']);
     }
    else if(privileges == 'ucenik'){
      this.router.navigate(['/ucenik/dashboard']);
     }
  }

  refreshToken(){
    var UserID = this.getID();
    if(UserID){
      this.http.get("Auth/RefreshToken", {UserID: UserID})
      .subscribe(data => {
        if(data){
          this.setItem(this.JWT, data);
        }
      });
    }
  }

  formatExpDate(date){
    if(date){
      var txt = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + " " + 
                date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      return txt;
    }
    return "";
  }

  getExpirationDate(){
    var token = this.decodeToken(this.getItem(this.JWT));
    if(token){
      var expDate = new Date(0);
      expDate.setUTCSeconds(token.exp);
      return expDate;
    }
    return null;
  }

  isLogged(){
    return !this.isTokenExpired();
  }

  isAdmin(){
    return this.getPrivileges() == 'admin';
  }

  isPredavac(){
    return this.getPrivileges() == 'predavac';
  }

  isUcenik(){
    return this.getPrivileges() == 'ucenik';
  }

  getName(){
    if(!this.isTokenExpired()){
      var token = this.decodeToken(this.getItem(this.JWT));

      return token.given_name;
    }
    return "";
  }

  getLastName(){
    if(!this.isTokenExpired()){
      var token = this.decodeToken(this.getItem(this.JWT));

      return token.family_name;
    }
    return "";
  }

  getFullName(){
    if(!this.isTokenExpired()){
      var token = this.decodeToken(this.getItem(this.JWT));

      return token.given_name + " " + token.family_name;
    }
    return "";
  }

  getProfileImage(){
    var UserID = this.getID();
    if(!UserID)
      return;
    return this.http.get("ProfileImage/GetForUser", {UserID: UserID});
  }

  getID(){
    if(!this.isTokenExpired()){
      var token = this.decodeToken(this.getItem(this.JWT));
      return token ? +token.nameid : 0;
    }
    return null;
  }

  getPrivileges(){
    if(!this.isTokenExpired()){
      var token = this.decodeToken(this.getItem(this.JWT));

      return token ? token.actort : "";
    }
    return null;
  }

  isTokenExpired(){
    let token = this.decodeToken(this.getItem(this.JWT));
    if(token){
      var expirationDate = new Date(0);
      expirationDate.setUTCSeconds(token.exp);
      var isExpired = new Date() > expirationDate;
      if(isExpired){
        this.logout();
      }
      return isExpired;
    }
    return true;
  }

  logout(){
    this.setItem(this.JWT, null);
    this.router.navigate(['/login']);
  }

  getItem(key){
    return JSON.parse(localStorage.getItem(key));
  }

  setItem(key, value){
    localStorage.setItem(key, JSON.stringify(value));
  }

  decodeToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }
}
