import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SanitizerService } from '../../services/sanitizer.service';

@Component({
  selector: 'app-leftside',
  templateUrl: './leftside.component.html',
  styles: []
})
export class LeftsideComponent implements OnInit {

  administrationItems: any[] = [];
  navigationItems: any[] = [];

  FullName: string = '';
  ProfileImageDataUrl: any =  'assets/template/images/profile-icon.png';


  constructor(private auth: AuthService,
              private sanitizer: SanitizerService) { }

  ngOnInit() {
    this.initNav(this.auth.getPrivileges());
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


  

  initNav(privileges){
    if(privileges == 'admin'){
      this.getAdminNavItems();
    }
    else if(privileges == 'predavac'){
      this.getPredavacNavItems();
    }
    else if(privileges == 'ucenik'){
      this.getUcenikNavItems();
    }
  }

  getAdminNavItems(){
    this.navigationItems = [
      {
        text: "Nadzorna ploča",
        link: "/admin/dashboard",
        icon: "fa fa-dashboard",
        active: false
      },
      {
        text: "Rasporedi",
        link: "/admin/rasporedi",
        icon: "fa fa-calendar",
        active: false
      },
      {
        text: "Forum",
        link: "/admin/forum",
        icon: "fa fa-comments",
        active: false
      }
    ];

    this.administrationItems = [
      {
        text: "Predavači",
        link: "/admin/predavaci",
        icon: "fa fa-users",
        active: false,
      },
      {
        text: "Učenici",
        link: "/admin/ucenici",
        icon: "fa fa-graduation-cap",
        active: false,
      },
      {
        text: "Učionice",
        link: "/admin/ucionice",
        icon: "fa fa-home",
        active: false,
      },
      {
        text: "Tečaji/Instrukcije",
        link: "/admin/tecajevi",
        icon: "fa fa-language",
        active: false,
      },
      {
        text: "Tipovi nastave",
        link: "/admin/tipovi-nastave",
        icon: "fa fa-cog",
        active: false,
      },
      {
        text: "Razine nastave",
        link: "/admin/razine-nastave",
        icon: "fa fa-line-chart",
        active: false,
      },
      {
        text: "Online testovi",
        link: "/admin/testovi",
        icon: "fa fa-edit",
        active: false,
      },
      {
        text: "Certifikati",
        link: "/admin/certifikati",
        icon: "fa fa-newspaper-o",
        active: false,
      },
    ];
  }

  getPredavacNavItems(){
    this.navigationItems = [
      {
        text: "Dashboard",
        link: "/predavac/dashboard",
        icon: "fa fa-dashboard",
        active: false
      },
      {
        text: "Rasporedi",
        link: "/predavac/rasporedi",
        icon: "fa fa-calendar",
        active: false
      },
      {
        text: "Forum",
        link: "/predavac/forum",
        icon: "fa fa-comments",
        active: false
      }
    ];

    this.administrationItems = [
      {
        text: "Učenici",
        link: "/predavac/ucenici",
        icon: "fa fa-graduation-cap",
        active: false,
      },
      {
        text: "Moji tečaji/Instrukcije",
        link: "/predavac/tecaji",
        icon: "fa fa-language",
        active: false,
      },
      {
        text: "Online testovi",
        link: "/predavac/testovi",
        icon: "fa fa-edit",
        active: false,
      },
      {
        text: "Certifikati",
        link: "/predavac/certifikati",
        icon: "fa fa-newspaper-o",
        active: false,
      },
    ];
  }

  getUcenikNavItems(){
    this.navigationItems = [
      {
        text: "Dashboard",
        link: "/ucenik/dashboard",
        icon: "fa fa-dashboard",
        active: false
      },
      {
        text: "Rasporedi",
        link: "/ucenik/rasporedi",
        icon: "fa fa-calendar",
        active: false
      },
      {
        text: "Forum",
        link: "/ucenik/forum",
        icon: "fa fa-comments",
        active: false
      }
    ];

    this.administrationItems = [
      {
        text: "Moji tečaji/Instrukcije",
        link: "/ucenik/tecaji",
        icon: "fa fa-language",
        active: false,
      },
      {
        text: "Moji certifikati",
        link: "/ucenik/certifikati",
        icon: "fa fa-newspaper-o",
        active: false,
      },
      {
        text: "Online testovi",
        link: "/ucenik/testovi",
        icon: "fa fa-edit",
        active: false,
      }
    ];
  }
}
