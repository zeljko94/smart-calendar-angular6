import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TecajeviService } from '../../../services/rest/tecajevi.service';
import { SwalService } from '../../../services/swal.service';
import { SanitizerService } from '../../../services/sanitizer.service';
import { NastavneCjelineService } from '../../../services/rest/nastavne-cjeline.service';
import { AuthService } from '../../../services/auth.service';
import { ObavijestiService } from '../../../services/rest/obavijesti.service';
import { TerminiService } from '../../../services/rest/termini.service';

@Component({
  selector: 'app-admin-tecaj-details',
  templateUrl: './admin-tecaj-details.component.html',
  styles: []
})
export class AdminTecajDetailsComponent implements OnInit, OnDestroy {

  tecaj: any;
  id: any;
  isLoaded: boolean = false;

  loggedID: any = 0;

  private sub: any;


  nastavneCjeline: any[] = [];
  novaNastavnaCjelina: any = {};

  obavijesti: any[] = [];
  novaObavijest: any = {};

  termini: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private terminiService: TerminiService,
    private router: Router,
    private auth: AuthService,
    private obavijestiService: ObavijestiService,
    private swal: SwalService,
    private nastavneCjelineService: NastavneCjelineService,
    private sanitizer: SanitizerService,
    private tecajeviService: TecajeviService
  ) { }

  
  ngOnInit() {
    this.loggedID = this.auth.getID();
    this.swal.showLoading("Učitavanje...", false);
    this.sub = this.activatedRoute.params.subscribe(params => {
     this.id = +params['id'];

     if(this.id){
       this.tecajeviService.getById(this.id)
        .subscribe(data => {
          this.tecaj = data.Data;
          this.sanitizer.usrProfileImg(this.tecaj.Predavac);
          for(var i=0; i<this.tecaj.Sudionici.length; i++){
            this.sanitizer.usrProfileImg(this.tecaj.Sudionici[i]);
          }


          this.nastavneCjelineService.getForTecaj(this.id)
            .subscribe(data => {
              this.nastavneCjeline = data.Data;

              this.obavijestiService.getForTecaj(this.id)
                .subscribe(data => {
                  this.obavijesti = data.Data;
                  for(var i=0; i<this.obavijesti.length; i++){
                    this.sanitizer.usrProfileImg(this.obavijesti[i].Kreator);
                  }

                  this.terminiService.getForTecaj(this.tecaj.ID)
                    .subscribe(data => {
                      this.termini = data.Data;
                      this.swal.hideLoading();
                      this.isLoaded = true;
                    });
                });
            });
        });
     }
    });
  }

  dodajTermin(){
    this.router.navigate(['/admin/rasporedi']);
  }

  deleteSudionik(id){
    this.swal.confirmDelete(
      () => {
        this.tecajeviService.deleteSudionik(id, this.tecaj.ID)
          .subscribe(data => {
            if(this.swal.handleResponse(data)){
              this.tecaj.Sudionici = this.tecaj.Sudionici.filter(s => s.ID != id);
            }
          });
      },
      () => {}
    );
  }

  subArray(arr, chunkSize){
    var i,j,temparray,chunk = chunkSize;
    var rez = [];
    for (i=0,j=arr.length; i<j; i+=chunk) {
        temparray = arr.slice(i,i+chunk);
        rez.push(temparray);
    }
    return rez;
  }

  dodajObavijest(){
    if(this.novaObavijest.Poruka){

      this.novaObavijest.TecajID = this.id;
      this.novaObavijest.UserID = this.auth.getID();
      this.novaObavijest.Datum = new Date().toJSON();

      this.obavijestiService.insert(this.novaObavijest)
        .subscribe(data => {
          if(this.swal.handleResponse(data)){
            this.sanitizer.usrProfileImg(data.Data.Kreator);
            this.obavijesti.unshift(data.Data);

            this.novaObavijest = {};
          }
        });

    }
    else{
      this.swal.err("Unesite text obavijesti!");
    }
  }


  brisiObavijest(id){
    this.swal.confirmDelete(
      () => {
        this.obavijestiService.delete(id)
          .subscribe(data => {
            if(this.swal.handleResponse(data)){
              this.obavijesti = this.obavijesti.filter(o => o.ID != id);
            }
          });
      },
      () => {}
    );
  }

  nastavnaCjelinaDelete(id){
    this.swal.confirmDelete(
      () => {
        this.nastavneCjelineService.delete(id)
          .subscribe(data => {
            if(this.swal.handleResponse(data)){
              this.nastavneCjeline = this.nastavneCjeline.filter(nc => nc.ID != id);
            }
          });
      },
      () => {}
    );
  }

  dodajNastavnuCjelinu(){
    if(this.novaNastavnaCjelina.Naziv){

      this.novaNastavnaCjelina.RedniBroj = this.nastavneCjeline.length+1;
      this.novaNastavnaCjelina.TecajID = this.id;

      this.swal.showLoading("Molimo pričekajte...", false);
      this.nastavneCjelineService.insert(this.novaNastavnaCjelina)
        .subscribe(data => {
          this.swal.hideLoading();
          if(this.swal.handleResponse(data)){
            this.nastavneCjeline.push(data.Data);
            this.novaNastavnaCjelina = {};
          }
        });
    }
    else{
      this.swal.err("Unesite naziv nastavne cjeline!");
    }
  }

  asd(){
    alert("asd");
  }

  details(id){
    this.router.navigate(['/admin/termin-details/' + id]);
  }


  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
