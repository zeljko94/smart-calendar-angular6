import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { SwalService } from '../../services/swal.service';
import { PredavaciService } from '../../services/rest/predavaci.service';

import * as moment from 'moment';

import { ProfileImageService } from '../../services/rest/profile-image.service';
import { PersonalDocumentService } from '../../services/rest/personal-document.service';
import { SanitizerService } from '../../services/sanitizer.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-add-predavac',
  templateUrl: './add-predavac.component.html',
  styleUrls: ['./add-predavac.component.css']
})
export class AddPredavacComponent implements OnInit {
  @ViewChild('usrImgInput') usrImgInput;
  @ViewChild('usrDocInput') usrDocInput;
  @ViewChild('skillSelect') skillSelect;
  @ViewChild('pocetak') datumRodj = new Date();

  p: any = {
    Privileges: "predavac", Skills: [],
    Spol: "M",
  };
  
  ProfileImageFile: any;
  PersonalDocs: any[] = [];
  skillstring: any = '';

  // DATA VALIDATAION
  IsUsernameTaken: boolean = false;
  IsEmailTaken:    boolean = false;
  IsRFIDCardTaken:     boolean = false;
  IsRFIDPrivjesakTaken:     boolean = false;
  
  constructor(private http: HttpService,
              private auth: AuthService,
              private notificationService: NotificationService,
              private router: Router,
              private sanitizer: SanitizerService,
              private predavaciService: PredavaciService,
              private profileImageService: ProfileImageService,
              private personalDocumentService: PersonalDocumentService,
              private swal: SwalService) { }

    
    ngOnInit() {
      this.skillSelect.changeEmitter.subscribe(data => {
        this.skillstring = data.toString();
        this.p.Skills = this.skillSelect.getSelectedSkills();
      });

      this.sanitizer.usrProfileImg(this.p);
    }


      toLocalDateTime(d){
        d = moment(d.toString()).toDate();
        var offset = new Date().getTimezoneOffset();
        var local = new Date(d.setMinutes(d.getMinutes()-offset));
        return local;
      }



      spremi(){
        if(this.validateInput()){
          
        var copy = JSON.parse(JSON.stringify(this.p));
        delete copy["ProfileImage"];
        delete copy["PersonalDocuments"];
        copy.DatumRodjenja = this.toLocalDateTime(copy.DatumRodjenja).toJSON();
        copy.Skills = copy.Skills.map(s => s.ID).toString();
        copy.ProfileImageDataUrl = "";

        this.swal.showLoading("Spremanje podataka o predavaču...", false);
        this.predavaciService.insert(copy)
          .subscribe(
            data => {
              this.swal.hideLoading();
              if(data.StatusCode > 0){

                var UserID = data.Data.ID;
                
                this.notificationService.notifyPredavacInsert(UserID, this.auth.getID())
                  .subscribe(data => {});

                if(this.ProfileImageFile){
                  this.swal.showLoading("Spremanje profilne slike...", false);
                  this.profileImageService.insert(UserID, this.ProfileImageFile)
                    .subscribe(data => {
                      this.swal.hideLoading();
                      if(data.StatusCode > 0){
                        if(this.hasFiles(this.PersonalDocs.map(pd => pd.File))){
                          this.personalDocumentService.insert(UserID, this.PersonalDocs.map(pd => pd.File))
                            .subscribe(data => {
                              this.swal.hideLoading();
                              if(data.StatusCode > 0){

                                  
                                this.swal.ok("Predavač uspješno spremljen!");
                                setTimeout(() => {
                                  this.router.navigate(['/admin/predavaci']);
                                }, 1500);
                              }
                            },
                          err => {
                            this.swal.hideLoading();
                          });
                        }
                      }
                    },
                  err => {
                    this.swal.hideLoading();
                  });
                }
              }
            }, 
            err => {
              this.swal.hideLoading();
            }
          );
        }
      }



  numbersOnlyInput(e) {
    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(e.charCode);
    if (e.keyCode != 8 && !pattern.test(inputChar)) {
      e.preventDefault();
    }
  }

