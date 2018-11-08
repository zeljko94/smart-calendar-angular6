import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SanitizerService } from '../../services/sanitizer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  FullName: string = '';
  ProfileImageDataUrl: any =  'assets/template/images/profile-icon.png';
  id: any;

  constructor(private auth: AuthService,
              private router: Router,
              private sanitizer: SanitizerService) { }

  ngOnInit() {
    this.id = this.auth.getID();
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

  profileClick(){
    this.router.navigate(['/profile-settings/' + this.id]);
  }

  logout(){
    this.auth.logout();
  }
}
