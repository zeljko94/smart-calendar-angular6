import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TerminiService } from '../../../services/rest/termini.service';
import { AuthService } from '../../../services/auth.service';
import { ObavijestiService } from '../../../services/rest/obavijesti.service';
import { SwalService } from '../../../services/swal.service';
import { NastavneCjelineService } from '../../../services/rest/nastavne-cjeline.service';
import { SanitizerService } from '../../../services/sanitizer.service';
import { TecajeviService } from '../../../services/rest/tecajevi.service';

@Component({
  selector: 'app-ucenik-tecaj-details',
  templateUrl: './ucenik-tecaj-details.component.html',
  styleUrls: [ './ucenik-tecaj-details.component.css']
})
export class UcenikTecajDetailsComponent implements OnInit {


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


  subArray(arr, chunkSize){
    var i,j,temparray,chunk = chunkSize;
    var rez = [];
    for (i=0,j=arr.length; i<j; i+=chunk) {
        temparray = arr.slice(i,i+chunk);
        rez.push(temparray);
    }
    return rez;
  }



  asd(){
    alert("asd");
  }

  details(id){
    this.router.navigate(['/ucenik/termin-details/' + id]);
  }


  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
