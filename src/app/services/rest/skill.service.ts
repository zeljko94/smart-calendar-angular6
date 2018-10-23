import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http: HttpService) { }

  getAll(){
    return this.http.getJWT("Skill/Get", {});
  }

  getUserSkills(UserID){
    return this.http.getJWT("Skill/GetUserSkills", {UserID: UserID});
  }

}
