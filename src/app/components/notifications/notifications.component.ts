import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { SwalService } from '../../services/swal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  search: any = '';

  notifications: any[] = [];

  constructor(
    private auth: AuthService,
    private router: Router,
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

  notificationDetails(id){
    console.log(this.notifications.find(n => n.ID == id));
    this.router.navigate(['/admin/notification-details/' + id]);
  }

  userDetails(id){
    this.router.navigate(['/admin/user-profile-details/' + id]);
  }

}
