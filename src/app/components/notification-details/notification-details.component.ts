import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  ) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];

      if(this.id){
        alert(this.id);
      }
    });
  }

}
