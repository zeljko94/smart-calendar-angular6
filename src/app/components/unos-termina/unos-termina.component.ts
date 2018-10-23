import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SwalService } from '../../services/swal.service';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { UcioniceService } from '../../services/rest/ucionice.service';
import { TecajeviService } from '../../services/rest/tecajevi.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-unos-termina',
  templateUrl: './unos-termina.component.html',
  styles: []
})
export class UnosTerminaComponent implements OnInit {
 @Input() colSize: string = 'col-md-4';
 @Input() nastavaID: any = 0;
 @Input() nastava: boolean = true;

 @Output() addEmitter = new EventEmitter();

  tecajevi: any[] = [];
  ucionice: any[] = [];
  termin: any = { };
  pocetak: any;
  zavrsetak: any;
  errors: any = '';

  constructor(private http: HttpService,
              private auth: AuthService,
              private notificationService: NotificationService,
              private ucioniceService: UcioniceService,
              private tecajeviService: TecajeviService,
              private swal: SwalService) { }

  ngOnInit() {
   this.ucioniceService.getAll()
      .subscribe(data => {
        this.ucionice = data.Data;
      });
      
   this.tecajeviService.getAll()
      .subscribe(data => {
          this.tecajevi = data.Data;
          if(this.auth.getPrivileges() == 'predavac'){
            this.tecajevi = this.tecajevi.filter(t => t.Predavac.ID == this.auth.getID());
          }
      });
    this.termin.NastavaID = this.nastava ? 0 : this.nastavaID;
    this.termin.UcionicaID = '0';
  }

  addTermin(){
    if(this.isInputValid()){
      this.http.postJWT("TerminNastava/IsSlobodanTermin", this.termin)
      .subscribe(data => {
        this.errors = data.Data ? "" : "Odabrana učionica je zauzeta u zadanom periodu!";

        if(data.Data){
          this.http.postJWT("TerminNastava/Insert", this.termin)
            .subscribe(data => {
              if(this.swal.handleResponse(data)){
                this.addEmitter.emit(data.Data);

                this.notificationService.notifyTerminInsert(data.Data.ID, this.auth.getID())
                  .subscribe(data => {});
              }
            });
        }
      });

    }
  }

  onChange(){
    if(this.isInputValid(false)){
      this.http.postJWT("TerminNastava/IsSlobodanTermin", this.termin)
      .subscribe(data => {
        this.errors = data.Data ? "" : "Odabrana učionica je zauzeta u zadanom periodu!";
      });
    }
    else{
      this.errors = "";
    }
  }

  isInputValid(swal = true){
    if(this.termin.UcionicaID != '0'){
      if(this.termin.PocetniDatum <= this.termin.ZavrsniDatum){

        // SUCCESS
        return true;
      }
      else{
        if(swal)
          this.swal.err("Greška sa datumima!");
        return false;
      }
    }
    else{
      if(swal)
        this.swal.err("Odaberite učionicu!");
      return false;
    }
  }
}
