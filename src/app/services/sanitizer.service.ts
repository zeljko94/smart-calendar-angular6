import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SanitizerService {
  default_icon: string = "assets/template/images/profile-icon.png";

  constructor(private sanitizer: DomSanitizer) { }

  s(url){
    return url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : this.default_icon;
  }

  usrProfileImg(u){
    if(!u.ProfileImage){
      u.ProfileImage = { DataUrl: this.default_icon };
      return;
    }
    else{
      if(!u.ProfileImage.DataUrl){
        u.ProfileImage.DataUrl = this.default_icon;
        return;
      }

      u.ProfileImage.DataUrl = this.s(u.ProfileImage.DataUrl);
    }
  }

}
