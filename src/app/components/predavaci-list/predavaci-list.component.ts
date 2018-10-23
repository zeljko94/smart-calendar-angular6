import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PredavaciService } from '../../services/rest/predavaci.service';
import { SanitizerService } from '../../services/sanitizer.service';
import { SwalService } from '../../services/swal.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/rest/user.service';

@Component({
  selector: 'app-predavaci-list',
  templateUrl: './predavaci-list.component.html',
  styleUrls: ['./predavaci-list.component.css']
})
export class PredavaciListComponent implements OnInit {
  @Input() loggedUserPrivileges = '';

  @ViewChild('searchRef') searchRef;

  search: any = '';
  searchBy: any = '1';

  predavaci: any[] = [];
  predavaciStore: any[] = [];
  users: any[] = [];

  constructor(private predavaciService: PredavaciService,
              private usersService: UserService,
              private router: Router,
              private swal: SwalService,
              private sanitizer: SanitizerService) { }

  ngOnInit() {
    this.searchRef.nativeElement.focus();
    this.swal.showLoading("Učitavanje podataka...", false);
    this.predavaciService.getAll()
      .subscribe(data => {
        if(data.StatusCode > 0){
          this.swal.hideLoading();
          
          this.predavaci = data.Data;
          this.predavaciStore = data.Data;
          for(var i=0; i<this.predavaci.length; i++){
            this.sanitizer.usrProfileImg(this.predavaci[i]);
          }
        }
      },
    err => {
      this.swal.hideLoading();
      //this.swal.err("Greška prilikom učitavanja podataka!");
    });
  }

  rowClick(p){
    this.router.navigate(['/admin/predavac-details/' + p.ID]);
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
          this.predavaci = this.predavaciStore.filter(rns => ((rns.Name + " " + rns.LastName).toLowerCase().includes(this.search.toLowerCase())));
        }
        else if (this.searchBy == "1"){
          this.predavaci = this.predavaciStore.filter(rns => ((rns.RFIDCard.toLowerCase().includes(this.search.toLowerCase())) || (rns.RFIDPrivjesak.toLowerCase().includes(this.search.toLowerCase()))));
        }
        else if(this.searchBy == "3"){

        }
      }
      else{
        this.predavaci = this.predavaciStore;
      }
    }
    else{
      this.predavaci = this.predavaciStore;
    }
  }


  brisi(id){
    if(this.loggedUserPrivileges == 'admin'){
      this.swal.confirmDelete(
        () => {
          this.swal.showLoading("Brisanje predavača...", false);
          this.predavaciService.delete(id)
            .subscribe(
              data => {
                this.swal.hideLoading();
                if(data.StatusCode > 0){
                  this.predavaciStore = this.predavaciStore.filter(p => p.ID != id);
                  this.predavaci = this.predavaci.filter(p => p.ID != id);
                  this.swal.ok("Korisnik uspješno obrisan!");
                }
                else{
                  this.swal.err("Korisnik uspješno obrisan!");
                }
              },
              err => {
                this.swal.hideLoading();
              });
        },
        () => {}
      );
    }
  }

}
