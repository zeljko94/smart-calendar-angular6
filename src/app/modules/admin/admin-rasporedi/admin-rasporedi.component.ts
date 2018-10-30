import { Component, OnInit, ViewChild } from '@angular/core';
import { TerminiService } from '../../../services/rest/termini.service';
import { SwalService } from '../../../services/swal.service';

import * as $ from 'jquery';
import { PredavaciService } from '../../../services/rest/predavaci.service';
import { RazineNastaveService } from '../../../services/rest/razine-nastave.service';
import { TipoviNastaveService } from '../../../services/rest/tipovi-nastave.service';
import { SkillService } from '../../../services/rest/skill.service';
import { UcioniceService } from '../../../services/rest/ucionice.service';
import { TecajeviService } from '../../../services/rest/tecajevi.service';
import { AuthService } from '../../../services/auth.service';
import { HttpService } from '../../../services/http.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-admin-rasporedi',
  templateUrl: './admin-rasporedi.component.html',
  styleUrls: ['./admin-rasporedi.component.css']
})
export class AdminRasporediComponent implements OnInit {
  @ViewChild('unosTerminaComponent') unosTerminaComponent;
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
    private notificationService: NotificationService,
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
    this.unosTerminaComponent.addEmitter.subscribe(data => {
      this.events.push(data);
      $('#myCal').fullCalendar('removeEvents');
      $('#myCal').fullCalendar('addEventSource', this.events);
      $("#myCal").fullCalendar('refetchEvents');
    });

    let self = this;
    this.swal.showLoading("Učitavanje podataka...", false);
    this.terminiService.getAll()
      .subscribe(data => {
        this.swal.hideLoading();
        this.events = data.Data;
        
        $("#myCal").fullCalendar({
          locale: 'hr',
          editable:  true,
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
            self.swal.confirmUpdate(
              () => {
                console.log(event.start);
                console.log(delta.days);
              },
              () => {
                revertFunc();
              }
            );
          },
          eventDragStop: function(event, jsEvent){
            var trashEl = jQuery('#brisiEventContainer');
            var ofs = trashEl.offset();
            if(!ofs)
              return;
        
            var x1 = ofs.left;
            var x2 = ofs.left + trashEl.outerWidth(true);
            var y1 = ofs.top;
            var y2 = ofs.top + trashEl.outerHeight(true);
        
            if (jsEvent.pageX >= x1 && jsEvent.pageX<= x2 &&
                jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                  self.swal.confirmDelete(
                    () => {
                      self.notificationService.NotifyTerminDelete(event.ID, self.auth.getID())
                        .subscribe(data => {});

                      self.terminiService.delete(event.ID)
                        .subscribe(data => {
                          if(self.swal.handleResponse){
                            self.events = self.events.filter(e => e.ID != event.ID);
                            $('#myCal').fullCalendar('removeEvents', event._id);
                          }
                        });
                    },
                    () => {}
                  );
            }
          }
        });

        $("#myCal").fullCalendar("addEventSource", this.events);
      });

      
      this.predavaciService.getAll()
        .subscribe(data => {
          this.predavaci = data.Data;
      });

      this.razineNastaveService.getAll()
      .subscribe(data => {
        this.razine = data.Data;
      });
      
      this.tipoviNastaveService.getAll()
        .subscribe(data => {
          this.tipoviNastave = data.Data;
      });


      this.skillService.getAll()
        .subscribe(data => {
          this.skills = data.Data;
        });

      this.ucioniceService.getAll()
        .subscribe(data => {
          this.ucionice = data.Data;
          this.ucionica = data.Data.length > 0 ? data.Data[0] : null;
        });

      this.tecajeviService.getAll()
        .subscribe(data => {
          if(this.auth.isPredavac())
            data.Data = data.Data.filter(d => d.Predavac.ID == this.auth.getID());

            this.predmeti = data.Data;
            this.predmet =  data.Data.length > 0 ? data.Data[0] : null;
        });
  }

  pad(n){return n<10 ? '0'+n : n}

  formatDateTime(date){
    return this.pad(date.getDate()) + "-" + this.pad(date.getMonth()+1) + "-" + date.getFullYear() + " " + this.pad(date.getHours()) + ":" + this.pad(date.getMinutes()) + ":" + this.pad(date.getSeconds());
  }


  updateEvent(e){
    this.terminiService.update(e)
      .subscribe(data => {
        if(this.swal.handleResponse(data)){

        }
      });
  }

}
