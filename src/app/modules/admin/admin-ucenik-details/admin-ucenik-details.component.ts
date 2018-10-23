import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import * as $ from 'jquery';

@Component({
  selector: 'app-admin-ucenik-details',
  templateUrl: './admin-ucenik-details.component.html',
  styleUrls: ['./admin-ucenik-details.component.css']
})
export class AdminUcenikDetailsComponent implements OnInit, OnDestroy {
  id: any = 0;

  isLoaded: boolean = false;

  private sub: any;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      this.isLoaded = true;
    });
  }


  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  spremi(){
    $("#spremiUcenikaHidden").click();
  }

  reset(){
    $("#resetUcenikaHidden").click();
  }
}
