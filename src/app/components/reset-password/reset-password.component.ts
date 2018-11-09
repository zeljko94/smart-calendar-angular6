import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SwalService } from '../../services/swal.service';
import { ForgotPasswordService } from '../../services/forgot-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styles: []
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  private sub: any;
  token: any;
  data: any;

  password: any;
  rePassword: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private forgotPasswordService: ForgotPasswordService,
    private router: Router,
    private swal: SwalService
  ) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.token = params["token"];

      if(this.token){
        this.forgotPasswordService.getByToken(this.token)
          .subscribe(data => {
            if(data.Data){
              this.data = data.Data;

              if(!this.isExpired()){

              }
              else{
                this.swal.err("Link za obnovu lozinke je istekao! (Vrijeme trajanja linka je 10min.)");
                this.router.navigate(['/forgot-password']);
              }
            }
          });
      }
    });
  }
  
  isExpired(){
    return new Date() > new Date(this.data.ExpirationDate);
  }

  save(){
    if(this.password){
      if(this.rePassword){
        if(this.password === this.rePassword){


          this.forgotPasswordService.updatePassword(this.data.UserID, this.password)
            .subscribe(data => {
              if(this.swal.handleResponse(data)){
                this.router.navigate(['login']);
              }
            })


        }
        else{
          this.swal.err("Lozinke se ne podudaraju!");
        }
      }
      else{
        this.swal.err("Ponovite lozinku!");
      }
    }
    else{
      this.swal.err("Unesite lozinku!");
    }
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
