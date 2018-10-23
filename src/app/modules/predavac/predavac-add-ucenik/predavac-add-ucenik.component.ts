import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-predavac-add-ucenik',
  templateUrl: './predavac-add-ucenik.component.html',
  styleUrls: ['./predavac-add-ucenik.component.css']
})
export class PredavacAddUcenikComponent implements OnInit {

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
