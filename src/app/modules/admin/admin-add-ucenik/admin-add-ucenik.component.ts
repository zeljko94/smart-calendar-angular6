import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-admin-add-ucenik',
  templateUrl: './admin-add-ucenik.component.html',
  styleUrls: ['./admin-add-ucenik.component.css']
})
export class AdminAddUcenikComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  spremi(){
    $("#btnAddUcenikhidden").click();
  }

  reset(){
    $("#btnResetUcenikhidden").click();
  }
}
