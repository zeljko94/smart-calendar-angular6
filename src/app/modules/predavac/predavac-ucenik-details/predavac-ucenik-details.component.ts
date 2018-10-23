import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-predavac-ucenik-details',
  templateUrl: './predavac-ucenik-details.component.html',
  styleUrls: ['./predavac-ucenik-details.component.css']
})
export class PredavacUcenikDetailsComponent implements OnInit {

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
