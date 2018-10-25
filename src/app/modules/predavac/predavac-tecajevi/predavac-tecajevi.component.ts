import { Component, OnInit } from '@angular/core';
import { DualListComponent } from 'angular-dual-listbox';
import { SkillService } from '../../../services/rest/skill.service';
import { Router } from '@angular/router';
import { PredavaciService } from '../../../services/rest/predavaci.service';
import { UceniciService } from '../../../services/rest/ucenici.service';
import { RazineNastaveService } from '../../../services/rest/razine-nastave.service';
import { TipoviNastaveService } from '../../../services/rest/tipovi-nastave.service';
import { SwalService } from '../../../services/swal.service';
import { TecajeviService } from '../../../services/rest/tecajevi.service';
import { AuthService } from '../../../services/auth.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-predavac-tecajevi',
  templateUrl: './predavac-tecajevi.component.html',
  styleUrls: ['./predavac-tecajevi.component.css']
})
export class PredavacTecajeviComponent implements OnInit {

  tecajeviStore: any[] = [];
  tecajevi: any[] = [];

  mode: any = '';
  object: any = {
    PredavacID: this.auth.getID(),
    source: [],
    destionation: []
  };

  checkAll: boolean = false;
  search: string;

  jezici: any[] = [];
  //predavaciStore: any[] = [];
  //predavaci: any[] = [];
  razine: any[] = [];
  tipoviNastave: any[] = [];

  ucenici: any[] = [];

  format = { add: 'Dodaj', remove: 'Ukloni', all: 'Označi sve', none: 'Odznači sve',
             direction: DualListComponent.LTR, draggable: true, locale: 'en' };


  dualListDisplay(o){
    return o.Name + " " + o.LastName  + " - " + o.ID;
  }

  
  constructor(private skillService: SkillService,
              private auth: AuthService,
              private notificationService: NotificationService,
              private router: Router,
              private predavaciService: PredavaciService,
              private uceniciService: UceniciService,
              private razineNastaveService: RazineNastaveService,
              private tipoviNastaveService: TipoviNastaveService,
              private tecajeviService: TecajeviService,
              private swalService: SwalService
            ) { }

              
  destinationChange(ev){
    this.object.SudioniciID = ev.map(e => e.ID);
  }


  reset(){  
    this.object = {
      PredavacID: this.auth.getID(),
      source: this.ucenici.filter(u => u),
      destionation: []
    };
  }

  getJSON(){
    return JSON.stringify(this.object);
  }

  ngOnInit() {
    /*
    this.paginator.ps.emitter.subscribe(paginatedData => {
      this.tecajevi = paginatedData;
      this.changeMode('', null);
    });
*/
    this.swalService.showLoading("Učitavanje podataka...", false);
    this.skillService.getUserSkills(this.auth.getID())
      .subscribe(data => {
        this.jezici = data.Data;
      });

      this.uceniciService.getAll()
      .subscribe(data => {
        this.ucenici = data.Data;
        this.object.source = data.Data;
      });


      this.razineNastaveService.getAll()
        .subscribe(data => {
          this.razine = data.Data;
      });
        
      this.tipoviNastaveService.getAll()
      .subscribe(data => {
        this.tipoviNastave = data.Data;
      });

      this.tecajeviService.getForPredavac(this.auth.getID())
        .subscribe(data => {
          this.tecajeviStore = data.Data;
          this.tecajevi = data.Data;
          this.swalService.hideLoading();
        });
  }

  copy(o){
    return JSON.parse(JSON.stringify(o));
  }

  changeMode(md, rn){
    this.object = rn ? this.copy(rn) : {};
    this.mode = md;

    if(this.mode == 'Update'){
      this.object.SkillID = this.object.Skill.ID;
      this.object.PredavacID = this.object.Predavac.ID;
      this.object.NastavaRazinaID = this.object.NastavaRazina.ID;
      this.object.TipNastaveID = this.object.TipNastave.ID;

      var sudioniciID = this.object.Sudionici.map(s => s.ID);
      this.object.source = this.copy(this.ucenici);
      this.object.destination = [];

      for(var i=0; i<this.ucenici.length; i++){
        if(sudioniciID.includes(this.ucenici[i].ID)){
          this.object.destination.push(this.copy(this.ucenici[i]));
        }
      }
    }
    else if(this.mode == 'Add'){
      this.object.source = this.copy(this.ucenici);
      this.object.destination = [];
    }
  }

  applyFilters(){
    if(this.search != ''){
      if(this.search.length > 2){
        this.tecajevi = this.tecajeviStore.filter(rns => (rns.Naziv.toLowerCase().includes(this.search.toLowerCase()) || (rns.Opis.toLowerCase().includes(this.search.toLowerCase()))));
      }
      else{
        this.tecajevi = this.tecajeviStore;
      }
    }
    else{
      this.tecajevi = this.tecajeviStore;
    }
    /*
    this.paginator.ps.paginate(this.tecajevi);
    this.paginator.ps.changePage(1);
    */
  }

  validateInput(){
    if(this.object.Naziv){
      if(this.object.Opis){
        if(this.object.SkillID > 0){
            if(this.object.NastavaRazinaID > 0){
              if(this.object.TipNastaveID > 0){
                return true;
              }
              else{
                this.swalService.err("Odaberite tip nastave!");
                return false;
              }
            }
            else{
              this.swalService.err("Odaberite razinu tečaja!");
              return false;
            }
        }
        else{
          this.swalService.err("Odaberite jezik!");
          return false;
        }
      }
      else{
        this.swalService.err("Unesite opis tečaja!");
        return false;
      }
    }
    else{
      this.swalService.err("Unesite naziv tečaja!");
      return false;
    }
  }

  detalji(id){
    this.router.navigate(['/predavac/tecaj-details/' + id]);
  }

  spremi(){   
    if(this.validateInput()){
      if(this.mode == 'Add'){
        this.object.SudioniciID = this.object.SudioniciID.toString();
        this.tecajeviService.insert(this.object)
          .subscribe(data => {
            if(this.swalService.handleResponse(data)){
              this.tecajeviStore.push(data.Data);
              this.tecajevi = this.tecajeviStore.filter(t => t);

              this.notificationService.notifyTecajInsert(data.Data.ID, this.auth.getID()).subscribe(data => {});

              this.changeMode('', null);
            }
          });
      }
      else if(this.mode == 'Update'){
        var copyObj = this.copy(this.object);
        copyObj.SudioniciID = this.object.destination.map(s => s.ID).toString();
        this.object.SudioniciID = copyObj.SudioniciID;
        delete copyObj["source"];
        delete copyObj["destination"];
        this.tecajeviService.update(copyObj)
          .subscribe(data => {
            if(this.swalService.handleResponse(data)){
              this.tecajeviService.getForPredavac(this.auth.getID())
                .subscribe(data => {
                  this.tecajeviStore = data.Data;
                  this.tecajevi = this.tecajeviStore.filter(t => t);
                });
            }
          });
      }
    }
  }

  brisi(id){
    this.swalService.confirmDelete(
      () => {
        this.notificationService.notifyTecajDelete(id, this.auth.getID()).subscribe(data => {});
        this.tecajeviService.delete(id)
          .subscribe(data => {
            if(this.swalService.handleResponse(data)){
              this.tecajeviStore = this.tecajeviStore.filter(t => t.ID != id);
              this.tecajevi = this.tecajevi.filter(t => t.ID != id);
            }
          });
      },
      () => {}
    );
  }
}
