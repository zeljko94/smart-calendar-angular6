import { Component, OnInit, Input } from '@angular/core';
import { TipoviNastaveService } from '../../services/rest/tipovi-nastave.service';
import { SwalService } from '../../services/swal.service';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-tipovi-nastave-list',
  templateUrl: './tipovi-nastave-list.component.html',
  styles: []
})
export class TipoviNastaveListComponent implements OnInit {
  @Input() loggedUserPrivileges;
  
  tipoviNastave: any[] = [];

  mode: any = '';
  object: any = {};

  constructor(private tipoviNastaveService: TipoviNastaveService,
              private auth: AuthService,
              private notificationService: NotificationService,
              private swal: SwalService) { }

  ngOnInit() {
    this.tipoviNastaveService.getAll()
      .subscribe(data => {
        if(data.StatusCode > 0){
          this.tipoviNastave = data.Data;
        }
      });
  }

  
  changeMode(md, rn){
    this.object = rn ? this.copy(rn) : {};
    this.mode = md;
  }

  copy(o){
    return JSON.parse(JSON.stringify(o));
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
        this.tipoviNastaveService.insert(this.object)
          .subscribe(data => {
            if(this.swal.handleResponse(data)){
              this.tipoviNastave.push(data.Data)
              this.changeMode('',null);

              this.notificationService.notifyTipNastaveInsert(data.Data.ID, this.auth.getID())
                .subscribe(data => {});
            }
          });
      }
      else if(this.mode == 'Update'){
        this.tipoviNastaveService.update(this.object)
          .subscribe(data => {
            if(this.swal.handleResponse(data)){
              var tn = this.tipoviNastave.find(t => t.ID == this.object.ID);
              if(tn){
                tn.Naziv = this.object.Naziv;
                tn.Opis = this.object.Opis;
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
          this.notificationService.notifyTipNastaveDelete(id, this.auth.getID())
            .subscribe(data => {});
          this.tipoviNastaveService.delete(id)
            .subscribe(data => {
              if(this.swal.handleResponse(data)){
                this.tipoviNastave = this.tipoviNastave.filter(tn => tn.ID != id);
              }
            });
        },
        () => {}
      );
    }
  }

}
