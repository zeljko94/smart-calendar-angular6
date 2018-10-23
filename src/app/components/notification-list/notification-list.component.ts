import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { SwalService } from '../../services/swal.service';
import { Notification } from '../../models/notification';




import * as $ from 'jquery';

@Component({
  selector: '[app-notification-list]',
  templateUrl: './notification-list.component.html',
  styles: []
})
export class NotificationListComponent implements OnInit {

  nots: any[] = [];

  constructor(
    private notificationService: NotificationService,
    private auth: AuthService,
    private swal: SwalService
  ) 
  { 

  }

  ngOnInit() {
    this.notificationService.getForUser(this.auth.getID())
      .subscribe(data => {
        this.nots = data.Data;
      });
  }

  add(n){
    this.nots.unshift(n);
  }

  seeNotifications(){
    for(var i=0; i<this.nots.length; i++){
      this.nots[i].DateSeen = new Date().toJSON();
    }
    this.notificationService.userSeeNotifications(this.auth.getID())
      .subscribe(data => {});
  }

  getUnseenNumber(){
    return this.nots.filter(n => n.DateSeen == null).length;
  }

}
