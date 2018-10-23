import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { SwalService } from '../../services/swal.service';
import { HttpService } from '../../services/http.service';
import { SanitizerService } from '../../services/sanitizer.service';

import * as moment from 'moment';
import { UceniciService } from '../../services/rest/ucenici.service';
import { ProfileImageService } from '../../services/rest/profile-image.service';
import { PersonalDocumentService } from '../../services/rest/personal-document.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-ucenik',
  templateUrl: './add-ucenik.component.html',
  styleUrls: ['./add-ucenik.component.css']
})
export class AddUcenikComponent implements OnInit {
  @Input() role = '';
  @ViewChild('usrImgInput') usrImgInput;
  @ViewChild('usrDocInput') usrDocInput;

  p: any = {
    Privileges: "ucenik", Skills: [],
    Spol: "M",
  };
  ProfileImage: any;
  ProfileImageFile: any;
  PersonalDocs: any[] = [];
  

  // DATA VALIDATAION
  IsUsernameTaken: boolean = false;
  IsEmailTaken:    boolean = false;
  IsRFIDCardTaken:     boolean = false;
  IsRFIDPrivjesakTaken:     boolean = false;

  constructor(private swalService: SwalService,
              private auth: AuthService,
              private notificationService: NotificationService,
              private router:      Router,
              private uceniciService: UceniciService,
              private profileImageService: ProfileImageService,
              private personalDocumentService: PersonalDocumentService,
              private sanitizer:   SanitizerService,
              private http:        HttpService) { }

  ngOnInit() {
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


      this.swalService.showLoading("Spremanje podataka o učeniku...", false);
      this.uceniciService.insert(copy)
        .subscribe(
          data => {
            this.swalService.hideLoading();

            if(data.StatusCode > 0){
              var UserID = data.Data.ID;

              this.notificationService.notifyUcenikInsert(UserID, this.auth.getID())
                .subscribe(data => { });

              if(this.ProfileImageFile){

                this.swalService.showLoading("Spremanje profilne slike...", false);
                this.profileImageService.insert(UserID, this.ProfileImageFile)
                  .subscribe(
                    data => {
                      this.swalService.hideLoading();

                      if(data.StatusCode > 0){
                        if(this.hasFiles(this.PersonalDocs.map(pd => pd.File))){
                          this.swalService.showLoading("Spremanje osobnih dokumenata...", false);

                          this.personalDocumentService.insert(UserID, this.PersonalDocs.map(pd => pd.File))
                            .subscribe(
                              data => {
                                this.swalService.hideLoading();
                                if(data.StatusCode > 0){
                                  this.swalService.ok("Učenik uspješno spremljen!");
                                  setTimeout(() => {
                                    this.router.navigate(['/' + this.role + '/ucenici']);
                                  }, 1500);
                                }
                              }, 
                              err => {
                                this.swalService.hideLoading();
                              });
                        }
                      }
                    }, 
                    err => {
                      this.swalService.hideLoading();
                    }
                  );
              }
            }
          }, 
          err => {
            this.swalService.hideLoading();
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
    this.p = {Spol: "M", Privileges: "ucenik", Skills: []};
    this.ProfileImage = null;
    this.PersonalDocs = [];
    this.sanitizer.usrProfileImg(this.p);
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
                                this.swalService.err("Unesite mjesto rođenja!");
                              }
                            }
                            else{
                              this.swalService.err("Unesite datum rođenja!");
                            }
                          }
                          else{
                            this.swalService.err("Unesite adresu!");
                          }
                        }
                        else{
                          this.swalService.err("Ponovite lozinku!");
                        }
                      }
                      else{
                        this.swalService.err("Unesite lozinku!");
                      }
                    }
                    else{
                      this.swalService.err("E-mail je zauzet!");
                    }
                  }
                  else{
                    this.swalService.err("Unesena e-mail adresa nije validna!");
                  }
                }
                else{
                  this.swalService.err("Unesite e-mail!");
                }
              }
              else{
                this.swalService.err("Korisničko ime je zauzeto!");
              }
            }
            else{
              this.swalService.err("Unesite korisničko ime!");
            }
          }
          else{
            this.swalService.err("Unesite prezime!");
          }
        }
        else{
          this.swalService.err("Unesite ime!");
        }
      }
      else{
        this.swalService.err("Unesite RFID  privjeska!");
      }
    }
    else{
      this.swalService.err("Unesite RFID kartice!");
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
