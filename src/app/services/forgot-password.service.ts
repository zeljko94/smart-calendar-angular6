import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(
    private http: HttpService
  ) { }


  sendPasswordResetLink(email){
    return this.http.get("ForgotPassword/SendPasswordResetLink", {Email: email});
  }

  getByToken(token){
    return this.http.get("ForgotPassword/GetByToken", {Token: token});
  }

  
  updatePassword(UserID, password){
    return this.http.post("ForgotPassword/UpdatePassword", {UserID: UserID, password: password});
  }
}
