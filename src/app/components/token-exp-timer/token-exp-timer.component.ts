import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-token-exp-timer',
  templateUrl: './token-exp-timer.component.html',
  styles: []
})
export class TokenExpTimerComponent implements OnInit {

  constructor(private auth: AuthService) { }

  time: any = 0;

  ngOnInit() {
    setInterval(() => {
      this.time = this.getSeconds(this.auth.getExpirationDate());
    }, 100);
  }

  getCss(){
    if(this.time > 10 && this.time <= 15)
      return 'text-success';
    else if(this.time > 5 && this.time < 10)
      return 'text-warning';
    else if(this.time > 0 && this.time < 5)
      return 'text-danger';
  }

  getSeconds(tokenDate){
    if(!tokenDate)
      return 0;
    return Math.abs((new Date().getTime() - tokenDate.getTime()) / 1000);
  }
}
