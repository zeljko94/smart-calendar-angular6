import { Component, OnInit, Input } from '@angular/core';
import { RazineNastaveService } from '../../services/rest/razine-nastave.service';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-razine-nastave-list',
  templateUrl: './razine-nastave-list.component.html',
  styles: []
})
export class RazineNastaveListComponent implements OnInit {
  @Input() loggedUserPrivileges;
  
  razineNastave: any[] = [];

  mode: any = '';
  object: any = {};

  constructor(private razineNastaveService: RazineNastaveService,
              private swal: SwalService) { }

  ngOnInit() {
    this.razineNastaveService.getAll()
      .subscribe(data => {
        if(data.StatusCode > 0){
          this.razineNastave = data.Data;
        }
      });
  }


  

  copy(o){
    return JSON.parse(JSON.stringify(o));
  }

  changeMode(md, rn){
    this.object = rn ? this.copy(rn) : {};
    this.mode = md;
  }


  validateInput(){
    if(this.object.Naziv){
      if(this.object.Opis){
          return true;
      }
      return false;
    }
    return false;
  }

  spremi(){
    if(this.validateInput()){
      if(this.mode == 'Add'){
        this.razineNastaveService.insert(this.object)
          .subscribe(data => {
            if(this.swal.handleResponse(data)){
              this.razineNastave.push(data.Data);
            }
          });
      }
      else if(this.mode == 'Update'){
        this.razineNastaveService.update(this.object)
          .subscribe(data => {
            if(this.swal.handleResponse(data)){
              var rn = this.razineNastave.find(r => r.ID == this.object.ID);
              if(rn){
                rn.Opis = this.object.Opis;
                rn.Naziv = this.object.Naziv;
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
        this.razineNastaveService.delete(id)
          .subscribe(data => {
            if(this.swal.handleResponse(data)){
              this.razineNastave = this.razineNastave.filter(rn => rn.ID != id);
            }
          });
      },
      () => {}
      );
    }
  }
}
