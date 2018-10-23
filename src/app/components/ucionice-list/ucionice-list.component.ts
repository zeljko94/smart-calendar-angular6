import { Component, OnInit, Input } from '@angular/core';
import { UcioniceService } from '../../services/rest/ucionice.service';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-ucionice-list',
  templateUrl: './ucionice-list.component.html',
  styles: []
})
export class UcioniceListComponent implements OnInit {
  @Input() loggedUserPrivileges;
  
  ucionice: any[] = [];

  mode: any = '';
  object: any = {};

  constructor(private ucioniceService: UcioniceService,
              private swal: SwalService) { }

  ngOnInit() {
    this.ucioniceService.getAll()
      .subscribe(data => {
        if(data.StatusCode > 0){
          this.ucionice = data.Data;
        }
      });
  }

 
  validateInput(){
    if(this.object.Naziv){
      if(this.object.Opis){
        if(this.object.Color){
          return true;
        }
      }
      return false;
    }
    return false;
  }

  

  spremi(){
    if(this.validateInput()){
      if(this.mode == 'Add'){
        /*
        this.ucioniceService.insert(this.object)
          .subscribe(data => {
            if(this.swal.handleResponse(data)){
              this.ucionice.push(data.Data);
            }
          });
          */
         this.ucioniceService.testInsert(this.object, this.ucionice).subscribe(res => {
           
         });
          
      }
      else if(this.mode == 'Update'){
        this.ucioniceService.update(this.object)
          .subscribe(data => {
            if(this.swal.handleResponse(data)){
              var ucionica = this.ucionice.find(u => u.ID == this.object.ID);
              if(ucionica){
                ucionica.Naziv = this.object.Naziv;
                ucionica.Opis = this.object.Opis;
                ucionica.Color = this.object.Color;
              }
            }
          });
      }
    }
  } 

  brisi(id){
    if(this.loggedUserPrivileges == 'admin'){
      this.swal.confirmDelete(
        () => {
          this.ucioniceService.delete(id)
            .subscribe(data => {
              if(this.swal.handleResponse(data)){
                this.ucionice = this.ucionice.filter(u => u.ID != id);
              }
            });
        },
        () => {}
      );
    }
  }

  
  copy(o){
    return JSON.parse(JSON.stringify(o));
  }

  changeMode(md, rn){
    this.object = rn ? this.copy(rn) : {};
    this.mode = md;
  }
}
