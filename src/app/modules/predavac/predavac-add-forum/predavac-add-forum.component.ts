import { Component, OnInit } from '@angular/core';
import { SwalService } from '../../../services/swal.service';
import { Router } from '@angular/router';
import { UceniciService } from '../../../services/rest/ucenici.service';
import { PredavaciService } from '../../../services/rest/predavaci.service';
import { AuthService } from '../../../services/auth.service';
import { ForumService } from '../../../services/forum.service';
import { DualListComponent } from 'angular-dual-listbox';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-predavac-add-forum',
  templateUrl: './predavac-add-forum.component.html',
  styles: []
})
export class PredavacAddForumComponent implements OnInit {

  forum: any = {
    source: [],
    destination: [],
    SudioniciID: []
  };

  constructor(private swal: SwalService,
              private notificationService: NotificationService,
              private router: Router,
              private uceniciService: UceniciService,
              private predavaciService: PredavaciService,
              private auth: AuthService,
              private forumService: ForumService) { }

  ngOnInit() {
    this.uceniciService.getAll()
      .subscribe(data => {
        this.forum.source = data.Data;

        this.predavaciService.getAll()
          .subscribe(data => {
            data.Data = data.Data.filter(d => d.ID != this.auth.getID());
            for(var i=0; i<data.Data.length; i++){
              this.forum.source.push(data.Data[i]);
            }
          });
      });
  }

  validate(){
    if(this.forum.Naslov){

      return true;
    }
    else{
      this.swal.err("Unesite naslov foruma!");
      return false;
    }
  }

  
  format = { add: 'Dodaj', remove: 'Ukloni', all: 'Označi sve', none: 'Odznači sve',
             direction: DualListComponent.LTR, draggable: true, locale: 'en' };


  dualListDisplay(o){
    return o.Name + " " + o.LastName  + " - " + o.ID;
  }
              
  destinationChange(ev){
    this.forum.SudioniciID = ev.map(e => e.ID);
  }

  spremi(){
    if(this.validate()){
      this.forum.Datum = new Date().toJSON();
      this.forum.KreatorID = this.auth.getID();
      this.forum.SudioniciID.push(this.auth.getID());
      this.forum.SudioniciID = this.forum.SudioniciID.toString();

      var obj = JSON.parse(JSON.stringify(this.forum));
      delete obj["source"];
      delete obj["destination"];
      this.forumService.insert(this.forum)
        .subscribe(data => {
          if(this.swal.handleResponse(data)){
            this.notificationService.notifyForumInsert(data.Data.ID, this.auth.getID())
              .subscribe(data => {});
            this.router.navigate(['/predavac/forum']);
          }
        });
    }
  }
}
