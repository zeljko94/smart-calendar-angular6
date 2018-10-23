import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { PredavaciService } from '../../services/rest/predavaci.service';
import { SanitizerService } from '../../services/sanitizer.service';
import { HttpService } from '../../services/http.service';
import { SwalService } from '../../services/swal.service';

import * as moment from 'moment';
import * as $ from 'jquery';
import { ProfileImageService } from '../../services/rest/profile-image.service';
import { PersonalDocumentService } from '../../services/rest/personal-document.service';

@Component({
  selector: 'app-predavac-details',
  templateUrl: './predavac-details.component.html'
})
export class PredavacDetailsComponent implements OnInit {
  @ViewChild('skillSelect') skillSelect;
  @ViewChild('usrImgInput') usrImgInput;
  @ViewChild('usrDocInput') usrDocInput;

  @Input() id = 0;

  doneLoading: boolean = false;

  p?: any = {};
  orig?: any = {};

  skillstring: string = '';

  IsUsernameTaken: boolean = false;
  IsEmailTaken:    boolean = false;
  IsRFIDCardTaken:     boolean = false;
  IsRFIDPrivjesakTaken:     boolean = false;


  ProfileImageFile: any;
  PersonalDocs: any[] = [];

  constructor(private predavaciService: PredavaciService,
              private profileImageService: ProfileImageService,
              private personalDocumentService: PersonalDocumentService,
              private swal: SwalService,
              private http: HttpService,
              private sanitizer: SanitizerService) { }



  spremi(){
    var copy = JSON.parse(JSON.stringify(this.p));
    
    delete copy["ProfileImage"];
    delete copy["PersonalDocuments"];
    copy.DatumRodjenja = this.toLocalDateTime(copy.DatumRodjenja).toJSON();
    copy.Skills = copy.Skills.map(s => s.ID).toString();
    copy.ProfileImageDataUrl = "";
    
    this.swal.showLoading("Spremanje podataka o predavaču...", false);
    this.predavaciService.update(copy)
      .subscribe(
        data => {
          if(data.StatusCode > 0){
              this.swal.hideLoading();
              //this.swal.ok(data.Message);

              if(this.ProfileImageFile){
                this.swal.showLoading("Spremanje profilne slike...", false);
                this.profileImageService.insert(this.p.ID, this.ProfileImageFile)
                  .subscribe(
                  data => {
                    if(data.StatusCode > 0){
                      this.swal.hideLoading();
                      //this.swal.ok(data.Message);


                      if(this.hasFiles(this.PersonalDocs.map(pd => pd.File))){
                        this.personalDocumentService.insert(this.p.ID, this.PersonalDocs.map(pd => pd.File))
                          .subscribe(
                          data => {
                            if(data.StatusCode > 0){
                              this.swal.hideLoading();
                              this.swal.ok("Izmjene uspješno spremljene!");
                            }
                          },
                          err => {
                            this.swal.hideLoading();
                            this.swal.err("Došlo je do pogreške prilikom spremanja osobnih dokumenata!");
                          });
                      }

                    }
                  },
                  err => {
                    this.swal.hideLoading();
                    this.swal.err("Došlo je do pogreške prilikom spremanja profilne slike!");
                  });
              }


          }
        },
        err => {
          this.swal.hideLoading();
          this.swal.err("Došlo je do pogreške prilikom spremanja podataka o predavaču!");
        });
  }

  
  hasFiles(files){
    for(var i=0; i<files.length; i++){
      if(files[i] != null)
        return true;
    }
    return false;
  }



  toLocalDateTime(d){
    d = moment(d.toString()).toDate();
    var offset = new Date().getTimezoneOffset();
    var local = new Date(d.setMinutes(d.getMinutes()-offset));
    return local;
  }

  ngOnInit() {
    this.skillSelect.changeEmitter.subscribe(data => {
      this.skillstring = data.toString();
      this.p.Skills = this.skillSelect.getSelectedSkills();
    });

    
    this.swal.showLoading("Loading...", false);
    this.predavaciService.getByID(this.id)
      .subscribe(data => {
        if(data.StatusCode > 0){
          this.p = data.Data;
          this.sanitizer.usrProfileImg(this.p);
          this.p["RePassword"] = this.p.Password;
          this.skillstring = this.p.Skills.map(s => s.ID).toString();
          this.skillSelect.setSelected(this.skillstring);

          this.doneLoading = true;
          this.swal.hideLoading();
          this.orig = JSON.parse(JSON.stringify(this.p));

          this.PersonalDocs = this.p.PersonalDocuments;
        }
      });
  }


  subArray(arr, chunkSize){
    if(!arr)
      return [];
    var i,j,temparray,chunk = chunkSize;
    var rez = [];
    for (i=0,j=arr.length; i<j; i+=chunk) {
        temparray = arr.slice(i,i+chunk);
        rez.push(temparray);
    }
    return rez;
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
    this.PersonalDocs = this.PersonalDocs.filter(d => d != doc);
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
