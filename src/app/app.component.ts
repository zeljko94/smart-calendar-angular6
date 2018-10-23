import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  
  constructor(private auth: AuthService) { }

  isLogged(){
    return this.auth.isLogged();
  }
}