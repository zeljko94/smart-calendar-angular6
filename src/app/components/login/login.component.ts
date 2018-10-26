import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = "zeljko94@gmail.com";
  password: string = "asd";

  isEmailTaken: boolean = false;

  constructor(
    private auth: AuthService,
    private swal: SwalService,
    private router: Router) { 
    if(!this.auth.isTokenExpired()){
      this.auth.refreshToken();
      this.auth.redirect();
    }
  }

  ngOnInit() {
  }

  login(){
    if(this.email){
      if(this.password){
        this.swal.showLoading("Molimo pričekajte . . .", false);
        this.auth.login(this.email, this.password)
        .subscribe(data => {
          this.swal.hideLoading();
          if(data){
            this.auth.setItem(this.auth.JWT, data);
            this.auth.redirect();
          }
          else{
            this.swal.err("Greška prilikom logiranja!");
          }
        });
      }
      else{
        this.swal.err("Unesite lozinku!");
      }
    }
    else{
      this.swal.err("Unesite e-mail!");
    }
    //this.auth.login(this.email, this.password);
  }

  googleLogin(){

  }

  facebookLogin(){

  }

}
