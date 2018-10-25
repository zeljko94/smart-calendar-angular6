import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styles: []
})
export class NotificationsComponent implements OnInit {

  search: any = '';

  notifications: any[] = [];

  constructor(
    private auth: AuthService,
    private notificationService: NotificationService,
    private swal: SwalService
  ) { }

  ngOnInit() {
    this.notificationService.getAllForUser(this.auth.getID())
      .subscribe(data => {
        if(this.swal.handleResponse(data)){
          this.notifications = data.Data;
        }
    })
  }

}