  numbersOnlyKeyUp(e){
    if(e.target.value.length > 9){
      e.target.select();

      if(e.target.name == "RFIDCard"){
        this.http.getJWT("User/IsRFIDCardTaken", {RFID: this.p.RFIDCard})
          .subscribe(data => {
            this.IsRFIDCardTaken = data;
          });
      }
      else if(e.target.name == "RFIDPrivjesak"){
        this.http.getJWT("User/IsRFIDPrivjesakTaken", {RFID: this.p.RFIDPrivjesak})
          .subscribe(data => {
            this.IsRFIDPrivjesakTaken = data;
          });
      }
    }
    else{
      if(e.target.name == "RFIDCard")
        this.IsRFIDCardTaken = false;
      else if (e.target.name == "RFIDPrivjesak")
        this.IsRFIDPrivjesakTaken = false;
    }
  }
  
  numbersOnlyInputFocus(e){
    if(e.target.value.length > 9){
      e.target.select();
    }
  }

  subArray(arr, chunkSize){
    var i,j,temparray,chunk = chunkSize;
    var rez = [];
    for (i=0,j=arr.length; i<j; i+=chunk) {
        temparray = arr.slice(i,i+chunk);
        rez.push(temparray);
    }
    return rez;
  }

  reset(){
    this.p = {Spol: "M", Privileges: "predavac", Skills: []};
    this.sanitizer.usrProfileImg(this.p);
    this.PersonalDocs = [];
  }

  validateInput(){
    if(this.p.RFIDCard){
      if(this.p.RFIDPrivjesak){
        if(this.p.Name){
          if(this.p.LastName){
            if(this.p.Username){
              if(!this.IsUsernameTaken){
                if(this.p.Email){
                  if(this.isValidEmail()){
                    if(!this.IsEmailTaken){
                      if(this.p.Password){
                        if(this.p.RePassword){
                          if(this.p.Adresa){
                            if(this.p.DatumRodjenja){
                              if(this.p.MjestoRodjenja){
    
                                // SUCCESS!
                                return true;
                              }
                              else{
                                this.swal.err("Unesite mjesto rođenja!");
                              }
                            }
                            else{
                              this.swal.err("Unesite datum rođenja!");
                            }
                          }
                          else{
                            this.swal.err("Unesite adresu!");
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
                    else{
                      this.swal.err("E-mail je zauzet!");
                    }
                  }
                  else{
                    this.swal.err("Unesena e-mail adresa nije validna!");
                  }
                }
                else{
                  this.swal.err("Unesite e-mail!");
                }
              }
              else{
                this.swal.err("Korisničko ime je zauzeto!");
              }
            }
            else{
              this.swal.err("Unesite korisničko ime!");
            }
          }
          else{
            this.swal.err("Unesite prezime!");
          }
        }
        else{
          this.swal.err("Unesite ime!");
        }
      }
      else{
        this.swal.err("Unesite RFID  privjeska!");
      }
    }
    else{
      this.swal.err("Unesite RFID kartice!");
    }
    return false;
  }

  isValidEmail(){

    if(this.p.Email){
      var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
      return this.p.Email.match(email_regex) != null;
    }
    
  }

  emailChange(){
    this.http.getJWT("User/IsEmailTaken", {email: this.p.Email}).subscribe(data => {
      this.IsEmailTaken = data.Data;
    });
  }

  usernameChange(){
    this.http.getJWT("User/IsUsernameTaken", {username: this.p.Username})
      .subscribe(data => {
        this.IsUsernameTaken = data.Data;
      });
  }

  hasFiles(files){
    for(var i=0; i<files.length; i++){
      if(files[i] != null)
        return true;
    }
    return false;
  }

  
  userImgChange(){
    var file = this.usrImgInput.nativeElement.files[0];
    var fileName = file.name;
    
    if(file){
      this.ProfileImageFile = file;
      var reader = new FileReader();

      reader.onload = (e: any) => {
        this.p.ProfileImage.DataUrl = e.target.result;
      }
      reader.readAsDataURL(file);
    }
  }

  personalDocAdd(){
    var files = this.usrDocInput.nativeElement.files;
    for(var i=0; i<files.length; i++){
      this.PersonalDocs.push({FileName: files[i].name, File: files[i]});
    }
  }

  removeDoc(doc){
    this.PersonalDocs = this.PersonalDocs.filter(pd => pd != doc);
  }

}
