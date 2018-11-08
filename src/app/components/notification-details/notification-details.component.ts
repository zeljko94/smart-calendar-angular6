import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.component.html',
  styles: []
})
export class NotificationDetailsComponent implements OnInit {

  id: any = 0;
  notification: any = {};

  private sub: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];

      if(this.id){
        this.notificationService.getByID(this.id)
          .subscribe(data => {
            this.notification = data.Data;

            this.notificationService.setOpenedTrue(this.id)
              .subscribe(data => {});
          });
      }
    });
  }

}
