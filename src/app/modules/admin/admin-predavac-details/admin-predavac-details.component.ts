import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as $ from 'jquery';

@Component({
  selector: 'app-admin-predavac-details',
  templateUrl: './admin-predavac-details.component.html'
})
export class AdminPredavacDetailsComponent implements OnInit, OnDestroy {
  id: any = 0;
  idLoaded: boolean = false;

  private sub: any;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      this.idLoaded = true;
    });
  }

  triggerPredavacUpdate(){
    $("#updatePredavacBtn").click();
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
