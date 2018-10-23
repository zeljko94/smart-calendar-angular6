import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { UceniciService } from '../../services/rest/ucenici.service';
import { SwalService } from '../../services/swal.service';
import { SanitizerService } from '../../services/sanitizer.service';
import { HttpService } from '../../services/http.service';

import * as moment from 'moment';
import { ProfileImageService } from '../../services/rest/profile-image.service';
import { PersonalDocumentService } from '../../services/rest/personal-document.service';

@Component({
  selector: 'app-ucenik-details',
  templateUrl: './ucenik-details.component.html',
  styleUrls: ['./ucenik-details.component.css']
})
export class UcenikDetailsComponent implements OnInit {
  @ViewChild('usrImgInput') usrImgInput;
  @ViewChild('usrDocInput') usrDocInput;

  @Input() id: any = 0;

  doneLoading: boolean = false;

  p?: any = {};
  orig?: any = {};

  ProfileImageFile: any;
  PersonalDocs: any[] = [];
  
  IsUsernameTaken: boolean = false;
  IsEmailTaken:    boolean = false;
  IsRFIDCardTaken:     boolean = false;
  IsRFIDPrivjesakTaken:     boolean = false;

  constructor(private uceniciService: UceniciService,
              private profileImageService: ProfileImageService,
              private personalDocumentService: PersonalDocumentService,
              private http: HttpService,
              private sanitizer: SanitizerService,
              private swal: SwalService) { }

  ngOnInit() {
    this.swal.showLoading("Učitavanje...", false);
    this.uceniciService.getById(this.id)
      .subscribe(
        data => {
          if(data.StatusCode > 0){
            this.p = data.Data;

            this.sanitizer.usrProfileImg(this.p);
            this.p["RePassword"] = this.p.Password;
            this.PersonalDocs = this.p.PersonalDocuments;
            this.orig = JSON.parse(JSON.stringify(this.p));
            this.swal.hideLoading();
            this.doneLoading = true;
          }
        }, 
        err => { this.swal.hideLoading(); });
  }

  toLocalDateTime(d){
    d = moment(d.toString()).toDate();
    var offset = new Date().getTimezoneOffset();
    var local = new Date(d.setMinutes(d.getMinutes()-offset));
    return local;
  }

  spremi(){
    // VALIDATE INPUT
    var copy = JSON.parse(JSON.stringify(this.p));

    delete copy["ProfileImage"];
    delete copy["PersonalDocuments"];
    copy.DatumRodjenja = this.toLocalDateTime(copy.DatumRodjenja).toJSON();
    copy.Skills = copy.Skills.map(s => s.ID).toString();
    copy.ProfileImageDataUrl = "";
    
    this.swal.showLoading("Spremanje podataka o učeniku...", false);
    this.uceniciService.update(copy)
      .subscribe(
        data => {
          this.swal.hideLoading();
          if(data.StatusCode > 0){

            var UserID = data.Data.ID;

            if(this.ProfileImageFile){
              this.swal.showLoading("Spremanje profilne slike...", false);
              this.profileImageService.insert(UserID, this.ProfileImageFile)
                .subscribe(
                  data => {
                    this.swal.hideLoading();
                    if(data.StatusCode > 0){
                      if(this.hasFiles(this.PersonalDocs.map(pd => pd.File))){
                        this.personalDocumentService.insert(UserID, this.PersonalDocs.map(pd => pd.File))
                          .subscribe(
                            data => {
                              this.swal.hideLoading();
                              if(data.StatusCode > 0){
                                this.swal.ok("Izmjene uspješno spremljene!");
                              }
                            },
                            err => { this.swal.hideLoading(); this.swal.err("Greška prilikom izmjene osobnih dokumenata!"); }
                          );
                      }
                    }
                  },
                  err => { this.swal.hideLoading(); this.swal.err("Greška prilikom izmjene profilne slike!"); }
                )
            }
          }
        }, 
        err => { this.swal.hideLoading(); this.swal.err("Greška prilikom izmjene osobnih podataka!");}
      );
  }

  reset(){
    this.p = this.orig;
    this.PersonalDocs = this.orig.PersonalDocuments;
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
        this.http.getJWT("User/IsRFIDCardTakenUpdate", {UserID: this.id, RFID: this.p.RFIDCard})
          .subscribe(data => {
            this.IsRFIDCardTaken = data;
          });
      }
      else if(e.target.name == "RFIDPrivjesak"){
        this.http.getJWT("User/IsRFIDPrivjesakTakenUpdate", {UserID: this.id, RFID: this.p.RFIDPrivjesak})
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

  hasFiles(files){
    for(var i=0; i<files.length; i++){
      if(files[i] != null)
        return true;
    }
    return false;
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

  isValidEmail(){
    if(this.p.Email){
      var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
      return this.p.Email.match(email_regex) != null;
    }
    
  }

  emailInputChange(){
    this.http.getJWT("User/IsEmailTakenUpdate", {UserID: this.id, email: this.p.Email}).subscribe(data => {
      this.IsEmailTaken = data.Data;
    });
  }

  usernameInputChange(){
    this.http.getJWT("User/IsUsernameTakenUpdate", {UserID: this.id, username: this.p.Username})
      .subscribe(data => {
        this.IsUsernameTaken = data.Data;
      });
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

}
