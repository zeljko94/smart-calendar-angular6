import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UceniciService } from '../../services/rest/ucenici.service';

import * as $ from 'jquery';
import { SanitizerService } from '../../services/sanitizer.service';
import { SwalService } from '../../services/swal.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-ucenici-list',
  templateUrl: './ucenici-list.component.html',
  styleUrls: ['./ucenici-list.component.css']
})
export class UceniciListComponent implements OnInit {
  @Input() role = '';
  @ViewChild('searchRef') searchRef;

  search: any = '';
  searchBy: any = '1';

  addUcenikRoute = '';

  mode: any = '';
  object: any = {};

  ucenici: any[] = [];
  uceniciStore: any[] = [];

  constructor(private uceniciService: UceniciService,
              private auth: AuthService,
              private notificationService: NotificationService,
              private swal: SwalService,
              private router: Router,
              private sanitizer: SanitizerService) { }


  ngOnInit() {
    this.searchRef.nativeElement.focus();
    this.swal.showLoading("Učitavanje podataka...", false);
    this.uceniciService.getAll()
      .subscribe(data => {
        if(data.StatusCode > 0){
          this.ucenici = data.Data;
          this.uceniciStore = data.Data;
          for(var i=0; i<this.ucenici.length; i++){
            this.sanitizer.usrProfileImg(this.ucenici[i]);
          }
        }
        this.swal.hideLoading();
      });
  }

  rowClick(p){
    if(this.role){
      this.router.navigate(['/' + this.role + '/ucenik-details/' + p.ID]);
    }
  }

  
  searchByChange(){
    if(this.search){
      if(this.search != ''){
        this.applyFilters();
      }
    }
  }

  applyFilters(){
    if(this.search != ''){
      if(this.search.length > 2){
        if(this.searchBy == "2"){
          this.ucenici = this.uceniciStore.filter(rns => ((rns.Name + " " + rns.LastName).toLowerCase().includes(this.search.toLowerCase())));
        }
        else if (this.searchBy == "1"){
          this.ucenici = this.uceniciStore.filter(rns => ((rns.RFIDCard.toLowerCase().includes(this.search.toLowerCase())) || (rns.RFIDPrivjesak.toLowerCase().includes(this.search.toLowerCase()))));
        }
        else if(this.searchBy == "3"){

        }
      }
      else{
        this.ucenici = this.uceniciStore;
      }
    }
    else{
      this.ucenici = this.uceniciStore;
    }
  }



  brisi(id){
    this.swal.confirmDelete(
      () => {
        this.swal.showLoading("Brisanje učenika...", false);
        this.notificationService.notifyUcenikDelete(id, this.auth.getID())
          .subscribe(data => {});
          
        this.uceniciService.delete(id)
          .subscribe(data => {
            this.swal.hideLoading();
            if(data.StatusCode > 0){
              this.ucenici = this.ucenici.filter(u => u.ID != id);
            }
          }, err => {
            this.swal.hideLoading();
          });
      },
      () => {}
    );
  }

}
