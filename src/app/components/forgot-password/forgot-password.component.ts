import { Component, OnInit } from '@angular/core';
import { ForgotPasswordService } from '../../services/forgot-password.service';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styles: []
})
export class ForgotPasswordComponent implements OnInit {

  email: any = '';

  constructor(
    private forgotPasswordService: ForgotPasswordService,
    private swal: SwalService
  ) { }

  ngOnInit() {
  }


  validateEmail(){
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(this.email);
  }

  send(){
    if(this.email){
      if(this.validateEmail()){ 

        this.forgotPasswordService.sendPasswordResetLink(this.email)
          .subscribe(data => {
            if(this.swal.handleResponse){
              console.log(data.Data.Token);
            }
          });

      }
      else{
        this.swal.err("Unesena e-mail adresa nije validna!");
      }
    }
    else{
      this.swal.err("Unesite e-mail!");
    }
  }

}
