import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ucenik-dashnoard',
  templateUrl: './ucenik-dashnoard.component.html',
  styles: []
})
export class UcenikDashnoardComponent implements OnInit {

  naredniSat: any = {
    Datum: new Date(2018, 11, 25, 15, 0, 0),
    timeleft: 0,
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0
  }

  constructor() { }

  ngOnInit() {
    setInterval(() => {
      this.naredniSat.timeleft = this.getNaredniSatTime();
      if(this.naredniSat.timeleft > 0){
        var time = new Date(null);
        time.setSeconds(this.naredniSat.timeleft);

        this.naredniSat.days = Math.floor(this.naredniSat.timeleft / 60 / 60 / 24);
        this.naredniSat.hours = time.getHours();
        this.naredniSat.mins = time.getMinutes();
        this.naredniSat.secs = time.getSeconds();
      }
    }, 1000);
  }

  getNaredniSatTime(){
    return (this.naredniSat.Datum.getTime() - new Date().getTime()) / 1000;
  }
}
