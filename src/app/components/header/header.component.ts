import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SanitizerService } from '../../services/sanitizer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  FullName: string = '';
  ProfileImageDataUrl: any =  'assets/template/images/profile-icon.png';

  constructor(private auth: AuthService,
              private sanitizer: SanitizerService) { }

  ngOnInit() {
    this.FullName = this.auth.getFullName();
    this.auth.getProfileImage()
      .subscribe(data => {
        if(data.StatusCode > 0){
          if(data.Data){
            if(data.Data.DataUrl){
              this.ProfileImageDataUrl = this.sanitizer.s(data.Data.DataUrl);
            }
          }
        }
      });
  }

  logout(){
    this.auth.logout();
  }
}
