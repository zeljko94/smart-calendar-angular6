import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { HttpService } from '../../../services/http.service';
import { TerminiService } from '../../../services/rest/termini.service';
import { SwalService } from '../../../services/swal.service';
import { PredavaciService } from '../../../services/rest/predavaci.service';
import { RazineNastaveService } from '../../../services/rest/razine-nastave.service';
import { TipoviNastaveService } from '../../../services/rest/tipovi-nastave.service';
import { SkillService } from '../../../services/rest/skill.service';
import { UcioniceService } from '../../../services/rest/ucionice.service';
import { TecajeviService } from '../../../services/rest/tecajevi.service';


import * as $ from 'jquery';

@Component({
  selector: 'app-ucenik-rasporedi',
  templateUrl: './ucenik-rasporedi.component.html',
  styles: []
})
export class UcenikRasporediComponent implements OnInit {
  eventsStore: any[] = [];
  events: any[] = [];

  tipoviNastave: any[] = [];
  razine: any[] = [];
  predavaci: any[] = [];
  ucionice: any[] = [];
  predmeti: any[] = [];
  skills: any[] = [];

  ucionica: any;
  predmet: any;

  value: Date;

  pocDat: Date = new Date();
  zavDat: Date = new Date();
  errors: string;

  p: any;
  z: any;

  constructor(
    private auth: AuthService,
    private http: HttpService,
    private terminiService: TerminiService,
    private swal: SwalService,
    private predavaciService: PredavaciService,
    private razineNastaveService: RazineNastaveService,
    private tipoviNastaveService: TipoviNastaveService,
    private skillService: SkillService,
    private ucioniceService: UcioniceService,
    private tecajeviService: TecajeviService
  ) { }

  renderEvents(){
    for(var i=0; i<this.events.length; i++){
      $("#myCal").fullCalendar("renderEvent", this.events[i], true);
    }
  }


  ngOnInit() {
    let self = this;
    this.swal.showLoading("Učitavanje podataka...", false);
    this.terminiService.getForUcenik(this.auth.getID())
      .subscribe(data => {
        this.swal.hideLoading();
        this.eventsStore = data.Data;
        this.events = data.Data;
        
        $("#myCal").fullCalendar({
          editable:  false,
          eventLimit: false,
          displayEventTime: false,
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaDay'//'month,agendaWeek,agendaDay,listMonth'
          },
          eventRender: function(event, element, view){
            element.find('.fc-title').html(event.title);
          },
          eventAfterRender: function(event, element, view){
            element.find('.fc-title').html(event.title);
          },
          eventDrop: function(event, delta, revertFunc) {
          },
          eventDragStop: function(event, jsEvent){
          }
        });

        $("#myCal").fullCalendar("addEventSource", this.events);
      });

  }

  updateEvent(e){
    this.terminiService.update(e)
      .subscribe(data => {
        if(this.swal.handleResponse(data)){

        }
      });
  }
}
